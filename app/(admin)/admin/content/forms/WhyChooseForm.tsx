"use client";

import { defaultWhyChooseContent } from "@/lib/content/homeWhyChoose";
import { useAdminSectionForm } from "./useAdminSectionForm";
import { SectionFormShell, TextField, TextAreaField } from "./shared";

export default function WhyChooseForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "home.whyChoose",
    defaultWhyChooseContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateFeature = (i: number, field: "title" | "description", value: string) => {
    const next = [...form.features] as typeof form.features;
    next[i] = { ...next[i], [field]: value };
    setForm({ ...form, features: next });
  };

  return (
    <SectionFormShell
      title="Why Choose Naya"
      description="Heading, the 3 feature cards, and the two floating stat callouts. Fixed at 3 features (one per icon)."
      onSubmit={save}
      saving={saving}
    >
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Heading (line 1)"
          value={form.headingLine1}
          onChange={(v) => setForm({ ...form, headingLine1: v })}
        />
        <TextField
          label="Heading (line 2)"
          value={form.headingLine2}
          onChange={(v) => setForm({ ...form, headingLine2: v })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Primary button label"
          value={form.primaryCtaLabel}
          onChange={(v) => setForm({ ...form, primaryCtaLabel: v })}
        />
        <TextField
          label="Secondary button label"
          value={form.secondaryCtaLabel}
          onChange={(v) => setForm({ ...form, secondaryCtaLabel: v })}
        />
      </div>

      <div className="bg-white/50 rounded-2xl p-4 grid grid-cols-3 gap-4">
        <TextField
          label="Stat 1 value"
          value={form.stat1Value}
          onChange={(v) => setForm({ ...form, stat1Value: v })}
        />
        <TextField
          label="Stat 1 label"
          value={form.stat1Label}
          onChange={(v) => setForm({ ...form, stat1Label: v })}
        />
        <TextField
          label="Stat 1 sublabel"
          value={form.stat1Sublabel}
          onChange={(v) => setForm({ ...form, stat1Sublabel: v })}
        />
      </div>
      <div className="bg-white/50 rounded-2xl p-4 grid grid-cols-2 gap-4">
        <TextField
          label="Stat 2 value"
          value={form.stat2Value}
          onChange={(v) => setForm({ ...form, stat2Value: v })}
        />
        <TextField
          label="Stat 2 label"
          value={form.stat2Label}
          onChange={(v) => setForm({ ...form, stat2Label: v })}
        />
      </div>

      {form.features.map((feature, i) => (
        <div key={i} className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
            Feature {i + 1}
          </p>
          <TextField
            label="Title"
            value={feature.title}
            onChange={(v) => updateFeature(i, "title", v)}
          />
          <TextAreaField
            label="Description"
            value={feature.description}
            onChange={(v) => updateFeature(i, "description", v)}
          />
        </div>
      ))}
    </SectionFormShell>
  );
}
