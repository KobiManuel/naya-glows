import SkeletonLine from "./SkeletonLine";

// Simplified approximation of HeroIngredients.tsx's ring layout — a jar
// placeholder with 5 ingredient circles, rather than replicating the exact
// scroll-tied ring geometry (which is GSAP-driven, not CSS layout).
export default function IngredientsSkeleton() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#fdf8f3] gap-10">
      <div className="text-center">
        <SkeletonLine className="h-3 w-24 mx-auto mb-3" />
        <SkeletonLine className="h-8 w-48 mx-auto" />
      </div>
      <SkeletonLine className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-20">
            <SkeletonLine className="w-14 h-14 sm:w-16 sm:h-16 rounded-full" />
            <SkeletonLine className="h-2.5 w-14" />
            <SkeletonLine className="h-2 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
