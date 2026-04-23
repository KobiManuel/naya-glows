"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Benefit cards — 2 left, 2 right, mirroring the reference
const leftCards = [
    {
        title: "Balance & Refine",
        description: "Restores optimal skin pH for a clear, healthy complexion",
        icon: "◈",
    },
    {
        title: "Deeply Hydrate",
        description: "Locks in moisture and plumps skin with every application",
        icon: "◇",
    },
];

const rightCards = [
    {
        title: "Purify Pores",
        description: "Removes residual impurities and tightens visible pores",
        icon: "◈",
    },
    {
        title: "Boost Absorption",
        description: "Primes skin to absorb serums and treatments more effectively",
        icon: "◇",
    },
];

export default function ProductSpotlightSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const productRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // SVG line refs
    const svgRef = useRef<SVGSVGElement>(null);
    const lineRefs = useRef<(SVGLineElement | SVGPathElement | null)[]>([]);

    // Card refs
    const leftCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rightCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top 82%",
                    end: "top 20%",
                    toggleActions: "play reverse play reverse",
                },
            });

            // 1. Heading
            tl.fromTo(
                headingRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                0
            );
            tl.fromTo(
                subRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                0.1
            );

            // 2. Product image
            tl.fromTo(
                productRef.current,
                { opacity: 0, scale: 0.85, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.4)" },
                0.2
            );

            // 3. Lines materialise (strokeDashoffset → 0)
            lineRefs.current.forEach((el, i) => {
                if (!el) return;
                const length = (el as SVGGeometryElement).getTotalLength?.() ?? 200;
                gsap.set(el, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
                tl.to(
                    el,
                    {
                        strokeDashoffset: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: "power2.out",
                    },
                    0.55 + i * 0.08
                );
            });

            // 4. Cards appear
            [...leftCardRefs.current, ...rightCardRefs.current].forEach((el, i) => {
                if (!el) return;
                const isLeft = i < leftCards.length;
                tl.fromTo(
                    el,
                    { opacity: 0, x: isLeft ? -24 : 24, y: 10 },
                    { opacity: 1, x: 0, y: 0, duration: 0.45, ease: "power3.out" },
                    0.7 + i * 0.1
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const cardStyle: React.CSSProperties = {
        backgroundColor: "#d4e8d0",
        boxShadow: "4px 6px 0px 0px #b8d4b4, 8px 12px 0px 0px #a0c4a8",
    };

    return (
        <section ref={sectionRef} className="w-full bg-[#e8e8f4] py-20">
            <div className="w-[90%] mx-auto max-[1275px]:w-full">
                <div
                    ref={wrapperRef}
                    className="rounded-[2.5rem] p-8 sm:p-10 lg:p-14 shadow-sm max-[1275px]:rounded-none max-[800px]:px-4"
                    style={{ backgroundColor: "#e8f0e4" }}
                >
                    {/* ── Heading ─────────────────────────────────────────── */}
                    <div ref={headingRef} className="text-center mb-10 lg:mb-14">
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-[#1a1a2e] tracking-tight leading-tight">
                            Boost Your Confidence with
                        </h2>
                        <p className="text-3xl sm:text-4xl lg:text-[2.6rem] font-light tracking-tight leading-tight"
                            style={{ color: "#6a9a72" }}>
                            Radiance Balance Toner
                        </p>
                    </div>

                    {/* ── Main layout: cards + product + cards ────────────── */}
                    <div className="relative flex items-center justify-center gap-0 overflow-x-auto">

                        {/* LEFT CARDS */}
                        <div className="flex flex-col gap-5 z-10 flex-shrink-0" style={{ width: 160 }}>
                            {leftCards.map((card, i) => (
                                <div
                                    key={card.title}
                                    ref={(el) => { leftCardRefs.current[i] = el; }}
                                    className="rounded-2xl p-4"
                                    style={cardStyle}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-[#1a1a2e]">{card.title}</span>
                                        <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center text-[#6a9a72] text-xs flex-shrink-0">
                                            {card.icon}
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#4a6a4e] leading-relaxed">{card.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* CENTER: SVG lines + product image */}
                        <div className="relative flex items-center justify-center flex-shrink-0"
                            style={{ width: 340, height: 420 }}>

                            {/* Product image — behind lines */}
                            <div
                                ref={productRef}
                                className="absolute inset-0 z-0 flex items-center justify-center"
                            >
                                <Image
                                    src="/images/black-radiance.png"
                                    alt="Naya Radiance Balance Toner"
                                    width={220}
                                    height={380}
                                    className="object-contain drop-shadow-2xl"
                                    style={{ width: 220, height: 380 }}
                                    priority
                                />
                            </div>

                            {/* SVG connecting lines — absolutely on top of image */}
                            <svg
                                ref={svgRef}
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                style={{ zIndex: 10 }}
                                viewBox="0 0 340 420"
                                fill="none"
                            >
                                {/* Top-left: horizontal at y=140 (top card vertical center) */}
                                <line
                                    ref={(el) => { lineRefs.current[0] = el as SVGLineElement; }}
                                    x1="0" y1="140" x2="170" y2="140"
                                    stroke="#8ab88e" strokeWidth="1.5" strokeLinecap="round"
                                />
                                {/* Bottom-left: horizontal at y=280 (bottom card vertical center) */}
                                <line
                                    ref={(el) => { lineRefs.current[1] = el as SVGLineElement; }}
                                    x1="0" y1="280" x2="170" y2="280"
                                    stroke="#8ab88e" strokeWidth="1.5" strokeLinecap="round"
                                />
                                {/* Top-right: horizontal at y=140 */}
                                <line
                                    ref={(el) => { lineRefs.current[2] = el as SVGLineElement; }}
                                    x1="170" y1="140" x2="340" y2="140"
                                    stroke="#8ab88e" strokeWidth="1.5" strokeLinecap="round"
                                />
                                {/* Bottom-right: horizontal at y=280 */}
                                <line
                                    ref={(el) => { lineRefs.current[3] = el as SVGLineElement; }}
                                    x1="170" y1="280" x2="340" y2="280"
                                    stroke="#8ab88e" strokeWidth="1.5" strokeLinecap="round"
                                />

                                {/* Terminal dots at card ends */}
                                {[
                                    [0, 140], [0, 280], [340, 140], [340, 280],
                                ].map(([cx, cy], i) => (
                                    <circle key={i} cx={cx} cy={cy} r={4} fill="#8ab88e" opacity={0.7} />
                                ))}
                                {/* Center origin dot */}
                                <circle cx="170" cy="210" r="5" fill="#6a9a72" opacity={0.5} />
                            </svg>
                        </div>

                        {/* RIGHT CARDS */}
                        <div className="flex flex-col gap-5 z-10 flex-shrink-0" style={{ width: 160 }}>
                            {rightCards.map((card, i) => (
                                <div
                                    key={card.title}
                                    ref={(el) => { rightCardRefs.current[i] = el; }}
                                    className="rounded-2xl p-4"
                                    style={cardStyle}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-[#1a1a2e]">{card.title}</span>
                                        <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center text-[#6a9a72] text-xs flex-shrink-0">
                                            {card.icon}
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#4a6a4e] leading-relaxed">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Footer text ─────────────────────────────────────── */}
                    <p ref={subRef} className="text-center text-sm text-[#4a6a4e]/80 mt-10 max-w-md mx-auto leading-relaxed">
                        This formula revitalizes your skin for a clearer, healthier look.
                        Say goodbye to dullness and hello to vibrant, radiant skin!
                    </p>
                </div>
            </div>
        </section>
    );
}