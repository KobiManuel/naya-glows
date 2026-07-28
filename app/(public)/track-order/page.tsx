"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Package } from "lucide-react";
import GlassCard from "../helpers/glass/GlassCard";
import OrderTrackingTimeline from "../helpers/OrderTrackingTimeline";
import PageHeader from "../helpers/PageHeader";
import TrackingPulseIcon from "../helpers/TrackingPulseIcon";
import { useTrackOrderQuery } from "../../store/userApi";
import { getApiErrorMessage } from "../../store/apiError";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

const statusLabels: Record<string, string> = {
  PENDING: "Awaiting payment",
  PAID: "Paid",
  FAILED: "Payment failed",
  CANCELLED: "Cancelled",
};

function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState<{ id: string; email: string } | null>(null);
  const prefilled = useRef(false);

  // Coming from the payment-success screen with ?id=&email= — prefill the
  // fields and run the lookup immediately so the order shows up right away.
  useEffect(() => {
    if (prefilled.current) return;
    prefilled.current = true;
    const idParam = searchParams.get("id");
    const emailParam = searchParams.get("email");
    if (idParam) setOrderId(idParam);
    if (emailParam) setEmail(emailParam);
    if (idParam && emailParam) {
      setSubmittedQuery({ id: idParam.trim(), email: emailParam.trim() });
    }
  }, [searchParams]);

  const { data, error, isFetching } = useTrackOrderQuery(submittedQuery ?? { id: "", email: "" }, {
    skip: !submittedQuery,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Read straight from the form's actual DOM values (not just React state)
    // — some browsers' autofill fills the input visually without firing a
    // React change event, which previously left `email`/`orderId` state
    // empty even though the field looked filled in.
    const formData = new FormData(e.currentTarget);
    const idValue = String(formData.get("orderId") ?? orderId).trim();
    const emailValue = String(formData.get("email") ?? email).trim();
    setOrderId(idValue);
    setEmail(emailValue);
    setSubmittedQuery({ id: idValue, email: emailValue });
  };

  return (
    <>
      <GlassCard className="px-4 py-6 sm:p-8 mb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            required
            name="orderId"
            placeholder="e.g. cm2x9f8a10000ab12cd34ef56"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className={`${inputClass} sm:col-span-2`}
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={isFetching}
            className="sm:col-span-3 mt-1 bg-[#16241a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
          >
            {isFetching ? "Looking up…" : "Track Order"}
          </button>
        </form>
      </GlassCard>

      {submittedQuery && error && (
        <GlassCard className="px-5 py-8 text-center">
          <p className="text-sm text-[#c0574c]">
            {getApiErrorMessage(error, "We couldn't find a matching order.")}
          </p>
        </GlassCard>
      )}

      {data && (
        <GlassCard className="px-4 py-6 sm:p-10">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
                <Package size={16} className="text-[#6a9a72]" />
              </div>
              <div>
                <p className="text-xs text-[#16241a]/45">Order #{data.order.id}</p>
                <p className="text-sm font-semibold">
                  {statusLabels[data.order.status] ?? data.order.status}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold">
              {data.order.currency} {data.order.total.toLocaleString()}
            </p>
          </div>

          {data.order.status === "PAID" ? (
            <OrderTrackingTimeline
              stages={data.tracking.stages}
              currentStage={data.tracking.currentStage}
              estimatedDelivery={data.tracking.estimatedDelivery}
            />
          ) : (
            <p className="text-sm text-[#16241a]/50 text-center py-6">
              Tracking begins once payment is confirmed.
            </p>
          )}
        </GlassCard>
      )}
    </>
  );
}

export default function TrackOrderPage() {
  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[760px] mx-auto">
          <PageHeader
            eyebrow="Order Status"
            heading="Track Your Order"
            subtitle="Enter your order ID and the email you checked out with."
            accent={<TrackingPulseIcon />}
            images={[
              {
                src: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381950/naya-glows/legacy/new/img_7566.jpg",
                alt: "Naya Glows order",
                afterWord: 0,
              },
            ]}
            className="mb-10"
          />

          <Suspense fallback={null}>
            <TrackOrderForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
