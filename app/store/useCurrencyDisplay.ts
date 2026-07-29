"use client";

import { useUserAuth } from "./useUserAuth";
import { useSettings } from "./useSettings";

// Every price everywhere in this app is stored/computed in Naira — the
// admin's real price list and what Paystack actually charges — so this is
// the one place that decides how to *display* it: Nigeria-based accounts
// (and signed-out visitors, since we can't know their location without an
// account) see the raw Naira figure; everyone else sees it converted to
// USD at the admin-editable rate. Orders are still always charged in NGN
// via Paystack regardless (see orders.service.ts) — this only affects
// what's shown on screen before checkout.
export function useCurrencyDisplay() {
  const { user } = useUserAuth();
  const { usdToNgnRate } = useSettings();
  // Naira is the default — a signed-out visitor or a signed-in account with
  // no country on file has given no *positive* evidence of being anywhere
  // else, so they get the business's real currency. USD only kicks in once
  // an account's country is confirmed to be something other than Nigeria.
  const isNaira = !user?.country || user.country === "NG";

  const format = (ngn: number) => {
    if (isNaira) {
      return `₦${Math.round(ngn).toLocaleString()}`;
    }
    return `$${(ngn / usdToNgnRate).toFixed(2)}`;
  };

  return { format, isNaira, usdToNgnRate };
}
