import type { ReactNode, CSSProperties } from "react";

export default function GlassCard({
  children,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "article";
}) {
  return (
    <Tag
      className={`bg-white/55 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_32px_rgba(80,140,90,0.12)] ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
