"use client";

import { defaultIngredientsContent } from "@/lib/content/homeIngredients";
import { useAdminSectionForm } from "./useAdminSectionForm";
import { SectionFormShell, TextField, ImageField } from "./shared";

export default function IngredientsForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "home.ingredients",
    defaultIngredientsContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateIngredient = (i: number, field: "name" | "benefit" | "image", value: string) => {
    const next = [...form.ingredients] as typeof form.ingredients;
    next[i] = { ...next[i], [field]: value };
    setForm({ ...form, ingredients: next });
  };

  return (
    <SectionFormShell
      title="Key Ingredients"
      description="The 5 ingredient cards in the scroll-triggered ring animation. The count is fixed at 5 — this section can't add or remove slots without breaking the animation."
      onSubmit={save}
      saving={saving}
    >
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Eyebrow text"
          value={form.eyebrow}
          onChange={(v) => setForm({ ...form, eyebrow: v })}
        />
        <TextField
          label="Heading"
          value={form.heading}
          onChange={(v) => setForm({ ...form, heading: v })}
        />
      </div>

      {form.ingredients.map((ing, i) => (
        <div key={i} className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
            Ingredient {i + 1}
          </p>
          <TextField
            label="Name"
            value={ing.name}
            onChange={(v) => updateIngredient(i, "name", v)}
          />
          <TextField
            label="Benefit"
            value={ing.benefit}
            onChange={(v) => updateIngredient(i, "benefit", v)}
          />
          <ImageField
            label="Image"
            value={ing.image}
            onChange={(v) => updateIngredient(i, "image", v)}
          />
        </div>
      ))}
    </SectionFormShell>
  );
}
