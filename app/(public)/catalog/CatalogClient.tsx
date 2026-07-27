"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Search, Heart, ShoppingBag, Check, Sparkles, Droplet } from "lucide-react";
import { skincareCategories, type Product, type ProductCategory } from "@/lib/products";
import { useCart } from "../../store/cartSlice";
import { triggerCartFly } from "../../store/cartFlyBus";
import { useUserAuth } from "../../store/useUserAuth";
import { useListSavedProductsQuery, useToggleSavedProductMutation } from "../../store/userApi";
import { isApiConfigured } from "@/lib/api";
import { useSectionContent } from "../../store/useSectionContent";
import { defaultCatalogHeroContent } from "@/lib/content/catalogHero";
import GlassCard from "../helpers/glass/GlassCard";
import PhoneMockup from "../helpers/glass/PhoneMockup";
import { AppHomeScreen, ProductDetailScreen } from "../helpers/glass/PhoneScreens";

type FilterValue = "All" | ProductCategory;
type Collection = "Skincare" | "Scent";

export default function CatalogClient({ products }: { products: Product[] }) {
  const heroContent = useSectionContent("catalog.hero", defaultCatalogHeroContent);
  const [collection, setCollection] = useState<Collection>("Skincare");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("All");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const { addItem } = useCart();
  const { user } = useUserAuth();
  const { data: savedProducts } = useListSavedProductsQuery(undefined, {
    skip: !isApiConfigured() || !user,
  });
  const [toggleSavedProduct] = useToggleSavedProductMutation();
  const wishlist = useMemo(
    () => new Set((savedProducts ?? []).map((p) => p.slug)),
    [savedProducts],
  );

  const isScent = collection === "Scent";

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCollection = isScent ? p.category === "Scent" : p.category !== "Scent";
      const matchesCategory = isScent || filter === "All" || p.category === filter;
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCollection && matchesCategory && matchesQuery;
    });
  }, [products, query, filter, isScent]);

  const toggleWishlist = (slug: string) => {
    if (!user) {
      toast.error("Sign in to save favorites.");
      return;
    }
    toggleSavedProduct({ slug }).catch(() => {
      toast.error("Couldn't update your saved products. Please try again.");
    });
  };

  const handleAddToCart = (product: Product, sourceEl: HTMLElement) => {
    addItem(product);
    triggerCartFly(product.image, sourceEl);
    setJustAdded(product.slug);
    setTimeout(() => setJustAdded(null), 1400);
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${isScent
          ? "bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] text-white"
          : "bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a]"
        }`}
    >
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="pt-36 sm:pt-40 pb-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Skincare / Scent toggle */}
            <div
              className={`inline-flex items-center gap-1 rounded-full p-1 mb-6 ${isScent ? "bg-white/10" : "bg-white/70"
                }`}
            >
              <button
                onClick={() => setCollection("Skincare")}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-colors ${!isScent
                    ? "bg-[#16241a] text-white"
                    : isScent
                      ? "text-white/60 hover:text-white"
                      : "text-[#16241a]/60"
                  }`}
              >
                <Droplet size={13} />
                {heroContent.skincareToggleLabel}
              </button>
              <button
                onClick={() => setCollection("Scent")}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-colors ${isScent ? "bg-white text-[#0e0e0e]" : "text-[#16241a]/60 hover:text-[#16241a]"
                  }`}
              >
                <Sparkles size={13} />
                {heroContent.scentToggleLabel}
              </button>
            </div>

            <p
              className={`text-xs tracking-[0.35em] uppercase mb-4 font-medium ${isScent ? "text-white/50" : "text-[#6a9a72]"
                }`}
            >
              {isScent ? heroContent.scentEyebrow : heroContent.skincareEyebrow}
            </p>
            <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[1.05] mb-6">
              {isScent ? (
                <>
                  {heroContent.scentHeadlineLine1}
                  <br />
                  <span className="font-semibold">{heroContent.scentHeadlineLine2}</span>
                </>
              ) : (
                <>
                  {heroContent.skincareHeadlineLine1}
                  <br />
                  <span className="font-semibold">{heroContent.skincareHeadlineLine2}</span>
                </>
              )}
            </h1>
            <p
              className={`text-sm sm:text-base max-w-md mb-8 leading-relaxed ${isScent ? "text-white/60" : "text-[#16241a]/60"
                }`}
            >
              {isScent ? heroContent.scentSubheading : heroContent.skincareSubheading}
            </p>

            {/* Search */}
            {!isScent && (
              <div className="flex items-center gap-2 max-w-md">
                <div className="flex-1 flex items-center gap-2.5 bg-white/70 backdrop-blur-md border border-white/60 rounded-full px-5 py-3.5">
                  <Search size={16} className="text-[#6a9a72] flex-shrink-0" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search your product"
                    className="w-full bg-transparent outline-none text-sm placeholder:text-[#16241a]/35"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Phone mockups */}
          {!isScent && (
            <div className="hidden lg:flex items-center justify-center gap-6 relative">
              <PhoneMockup tilt={-6} className="mt-10">
                <AppHomeScreen />
              </PhoneMockup>
              <PhoneMockup tilt={5}>
                <ProductDetailScreen />
              </PhoneMockup>
            </div>
          )}
        </div>
      </section>

      {/* ── FILTER BAR (Skincare only) ──────────────────────────── */}
      {!isScent && (
        <section className="px-5 sm:px-8 lg:px-12 mb-10">
          <div className="max-w-[1300px] mx-auto flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {(["All", ...skincareCategories] as FilterValue[]).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`flex-shrink-0 text-sm font-medium px-5 py-2.5 rounded-full transition-colors whitespace-nowrap ${filter === c
                    ? "bg-[#16241a] text-white"
                    : "bg-white/60 text-[#16241a]/70 hover:bg-white/90"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── PRODUCT GRID ────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 lg:px-12 pb-24">
        <div className="max-w-[1300px] mx-auto">
          {filtered.length === 0 ? (
            isScent ? (
              <div className="text-center py-24 px-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5">
                  <Sparkles size={22} className="text-white/60" />
                </div>
                <p className="text-lg font-medium mb-2">New fragrances coming soon</p>
                <p className="text-sm text-white/50 max-w-sm mx-auto">
                  We&apos;re crafting our first signature scents. Switch back
                  to Skincare to shop what&apos;s available now.
                </p>
              </div>
            ) : (
              <GlassCard className="text-center py-20 px-6">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm text-[#16241a]/50 mb-6">
                  Try a different search term or category.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setFilter("All");
                  }}
                  className="text-sm font-semibold bg-[#16241a] text-white px-6 py-2.5 rounded-full"
                >
                  Clear filters
                </button>
              </GlassCard>
            )
          ) : (
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-1 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-5 sm:overflow-visible -mx-5 px-5 sm:mx-0 sm:px-0">
              {filtered.map((product) => (
                <div
                  key={product.slug}
                  className="group relative rounded-[1.75rem] overflow-hidden aspect-[0.68] sm:aspect-[3/4] shadow-[0_8px_32px_rgba(0,0,0,0.18)] flex-shrink-0 w-[72vw] max-w-[300px] snap-start sm:w-auto sm:max-w-none"
                >
                  {/* The card IS the photo — no color fill behind it */}
                  <Link href={`/products/${product.slug}`} className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Glass sheen across the top of the photo */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />

                  {/* Category pill */}
                  <span className="absolute top-3 left-3 z-20 text-[9px] uppercase tracking-wide font-semibold text-white bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.slug)}
                    aria-label="Toggle wishlist"
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white/40 transition-colors"
                  >
                    <Heart
                      size={13}
                      className={
                        wishlist.has(product.slug)
                          ? "fill-[#e07a6f] text-[#e07a6f]"
                          : "text-white"
                      }
                    />
                  </button>

                  {/* Floating glass panel — inset with equal side/bottom margin, not flush to the edges */}
                  <div
                    className="absolute bottom-4 left-[5%] right-[5%] z-20 rounded-2xl bg-black/35 backdrop-blur-md border-white/40 p-3.5"
                    style={{ borderWidth: "0.5px" }}
                  >
                    <Link href={`/products/${product.slug}`}>
                      <p className="text-sm font-semibold text-white leading-snug mb-0.5 line-clamp-1">
                        {product.name}
                      </p>
                    </Link>
                    <p className="text-[11px] text-white/70 mb-2.5 line-clamp-1">
                      {product.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-white">
                          {product.variants && product.variants.length > 0 ? "From " : ""}$
                          {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <>
                            {" "}
                            <span className="text-[11px] line-through text-white/45">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>
                      {product.variants && product.variants.length > 0 ? (
                        <Link
                          href={`/products/${product.slug}`}
                          aria-label="Choose a size"
                          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                        >
                          <ShoppingBag size={13} className="text-[#16241a]" />
                        </Link>
                      ) : (
                        <button
                          onClick={(e) => handleAddToCart(product, e.currentTarget)}
                          aria-label="Add to cart"
                          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                        >
                          {justAdded === product.slug ? (
                            <Check size={14} className="text-[#4f7957]" />
                          ) : (
                            <ShoppingBag size={13} className="text-[#16241a]" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
