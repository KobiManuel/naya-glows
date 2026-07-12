"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useGetSettingsQuery, useUpdateSettingMutation } from "../../../store/adminApi";
import { getApiErrorMessage } from "../../../store/apiError";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-3.5 py-2.5 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useGetSettingsQuery();
  const [updateSetting, { isLoading: saving }] = useUpdateSettingMutation();
  const [usdToNgnRate, setUsdToNgnRate] = useState("");
  const [subscriptionDiscountPercent, setSubscriptionDiscountPercent] = useState("");

  useEffect(() => {
    if (!settings) return;
    setUsdToNgnRate(String(settings.usdToNgnRate));
    setSubscriptionDiscountPercent(String(settings.subscriptionDiscountPercent));
  }, [settings]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateSetting({ key: "usdToNgnRate", value: Number(usdToNgnRate) }).unwrap();
      await updateSetting({
        key: "subscriptionDiscountPercent",
        value: Number(subscriptionDiscountPercent),
      }).unwrap();
      toast.success("Settings saved.");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Couldn't save settings."));
    }
  };

  if (isLoading) {
    return <p className="text-sm text-[#16241a]/50">Loading…</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-light mb-1">Settings</h1>
      <p className="text-sm text-[#16241a]/50 mb-8 max-w-xl">
        Operational config — changes here affect what customers are charged on their next order.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 max-w-md flex flex-col gap-5"
      >
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[#16241a]/50 mb-2">
            USD → NGN Rate
          </label>
          <input
            type="number"
            step="1"
            min="1"
            required
            value={usdToNgnRate}
            onChange={(e) => setUsdToNgnRate(e.target.value)}
            className={inputClass}
          />
          <p className="text-xs text-[#16241a]/45 mt-1.5">
            Used to convert USD product prices to NGN at checkout (Paystack charges in NGN).
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[#16241a]/50 mb-2">
            Subscription Discount (%)
          </label>
          <input
            type="number"
            step="1"
            min="0"
            max="99"
            required
            value={subscriptionDiscountPercent}
            onChange={(e) => setSubscriptionDiscountPercent(e.target.value)}
            className={inputClass}
          />
          <p className="text-xs text-[#16241a]/45 mt-1.5">
            Applied to the &quot;Subscribe &amp; Save&quot; price on product pages and at checkout.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="self-start bg-[#16241a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
