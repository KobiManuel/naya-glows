"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionContent, useSectionLoading } from "../../store/useSectionContent";
import { defaultIngredientsContent } from "@/lib/content/homeIngredients";
import IngredientsSkeleton from "./skeletons/IngredientsSkeleton";

gsap.registerPlugin(ScrollTrigger);

const RING_RADIUS = 420;

// -Math.PI / 2 puts index 0 at 12 o'clock (top).
// Adding Math.PI / 5 (36°) rotates the whole ring so items
// land at upper-left, lower-left, bottom, lower-right, upper-right —
// nothing at the top. Tuned specifically for 5 items — the ingredient
// list is fixed at 5 slots for this reason (see lib/content/homeIngredients.ts).
const ANGLE_OFFSET = -Math.PI / 2 + Math.PI / 5;

const getScale = () => {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w < 480) return 0.36;
  if (w < 640) return 0.46;
  if (w < 768) return 0.58;
  if (w < 1024) return 0.72;
  if (w < 1280) return 0.88;
  return 1;
};

export default function HeroIngredients() {
  const pathname = usePathname();
  const content = useSectionContent("home.ingredients", defaultIngredientsContent);
  const ingredients = content.ingredients;
  const isLoading = useSectionLoading("home.ingredients");

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const jarRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const ringItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const lemon0Ref = useRef<HTMLDivElement>(null);
  const lemon1Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Floating lemon idle animations ──────────────────────────────────
      gsap.to(lemon0Ref.current, {
        y: -22,
        rotation: 10,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(lemon1Ref.current, {
        y: 20,
        rotation: -12,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // ── SCROLL timeline ──────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1.2,
          pin: pathname === "/",
          anticipatePin: 1,
        },
      });

      const s = getScale();
      const r = RING_RADIUS * s;

      tl.to(bgTextRef.current, { opacity: 0, duration: 0.3 }, 0)
        .to(
          [lemon0Ref.current, lemon1Ref.current],
          {
            opacity: 0,
            scale: 0.7,
            duration: 0.3,
          },
          0,
        )
        .to(heroRef.current, { opacity: 0, duration: 0.25 }, 0.05)
        .to(
          jarRef.current,
          {
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            scale: 0.85,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.1,
        )
        .to(ingredientsRef.current, { opacity: 1, duration: 0.3 }, 0.35)
        .to(
          ringItemRefs.current.filter(Boolean),
          {
            opacity: 1,
            scale: 1,
            // ANGLE_OFFSET shifts all positions so none land at 12 o'clock
            x: (i) =>
              Math.cos((i / ingredients.length) * Math.PI * 2 + ANGLE_OFFSET) *
              r,
            y: (i) =>
              Math.sin((i / ingredients.length) * Math.PI * 2 + ANGLE_OFFSET) *
              r,
            stagger: 0.06,
            duration: 0.45,
            ease: "back.out(1.4)",
          },
          0.45,
        );
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    // 250vh = 100vh viewport + 150vh scroll travel (matches end: "+=150%")
    // Prevents section from appearing twice on scroll
    <div ref={containerRef} className="relative" style={{ height: "100vh" }}>
      {isLoading && (
        <div className="absolute inset-0 z-50">
          <IngredientsSkeleton />
        </div>
      )}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#fdf8f3]">
        {/* BG giant text */}
        <div
          ref={bgTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          aria-hidden
        >
          <span
            className="text-[10vw] font-black uppercase tracking-tighter leading-none text-[#e8ddd0] whitespace-nowrap"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            NAYA GLOWS
          </span>
        </div>

        {/* ── HERO CONTENT ─────────────────────────────────────────────────── */}
        <div ref={heroRef} className="hidden" />

        {/* ── LEMON 1 — bottom-left ─────────────────────────────────────────── */}
        <div
          ref={lemon0Ref}
          className="absolute z-10 pointer-events-none"
          style={{ bottom: "5%", left: "3%", transform: "rotate(-18deg)" }}
        >
          <Image
            src="/images/body-scrub-with-lemon-and-mint.png"
            alt="lemon decoration"
            width={280}
            height={280}
            className="object-contain drop-shadow-lg w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px]"
          />
        </div>

        {/* ── LEMON 2 — top-right ───────────────────────────────────────────── */}
        <div
          ref={lemon1Ref}
          className="absolute z-10 pointer-events-none"
          style={{ top: "3%", right: "2%", transform: "rotate(22deg)" }}
        >
          <Image
            src="/images/body-scrub-with-lemon-and-mint.png"
            alt="lemon decoration"
            width={260}
            height={260}
            className="object-contain drop-shadow-lg w-[150px] sm:w-[190px] md:w-[220px] lg:w-[260px]"
          />
        </div>

        {/* ── JAR — z-20, ring items emerge from behind it ─────────────────── */}
        <div
          ref={jarRef}
          className="absolute z-20"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            src="/images/naya-radiance-body-scrub-in-focu.png"
            alt="Naya Radiance Exfoliating Body Scrub"
            width={700}
            height={700}
            className="object-contain drop-shadow-2xl w-[200px] sm:w-[280px] md:w-[360px] lg:w-[430px] xl:w-[490px] xl:scale-75"
            priority
          />
        </div>

        {/* ── INGREDIENTS SECTION ───────────────────────────────────────────── */}
        <div
          ref={ingredientsRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 pointer-events-none"
        >
          {/* Heading */}
          <div className="absolute top-6 sm:top-12 left-0 right-0 text-center">
            <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#a0876a] mb-2 font-medium">
              {content.eyebrow}
            </p>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {content.heading}
            </h2>
          </div>

          {/* Orbit ring — hidden on mobile */}
          <div
            className="absolute rounded-full border border-dashed border-[#c9a87c]/30 hidden md:block"
            style={{
              width: RING_RADIUS * 2 + 160,
              height: RING_RADIUS * 2 + 160,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Ring items — z-10 (behind jar z-20) so they materialize from behind.
              Keyed by index (not name) so a content-swap updates text/image in
              place instead of remounting — remounting would drop the GSAP
              transforms already applied by the scroll timeline above. */}
          {ingredients.map((ing, i) => (
            <div
              key={i}
              ref={(el) => {
                ringItemRefs.current[i] = el;
              }}
              className="absolute flex flex-col items-center gap-1 sm:gap-3 opacity-0"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(0.3)",
                width: "clamp(88px, 11vw, 160px)",
              }}
            >
              <div
                className="rounded-full border-2 border-[#c9a87c]/40 bg-white/80 shadow-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                style={{
                  width: "clamp(70px, 9.5vw, 160px)",
                  height: "clamp(70px, 9.5vw, 160px)",
                }}
              >
                <Image
                  src={ing.image}
                  alt={ing.name}
                  width={64}
                  height={64}
                  className="object-contain w-[58%] h-[58%]"
                />
              </div>
              <div className="text-center">
                <p
                  className="font-semibold text-[#1a1a1a] leading-tight"
                  style={{ fontSize: "clamp(9px, 1.05vw, 14px)" }}
                >
                  {ing.name}
                </p>
                <p
                  className="text-[#5a4a3a]/60 leading-snug mt-1"
                  style={{ fontSize: "clamp(8px, 0.85vw, 12px)" }}
                >
                  {ing.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
