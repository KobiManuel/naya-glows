"use client";

import { defaultBranchesContent, type Branch } from "@/lib/content/businessBranches";
import { useAdminSectionForm } from "./useAdminSectionForm";
import {
  SectionFormShell,
  TextField,
  RepeatableListControls,
  AddItemButton,
} from "./shared";

const blankBranch: Branch = { name: "", address: "", phone: "", hours: "" };

export default function BranchesForm() {
  const { form, setForm, save, saving, loading } = useAdminSectionForm(
    "business.branches",
    defaultBranchesContent,
  );

  if (loading) return <p className="text-sm text-[#16241a]/50">Loading…</p>;

  const updateBranch = <K extends keyof Branch>(i: number, field: K, value: Branch[K]) => {
    const next = [...form.branches];
    next[i] = { ...next[i], [field]: value };
    setForm({ ...form, branches: next });
  };

  const addBranch = () => setForm({ ...form, branches: [...form.branches, { ...blankBranch }] });
  const removeBranch = (i: number) =>
    setForm({ ...form, branches: form.branches.filter((_, idx) => idx !== i) });

  return (
    <SectionFormShell
      title="Branches"
      description="The store/branch list shown on the Branches page. Add or remove freely."
      onSubmit={save}
      saving={saving}
    >
      <TextField
        label="Page heading"
        value={form.heading}
        onChange={(v) => setForm({ ...form, heading: v })}
      />

      {form.branches.map((branch, i) => (
        <div key={i} className="bg-white/50 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#16241a]/40 uppercase tracking-wide">
              Branch {i + 1}
            </p>
            <RepeatableListControls
              onAdd={addBranch}
              onRemove={() => removeBranch(i)}
              canRemove={form.branches.length > 1}
            />
          </div>
          <TextField
            label="Name"
            value={branch.name}
            onChange={(v) => updateBranch(i, "name", v)}
          />
          <TextField
            label="Address"
            value={branch.address}
            onChange={(v) => updateBranch(i, "address", v)}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Phone"
              value={branch.phone}
              onChange={(v) => updateBranch(i, "phone", v)}
            />
            <TextField
              label="Hours"
              value={branch.hours}
              onChange={(v) => updateBranch(i, "hours", v)}
            />
          </div>
        </div>
      ))}

      <AddItemButton label="Add branch" onClick={addBranch} />
    </SectionFormShell>
  );
}
