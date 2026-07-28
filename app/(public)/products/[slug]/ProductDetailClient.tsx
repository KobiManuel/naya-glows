"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Check, ArrowRight, Repeat } from "lucide-react";
import { isInStock, type Product } from "@/lib/products";
import { useCart } from "../../../store/cartSlice";
import { useSettings } from "../../../store/useSettings";
import { useCurrencyDisplay } from "../../../store/useCurrencyDisplay";
import { triggerCartFly } from "../../../store/cartFlyBus";
import GlassCard from "../../helpers/glass/GlassCard";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants![0] : undefined,
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const { addItem } = useCart();
  const { subscriptionDiscountPercent } = useSettings();
  const { format: formatPrice } = useCurrencyDisplay();

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const subscriptionPrice = activePrice * (1 - subscriptionDiscountPercent / 100);
  const inStock = isInStock(product);

  const handleAddToCart = (sourceEl: HTMLElement) => {
    if (!inStock) return;
    addItem(product, qty, isSubscription, selectedVariant);
    triggerCartFly(product.image, sourceEl);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#16241a]/45 mb-8">
            <Link href="/catalog" className="hover:text-[#6a9a72] transition-colors">
              Catalog
            </Link>
            <span>/</span>
            <span className="text-[#16241a]/70">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* The card IS the photo, full-bleed, with a glass sheen */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-cover ${inStock ? "" : "grayscale opacity-70"}`}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/10 pointer-events-none" />
              {!inStock && (
                <span className="absolute top-4 left-4 z-10 text-xs uppercase tracking-[0.2em] font-bold text-white bg-[#c0574c] px-3.5 py-1.5 rounded-full shadow-sm">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[#6a9a72] font-semibold mb-3">
                {product.category}
              </p>
              <h1 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-[#16241a]/60 text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold">
                  {formatPrice(isSubscription ? subscriptionPrice : activePrice)}
                </span>
                {product.originalPrice > activePrice && (
                  <span className="text-base line-through text-[#16241a]/30">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Size selector */}
              {hasVariants && (
                <div className="flex items-center gap-2 mb-5">
                  {product.variants!.map((variant) => (
                    <button
                      key={variant.name}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                        selectedVariant?.name === variant.name
                          ? "bg-[#16241a] text-white border-[#16241a]"
                          : "bg-white/60 text-[#16241a]/70 border-white/60 hover:border-[#8ab88e]"
                      }`}
                    >
                      {variant.name} · {formatPrice(variant.price)}
                    </button>
                  ))}
                </div>
              )}

              {/* Subscribe & save */}
              <label className="flex items-start gap-3 bg-white/50 border border-white/60 rounded-2xl p-4 mb-8 cursor-pointer hover:bg-white/70 transition-colors">
                <input
                  type="checkbox"
                  checked={isSubscription}
                  onChange={(e) => setIsSubscription(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#4f7957] flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Repeat size={14} className="text-[#4f7957]" />
                    Subscribe &amp; Save {Math.round(subscriptionDiscountPercent)}%
                  </p>
                  <p className="text-xs text-[#16241a]/50 mt-1">
                    {formatPrice(subscriptionPrice)} per order — cancel anytime.
                  </p>
                </div>
              </label>

              {/* Benefits */}
              <ul className="space-y-2 mb-8">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-[#16241a]/70">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8ab88e] flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Qty + Add to cart */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-4 bg-white/70 border border-white/60 rounded-full px-4 py-2.5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e.currentTarget)}
                  disabled={!inStock}
                  className="relative flex items-center gap-2 bg-gradient-to-r from-[#8ab88e] to-[#4f7957] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:brightness-105 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
                >
                  <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
                  <span className="relative flex items-center gap-2">
                    {!inStock ? (
                      "Out of Stock"
                    ) : added ? (
                      <>
                        Added <Check size={15} />
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-xl font-semibold mb-6">You may also like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                {related.map((r) => (
                  <Link key={r.slug} href={`/products/${r.slug}`}>
                    <GlassCard className="p-4 group">
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3">
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                            isInStock(r) ? "" : "grayscale opacity-70"
                          }`}
                        />
                        {!isInStock(r) && (
                          <span className="absolute top-2 left-2 z-10 text-[9px] uppercase tracking-wide font-bold text-white bg-[#c0574c] px-2 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold leading-snug mb-1 line-clamp-2">
                        {r.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">
                          {r.variants && r.variants.length > 0 ? "From " : ""}
                          {formatPrice(r.price)}
                        </span>
                        <ArrowRight size={14} className="text-[#6a9a72]" />
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
