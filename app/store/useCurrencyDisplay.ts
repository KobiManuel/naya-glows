"use client";

import { useUserAuth } from "./useUserAuth";
import { useSettings } from "./useSettings";

// Every price everywhere in this app is stored/computed in USD — this is
// the one place that decides how to *display* it: Nigeria-based accounts
// (and signed-out visitors, since we can't know their location without an
// account) see Naira converted at the admin-editable rate; everyone else
// sees the raw USD figure. Orders are still always charged in NGN via
// Paystack regardless (see orders.service.ts) — this only affects what's
// shown on screen before checkout.
export function useCurrencyDisplay() {
  const { user } = useUserAuth();
  const { usdToNgnRate } = useSettings();
  const isNaira = user?.country === "NG";

  const format = (usd: number) => {
    if (isNaira) {
      return `₦${Math.round(usd * usdToNgnRate).toLocaleString()}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  return { format, isNaira, usdToNgnRate };
}
