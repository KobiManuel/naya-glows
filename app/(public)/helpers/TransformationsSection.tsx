"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const concerns = [
  {
    label: "Dark Spots & Pigmentation",
    href: "/products/acne-correcting-serum",
  },
  { label: "Uneven Skin Tone", href: "/products/radiance-boost-serum" },
  {
    label: "Dryness & Dullness",
    href: "/products/radiance-repair-body-lotion",
  },
];

export default function TransformationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  // Before/after slider state
  const [sliderX, setSliderX] = useState(50); // percent
  const isDragging = useRef(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // ── Scroll animations ──────────────────────────────────────────────────
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
            duration: 0.85,
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
      anim(leftCardRef.current, { x: -40 }, 0.18);
      anim(rightCardRef.current, { x: 40 }, 0.28);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Slider drag logic ──────────────────────────────────────────────────
  const getPercent = useCallback((clientX: number) => {
    const rect = sliderContainerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setSliderX(getPercent(e.clientX));
  };
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      setSliderX(getPercent(e.clientX));
    },
    [getPercent],
  );
  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setSliderX(getPercent(e.touches[0].clientX));
  };
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current) return;
      setSliderX(getPercent(e.touches[0].clientX));
    },
    [getPercent],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [onMouseMove, onMouseUp, onTouchMove]);

  return (
    <section ref={sectionRef} className="w-full bg-[#e8e8f4] py-20">
      <div className="w-[90%] mx-auto max-[1275px]:w-full">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 lg:p-14 shadow-sm max-[1275px]:rounded-none max-[800px]:px-4">
          {/* ── Heading ──────────────────────────────────────────────────── */}
          <div ref={headingRef} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-[#1a1a2e] tracking-tight leading-tight mb-2">
              Inspiring transformations{" "}
              <span className="font-light text-[#9a9ab8]">from real</span>
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-[2.6rem] font-light text-[#9a9ab8] tracking-tight">
              people like you
            </p>
          </div>

          {/* ── Two-column layout ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* ── LEFT: Story card ─────────────────────────────────────────── */}
            <div
              ref={leftCardRef}
              className="rounded-3xl p-7 sm:p-9 flex flex-col justify-between min-h-[460px]"
              style={{ backgroundColor: "#f5f1ff" }}
            >
              {/* Top: name + testimonial */}
              <div>
                <p className="text-sm font-semibold text-[#1a1a2e] mb-0.5">
                  Amara, 34 years
                </p>
                <p className="text-sm text-[#6b6baa] font-medium mb-5">
                  Visibly brighter skin in 4 weeks
                </p>
                <p className="text-sm text-[#5a5a7a] leading-relaxed max-w-sm italic">
                  "I'd struggled with dark spots and uneven tone for years.
                  After using the Naya Radiance Boost Serum consistently, I
                  finally started seeing a real difference — my skin looks
                  clearer and more radiant than ever."
                </p>
              </div>

              {/* Middle: concerns list */}
              <div className="my-7">
                <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">
                  <p className="text-xs font-semibold text-[#1a1a2e] mb-3 tracking-wide uppercase">
                    Amara also has concerns with
                  </p>
                  <div className="flex flex-col gap-2">
                    {concerns.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="flex items-center justify-between group px-3 py-2.5 rounded-xl hover:bg-[#f5f1ff] transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a9ab8] flex-shrink-0" />
                          <span className="text-sm text-[#1a1a2e] group-hover:text-[#6b6baa] transition-colors">
                            {c.label}
                          </span>
                        </div>
                        <ArrowRight
                          size={14}
                          className="text-[#9a9ab8] group-hover:text-[#6b6baa] group-hover:translate-x-0.5 transition-all duration-200"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: product + CTA */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#ffe1d7] flex-shrink-0">
                    <Image
                      src="/images/ECA30FF9-62EA-4126-8301-03D590C8250D.png"
                      alt="Radiance Boost Serum"
                      width={44}
                      height={44}
                      className="object-contain w-full h-full p-0.5"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e] leading-tight">
                      Radiance Boost Serum
                    </p>
                    <p className="text-xs text-[#9a9ab8]">
                      Brightening & Hydration
                    </p>
                  </div>
                </div>
                <Link
                  href="/products/radiance-boost-serum"
                  className="bg-[#1a1a2e] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#2d2d4a] transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Before/after slider card ─────────────────────────── */}
            <div
              ref={rightCardRef}
              className="rounded-3xl overflow-hidden relative"
              style={{ backgroundColor: "#e8e8f4", minHeight: 460 }}
            >
              {/* Improvements badge */}
              <div className="absolute top-4 right-4 z-20 bg-white rounded-2xl px-4 py-3 shadow-md">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#9a9ab8] font-semibold mb-1.5">
                  Your improvements
                </p>
                {/* Arc progress */}
                <div className="flex items-center gap-2">
                  <ArcProgress percent={73} />
                  <span className="text-lg font-black text-[#1a1a2e]">73%</span>
                </div>
              </div>

              {/* Before/After slider */}
              <div
                ref={sliderContainerRef}
                className="relative w-full h-full select-none"
                style={{ minHeight: 460, cursor: "col-resize" }}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
              >
                {/* AFTER (full — bottom layer) */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/youthful.png"
                    alt="After — youthful skin"
                    fill
                    className="object-contain"
                    draggable={false}
                  />
                  {/* After label */}
                  <span className="absolute bottom-5 right-4 text-xs font-semibold text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full select-none">
                    After
                  </span>
                </div>

                {/* BEFORE (clipped — top layer) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderX}%` }}
                >
                  <Image
                    src="/images/aging.png"
                    alt="Before — aging skin"
                    fill
                    className="object-contain"
                    style={{
                      minWidth: sliderContainerRef.current?.offsetWidth ?? 400,
                    }}
                    draggable={false}
                  />
                  {/* Before label */}
                  <span className="absolute bottom-5 left-4 text-xs font-semibold text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full select-none">
                    Before
                  </span>
                </div>

                {/* Divider line */}
                <div
                  className="absolute top-0 bottom-0 z-10 flex flex-col items-center pointer-events-none"
                  style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
                >
                  <div className="w-[2px] h-full bg-white/80 shadow-lg" />
                </div>

                {/* Drag handle */}
                <div
                  className="absolute top-1/2 z-20 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                  style={{
                    left: `${sliderX}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M5 8L2 5.5M2 5.5L5 3M2 5.5H6"
                        stroke="#1a1a2e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11 8L14 5.5M14 5.5L11 3M14 5.5H10"
                        stroke="#1a1a2e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end grid */}

          <p className="mt-7 text-xs text-[#8888aa]">
            Results may vary. Individual skin improvement depends on consistent
            use and skin type.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Arc progress SVG ──────────────────────────────────────────────────────
function ArcProgress({ percent }: { percent: number }) {
  const r = 18;
  const cx = 22;
  const cy = 22;
  const startAngle = -210;
  const sweepAngle = 240;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const arcX = (angle: number) => cx + r * Math.cos(toRad(angle));
  const arcY = (angle: number) => cy + r * Math.sin(toRad(angle));

  const endAngle = startAngle + (sweepAngle * percent) / 100;
  const largeArc = (sweepAngle * percent) / 100 > 180 ? 1 : 0;

  const trackEnd = startAngle + sweepAngle;

  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      {/* Track */}
      <path
        d={`M ${arcX(startAngle)} ${arcY(startAngle)} A ${r} ${r} 0 1 1 ${arcX(trackEnd)} ${arcY(trackEnd)}`}
        fill="none"
        stroke="#e8e8f4"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Progress */}
      <path
        d={`M ${arcX(startAngle)} ${arcY(startAngle)} A ${r} ${r} 0 ${largeArc} 1 ${arcX(endAngle)} ${arcY(endAngle)}`}
        fill="none"
        stroke="#6b6baa"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
