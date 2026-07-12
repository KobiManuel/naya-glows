"use client";

import { motion } from "framer-motion";
import { Truck } from "lucide-react";

export type TrackingStage = { key: string; label: string; date: string; reached: boolean };

// Framer Motion (already a project dependency) animates a delivery-truck
// icon sliding along the stage rail — the same "watch your delivery move"
// effect a Lottie animation would give, without needing an external
// animation asset.
export default function OrderTrackingTimeline({
  stages,
  currentStage,
  estimatedDelivery,
}: {
  stages: TrackingStage[];
  currentStage: string | null;
  estimatedDelivery: string | null;
}) {
  const currentIndex = currentStage ? stages.findIndex((s) => s.key === currentStage) : -1;
  const truckPosition = ((currentIndex >= 0 ? currentIndex : 0) + 0.5) / stages.length;

  return (
    <div className="w-full">
      {estimatedDelivery && (
        <p className="text-center text-sm text-[#16241a]/60 mb-14">
          Estimated delivery:{" "}
          <span className="font-semibold text-[#16241a]">
            {new Date(estimatedDelivery).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      )}

      <div className="relative pt-8">
        <motion.div
          className="absolute -top-2 z-10"
          initial={false}
          animate={{ left: `${truckPosition * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transform: "translateX(-50%)" }}
        >
          <div className="w-9 h-9 rounded-full bg-[#16241a] flex items-center justify-center shadow-lg">
            <Truck size={16} className="text-white" />
          </div>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
          {stages.map((s, i) => (
            <div key={s.key} className="relative flex flex-col items-center px-1">
              {i < stages.length - 1 && (
                <div
                  className={`absolute top-2 left-1/2 w-full h-1 transition-colors duration-700 ${
                    i < currentIndex ? "bg-[#4f7957]" : "bg-[#d4e8d0]"
                  }`}
                />
              )}
              <div
                className={`relative z-10 w-4 h-4 rounded-full border-2 transition-colors duration-700 ${
                  s.reached ? "bg-[#4f7957] border-[#4f7957]" : "bg-white border-[#d4e8d0]"
                }`}
              />
              <p
                className={`mt-3 text-[10px] sm:text-[11px] text-center font-medium leading-tight ${
                  s.reached ? "text-[#16241a]" : "text-[#16241a]/40"
                }`}
              >
                {s.label}
              </p>
              {s.reached && (
                <p className="text-[9px] text-[#16241a]/40 mt-1">
                  {new Date(s.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
