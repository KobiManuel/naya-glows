"use client";

import { defaultCatalogHeroContent } from "@/lib/content/catalogHero";
import { useAdminSectionForm } from "./useAdminSectionForm";
import { SectionFormShell, TextField, TextAreaField } from "./shared";

export default function CatalogHeroForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "catalog.hero",
    defaultCatalogHeroContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  return (
    <SectionFormShell
      title="Catalog Hero"
      description="Headline, subheading, and toggle labels shown at the top of /catalog, for both the Skincare and Scent collections."
      onSubmit={save}
      saving={saving}
    >
      <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">Skincare</p>
      <TextField
        label="Eyebrow"
        value={form.skincareEyebrow}
        onChange={(v) => setForm({ ...form, skincareEyebrow: v })}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Headline line 1"
          value={form.skincareHeadlineLine1}
          onChange={(v) => setForm({ ...form, skincareHeadlineLine1: v })}
        />
        <TextField
          label="Headline line 2"
          value={form.skincareHeadlineLine2}
          onChange={(v) => setForm({ ...form, skincareHeadlineLine2: v })}
        />
      </div>
      <TextAreaField
        label="Subheading"
        value={form.skincareSubheading}
        onChange={(v) => setForm({ ...form, skincareSubheading: v })}
      />
      <TextField
        label="Toggle label"
        value={form.skincareToggleLabel}
        onChange={(v) => setForm({ ...form, skincareToggleLabel: v })}
      />

      <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide mt-4">Scent</p>
      <TextField
        label="Eyebrow"
        value={form.scentEyebrow}
        onChange={(v) => setForm({ ...form, scentEyebrow: v })}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Headline line 1"
          value={form.scentHeadlineLine1}
          onChange={(v) => setForm({ ...form, scentHeadlineLine1: v })}
        />
        <TextField
          label="Headline line 2"
          value={form.scentHeadlineLine2}
          onChange={(v) => setForm({ ...form, scentHeadlineLine2: v })}
        />
      </div>
      <TextAreaField
        label="Subheading"
        value={form.scentSubheading}
        onChange={(v) => setForm({ ...form, scentSubheading: v })}
      />
      <TextField
        label="Toggle label"
        value={form.scentToggleLabel}
        onChange={(v) => setForm({ ...form, scentToggleLabel: v })}
      />
    </SectionFormShell>
  );
}
