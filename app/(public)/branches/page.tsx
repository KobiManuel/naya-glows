"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import GlassCard from "../helpers/glass/GlassCard";
import { useSectionContent, useSectionLoading } from "../../store/useSectionContent";
import { defaultBranchesContent } from "@/lib/content/businessBranches";

export default function BranchesPage() {
  const content = useSectionContent("business.branches", defaultBranchesContent);
  const isLoading = useSectionLoading("business.branches");

  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#6a9a72] mb-3 font-medium text-center">
            Find Us
          </p>
          <h1 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-light mb-12 text-center">
            {content.heading}
          </h1>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[0, 1].map((i) => (
                <div key={i} className="h-40 rounded-3xl bg-[#16241a]/10 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {content.branches.map((branch, i) => (
                <GlassCard key={i} className="p-6">
                  <h2 className="text-lg font-semibold mb-4">{branch.name}</h2>
                  <div className="flex flex-col gap-3 text-sm text-[#16241a]/70">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={15} className="text-[#6a9a72] mt-0.5 flex-shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-[#6a9a72] flex-shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={15} className="text-[#6a9a72] flex-shrink-0" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
