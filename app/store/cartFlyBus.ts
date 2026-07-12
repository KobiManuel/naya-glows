// Tiny pub/sub over window CustomEvents for the "fly to cart" animation.
// This is transient UI state (an animation trigger), not real app data, so
// it deliberately lives outside Redux — the product card and the Navbar
// cart icon are in different component trees and don't otherwise share a
// DOM ancestor worth wiring a prop through.
export const CART_FLY_EVENT = "naya:cart-fly";
export const CART_LANDED_EVENT = "naya:cart-landed";

export function triggerCartFly(imageSrc: string, sourceEl: HTMLElement) {
  if (typeof window === "undefined") return;
  const rect = sourceEl.getBoundingClientRect();
  window.dispatchEvent(new CustomEvent(CART_FLY_EVENT, { detail: { imageSrc, rect } }));
}

export function notifyCartLanded() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CART_LANDED_EVENT));
}
