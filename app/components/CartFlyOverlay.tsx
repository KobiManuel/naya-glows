"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CART_FLY_EVENT, notifyCartLanded } from "../store/cartFlyBus";

type FlyItem = {
  id: number;
  imageSrc: string;
  from: { left: number; top: number; width: number; height: number };
  to: { left: number; top: number; width: number; height: number };
};

let counter = 0;

// Mounted once at the root. Listens for CART_FLY_EVENT (fired by any
// "Add to Cart" button) and animates a cloned product thumbnail from that
// button's position to the Navbar cart icon (found via [data-cart-icon]),
// shrinking and fading as it lands — then pings the Navbar to glow.
export default function CartFlyOverlay() {
  const [items, setItems] = useState<FlyItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { imageSrc, rect } = (e as CustomEvent<{ imageSrc: string; rect: DOMRect }>).detail;
      const cartEl = document.querySelector("[data-cart-icon]");
      if (!cartEl) return;
      const to = cartEl.getBoundingClientRect();
      const id = ++counter;
      setItems((prev) => [
        ...prev,
        {
          id,
          imageSrc,
          from: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
          to: { left: to.left, top: to.top, width: to.width, height: to.height },
        },
      ]);
    };
    window.addEventListener(CART_FLY_EVENT, handler);
    return () => window.removeEventListener(CART_FLY_EVENT, handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <motion.img
            key={item.id}
            src={item.imageSrc}
            alt=""
            initial={{
              left: item.from.left,
              top: item.from.top,
              width: item.from.width,
              height: item.from.height,
              opacity: 1,
              borderRadius: 14,
            }}
            animate={{
              left: item.to.left + item.to.width / 2 - 10,
              top: item.to.top + item.to.height / 2 - 10,
              width: 20,
              height: 20,
              opacity: 0.4,
              borderRadius: 999,
            }}
            transition={{ duration: 0.65, ease: [0.32, 0, 0.67, 0] }}
            onAnimationComplete={() => {
              notifyCartLanded();
              setItems((prev) => prev.filter((i) => i.id !== item.id));
            }}
            className="fixed object-cover shadow-lg"
            style={{ position: "fixed" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
