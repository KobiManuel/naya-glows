"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, ChevronDown, X } from "lucide-react";

const products = [
  {
    category: "Face Serums",
    accent: "Boost & Correct",
    items: [
      {
        name: "Radiance Boost Serum",
        description: "Brighten & hydrate with Niacinamide",
        image: "/images/ECA30FF9-62EA-4126-8301-03D590C8250D.png",
        href: "/products/radiance-boost-serum",
      },
      {
        name: "Acne Correcting Serum",
        description: "Fade marks with Alpha Arbutin",
        image: "/images/IMG_6205.JPG",
        href: "/products/acne-correcting-serum",
      },
      {
        name: "Age Renewal Serum",
        description: "Renew with Azelaic Acid",
        image: "/images/08D216CC-1441-4068-996E-ED7D64A65701.png",
        href: "/products/age-renewal-serum",
      },
    ],
  },
  {
    category: "Face Creams",
    accent: "Renew & Correct",
    items: [
      {
        name: "Radiance Renewal Face Cream",
        description: "Deep hydration & renewal",
        image: "/images/B49340AE-6FE1-47F6-BE61-8EAC75C0CCBF.png",
        href: "/products/radiance-renewal-face-cream",
      },
      {
        name: "Pigment Corrector Cream",
        description: "Target hyperpigmentation",
        image: "/images/42CBFE95-D2A7-4D13-8A5E-72E62DCF1792.png",
        href: "/products/pigment-corrector-face-cream",
      },
      {
        name: "Radiance Barrier Face Oil",
        description: "Squalane & Argan Oil blend",
        image: "/images/9CB3AAE2-D6B9-4D9D-8A24-E679C00C2705.png",
        href: "/products/radiance-barrier-face-oil",
      },
    ],
  },
  {
    category: "Cleanse & Tone",
    accent: "Purify & Balance",
    items: [
      {
        name: "Clarifying Foam Cleanser",
        description: "Salicylic Acid pore cleanser",
        image: "/images/432E42AB-30FD-4531-815A-E4ECE090058B.png",
        href: "/products/clarifying-foam-cleanser",
      },
      {
        name: "Clarifying Black Soap",
        description: "African Black Soap deep cleanse",
        image: "/images/5D4E84FB-2A40-4B0C-AE19-62D695738A31.png",
        href: "/products/clarifying-black-soap",
      },
      {
        name: "Radiance Balance Toner",
        description: "Balance & refine pores",
        image: "/images/056BF54D-5022-45A9-861D-FA2A3620F4A3.png",
        href: "/products/radiance-balance-toner",
      },
    ],
  },
  {
    category: "Body Care",
    accent: "Glow & Nourish",
    items: [
      {
        name: "Exfoliating Body Scrub",
        description: "Kojic Acid & Lemon brightening",
        image: "/images/19EA7A51-ADB2-4A49-BCB7-0BBC0116F4F2.png",
        href: "/products/exfoliating-body-scrub",
      },
      {
        name: "Purifying Body Wash",
        description: "Kaolin Clay daily cleanser",
        image: "/images/2999B980-D234-482D-9E97-982F1BF1579A.png",
        href: "/products/purifying-body-wash",
      },
      {
        name: "Radiance Repair Body Lotion",
        description: "Tranexamic Acid & Vitamin C",
        image: "/images/5BBE98AC-B9A9-40AA-95A1-AD2F9D7A2CE6.png",
        href: "/products/radiance-repair-body-lotion",
      },
      {
        name: "Luminous Glow Body Oil",
        description: "Argan & Sweet Almond Oil",
        image: "/images/0323D23A-ED8D-4AB5-8F52-B8A8EB31E04F.png",
        href: "/products/luminous-glow-body-oil",
      },
    ],
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Catalog", href: "/catalog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Reset dropdown on every route change (fixes hover bug after navigation)
  useEffect(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="w-full bg-[#1a1a1a] text-white text-center text-xs tracking-[0.18em] uppercase py-2 font-light">
        Free shipping on orders over $75 &nbsp;·&nbsp; Use code{" "}
        <span className="font-medium">GLOW15</span> for 15% off your first order
      </div>

      {/* Navbar */}
      <nav className="w-full fixed top-7 left-0 z-50 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center h-[72px] gap-4">
            {/* LEFT: Logo in white circle + All Products trigger */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Logo in white circular container */}
              <Link
                href="/"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200"
              >
                <Image
                  src="/images/naya-logo.png"
                  alt="Naya Glows"
                  width={28}
                  height={28}
                  className="object-contain"
                  priority
                />
              </Link>

              {/* All Products trigger */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1.5 text-black text-sm tracking-wide font-medium cursor-pointer">
                  <span className="border border-white/30 rounded-full px-4 py-1.5 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200">
                    All Products
                    <motion.span
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  </span>
                </button>
              </div>
            </div>

            {/* CENTER: Nav links in glass pill */}
            <div className="flex-1 flex justify-center">
              <div className="hidden lg:flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-black/85 hover:text-black text-sm tracking-wide transition-colors duration-150 px-3 py-1 rounded-full hover:bg-white/15"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: Icons in white circles + Sign In */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1a1a1a] hover:scale-105 transition-transform duration-200 shadow-sm"
              >
                {searchOpen ? <X size={16} /> : <Search size={16} />}
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1a1a1a] hover:scale-105 transition-transform duration-200 shadow-sm"
              >
                <User size={16} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1a1a1a] hover:scale-105 transition-transform duration-200 shadow-sm"
              >
                <ShoppingBag size={16} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a87c] text-black text-[9px] font-semibold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Sign In */}
              <Link
                href="/signin"
                className="ml-1 text-sm font-medium bg-white text-[#1a1a1a] px-4 py-2 rounded-full hover:bg-white/90 transition-colors tracking-wide shadow-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-white/95 rounded-2xl  w-[80%] mx-auto backdrop-blur-md border-t border-black/5 shadow-2xl">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
                  {/* Explore label */}
                  <p className="text-[11px] uppercase tracking-[0.2em] text-black/40 font-medium mb-8">
                    Explore
                  </p>

                  <div className="grid grid-cols-4 gap-10">
                    {products.map((group) => (
                      <div key={group.category}>
                        {/* Category header */}
                        <p className="text-[11px] tracking-[0.15em] uppercase text-black/40 mb-1">
                          {group.category}
                        </p>
                        <p className="text-base font-semibold text-black mb-5 leading-tight">
                          {group.accent}
                        </p>

                        <div className="flex flex-col gap-4">
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-3 group"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <div className="w-12 h-12 rounded-xl bg-[#f5f0ea] flex-shrink-0 overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-black group-hover:text-[#c9a87c] transition-colors leading-tight">
                                  {item.name}
                                </p>
                                <p className="text-xs text-black/45 mt-0.5 leading-snug">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-10 pt-6 border-t border-black/8 flex items-center justify-between">
                    <p className="text-xs text-black/40 tracking-wide">
                      Discover your perfect glow routine
                    </p>
                    <Link
                      href="/catalog"
                      className="text-xs font-semibold text-black tracking-[0.1em] uppercase border border-black/20 px-5 py-2 rounded-full hover:bg-black hover:text-black transition-all duration-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Shop All Products →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-md px-6 lg:px-12 py-4 max-w-[1400px] mx-auto">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for serums, cleansers, body care…"
                  className="w-full bg-transparent text-black placeholder:text-black/30 text-lg font-light border-b border-black/15 pb-3 outline-none focus:border-black/40 transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
