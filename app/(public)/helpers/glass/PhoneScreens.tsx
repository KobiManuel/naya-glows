"use client";

import Image from "next/image";
import { products, categories } from "@/lib/products";
import { useCurrencyDisplay } from "../../../store/useCurrencyDisplay";
import { Search, SlidersHorizontal, Heart, Home, User, ShoppingBag } from "lucide-react";

const homeItems = products.slice(0, 4);

export function AppHomeScreen() {
  const { format: formatPrice } = useCurrencyDisplay();
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-[#eafbf0] to-[#dcefe0] px-3 pt-8 pb-2 text-[#16241a]">
      {/* Greeting bar */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[8px] text-[#6a9a72]">Hey, glow getter</p>
          <p className="text-[11px] font-semibold leading-tight">Naya Glows</p>
        </div>
        <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center overflow-hidden">
          <Image
            src="https://res.cloudinary.com/bhozkz7o/image/upload/v1784381892/naya-glows/legacy/naya-logo.png"
            alt=""
            width={14}
            height={14}
            className="object-contain"
          />
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className="flex-1 flex items-center gap-1.5 bg-white/70 rounded-full px-2.5 py-1.5">
          <Search size={9} className="text-[#6a9a72]" />
          <span className="text-[7px] text-[#6a9a72]/70">Search your product</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-[#16241a] flex items-center justify-center flex-shrink-0">
          <SlidersHorizontal size={9} className="text-white" />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-1.5 mb-3 overflow-hidden">
        {["All", ...categories].slice(0, 3).map((c, i) => (
          <span
            key={c}
            className={`text-[6.5px] px-2 py-1 rounded-full whitespace-nowrap ${
              i === 0 ? "bg-[#16241a] text-white" : "bg-white/70 text-[#16241a]/70"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Product grid — the card IS the photo, no color fill */}
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {homeItems.map((p) => (
          <div key={p.slug} className="relative rounded-xl overflow-hidden aspect-[3/4]">
            <Image src={p.image} alt="" fill className="object-cover" />
            {/* Glass panel for legible text */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 to-transparent backdrop-blur-[2px]" />
            <Heart size={8} className="absolute top-1.5 right-1.5 text-white drop-shadow z-10" />
            <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10">
              <p className="text-[6.5px] font-semibold text-white leading-tight line-clamp-1 mb-0.5">
                {p.name}
              </p>
              <p className="text-[7.5px] font-bold text-white">{formatPrice(p.price)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around bg-[#16241a] rounded-full py-1.5 mt-2">
        <Home size={10} className="text-white" />
        <ShoppingBag size={10} className="text-white/50" />
        <Heart size={10} className="text-white/50" />
        <User size={10} className="text-white/50" />
      </div>
    </div>
  );
}

export function ProductDetailScreen() {
  const { format: formatPrice } = useCurrencyDisplay();
  const product = products[0];
  return (
    <div className="w-full h-full flex flex-col bg-[#16241a] text-[#16241a]">
      {/* Product photo fills the whole top area */}
      <div className="relative w-full h-[56%] overflow-hidden">
        <Image src={product.image} alt="" fill className="object-cover" />
        <span className="absolute top-8 left-3 w-6 h-6 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-[9px] z-10">
          ←
        </span>
        <span className="absolute top-8 right-3 w-6 h-6 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
          <Heart size={10} className="text-[#6a9a72]" />
        </span>
      </div>

      {/* Frosted glass sheet */}
      <div className="flex-1 bg-white/75 backdrop-blur-xl border-t border-white/60 rounded-t-3xl px-3 pt-3 shadow-[0_-8px_24px_rgba(80,140,90,0.15)]">
        <p className="text-[9px] font-semibold leading-tight mb-0.5">{product.name}</p>
        <p className="text-[6.5px] text-[#16241a]/50 mb-2 line-clamp-2 leading-snug">
          {product.tagline}
        </p>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-[#eafbf0] rounded-full px-1.5 py-0.5">
            <span className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center text-[8px] shadow-sm">
              −
            </span>
            <span className="text-[7px] font-medium">1</span>
            <span className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center text-[8px] shadow-sm">
              +
            </span>
          </div>
          <span className="text-[10px] font-semibold text-[#4f7957]">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="relative bg-gradient-to-r from-[#8ab88e] to-[#4f7957] text-white text-[7px] font-semibold text-center py-1.5 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
          <span className="relative">Add to cart</span>
        </div>
      </div>
    </div>
  );
}
