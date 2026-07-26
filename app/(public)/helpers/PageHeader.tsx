"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";

export type PageHeaderImage = {
  src: string;
  alt: string;
  // Insert the pill immediately after the word at this index (0-based).
  afterWord: number;
  width?: number;
};

// Shared "alive" page-header treatment (eyebrow slide-in, word-by-word
// heading reveal, subtitle fade, optional inline photo pills) — the same
// liveliness as the Contact page's hero, extracted so every simpler interior
// page (Track Order, Wholesale, Branches, Transformations, ...) doesn't stay
// a flat, static heading.
export default function PageHeader({
  eyebrow,
  heading,
  subtitle,
  accent,
  images,
  className = "",
}: {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  accent?: ReactNode;
  images?: PageHeaderImage[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ph-accent",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
      );
      gsap.fromTo(
        ".ph-eyebrow",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 },
      );
      gsap.fromTo(
        ".ph-word",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".ph-pill",
        { opacity: 0, scale: 0.85, rotate: -6 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.9, stagger: 0.12, ease: "back.out(1.4)", delay: 0.45 },
      );
      gsap.fromTo(
        ".ph-subtitle",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.6 },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = heading.split(" ");

  return (
    <div ref={ref} className={`text-center ${className}`}>
      {accent && <div className="ph-accent flex justify-center mb-3">{accent}</div>}
      <p className="ph-eyebrow text-[11px] tracking-[0.3em] uppercase text-[#6a9a72] mb-3 font-medium">
        {eyebrow}
      </p>
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-tight mb-4">
        {words.map((word, i) => (
          <span key={i}>
            <span className="ph-word inline-block mr-[0.28em] last:mr-0">{word}</span>
            {images
              ?.filter((img) => img.afterWord === i)
              .map((img, imgI) => (
                <span
                  key={imgI}
                  className="ph-pill inline-block overflow-hidden relative align-middle mx-1 rounded-full border border-[#8ab88e]/30"
                  style={{ width: img.width ?? 100, height: 56 }}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-center" />
                </span>
              ))}
          </span>
        ))}
      </h1>
      {subtitle && (
        <p className="ph-subtitle text-sm sm:text-base text-[#16241a]/50 max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
