"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, Rocket, MessageCircleHeart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: FlaskConical,
        title: "Clinically Proven Formulas",
        description: "Backed by science and dermatology, every product is tested for visible results.",
    },
    {
        icon: Rocket,
        title: "Fast, Visible Results",
        description: "From clearer skin to smoother texture — most users notice changes within 2–4 weeks.",
    },
    {
        icon: MessageCircleHeart,
        title: "Personalized Support",
        description: "Expert guidance and easy online consultation to help you achieve your skincare goals.",
    },
];

export default function WhyChooseSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const floatCard1Ref = useRef<HTMLDivElement>(null);
    const floatCard2Ref = useRef<HTMLDivElement>(null);
    const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const anim = (el: Element | null, from: gsap.TweenVars, delay = 0) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 40, ...from },
                    {
                        opacity: 1, y: 0, x: 0, scale: 1,
                        duration: 0.85, delay,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            end: "top 25%",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            };

            anim(headingRef.current, { x: -30 });
            anim(ctaRef.current, { x: 30 }, 0.1);
            anim(imageRef.current, { scale: 0.92 }, 0.15);
            anim(floatCard1Ref.current, { x: -30, y: 20 }, 0.35);
            anim(floatCard2Ref.current, { x: 30, y: 20 }, 0.45);

            featureRefs.current.forEach((el, i) => {
                anim(el, { y: 40 }, 0.5 + i * 0.1);
            });

            // Continuous gentle float on the two stat cards
            gsap.to(floatCard1Ref.current, {
                y: "-=8",
                duration: 2.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });
            gsap.to(floatCard2Ref.current, {
                y: "-=6",
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 0.4,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-20" style={{
            background:
                "linear-gradient(180deg, #ebf6ff 0%, #e3e8f8 45%, #dde7f7 100%)",
        }}>
            <div className="w-[70%] max-w-[1440px] mx-auto max-[1275px]:w-full">
                <div
                    className=" overflow-hidden relative"

                >
                    {/* ── Top bar: heading + CTAs ───────────────────────────────── */}
                    <div className="relative z-20 flex items-start justify-between gap-6 p-8 sm:p-10 lg:p-14 flex-wrap">
                        <div ref={headingRef}>
                            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-semibold text-[#1a1a2e] tracking-tight leading-[1.05]">
                                Why Choose
                            </h2>
                            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-semibold text-[#1a1a2e] tracking-tight leading-[1.05]">
                                Naya?
                            </h2>
                        </div>

                        <div ref={ctaRef} className="flex items-center gap-3 flex-wrap">
                            <button className="flex items-center gap-2 bg-[#1a1a2e] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#2d2d4a] transition-colors">
                                Get Started
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            </button>
                            <button className="text-sm font-semibold text-white hover:text-black bg-[#9bb6d5] backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white transition-colors">
                                Online consultation
                            </button>
                        </div>
                    </div>

                    {/* ── Main image + floating stat cards ──────────────────────── */}
                    <div className="relative h-[420px] sm:h-[480px] lg:h-[560px] flex items-end justify-center">

                        {/* Portrait image — centered, takes the full vertical space */}
                        <div
                            ref={imageRef}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-full max-w-[520px] z-10"
                        >
                            <Image
                                src="/images/youthful2.png"
                                alt="Naya radiant skin"
                                fill
                                className="object-contain object-bottom"
                                priority
                            />
                        </div>

                        {/* Floating stat card 1 — "Skin Clarity / 27% Improvements" */}
                        <div
                            ref={floatCard1Ref}
                            className="absolute left-[4%] top-[18%] sm:left-[8%] lg:left-[14%] z-20 w-[200px] sm:w-[230px] rounded-2xl p-4 shadow-lg"
                            style={{
                                background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, #9bb6d5 100%)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255,255,255,0.5)",
                            }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-md bg-white/70 flex items-center justify-center">
                                        {/* mini bar-chart icon */}
                                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                            <rect x="2" y="8" width="2.5" height="6" rx="0.5" fill="#1a1a2e" />
                                            <rect x="6.5" y="5" width="2.5" height="9" rx="0.5" fill="#1a1a2e" />
                                            <rect x="11" y="2" width="2.5" height="12" rx="0.5" fill="#1a1a2e" />
                                        </svg>
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#1a1a2e] tracking-wide">Skin Clarity</span>
                                </div>
                                <span className="text-[10px] font-semibold text-[#5a5a7a] bg-white/60 px-2 py-0.5 rounded-full">Fast result</span>
                            </div>
                            <p className="text-[11px] text-[#5a5a7a] mb-3 leading-snug">Improvements in 4 weeks</p>

                            {/* Mini wave SVG */}
                            <div className="relative h-10 mb-2">
                                <svg viewBox="0 0 200 40" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <path
                                        d="M 0 28 Q 30 8, 60 22 T 120 18 T 200 14"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        opacity="0.85"
                                    />
                                    {/* Dot on the curve */}
                                    <circle cx="140" cy="16" r="3" fill="#ffffff" />
                                    <circle cx="140" cy="16" r="5" fill="#ffffff" opacity="0.3" />
                                </svg>
                            </div>

                            <div className="flex items-end justify-between">
                                <span className="text-2xl font-semibold text-[#1a1a2e]">27%</span>
                                <span className="w-6 h-6 rounded-full bg-white/60 flex items-center justify-center">
                                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 14V2M8 2L3 7M8 2L13 7" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 8 8)" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Floating stat card 2 — "23+ Trusted by thousands" */}
                        <div
                            ref={floatCard2Ref}
                            className="absolute right-[4%] top-[42%] sm:right-[8%] lg:right-[14%] z-20 w-[170px] sm:w-[190px] rounded-2xl p-4 shadow-lg bg-white/90 backdrop-blur-sm"
                            style={{ border: "1px solid rgba(255,255,255,0.8)" }}
                        >
                            <p className="text-xl font-semibold text-[#1a1a2e] mb-0.5">23+</p>
                            <p className="text-[11px] text-[#5a5a7a] font-medium mb-3">Trusted by thousands</p>
                            <div className="flex items-center">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                                        style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 4 - i }}
                                    >
                                        <Image
                                            src="/images/youthful.png"
                                            alt="user"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                                <div
                                    className="relative w-7 h-7 rounded-full border-2 border-white bg-[#1a1a2e] flex items-center justify-center"
                                    style={{ marginLeft: -8 }}
                                >
                                    <span className="text-[8px] font-bold text-white">+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Glass feature cards at the bottom ─────────────────────── */}
                    <div
                        className="relative z-30 grid grid-cols-1 sm:grid-cols-3 gap-6 backdrop-blur-md px-8"
                    // style={{
                    //     background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, #d2deee 100%)",
                    //     borderTop: "1px solid rgba(255,255,255,0.3)",
                    // }}
                    >
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    ref={(el) => { featureRefs.current[i] = el; }}
                                    className="relative p-6 sm:p-7 lg:p-8 group bg-[#d2deee] rounded-xl transition-colors duration-300"
                                    style={{
                                        borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.25)" : "none",
                                    }}
                                >
                                    <div className="w-9 h-9 rounded-full bg-white backdrop-blur-sm border border-white/30 flex items-center justify-center mb-4">
                                        <Icon size={18} strokeWidth={1.75} className="text-[#d2deee]" />
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2 tracking-tight drop-shadow-sm">
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs text-white/85 leading-relaxed max-w-[260px] drop-shadow-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}