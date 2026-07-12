import SkeletonLine from "./SkeletonLine";

// Matches TestiomonialsSection.tsx: centered heading, horizontal row of
// testimonial-card-shaped blocks. Reusable for any horizontal card slider.
export default function TestimonialsSkeleton() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-12 gap-10">
      <SkeletonLine className="h-8 w-72" />
      <div className="flex gap-4 overflow-hidden w-full max-w-5xl justify-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-3xl bg-[#f5f5f5] flex flex-col items-center p-6 pt-8"
            style={{ width: "min(320px, 82vw)", height: 320 }}
          >
            <SkeletonLine className="w-20 h-20 rounded-full mb-4" />
            <SkeletonLine className="h-4 w-24 mb-4" />
            <SkeletonLine className="h-3 w-full mb-1.5" />
            <SkeletonLine className="h-3 w-full mb-1.5" />
            <SkeletonLine className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
