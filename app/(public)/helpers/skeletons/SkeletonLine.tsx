// Single-line/block shimmer primitive reused by every section skeleton
// below — a text line, a button pill, an image block, etc. are all just
// this with a different width/height/rounded value.
export default function SkeletonLine({
  className = "",
  rounded = "rounded-md",
}: {
  className?: string;
  rounded?: string;
}) {
  return <div className={`bg-[#16241a]/10 animate-pulse ${rounded} ${className}`} />;
}
