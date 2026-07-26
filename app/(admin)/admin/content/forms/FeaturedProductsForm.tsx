"use client";

import { defaultFeaturedProductsContent, type FeaturedProductCard } from "@/lib/content/homeFeaturedProducts";
import { useAdminSectionForm } from "./useAdminSectionForm";
import { SectionFormShell, TextField, TextAreaField, ImageField } from "./shared";

export default function FeaturedProductsForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "home.featuredProducts",
    defaultFeaturedProductsContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateCard = <K extends keyof FeaturedProductCard>(
    i: number,
    field: K,
    value: FeaturedProductCard[K],
  ) => {
    const next = [...form.cards] as typeof form.cards;
    next[i] = { ...next[i], [field]: value };
    setForm({ ...form, cards: next });
  };

  return (
    <SectionFormShell
      title="Featured Products"
      description="The homepage 'Your Daily Skincare Essentials' section — heading, 2 product cards, and the lifestyle image card."
      onSubmit={save}
      saving={saving}
    >
      <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">Heading</p>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Line 1 text"
          value={form.headingLine1}
          onChange={(v) => setForm({ ...form, headingLine1: v })}
        />
        <TextField
          label="Line 1 suffix (after icon)"
          value={form.headingLine1Suffix}
          onChange={(v) => setForm({ ...form, headingLine1Suffix: v })}
        />
      </div>
      <ImageField
        label="Line 1 icon"
        value={form.headingIcon1}
        onChange={(v) => setForm({ ...form, headingIcon1: v })}
      />
      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="Line 2 prefix"
          value={form.headingLine2Prefix}
          onChange={(v) => setForm({ ...form, headingLine2Prefix: v })}
        />
        <TextField
          label="Line 2 bold word"
          value={form.headingLine2Bold}
          onChange={(v) => setForm({ ...form, headingLine2Bold: v })}
        />
        <TextField
          label="Line 2 light word"
          value={form.headingLine2Light}
          onChange={(v) => setForm({ ...form, headingLine2Light: v })}
        />
      </div>
      <ImageField
        label="Line 2 icon"
        value={form.headingIcon2}
        onChange={(v) => setForm({ ...form, headingIcon2: v })}
      />
      <TextAreaField
        label="Description"
        value={form.description}
        onChange={(v) => setForm({ ...form, description: v })}
      />
      <TextField
        label="Section label"
        value={form.label}
        onChange={(v) => setForm({ ...form, label: v })}
      />

      {form.cards.map((card, i) => (
        <div key={i} className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
            Product Card {i + 1}
          </p>
          <ImageField label="Image" value={card.image} onChange={(v) => updateCard(i, "image", v)} />
          <TextField label="Title" value={card.title} onChange={(v) => updateCard(i, "title", v)} />
          <TextAreaField
            label="Description"
            value={card.description}
            onChange={(v) => updateCard(i, "description", v)}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Primary button label"
              value={card.primaryCtaLabel}
              onChange={(v) => updateCard(i, "primaryCtaLabel", v)}
            />
            <TextField
              label="Primary button link"
              value={card.primaryCtaHref}
              onChange={(v) => updateCard(i, "primaryCtaHref", v)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Secondary button label"
              value={card.secondaryCtaLabel}
              onChange={(v) => updateCard(i, "secondaryCtaLabel", v)}
            />
            <TextField
              label="Secondary button link"
              value={card.secondaryCtaHref}
              onChange={(v) => updateCard(i, "secondaryCtaHref", v)}
            />
          </div>
        </div>
      ))}

      <div className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
        <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
          Lifestyle Card (3rd slot)
        </p>
        <ImageField
          label="Image"
          value={form.lifestyleImage}
          onChange={(v) => setForm({ ...form, lifestyleImage: v })}
        />
        <TextField
          label="Badge text"
          value={form.lifestyleBadge}
          onChange={(v) => setForm({ ...form, lifestyleBadge: v })}
        />
        <TextField
          label="Overlay text"
          value={form.lifestyleText}
          onChange={(v) => setForm({ ...form, lifestyleText: v })}
        />
      </div>

      <TextAreaField
        label="Disclaimer"
        value={form.disclaimer}
        onChange={(v) => setForm({ ...form, disclaimer: v })}
      />
    </SectionFormShell>
  );
}
