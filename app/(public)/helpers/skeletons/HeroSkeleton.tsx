import SkeletonLine from "./SkeletonLine";

// Matches HeroBanner.tsx: full-bleed dark section, content bottom-aligned.
export default function HeroSkeleton() {
  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col justify-end max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24">
      <SkeletonLine className="h-3 w-40 mb-6 bg-white/15" />
      <SkeletonLine className="h-10 sm:h-14 w-2/3 max-w-lg mb-3 bg-white/15" />
      <SkeletonLine className="h-10 sm:h-14 w-1/2 max-w-md mb-6 bg-white/15" />
      <SkeletonLine className="h-4 w-full max-w-md mb-2 bg-white/10" />
      <SkeletonLine className="h-4 w-2/3 max-w-sm mb-8 bg-white/10" />
      <div className="flex items-center gap-3">
        <SkeletonLine className="h-12 w-32 rounded-full bg-white/15" />
        <SkeletonLine className="h-12 w-32 rounded-full bg-white/10" />
      </div>
    </div>
  );
}
