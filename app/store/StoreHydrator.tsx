"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { hydrate as hydrateCart, CART_STORAGE_KEY } from "./cartSlice";
import { hydrateToken as hydrateUserToken, USER_TOKEN_KEY } from "./userAuthSlice";
import { hydrateToken as hydrateAdminToken, ADMIN_TOKEN_KEY } from "./adminAuthSlice";
import { useSyncCartMutation } from "./userApi";
import { isApiConfigured } from "@/lib/api";

// Reads persisted cart/session state from localStorage once on mount, then
// keeps the cart in sync on every change. Mounted once inside StoreProvider.
export default function StoreHydrator() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const token = useAppSelector((s) => s.userAuth.token);
  const cartHydratedRef = useRef(false);
  const [syncCart] = useSyncCartMutation();
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Mirrors the cart to the backend for signed-in customers only (guests
  // have nothing the backend could email a reminder to) — debounced so a
  // burst of quantity clicks doesn't fire a request per click.
  useEffect(() => {
    if (!cartHydratedRef.current || !token || !isApiConfigured()) return;
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      syncCart({ items: items.map((i) => ({ slug: i.slug, name: i.name, qty: i.qty })) }).catch(
        () => {
          // Best-effort — the cart itself lives fully in Redux/localStorage
          // regardless, this sync only feeds the abandoned-cart reminder.
        },
      );
    }, 1500);
    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, token]);

  return null;
}
