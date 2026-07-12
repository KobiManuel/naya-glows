import SkeletonLine from "./SkeletonLine";

// Matches FaceBodySkin.tsx: fixed 3-column grid of tall image tiles.
// Reusable for any 3-tile image grid.
export default function CategoriesSkeleton() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-0">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="relative h-[380px] sm:h-[440px] md:h-[580px] lg:h-[640px]">
          <SkeletonLine className="absolute inset-0 rounded-none" />
          <SkeletonLine className="absolute bottom-7 left-7 h-11 w-32 rounded-full bg-white/50" />
        </div>
      ))}
    </div>
  );
}
