"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [sliderX, setSliderX] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setSliderX(getPercent(e.clientX));
  };
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      setSliderX(getPercent(e.clientX));
    },
    [getPercent],
  );
  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setSliderX(getPercent(e.touches[0].clientX));
  };
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current) return;
      setSliderX(getPercent(e.touches[0].clientX));
    },
    [getPercent],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [onMouseMove, onMouseUp, onTouchMove]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      style={{ cursor: "col-resize" }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* AFTER — full, bottom layer */}
      <div className="absolute inset-0">
        <Image src={afterSrc} alt={afterLabel} fill className="object-cover" draggable={false} />
        <span className="absolute bottom-4 right-4 text-xs font-semibold text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full select-none">
          {afterLabel}
        </span>
      </div>

      {/* BEFORE — clipped, top layer. The inner wrapper is pinned to the
          container's full width (not the clipped width) so the image itself
          never resizes as the slider moves — only the visible slice does. */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderX}%` }}>
        <div className="absolute inset-0" style={{ width: containerRef.current?.offsetWidth ?? "100%" }}>
          <Image src={beforeSrc} alt={beforeLabel} fill className="object-cover" draggable={false} />
        </div>
        <span className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full select-none">
          {beforeLabel}
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-[2px] h-full bg-white/80 shadow-lg" />
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-1/2 z-20 -translate-y-1/2 pointer-events-none"
        style={{ left: `${sliderX}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M5 8L2 5.5M2 5.5L5 3M2 5.5H6"
              stroke="#1a1a2e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 8L14 5.5M14 5.5L11 3M14 5.5H10"
              stroke="#1a1a2e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
