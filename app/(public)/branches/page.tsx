"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import GlassCard from "../helpers/glass/GlassCard";
import PageHeader from "../helpers/PageHeader";
import { useSectionContent, useSectionLoading } from "../../store/useSectionContent";
import { defaultBranchesContent } from "@/lib/content/businessBranches";

export default function BranchesPage() {
  const content = useSectionContent("business.branches", defaultBranchesContent);
  const isLoading = useSectionLoading("business.branches");

  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <PageHeader
            eyebrow="Find Us"
            heading={content.heading}
            images={[
              {
                src: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381879/naya-glows/legacy/img_6331.jpg",
                alt: "Naya Glows storefront",
                afterWord: 0,
              },
            ]}
            className="mb-12"
          />

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
