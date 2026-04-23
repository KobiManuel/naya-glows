"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cardColors = [
  "#fff2ec",
  "#ffeaf6",
  "#eafbf0",
  "#f3f9fe",
  "#f5f1ff",
  "#ffe4e3",
  "#fffef3",
  "#f4f5ff",
];

const arrowContainerColors = [
  "#f0cbb4",
  "#dba6c1",
  "#aed4b4",
  "#bcd0fb",
  "#bfb7d7",
  "#f4a09e",
  "#ebd393",
  "#b4addd"
]

const products = [
  {
    category: "Radiance",
    name: "Boost Serum",
    fullName: "Radiance Boost Serum",
    price: "$34.99",
    originalPrice: "$44.99",
    image: "/images/eca30ff9-62ea-4126-8301-03d590c8250d.png",
    href: "/products/radiance-boost-serum",
  },
  {
    category: "Clarifying",
    name: "Foam Cleanser",
    fullName: "Clarifying Foam Cleanser",
    price: "$28.99",
    originalPrice: "$36.99",
    image: "/images/432e42ab-30fd-4531-815a-e4ece090058b.png",
    href: "/products/clarifying-foam-cleanser",
  },
  {
    category: "Radiance",
    name: "Barrier Face Oil",
    fullName: "Radiance Barrier Face Oil",
    price: "$38.99",
    originalPrice: "$49.99",
    image: "/images/9cb3aae2-d6b9-4d9d-8a24-e679c00c2705.png",
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
    image: "/images/19ea7a51-adb2-4a49-bcb7-0bbc0116f4f2.png",
    href: "/products/exfoliating-body-scrub",
  },
  {
    category: "Pigment",
    name: "Corrector Cream",
    fullName: "Pigment Corrector Face Cream",
    price: "$36.99",
    originalPrice: "$46.99",
    image: "/images/42cbfe95-d2a7-4d13-8a5e-72e62dcf1792.png",
    href: "/products/pigment-corrector-face-cream",
  },
  {
    category: "Radiance",
    name: "Balance Toner",
    fullName: "Radiance Balance Toner",
    price: "$24.99",
    originalPrice: "$32.99",
    image: "/images/056bf54d-5022-45a9-861d-fa2a3620f4a3.png",
    href: "/products/radiance-balance-toner",
  },
  {
    category: "Luminous",
    name: "Glow Body Oil",
    fullName: "Luminous Glow Body Oil",
    price: "$32.99",
    originalPrice: "$42.99",
    image: "/images/0323d23a-ed8d-4ab5-8f52-b8a8eb31e04f.png",
    href: "/products/luminous-glow-body-oil",
  },
];

function ProductCard({
  product,
  bgColor,
  arrowBgColor,
  animRef,
}: {
  product: (typeof products)[0];
  bgColor: string;
  animRef: (el: HTMLDivElement | null) => void;
  arrowBgColor: string;
}) {
  return (
    <div
      ref={animRef}
      className="relative rounded-3xl overflow-hidden flex flex-col justify-between p-6 min-h-[260px] group cursor-pointer transition-shadow duration-300 hover:shadow-xl"
      style={{ backgroundColor: bgColor }}
    >
      {/* ── HOVER BG IMAGE — CSS-only reveal with scaledown ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Image
          src={product.image}
          alt={product.fullName}
          fill
          className="object-cover scale-[1.18] group-hover:scale-100 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Card top: category label */}
      <div className="relative z-10">
        <p className="group-hover:opacity-0  text-sm font-medium mb-4 transition-colors duration-300 text-[#1a1a2e]/50">
          <span className="font-bold transition-colors duration-300 text-[#1a1a2e] group-hover:text-white">
            {product.category}
          </span>{" "}
          <span className="transition-colors duration-300 text-[#1a1a2e]/50 group-hover:text-white/60">
            {product.name}
          </span>
        </p>

        {/* Product image — shown when NOT hovered */}
        <div
          className="w-full flex justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none"
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
        <div className="group-hover:opacity-0 ">
          <span className="text-base font-bold transition-colors duration-300 text-[#1a1a2e] group-hover:text-white">
            {product.price}
          </span>{" "}
          <span className="text-sm line-through transition-colors duration-300 text-[#1a1a2e]/35 group-hover:text-white/50">
            {product.originalPrice}
          </span>
        </div>

        {/* Arrow button — uses white overlay for hover bg to allow smooth CSS transition */}
        <Link
          href={product.href}
          onClick={(e) => e.stopPropagation()}
          className="relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 overflow-hidden"
          style={{ backgroundColor: arrowBgColor }}
        >
          {/* White overlay fades in on hover */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          <ArrowRight size={15} className="relative z-10 text-white group-hover:text-black transition-colors duration-300" />
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
              start: "top 95%",
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
    <section ref={sectionRef} className="w-full bg-white py-20">
      <div className="w-[90%] mx-auto max-[1275px]:w-full">
        <div className=" p-8 sm:p-10 lg:p-14  max-[800px]:px-4">
          {/* ── Heading + CTA ─────────────────────────────────────────────── */}
          <div
            ref={headingRef}
            className="flex items-end justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold text-[#1a1a2e] tracking-tight leading-tight">
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
                animRef={(el) => {
                  cardRefs.current[i] = el;
                }}
                arrowBgColor={arrowContainerColors[i % arrowContainerColors.length]}
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