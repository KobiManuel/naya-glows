import SkeletonLine from "./SkeletonLine";

// Matches WhyChooseUs.tsx: heading+CTAs row, portrait image with 2 floating
// stat cards, 3 feature cards along the bottom.
export default function WhyChooseSkeleton() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#e3e8f8" }}>
      <div className="flex items-start justify-between gap-6 p-8 sm:p-10 lg:p-14 flex-wrap">
        <div>
          <SkeletonLine className="h-8 w-40 mb-2" />
          <SkeletonLine className="h-8 w-28" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonLine className="h-11 w-32 rounded-full" />
          <SkeletonLine className="h-11 w-40 rounded-full" />
        </div>
      </div>

      <div className="relative flex-1 mx-8 rounded-2xl overflow-hidden min-h-[300px]">
        <SkeletonLine className="absolute inset-0 rounded-none" />
        <SkeletonLine className="absolute left-[8%] top-[18%] w-[200px] h-[150px] rounded-2xl bg-white/40" />
        <SkeletonLine className="absolute right-[8%] top-[42%] w-[170px] h-[100px] rounded-2xl bg-white/40" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-8 py-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 rounded-xl bg-white/30">
            <SkeletonLine className="w-9 h-9 rounded-full mb-4 bg-white/50" />
            <SkeletonLine className="h-3.5 w-2/3 mb-2 bg-white/50" />
            <SkeletonLine className="h-3 w-full bg-white/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
