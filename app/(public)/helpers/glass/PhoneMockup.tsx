import type { ReactNode } from "react";

export default function PhoneMockup({
  children,
  className = "",
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      {/* Bezel */}
      <div className="relative w-[240px] sm:w-[260px] aspect-[9/19] rounded-[2.6rem] bg-[#10160f] p-[10px] shadow-[0_30px_60px_-15px_rgba(16,22,15,0.45)] border border-white/10">
        {/* Screen */}
        <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-[#eafbf0]">
          {children}
        </div>
        {/* Notch */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-24 h-6 bg-[#10160f] rounded-b-2xl z-20" />
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-[#10160f] rounded-l-sm" />
        <div className="absolute -left-[2px] top-36 w-[3px] h-12 bg-[#10160f] rounded-l-sm" />
        <div className="absolute -right-[2px] top-28 w-[3px] h-14 bg-[#10160f] rounded-r-sm" />
      </div>
    </div>
  );
}
