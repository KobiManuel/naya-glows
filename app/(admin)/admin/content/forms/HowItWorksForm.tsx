"use client";

import { defaultHowItWorksContent } from "@/lib/content/homeHowItWorks";
import { useAdminSectionForm } from "./useAdminSectionForm";
import { SectionFormShell, TextField, TextAreaField, ImageField } from "./shared";

export default function HowItWorksForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "home.howItWorks",
    defaultHowItWorksContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateStep = (i: number, field: "title" | "description" | "image", value: string) => {
    const next = [...form.steps] as typeof form.steps;
    next[i] = { ...next[i], [field]: value };
    setForm({ ...form, steps: next });
  };

  return (
    <SectionFormShell
      title="How It Works"
      description="Heading and the 3 step cards. Fixed at 3 steps — the connector UI assumes exactly 3."
      onSubmit={save}
      saving={saving}
    >
      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="Heading part 1"
          value={form.headingPart1}
          onChange={(v) => setForm({ ...form, headingPart1: v })}
        />
        <TextField
          label="Heading part 2"
          value={form.headingPart2}
          onChange={(v) => setForm({ ...form, headingPart2: v })}
        />
        <TextField
          label="Heading part 3"
          value={form.headingPart3}
          onChange={(v) => setForm({ ...form, headingPart3: v })}
        />
      </div>
      <TextField
        label="Footer note"
        value={form.footerNote}
        onChange={(v) => setForm({ ...form, footerNote: v })}
      />

      {form.steps.map((step, i) => (
        <div key={i} className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
            Step {i + 1}
          </p>
          <TextField
            label="Title"
            value={step.title}
            onChange={(v) => updateStep(i, "title", v)}
          />
          <TextAreaField
            label="Description"
            value={step.description}
            onChange={(v) => updateStep(i, "description", v)}
          />
          <ImageField
            label="Image"
            value={step.image}
            onChange={(v) => updateStep(i, "image", v)}
          />
        </div>
      ))}
    </SectionFormShell>
  );
}
