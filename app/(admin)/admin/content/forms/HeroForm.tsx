"use client";

import { defaultHeroContent } from "@/lib/content/homeHero";
import { useAdminSectionForm } from "./useAdminSectionForm";
import {
  SectionFormShell,
  TextField,
  TextAreaField,
  ImageField,
  TagsField,
  RepeatableListControls,
  AddItemButton,
} from "./shared";

export default function HeroForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "home.hero",
    defaultHeroContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateBackgroundImage = (i: number, value: string) => {
    const next = [...form.backgroundImages];
    next[i] = value;
    setForm({ ...form, backgroundImages: next });
  };

  const addBackgroundImage = () => {
    setForm({ ...form, backgroundImages: [...form.backgroundImages, ""] });
  };

  const removeBackgroundImage = (i: number) => {
    setForm({ ...form, backgroundImages: form.backgroundImages.filter((_, idx) => idx !== i) });
  };

  return (
    <SectionFormShell
      title="Homepage Hero"
      description="The full-bleed banner at the very top of the homepage."
      onSubmit={save}
      saving={saving}
    >
      <TextField
        label="Eyebrow text"
        value={form.eyebrow}
        onChange={(v) => setForm({ ...form, eyebrow: v })}
      />
      <TextField
        label="Headline (line 1)"
        value={form.headline}
        onChange={(v) => setForm({ ...form, headline: v })}
      />
      <TagsField
        label="Rotating taglines (line 2 — typewriter cycles through these)"
        value={form.taglines}
        onChange={(v) => setForm({ ...form, taglines: v })}
      />
      <TextAreaField
        label="Body text"
        value={form.body}
        onChange={(v) => setForm({ ...form, body: v })}
      />

      <div className="flex flex-col gap-3">
        <label className="block text-xs font-semibold uppercase tracking-wide text-[#16241a]/50">
          Background photos (auto-advancing slider)
        </label>
        {form.backgroundImages.map((img, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex-1">
              <ImageField
                label={`Photo ${i + 1}`}
                value={img}
                onChange={(v) => updateBackgroundImage(i, v)}
              />
            </div>
            <RepeatableListControls
              onAdd={addBackgroundImage}
              onRemove={() => removeBackgroundImage(i)}
              canRemove={form.backgroundImages.length > 1}
            />
          </div>
        ))}
        <AddItemButton label="Add photo" onClick={addBackgroundImage} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Primary button label"
          value={form.primaryCtaLabel}
          onChange={(v) => setForm({ ...form, primaryCtaLabel: v })}
        />
        <TextField
          label="Primary button link"
          value={form.primaryCtaHref}
          onChange={(v) => setForm({ ...form, primaryCtaHref: v })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Secondary button label"
          value={form.secondaryCtaLabel}
          onChange={(v) => setForm({ ...form, secondaryCtaLabel: v })}
        />
        <TextField
          label="Secondary button link"
          value={form.secondaryCtaHref}
          onChange={(v) => setForm({ ...form, secondaryCtaHref: v })}
        />
      </div>
    </SectionFormShell>
  );
}
