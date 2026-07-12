"use client";

import { type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react";
import { useUploadImageMutation } from "../../../../store/adminApi";
import { getApiErrorMessage } from "../../../../store/apiError";
import { toast } from "sonner";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-3.5 py-2.5 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

export function SectionFormShell({
  title,
  description,
  onSubmit,
  saving,
  children,
}: {
  title: string;
  description: string;
  onSubmit: (e: FormEvent) => void;
  saving: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <Link
        href="/admin/content"
        className="inline-flex items-center gap-1.5 text-sm text-[#16241a]/50 hover:text-[#16241a] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Content
      </Link>
      <h1 className="text-2xl font-light mb-1">{title}</h1>
      <p className="text-sm text-[#16241a]/50 mb-8 max-w-xl">{description}</p>

      <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-2xl pb-16">
        {children}
        <button
          type="submit"
          disabled={saving}
          className="self-start bg-[#16241a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-[#16241a]/50 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <FieldGroup label={label}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </FieldGroup>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <FieldGroup label={label}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} min-h-[90px]`}
      />
    </FieldGroup>
  );
}

export function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <FieldGroup label={label}>
      <input
        type="number"
        step="0.1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    </FieldGroup>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleFile = async (file: File) => {
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await uploadImage(body).unwrap();
      onChange(res.url);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Image upload failed."));
    }
  };

  return (
    <FieldGroup label={label}>
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#d4e8d0] flex-shrink-0">
            <Image src={value} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image path or URL"
            className={inputClass}
          />
          <label className="flex items-center gap-1.5 text-xs text-[#16241a]/50 cursor-pointer hover:text-[#16241a] w-fit">
            <Upload size={12} />
            {isLoading ? "Uploading…" : "Upload new image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>
        </div>
      </div>
    </FieldGroup>
  );
}

export function TagsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <FieldGroup label={label}>
      <input
        value={value.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          )
        }
        placeholder="Comma-separated"
        className={inputClass}
      />
    </FieldGroup>
  );
}

export function RepeatableListControls({
  onAdd,
  onRemove,
  canRemove,
}: {
  onAdd: () => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center hover:bg-white flex-shrink-0"
        >
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
}

export function AddItemButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-sm font-medium text-[#4f7957] hover:text-[#16241a] transition-colors w-fit"
    >
      <Plus size={15} />
      {label}
    </button>
  );
}
