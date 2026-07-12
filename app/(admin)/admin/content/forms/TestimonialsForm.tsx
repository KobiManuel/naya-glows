"use client";

import { defaultTestimonialsContent, type Testimonial } from "@/lib/content/homeTestimonials";
import { useAdminSectionForm } from "./useAdminSectionForm";
import {
  SectionFormShell,
  TextField,
  TextAreaField,
  NumberField,
  ImageField,
  TagsField,
  RepeatableListControls,
  AddItemButton,
} from "./shared";

const blankTestimonial: Testimonial = {
  name: "",
  rating: 5,
  quote: "",
  tags: [],
  product: "",
  productImage: "",
};

export default function TestimonialsForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "home.testimonials",
    defaultTestimonialsContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateTestimonial = <K extends keyof Testimonial>(
    i: number,
    field: K,
    value: Testimonial[K],
  ) => {
    const next = [...form.testimonials];
    next[i] = { ...next[i], [field]: value };
    setForm({ ...form, testimonials: next });
  };

  const addTestimonial = () => {
    setForm({ ...form, testimonials: [...form.testimonials, { ...blankTestimonial }] });
  };

  const removeTestimonial = (i: number) => {
    setForm({ ...form, testimonials: form.testimonials.filter((_, idx) => idx !== i) });
  };

  return (
    <SectionFormShell
      title="Testimonials"
      description="Customer reviews shown in the horizontal scroll slider. Add, edit, or remove freely — this list isn't count-locked."
      onSubmit={save}
      saving={saving}
    >
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Heading highlight"
          value={form.headingHighlight}
          onChange={(v) => setForm({ ...form, headingHighlight: v })}
        />
        <TextField
          label="Heading rest"
          value={form.headingRest}
          onChange={(v) => setForm({ ...form, headingRest: v })}
        />
      </div>

      {form.testimonials.map((t, i) => (
        <div key={i} className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
              Testimonial {i + 1}
            </p>
            <RepeatableListControls
              onAdd={addTestimonial}
              onRemove={() => removeTestimonial(i)}
              canRemove={form.testimonials.length > 1}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Name"
              value={t.name}
              onChange={(v) => updateTestimonial(i, "name", v)}
            />
            <NumberField
              label="Rating"
              value={t.rating}
              onChange={(v) => updateTestimonial(i, "rating", v)}
            />
          </div>
          <TextAreaField
            label="Quote"
            value={t.quote}
            onChange={(v) => updateTestimonial(i, "quote", v)}
          />
          <TagsField
            label="Tags"
            value={t.tags}
            onChange={(v) => updateTestimonial(i, "tags", v)}
          />
          <TextField
            label="Product name"
            value={t.product}
            onChange={(v) => updateTestimonial(i, "product", v)}
          />
          <ImageField
            label="Product image"
            value={t.productImage}
            onChange={(v) => updateTestimonial(i, "productImage", v)}
          />
        </div>
      ))}

      <AddItemButton label="Add testimonial" onClick={addTestimonial} />
    </SectionFormShell>
  );
}
