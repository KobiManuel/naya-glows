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
  variantName?: string;
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

// Two different sizes of the same product are separate cart lines, so a
// cart item's real identity is (slug, variantName) — not slug alone.
function sameLine(item: Pick<CartItem, "slug" | "variantName">, slug: string, variantName?: string) {
  return item.slug === slug && item.variantName === variantName;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addItem(
      state,
      action: PayloadAction<{
        product: Product;
        qty: number;
        isSubscription?: boolean;
        variantName?: string;
        variantPrice?: number;
      }>,
    ) {
      const { product, qty, isSubscription = false, variantName, variantPrice } = action.payload;
      const existing = state.items.find((i) => sameLine(i, product.slug, variantName));
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({
          slug: product.slug,
          name: product.name,
          price: variantPrice ?? product.price,
          image: product.image,
          qty,
          isSubscription,
          variantName,
        });
      }
    },
    removeItem(state, action: PayloadAction<{ slug: string; variantName?: string }>) {
      const { slug, variantName } = action.payload;
      state.items = state.items.filter((i) => !sameLine(i, slug, variantName));
    },
    updateQty(
      state,
      action: PayloadAction<{ slug: string; qty: number; variantName?: string }>,
    ) {
      const { slug, qty, variantName } = action.payload;
      if (qty < 1) {
        state.items = state.items.filter((i) => !sameLine(i, slug, variantName));
        return;
      }
      const item = state.items.find((i) => sameLine(i, slug, variantName));
      if (item) item.qty = qty;
    },
    toggleSubscription(state, action: PayloadAction<{ slug: string; variantName?: string }>) {
      const { slug, variantName } = action.payload;
      const item = state.items.find((i) => sameLine(i, slug, variantName));
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

  const addItem = (
    product: Product,
    qty = 1,
    isSubscription = false,
    variant?: { name: string; price: number },
  ) =>
    dispatch(
      addItemAction({
        product,
        qty,
        isSubscription,
        variantName: variant?.name,
        variantPrice: variant?.price,
      }),
    );
  const removeItem = (slug: string, variantName?: string) =>
    dispatch(removeItemAction({ slug, variantName }));
  const updateQty = (slug: string, qty: number, variantName?: string) =>
    dispatch(updateQtyAction({ slug, qty, variantName }));
  const toggleSubscription = (slug: string, variantName?: string) =>
    dispatch(toggleSubscriptionAction({ slug, variantName }));
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
