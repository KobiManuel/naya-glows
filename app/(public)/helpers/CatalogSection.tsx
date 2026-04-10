"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// All img_ images cycling
const hoverImages = [
  "/images/img_6320.jpg",
  "/images/img_6322.jpg",
  "/images/img_6323.jpg",
  "/images/img_6324.jpg",
  "/images/img_6325.jpg",
  "/images/img_6326.jpg",
  "/images/img_6328.jpg",
  "/images/img_6331.jpg",
];

const cardColors = [
  "#ffe1d7", // peach
  "#fce4f0", // pink
  "#e1f0e8", // mint
  "#f5f1ff", // lavender
  "#fdf4e3", // warm yellow
  "#fce4f0", // pink
  "#e1f0e8", // mint
  "#ffe1d7", // peach
];

const products = [
  {
    category: "Radiance",
    name: "Boost Serum",
    fullName: "Radiance Boost Serum",
    price: "$34.99",
    originalPrice: "$44.99",
    image: "/images/ECA30FF9-62EA-4126-8301-03D590C8250D.png",
    href: "/products/radiance-boost-serum",
  },
  {
    category: "Clarifying",
    name: "Foam Cleanser",
    fullName: "Clarifying Foam Cleanser",
    price: "$28.99",
    originalPrice: "$36.99",
    image: "/images/432E42AB-30FD-4531-815A-E4ECE090058B.png",
    href: "/products/clarifying-foam-cleanser",
  },
  {
    category: "Radiance",
    name: "Barrier Face Oil",
    fullName: "Radiance Barrier Face Oil",
    price: "$38.99",
    originalPrice: "$49.99",
    image: "/images/9CB3AAE2-D6B9-4D9D-8A24-E679C00C2705.png",
    href: "/products/radiance-barrier-face-oil",
  },
  {
    category: "Acne",
    name: "Correcting Serum",
    fullName: "Acne Correcting Serum",
    price: "$34.99",
    originalPrice: "$44.99",
    image: "/images/img_6205.jpg",
    href: "/products/acne-correcting-serum",
  },
  {
    category: "Exfoliating",
    name: "Body Scrub",
    fullName: "Exfoliating Body Scrub",
    price: "$29.99",
    originalPrice: "$39.99",
    image: "/images/19EA7A51-ADB2-4A49-BCB7-0BBC0116F4F2.png",
    href: "/products/exfoliating-body-scrub",
  },
  {
    category: "Pigment",
    name: "Corrector Cream",
    fullName: "Pigment Corrector Face Cream",
    price: "$36.99",
    originalPrice: "$46.99",
    image: "/images/42CBFE95-D2A7-4D13-8A5E-72E62DCF1792.png",
    href: "/products/pigment-corrector-face-cream",
  },
  {
    category: "Radiance",
    name: "Balance Toner",
    fullName: "Radiance Balance Toner",
    price: "$24.99",
    originalPrice: "$32.99",
    image: "/images/056BF54D-5022-45A9-861D-FA2A3620F4A3.png",
    href: "/products/radiance-balance-toner",
  },
  {
    category: "Luminous",
    name: "Glow Body Oil",
    fullName: "Luminous Glow Body Oil",
    price: "$32.99",
    originalPrice: "$42.99",
    image: "/images/0323D23A-ED8D-4AB5-8F52-B8A8EB31E04F.png",
    href: "/products/luminous-glow-body-oil",
  },
];

function ProductCard({
  product,
  bgColor,
  hoverImage,
  animRef,
}: {
  product: (typeof products)[0];
  bgColor: string;
  hoverImage: string;
  animRef: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setHovered(true);
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.18 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
      );
    }
  };

  const handleLeave = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        opacity: 0,
        scale: 1.08,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setHovered(false),
      });
    } else {
      setHovered(false);
    }
  };

  return (
    <div
      ref={animRef}
      onMouseOver={handleEnter}
      onMouseLeave={handleLeave}
      className="relative rounded-3xl overflow-hidden flex flex-col justify-between p-6 min-h-[260px] group cursor-pointer transition-shadow duration-300 hover:shadow-xl"
      style={{ backgroundColor: bgColor }}
    >
      {/* Hover background image */}
      {hovered && (
        <div
          ref={imgRef}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <Image
            src={hoverImage}
            alt="lifestyle"
            fill
            className="object-cover"
          />
          {/* Overlay to keep text readable */}
          {/* <div className="absolute inset-0 bg-black/45" /> */}
        </div>
      )}

      {/* Card top: category label */}
      <div className="relative z-10">
        <p
          className={`text-sm font-medium mb-4 transition-colors duration-300 ${hovered ? "text-white/70" : "text-[#1a1a2e]/50"}`}
        >
          <span
            className={`font-bold transition-colors duration-300 ${hovered ? "text-white" : "text-[#1a1a2e]"}`}
          >
            {product.category}
          </span>{" "}
          <span className={hovered ? "text-white/60" : "text-[#1a1a2e]/50"}>
            {product.name}
          </span>
        </p>

        {/* Product image — shown when NOT hovered */}
        <div
          className={`w-full flex justify-center transition-all duration-300 ${hovered ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{ height: 110 }}
        >
          <Image
            src={product.image}
            alt={product.fullName}
            width={100}
            height={110}
            className="object-contain drop-shadow-md"
          />
        </div>
      </div>

      {/* Card bottom: price + button */}
      <div className="relative z-10 flex items-center justify-between mt-4">
        <div>
          <span
            className={`text-base font-bold transition-colors duration-300 ${hovered ? "text-white" : "text-[#1a1a2e]"}`}
          >
            {product.price}
          </span>{" "}
          <span
            className={`text-sm line-through transition-colors duration-300 ${hovered ? "text-white/50" : "text-[#1a1a2e]/35"}`}
          >
            {product.originalPrice}
          </span>
        </div>

        {/* Arrow button */}
        <Link
          href={product.href}
          onClick={(e) => e.stopPropagation()}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            hovered
              ? "bg-white text-[#1a1a2e] scale-110"
              : "bg-[#1a1a2e]/10 text-[#1a1a2e] hover:bg-[#1a1a2e]/20"
          }`}
        >
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default function CatalogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const anim = (el: Element | null, from: gsap.TweenVars, delay = 0) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, ...from },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 25%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      };

      anim(headingRef.current, {});

      cardRefs.current.forEach((el, i) => {
        anim(el, { y: 50 + (i % 2) * 10 }, 0.08 + i * 0.055);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f5f1ff] py-20">
      <div className="w-[90%] mx-auto max-[1275px]:w-full">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 lg:p-14 shadow-sm max-[1275px]:rounded-none max-[800px]:px-4">
          {/* ── Heading + CTA ─────────────────────────────────────────────── */}
          <div
            ref={headingRef}
            className="flex items-end justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-[#1a1a2e] tracking-tight leading-tight">
                Find the perfect Solution
              </h2>
              <p className="text-3xl sm:text-4xl lg:text-[2.6rem] font-light text-[#9a9ab8] tracking-tight leading-tight">
                for your goals
              </p>
            </div>
            <Link
              href="/catalog"
              className="flex items-center gap-2 bg-[#1a1a2e] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#2d2d4a] transition-colors flex-shrink-0"
            >
              Go to catalog
              <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight size={11} />
              </span>
            </Link>
          </div>

          {/* ── Product grid ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <ProductCard
                key={product.fullName}
                product={product}
                bgColor={cardColors[i % cardColors.length]}
                hoverImage={hoverImages[i % hoverImages.length]}
                animRef={(el) => {
                  cardRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          <p className="mt-8 text-xs text-[#8888aa]">
            Prices shown in USD. Results may vary based on skin type and
            consistent use.
          </p>
        </div>
      </div>
    </section>
  );
}
