"use client";

import { useGetPublicSettingsQuery } from "./userApi";
import { isApiConfigured } from "@/lib/api";

export const DEFAULT_USD_TO_NGN_RATE = 1600;
export const DEFAULT_SUBSCRIPTION_DISCOUNT_PERCENT = 15;
export const DEFAULT_SUBSCRIPTION_B_3_MONTH_PERCENT = 10;
export const DEFAULT_SUBSCRIPTION_B_6_MONTH_PERCENT = 15;
export const DEFAULT_SUBSCRIPTION_B_12_MONTH_PERCENT = 20;

// Same hardcoded-default-with-backend-override shape as useSectionContent —
// these are operational numbers (FX rate, subscription discounts), not
// marketing content, but the fallback philosophy is identical.
export function useSettings() {
  const { data } = useGetPublicSettingsQuery(undefined, { skip: !isApiConfigured() });
  return {
    usdToNgnRate: data?.settings.usdToNgnRate ?? DEFAULT_USD_TO_NGN_RATE,
    subscriptionDiscountPercent:
      data?.settings.subscriptionDiscountPercent ?? DEFAULT_SUBSCRIPTION_DISCOUNT_PERCENT,
    subscriptionB3MonthPercent:
      data?.settings.subscriptionB3MonthPercent ?? DEFAULT_SUBSCRIPTION_B_3_MONTH_PERCENT,
    subscriptionB6MonthPercent:
      data?.settings.subscriptionB6MonthPercent ?? DEFAULT_SUBSCRIPTION_B_6_MONTH_PERCENT,
    subscriptionB12MonthPercent:
      data?.settings.subscriptionB12MonthPercent ?? DEFAULT_SUBSCRIPTION_B_12_MONTH_PERCENT,
    subscriptionBFulfillmentMode: data?.settings.subscriptionBFulfillmentMode ?? "immediate",
  };
}
