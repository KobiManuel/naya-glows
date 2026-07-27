"use client";

import Image from "next/image";

// Full-screen static companion to VideoShowcaseSection — for a photo that
// deserves its own moment rather than being reduced to a <video poster>
// that's only visible for a split second before playback starts.
export default function ImageShowcaseSection({
  image,
  eyebrow,
  heading,
  subtext,
}: {
  image: string;
  eyebrow: string;
  heading: string;
  subtext: string;
}) {
  return (
    <section className="relative w-full h-[100dvh] min-h-[520px] overflow-hidden bg-[#10160f]">
      <Image src={image} alt={heading} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#10160f]/55 via-[#10160f]/15 to-[#10160f]/65 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#c7ecc9] mb-5">
          {eyebrow}
        </p>
        <h2 className="text-[clamp(2rem,5.5vw,4rem)] font-light tracking-wide text-white leading-tight max-w-2xl">
          {heading}
        </h2>
        <p className="mt-5 text-white/75 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          {subtext}
        </p>
      </div>
    </section>
  );
}
