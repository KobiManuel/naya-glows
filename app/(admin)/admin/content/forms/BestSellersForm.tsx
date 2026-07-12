"use client";

import { defaultBestSellersContent, type BestSellerCard } from "@/lib/content/homeBestSellers";
import { useAdminSectionForm } from "./useAdminSectionForm";
import { SectionFormShell, TextField, TextAreaField, ImageField } from "./shared";

export default function BestSellersForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "home.bestSellers",
    defaultBestSellersContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateCard = <K extends keyof BestSellerCard>(i: number, field: K, value: BestSellerCard[K]) => {
    const next = [...form.cards];
    next[i] = { ...next[i], [field]: value };
    setForm({ ...form, cards: next });
  };

  return (
    <SectionFormShell
      title="Best Sellers"
      description="The 'Best Sellers, Real Results' homepage section — two customer result cards."
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

      {form.cards.map((card, i) => (
        <div key={i} className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
            Card {i + 1}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Name" value={card.name} onChange={(v) => updateCard(i, "name", v)} />
            <TextField label="Result" value={card.result} onChange={(v) => updateCard(i, "result", v)} />
          </div>
          <TextAreaField label="Quote" value={card.quote} onChange={(v) => updateCard(i, "quote", v)} />
          <ImageField label="Customer photo" value={card.image} onChange={(v) => updateCard(i, "image", v)} />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Product name"
              value={card.productName}
              onChange={(v) => updateCard(i, "productName", v)}
            />
            <TextField
              label="Product subtitle"
              value={card.productSub}
              onChange={(v) => updateCard(i, "productSub", v)}
            />
          </div>
          <ImageField
            label="Product image"
            value={card.productImage}
            onChange={(v) => updateCard(i, "productImage", v)}
          />
          <TextField label="Link (href)" value={card.href} onChange={(v) => updateCard(i, "href", v)} />
        </div>
      ))}
    </SectionFormShell>
  );
}
