"use client";

import { type ReactNode } from "react";
import { X } from "lucide-react";

export default function AdminDetailModal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {subtitle && <p className="text-sm text-[#16241a]/50 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-[#16241a]/5 flex items-center justify-center hover:bg-[#16241a]/10 transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-[#16241a]/8 last:border-0">
      <span className="text-xs font-medium uppercase tracking-wide text-[#16241a]/45 flex-shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-right">{value}</span>
    </div>
  );
}
