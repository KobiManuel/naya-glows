"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Shield, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ── Fade variants ──────────────────────────────────────────────────
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, delay: i * 0.1, ease: smoothEase },
    }),
};

// ── Marquee ────────────────────────────────────────────────────────
function MarqueeStrip() {
    const items = Array(10).fill("CONSULT WITH US");
    return (
        <div className="relative overflow-hidden bg-[#1c1410] py-3 border-y border-[#c9a97a]/20 select-none">
            <motion.div
                className="flex whitespace-nowrap gap-10"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
                {[...items, ...items].map((t, i) => (
                    <span key={i} className="text-[11px] tracking-[0.45em] font-medium text-[#c9a97a] uppercase flex items-center gap-5">
                        {t}
                        <span className="w-1 h-1 rounded-full bg-[#c9a97a]/50 inline-block" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// ── Room type pill ─────────────────────────────────────────────────
function SkinPill({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-5 py-2.5 rounded-full text-[0.8rem] tracking-[0.08em] border transition-all duration-300  ${active
                ? "bg-[#1c1410] text-white border-[#1c1410]"
                : "bg-transparent text-[#1c1410] border-[#1c1410]/30 hover:border-[#1c1410]"
                }`}
        >
            {label}
        </button>
    );
}

// ── Budget pill ────────────────────────────────────────────────────
function BudgetPill({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-5 py-2.5 rounded-full text-[0.8rem] tracking-[0.08em] border transition-all duration-300  ${active
                ? "bg-[#1c1410] text-[#c9a97a] border-[#1c1410]"
                : "bg-transparent text-[#1c1410] border-[#1c1410]/30 hover:border-[#1c1410]"
                }`}
        >
            {label}
        </button>
    );
}

// ── Underline input ────────────────────────────────────────────────
function UnderlineInput({
    placeholder,
    type = "text",
    className = "",
}: {
    placeholder: string;
    type?: string;
    className?: string;
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full bg-transparent border-b border-[#1c1410]/25 focus:border-[#c9a97a] outline-none py-3 text-[0.9rem] text-[#1c1410] placeholder:text-[#1c1410]/35  transition-colors duration-300 ${className}`}
        />
    );
}

// ── Contact info row ───────────────────────────────────────────────
function ContactRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-[#1c1410]/10 group">
            <div className="flex items-center gap-3 text-[#1c1410]/50">
                {icon}
                <span className="text-xs tracking-[0.25em] uppercase ">{label}</span>
            </div>
            <span className="text-[0.9rem] text-[#1c1410]/80  group-hover:text-[#c9a97a] transition-colors duration-300">
                {value}
            </span>
        </div>
    );
}

// ── Main page ──────────────────────────────────────────────────────
export default function ContactPage() {
    const [skinConcern, setSkinConcern] = useState("Brightening");
    const [budget, setBudget] = useState("$50 - $100 USD");
    const heroRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const inView = useInView(formRef, { once: true, margin: "-60px" });

    // GSAP: hero heading inline images
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".hero-img-pill",
                { opacity: 0, scale: 0.85, rotate: -6 },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "back.out(1.4)",
                    delay: 0.5,
                }
            );
            gsap.fromTo(
                ".hero-word",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    const skinConcerns = ["Brightening", "Hydration", "Anti-Aging", "Acne"];
    const budgets = ["Under $30 USD", "$50 - $100 USD", "$101 - $200 USD", "$200+"];

    return (
        <main
            className="bg-[#f5efe8] text-[#1c1410] overflow-x-hidden"
        >

            {/* ── HERO HEADING ───────────────────────────────────────── */}
            <section ref={heroRef} className="pt-16 pb-10 px-6 text-center max-w-4xl mx-auto">
                <h1
                    className="text-[clamp(3rem,8vw,6.5rem)] font-light leading-[1.1] tracking-tight"
                >
                    {/* Line 1 */}
                    <span className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        <span className="hero-word">Book</span>
                        <span className="hero-word">a</span>
                        {/* Inline pill image */}
                        <span className="hero-img-pill inline-block w-[120px] h-[56px] rounded-full overflow-hidden relative align-middle mx-1 border border-[#c9a97a]/30">
                            <Image
                                src="/images/img_6322.jpg"
                                alt="skin"
                                fill
                                className="object-cover object-center"
                            />
                        </span>
                        <span className="hero-word">Skin</span>
                    </span>

                    {/* Line 2 */}
                    <span className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-1">
                        <span className="hero-img-pill inline-block w-[90px] h-[56px] rounded-full overflow-hidden relative align-middle mx-1 border border-[#c9a97a]/30">
                            <Image
                                src="/images/naya-radiance-body-scrub-in-focu.png"
                                alt="product"
                                fill
                                className="object-cover"
                            />
                        </span>
                        <span className="hero-word">Consultation</span>
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.7 }}
                    className="mt-6 text-[1rem] text-[#3d2f25]/60  max-w-md mx-auto"
                >
                    Let us help you build a routine that truly works for your skin. No confusion, just clarity.
                </motion.p>
            </section>

            {/* ── MARQUEE ────────────────────────────────────────────── */}
            <MarqueeStrip />

            {/* ── IMAGE ROW ──────────────────────────────────────────── */}
            <section className="py-10 px-6">
                <div className="grid grid-cols-3 gap-2 max-w-4xl mx-auto">
                    {[
                        { src: "/images/img_6320.jpg", alt: "Glowing skin" },
                        { src: "/images/img_6325.jpg", alt: "Model portrait" },
                        { src: "/images/img_6323.jpg", alt: "Skincare routine" },
                    ].map(({ src, alt }, i) => (
                        <motion.div
                            key={src}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden rounded-sm"
                            style={{ height: "240px" }}
                        >
                            <Image src={src} alt={alt} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── MAIN FORM + IMAGE SPLIT ─────────────────────────────── */}
            <section className="px-6 py-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* Left: image with testimonial overlay */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-sm"
                    style={{ height: "620px" }}
                >
                    <Image
                        src="/images/youthful.png"
                        alt="Happy customer"
                        fill
                        className="object-cover object-top"
                    />
                    {/* Overlay card at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#1c1410]/90 backdrop-blur-sm p-7">
                        <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map(s => (
                                <svg key={s} className="w-3.5 h-3.5 fill-[#c9a97a]" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-white/85 text-[0.9rem]  leading-relaxed italic mb-5">
                            "Naya Glows completely transformed my skincare routine. My skin has never felt this balanced and radiant. The consultation helped me find exactly what I needed."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden relative flex-shrink-0 border border-[#c9a97a]/40">
                                <Image src="/images/img_6328.jpg" alt="Customer" fill className="object-cover" />
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium" >
                                    Amara Osei
                                </p>
                                <p className="text-[#c9a97a]/70 text-xs  tracking-wide">
                                    Customer, Lagos
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: form */}
                <motion.div
                    ref={formRef}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <motion.h2
                        variants={fadeUp}
                        custom={0}
                        className="text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-tight mb-2"
                    >
                        Get in Touch
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={1} className="text-[#3d2f25]/55 text-sm  mb-8">
                        Our team would love to hear from you.
                    </motion.p>

                    <form className="space-y-0" onSubmit={(e) => e.preventDefault()}>
                        {/* Name + Email row */}
                        <motion.div variants={fadeUp} custom={2} className="grid grid-cols-2 gap-6 mb-6">
                            <UnderlineInput placeholder="Full Name" />
                            <UnderlineInput placeholder="Email Address" type="email" />
                        </motion.div>

                        {/* Skin concern selector */}
                        <motion.div variants={fadeUp} custom={3} className="mb-6">
                            <p className="text-xs tracking-[0.3em] uppercase text-[#3d2f25]/45 mb-3 ">
                                Primary Skin Concern
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {skinConcerns.map((c) => (
                                    <SkinPill
                                        key={c}
                                        label={c}
                                        active={skinConcern === c}
                                        onClick={() => setSkinConcern(c)}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Budget selector */}
                        <motion.div variants={fadeUp} custom={4} className="mb-6">
                            <p className="text-xs tracking-[0.3em] uppercase text-[#3d2f25]/45 mb-3 ">
                                Monthly Skincare Budget
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {budgets.map((b) => (
                                    <BudgetPill
                                        key={b}
                                        label={b}
                                        active={budget === b}
                                        onClick={() => setBudget(b)}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Message */}
                        <motion.div variants={fadeUp} custom={5} className="mb-8">
                            <p className="text-xs tracking-[0.3em] uppercase text-[#3d2f25]/45 mb-2 ">
                                Your Message
                            </p>
                            <textarea
                                rows={3}
                                placeholder="Tell us about your skin goals..."
                                className="w-full bg-transparent border-b border-[#1c1410]/25 focus:border-[#c9a97a] outline-none py-3 text-[0.9rem] text-[#1c1410] placeholder:text-[#1c1410]/35  transition-colors duration-300 resize-none"
                            />
                        </motion.div>

                        {/* Submit */}
                        <motion.div variants={fadeUp} custom={6}>
                            <button
                                type="submit"
                                className="group flex items-center gap-3 border border-[#1c1410] text-[#1c1410] text-sm tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-[#1c1410] hover:text-white transition-all duration-300 "
                            >
                                Send Message
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </button>
                        </motion.div>
                    </form>

                    {/* ── Contact Details ──────────────────────────────── */}
                    <motion.div variants={fadeUp} custom={7} className="mt-14">
                        <h3
                            className="text-[clamp(1.8rem,3vw,2.5rem)] font-light mb-6"
                        >
                            Contact Us
                        </h3>
                        <ContactRow icon={<Mail className="w-4 h-4" />} label="Email" value="hello@nayaglows.com" />
                        <ContactRow icon={<Phone className="w-4 h-4" />} label="Number" value="+234 800 000 0000" />
                        <ContactRow icon={<MapPin className="w-4 h-4" />} label="Address" value="Lagos, Nigeria" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ── SOCIAL LINKS ───────────────────────────────────────── */}
            <section className="px-6 pb-16 max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-xs tracking-[0.4em] uppercase text-[#3d2f25]/40 mb-8 "
                >
                    Follow Our Journey
                </motion.p>
                <div className="flex flex-wrap justify-center gap-3">
                    {[
                        { label: "Instagram", icon: <Shield className="w-3.5 h-3.5" />, href: "#" },
                        { label: "YouTube", icon: <Shield className="w-3.5 h-3.5" />, href: "#" },
                        { label: "Facebook", icon: <Shield className="w-3.5 h-3.5" />, href: "#" },
                        { label: "TikTok", icon: <ArrowUpRight className="w-3.5 h-3.5" />, href: "#" },
                        { label: "Pinterest", icon: <ArrowUpRight className="w-3.5 h-3.5" />, href: "#" },
                    ].map(({ label, icon, href }, i) => (
                        <motion.a
                            key={label}
                            href={href}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1c1410]/20 text-[0.8rem] tracking-[0.1em] uppercase text-[#1c1410]/70  hover:bg-[#1c1410] hover:text-white hover:border-[#1c1410] transition-all duration-300"
                        >
                            {icon}
                            {label}
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* ── FOOTER BANNER ──────────────────────────────────────── */}
            <footer className="bg-[#1c1410] px-8 pt-10 pb-6">
                <div className="max-w-6xl mx-auto flex justify-between items-start text-[0.75rem] text-[#d4c5b4]/40  mb-8">
                    <p className="max-w-xs leading-relaxed">
                        We invite you to reach out for a personalised skincare consultation.
                    </p>
                    <p>Let's Stay Connected</p>
                    <p>© 2024 All Rights Reserved</p>
                </div>

                {/* Big display word */}
                <div className="overflow-hidden">
                    <h2
                        className="text-[clamp(4rem,14vw,11rem)] font-light text-white/10 leading-none tracking-tight select-none"
                        style={{ letterSpacing: "-0.02em" }}
                    >
                        CONTACT US
                    </h2>
                </div>
            </footer>
        </main>
    );
}