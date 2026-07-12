"use client";

import { defaultContactInfoContent } from "@/lib/content/contactInfo";
import { useAdminSectionForm } from "./useAdminSectionForm";
import { SectionFormShell, TextField } from "./shared";

export default function ContactInfoForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "contact.info",
    defaultContactInfoContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  return (
    <SectionFormShell
      title="Contact Info"
      description="Email, phone, and address shown on the Contact page."
      onSubmit={save}
      saving={saving}
    >
      <TextField
        label="Email"
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
      />
      <TextField
        label="Phone"
        value={form.phone}
        onChange={(v) => setForm({ ...form, phone: v })}
      />
      <TextField
        label="Address"
        value={form.address}
        onChange={(v) => setForm({ ...form, address: v })}
      />
    </SectionFormShell>
  );
}
