import SkeletonLine from "./SkeletonLine";

// Matches HowItWorks.tsx: centered heading, 3 numbered step cards. Reusable
// for any "3 numbered/step cards" layout, not just this one section.
export default function HowItWorksSkeleton() {
  return (
    <div className="w-full h-full bg-[#FaFaFa] flex flex-col items-center justify-center px-8 py-12 gap-10">
      <div className="text-center">
        <SkeletonLine className="h-8 w-64 mx-auto mb-2" />
        <SkeletonLine className="h-8 w-40 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-3xl p-7 flex flex-col items-center bg-white/60">
            <SkeletonLine className="w-[120px] h-[120px] rounded-full mb-6" />
            <SkeletonLine className="h-4 w-24 mb-3" />
            <SkeletonLine className="h-3 w-full mb-1.5" />
            <SkeletonLine className="h-3 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
