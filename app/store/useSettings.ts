"use client";

import { useGetPublicSettingsQuery } from "./userApi";
import { isApiConfigured } from "@/lib/api";

export const DEFAULT_USD_TO_NGN_RATE = 1600;
export const DEFAULT_SUBSCRIPTION_DISCOUNT_PERCENT = 15;

// Same hardcoded-default-with-backend-override shape as useSectionContent —
// these are operational numbers (FX rate, subscription discount), not
// marketing content, but the fallback philosophy is identical.
export function useSettings() {
  const { data } = useGetPublicSettingsQuery(undefined, { skip: !isApiConfigured() });
  return {
    usdToNgnRate: data?.settings.usdToNgnRate ?? DEFAULT_USD_TO_NGN_RATE,
    subscriptionDiscountPercent:
      data?.settings.subscriptionDiscountPercent ?? DEFAULT_SUBSCRIPTION_DISCOUNT_PERCENT,
  };
}
