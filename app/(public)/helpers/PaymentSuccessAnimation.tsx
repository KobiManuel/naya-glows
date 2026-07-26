"use client";

import Lottie from "lottie-react";
import paymentSuccessAnimation from "@/lib/lottie/paymentSuccess.json";

export default function PaymentSuccessAnimation({ size = 96 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="mx-auto mb-6">
      <Lottie animationData={paymentSuccessAnimation} loop={false} />
    </div>
  );
}
