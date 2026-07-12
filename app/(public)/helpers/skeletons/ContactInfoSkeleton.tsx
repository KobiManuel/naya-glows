import SkeletonLine from "./SkeletonLine";

// Matches the 3 ContactRow lines on the Contact page (icon + label + value).
export default function ContactInfoSkeleton() {
  return (
    <div className="w-full">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-4 border-b border-[#1c1410]/10">
          <div className="flex items-center gap-3">
            <SkeletonLine className="w-4 h-4 rounded" />
            <SkeletonLine className="h-2.5 w-16" />
          </div>
          <SkeletonLine className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}
