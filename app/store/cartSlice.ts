"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/lib/products";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useSettings } from "./useSettings";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  isSubscription: boolean;
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addItem(
      state,
      action: PayloadAction<{ product: Product; qty: number; isSubscription?: boolean }>,
    ) {
      const { product, qty, isSubscription = false } = action.payload;
      const existing = state.items.find((i) => i.slug === product.slug);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
          isSubscription,
        });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.slug !== action.payload);
    },
    updateQty(state, action: PayloadAction<{ slug: string; qty: number }>) {
      const { slug, qty } = action.payload;
      if (qty < 1) {
        state.items = state.items.filter((i) => i.slug !== slug);
        return;
      }
      const item = state.items.find((i) => i.slug === slug);
      if (item) item.qty = qty;
    },
    toggleSubscription(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.slug === action.payload);
      if (item) item.isSubscription = !item.isSubscription;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  hydrate,
  addItem: addItemAction,
  removeItem: removeItemAction,
  updateQty: updateQtyAction,
  toggleSubscription: toggleSubscriptionAction,
  clearCart: clearCartAction,
} = cartSlice.actions;

export default cartSlice.reducer;

export const CART_STORAGE_KEY = "naya-glows-cart";

// Mirrors the server-side discount in
// backend/src/modules/orders/orders.service.ts (which reads the same
// admin-configurable Setting) — the client only ever shows a *preview* of
// what will be charged; the actual order total is always recomputed
// server-side from the real price and the same Setting.
export function itemUnitPrice(
  item: Pick<CartItem, "price" | "isSubscription">,
  discountPercent: number,
) {
  return item.isSubscription ? item.price * (1 - discountPercent / 100) : item.price;
}

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const { subscriptionDiscountPercent } = useSettings();

  const addItem = (product: Product, qty = 1, isSubscription = false) =>
    dispatch(addItemAction({ product, qty, isSubscription }));
  const removeItem = (slug: string) => dispatch(removeItemAction(slug));
  const updateQty = (slug: string, qty: number) => dispatch(updateQtyAction({ slug, qty }));
  const toggleSubscription = (slug: string) => dispatch(toggleSubscriptionAction(slug));
  const clearCart = () => dispatch(clearCartAction());

  const subtotal = items.reduce(
    (sum, i) => sum + itemUnitPrice(i, subscriptionDiscountPercent) * i.qty,
    0,
  );
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQty,
    toggleSubscription,
    clearCart,
    subtotal,
    itemCount,
  };
}
