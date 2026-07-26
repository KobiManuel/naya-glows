"use client";

import Lottie from "lottie-react";
import { Package } from "lucide-react";
import pulseRingAnimation from "@/lib/lottie/pulseRing.json";

export default function TrackingPulseIcon() {
  return (
    <div className="relative w-[72px] h-[72px] flex items-center justify-center">
      <div className="absolute inset-0">
        <Lottie animationData={pulseRingAnimation} loop />
      </div>
      <div className="relative w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
        <Package size={17} className="text-[#4f7957]" />
      </div>
    </div>
  );
}
