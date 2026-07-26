"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useSectionContent,
  useSectionLoading,
} from "../../store/useSectionContent";
import { defaultHeroContent } from "@/lib/content/homeHero";
import HeroSkeleton from "./skeletons/HeroSkeleton";

const SLIDE_INTERVAL_MS = 5000;
const TYPE_SPEED_MS = 55;
const DELETE_SPEED_MS = 30;
const HOLD_MS = 1800;

function useTypewriter(taglines: string[]) {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  useEffect(() => {
    if (taglines.length === 0) return;
    const current = taglines[taglineIndex % taglines.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPE_SPEED_MS,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("holding"), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(t);
    }

    // deleting
    if (text.length > 0) {
      const t = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED_MS);
      return () => clearTimeout(t);
    }
    setTaglineIndex((i) => (i + 1) % taglines.length);
    setPhase("typing");
  }, [text, phase, taglineIndex, taglines]);

  return text;
}

export default function HeroBanner() {
  const content = useSectionContent("home.hero", defaultHeroContent);
  const isLoading = useSectionLoading("home.hero");
  const [activeImage, setActiveImage] = useState(0);
  const tagline = useTypewriter(content.taglines);

  useEffect(() => {
    if (content.backgroundImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImage((i) => (i + 1) % content.backgroundImages.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [content.backgroundImages.length]);

  return (
    <section className="relative w-full h-[100dvh] min-h-[560px] sm:min-h-[640px] max-h-[980px] overflow-hidden bg-[#1a1a1a]">
      {isLoading && (
        <div className="absolute inset-0 z-50">
          <HeroSkeleton />
        </div>
      )}

      {/* Auto-advancing background slider — crossfades between photos */}
      {content.backgroundImages.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt="Naya Glows models holding Radiance Repair Lotion, Glow Body Oil, and Correcting Serum"
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover object-center absolute inset-0 transition-opacity duration-1000 ${
            i === activeImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />

      <div className="relative z-10 h-full flex flex-col justify-end max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24">
        <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#e8ddd0] mb-4 font-medium">
          {content.eyebrow}
        </p>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] max-w-3xl mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {content.headline}
          <br className="hidden sm:block" />{" "}
          <span className="inline-block min-h-[1.05em]">
            {tagline}
            <span className="inline-block w-[2px] h-[0.9em] bg-white/80 ml-1 align-middle animate-pulse" />
          </span>
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
          {content.body}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={content.primaryCtaHref}
            className="bg-white text-[#1a1a1a] px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            {content.primaryCtaLabel}
          </Link>
          <Link
            href={content.secondaryCtaHref}
            className="border border-white/40 text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 backdrop-blur-sm transition-colors"
          >
            {content.secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
