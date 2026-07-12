"use client";

import { defaultCategoriesContent } from "@/lib/content/homeCategories";
import { useAdminSectionForm } from "./useAdminSectionForm";
import { SectionFormShell, TextField, ImageField } from "./shared";

export default function CategoriesForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "home.categories",
    defaultCategoriesContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateCategory = (
    i: number,
    field: "label" | "image" | "buttonText" | "href",
    value: string,
  ) => {
    const next = [...form.categories] as typeof form.categories;
    next[i] = { ...next[i], [field]: value };
    setForm({ ...form, categories: next });
  };

  return (
    <SectionFormShell
      title="Shop Categories"
      description="The 3 category tiles (face / body / scent). Fixed at 3 — a fixed 3-column grid."
      onSubmit={save}
      saving={saving}
    >
      {form.categories.map((cat, i) => (
        <div key={i} className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
            Category {i + 1}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Label"
              value={cat.label}
              onChange={(v) => updateCategory(i, "label", v)}
            />
            <TextField
              label="Button text"
              value={cat.buttonText}
              onChange={(v) => updateCategory(i, "buttonText", v)}
            />
          </div>
          <TextField
            label="Link"
            value={cat.href}
            onChange={(v) => updateCategory(i, "href", v)}
          />
          <ImageField
            label="Image"
            value={cat.image}
            onChange={(v) => updateCategory(i, "image", v)}
          />
        </div>
      ))}
    </SectionFormShell>
  );
}
