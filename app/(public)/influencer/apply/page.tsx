"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Share2, TrendingUp, Sparkles } from "lucide-react";
import GlassCard from "../../helpers/glass/GlassCard";
import PageHeader from "../../helpers/PageHeader";
import { useUserAuth } from "../../../store/useUserAuth";
import { getApiErrorMessage } from "../../../store/apiError";
import { isApiConfigured } from "@/lib/api";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

const benefits = [
  {
    icon: Share2,
    title: "Your Own Referral Codes",
    description: "Generate unique codes to share with your audience — no limits, no waiting on approval.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Impact",
    description: "See every signup your codes bring in, in real time, from your own dashboard.",
  },
  {
    icon: Sparkles,
    title: "Grow With Naya Glows",
    description: "Be part of a growing clean-beauty community and help others find formulas that actually work.",
  },
];

export default function InfluencerApplyPage() {
  const router = useRouter();
  const {
    user,
    loading: authLoading,
    upgradeInfluencer,
    upgradingInfluencer: submitting,
  } = useUserAuth();
  const backendReady = isApiConfigured();

  const [form, setForm] = useState({
    platform: "Instagram",
    socialHandle: "",
    bio: "",
  });

  // Becoming an influencer is always an upgrade to the account you're
  // already signed into — never a separate registration — so signing in
  // first is required, and an existing influencer has nothing to apply for.
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/signin?redirect=/influencer/apply");
    } else if (user.role === "INFLUENCER") {
      router.replace("/influencer");
    }
  }, [authLoading, user, router]);

  const updateField =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!backendReady) {
      toast.error("Influencer registration isn't connected yet (NEXT_PUBLIC_API_URL isn't set).");
      return;
    }
    try {
      await upgradeInfluencer({
        platform: form.platform,
        socialHandle: form.socialHandle || undefined,
        bio: form.bio || undefined,
      });
      toast.success("Welcome to the program!");
      router.push("/influencer");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Couldn't complete your application. Please try again."));
    }
  };

  if (authLoading || !user || user.role === "INFLUENCER") {
    return <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] min-h-screen" />;
  }

  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <PageHeader
            eyebrow="Partner With Naya Glows"
            heading="Become a Naya Glows Influencer"
            subtitle="Share the glow with your audience and earn recognition for every person you bring to Naya Glows."
            images={[
              {
                src: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381888/naya-glows/legacy/nature-girl2.jpg",
                alt: "Naya Glows influencer",
                afterWord: 2,
              },
            ]}
          />
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 pb-16">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <GlassCard key={b.title} className="p-6">
              <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center mb-4">
                <b.icon size={17} className="text-[#6a9a72]" />
              </div>
              <h3 className="text-base font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-[#16241a]/60 leading-relaxed">{b.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 pb-24">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden order-2 lg:order-1">
            <Image
              src="https://res.cloudinary.com/bhozkz7o/image/upload/v1784381919/naya-glows/legacy/new/img_7421.jpg"
              alt="Naya Glows community"
              fill
              className="object-cover"
            />
          </div>

          <GlassCard className="px-4 py-6 sm:p-8 order-1 lg:order-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#16241a]/50 mb-1">
              Apply Now
            </h2>
            <p className="text-xs text-[#16241a]/45 mb-5">
              Applying as {user.name} ({user.email})
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select value={form.platform} onChange={updateField("platform")} className={inputClass}>
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>YouTube</option>
                  <option>Twitter / X</option>
                  <option>Blog</option>
                  <option>Other</option>
                </select>
                <input
                  placeholder="@yourhandle"
                  value={form.socialHandle}
                  onChange={updateField("socialHandle")}
                  className={inputClass}
                />
              </div>
              <textarea
                placeholder="Tell us a bit about your audience (optional)"
                value={form.bio}
                onChange={updateField("bio")}
                className={`${inputClass} min-h-[90px]`}
              />

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 bg-[#16241a] text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
              >
                {submitting ? "Applying…" : "Join the Program"}
              </button>
            </form>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
