"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { hydrate as hydrateCart, CART_STORAGE_KEY } from "./cartSlice";
import { hydrateToken as hydrateUserToken, USER_TOKEN_KEY } from "./userAuthSlice";
import { hydrateToken as hydrateAdminToken, ADMIN_TOKEN_KEY } from "./adminAuthSlice";

// Reads persisted cart/session state from localStorage once on mount, then
// keeps the cart in sync on every change. Mounted once inside StoreProvider.
export default function StoreHydrator() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const cartHydratedRef = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) dispatch(hydrateCart(JSON.parse(raw)));
    } catch {
      // ignore malformed storage
    }
    dispatch(hydrateUserToken(localStorage.getItem(USER_TOKEN_KEY)));
    dispatch(hydrateAdminToken(localStorage.getItem(ADMIN_TOKEN_KEY)));
    cartHydratedRef.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (!cartHydratedRef.current) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return null;
}
