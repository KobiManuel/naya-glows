"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { isInStock, type Product } from "@/lib/products";

// Shared between the Catalog grid and the Account page's Saved Products
// panel so a product looks and behaves identically everywhere it's listed
// — same glass panel over the product photo, same wishlist/add-to-cart
// controls, just laid out inside whatever grid/scroll container the caller
// provides.
export default function ProductGridCard({
  product,
  formatPrice,
  wishlisted,
  onToggleWishlist,
  wishlistDisabled,
  onAddToCart,
  justAdded,
  className = "",
}: {
  product: Product;
  formatPrice: (n: number) => string;
  wishlisted: boolean;
  onToggleWishlist: () => void;
  wishlistDisabled?: boolean;
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>) => void;
  justAdded: boolean;
  className?: string;
}) {
  const inStock = isInStock(product);

  return (
    <div
      className={`group relative rounded-[1.75rem] overflow-hidden aspect-[0.68] sm:aspect-[3/4] shadow-[0_8px_32px_rgba(0,0,0,0.18)] flex-shrink-0 w-[72vw] max-w-[300px] snap-start sm:w-auto sm:max-w-none ${className}`}
    >
      <Link href={`/products/${product.slug}`} className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
            inStock ? "" : "grayscale opacity-70"
          }`}
        />
      </Link>

      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />

      <span className="absolute top-3 left-3 z-20 text-[9px] uppercase tracking-wide font-semibold text-white bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full">
        {product.category}
      </span>

      {!inStock && (
        <span className="absolute top-3 left-1/2 -translate-x-1/2 z-20 text-[9px] uppercase tracking-wide font-bold text-white bg-[#c0574c] px-3 py-1 rounded-full shadow-sm">
          Out of Stock
        </span>
      )}

      <button
        onClick={onToggleWishlist}
        disabled={wishlistDisabled}
        aria-label="Toggle wishlist"
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white/40 transition-colors disabled:opacity-60"
      >
        <Heart
          size={13}
          className={wishlisted ? "fill-[#e07a6f] text-[#e07a6f]" : "text-white"}
        />
      </button>

      <div
        className="absolute bottom-4 left-[5%] right-[5%] z-20 rounded-2xl bg-black/35 backdrop-blur-md border-white/40 p-3.5"
        style={{ borderWidth: "0.5px" }}
      >
        <Link href={`/products/${product.slug}`}>
          <p className="text-sm font-semibold text-white leading-snug mb-0.5 line-clamp-1">
            {product.name}
          </p>
        </Link>
        <p className="text-[11px] text-white/70 mb-2.5 line-clamp-1">{product.tagline}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-white">
              {product.variants && product.variants.length > 0 ? "From " : ""}
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <>
                {" "}
                <span className="text-[11px] line-through text-white/45">
                  {formatPrice(product.originalPrice)}
                </span>
              </>
            )}
          </div>
          {!inStock ? (
            <span
              aria-label="Out of stock"
              className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center cursor-not-allowed"
            >
              <ShoppingBag size={13} className="text-white/50" />
            </span>
          ) : product.variants && product.variants.length > 0 ? (
            <Link
              href={`/products/${product.slug}`}
              aria-label="Choose a size"
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
            >
              <ShoppingBag size={13} className="text-[#16241a]" />
            </Link>
          ) : (
            <button
              onClick={onAddToCart}
              aria-label="Add to cart"
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
            >
              {justAdded ? (
                <Check size={14} className="text-[#4f7957]" />
              ) : (
                <ShoppingBag size={13} className="text-[#16241a]" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
