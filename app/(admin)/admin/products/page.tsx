"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import {
  useListProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
} from "../../../store/adminApi";
import { getApiErrorMessage } from "../../../store/apiError";
import { categories, type Product } from "@/lib/products";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-3.5 py-2.5 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

const emptyForm: Omit<Product, "categoryAccent"> & { categoryAccent: string } = {
  slug: "",
  name: "",
  category: categories[0],
  categoryAccent: "",
  price: 0,
  originalPrice: 0,
  image: "",
  tagline: "",
  description: "",
  benefits: [],
};

export default function AdminProductsPage() {
  const { data: products, isLoading } = useListProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();

  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [benefitsText, setBenefitsText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setBenefitsText("");
    setError(null);
    setShowForm(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product.slug);
    setForm({ ...product, categoryAccent: product.categoryAccent || "" });
    setBenefitsText(product.benefits.join(", "));
    setError(null);
    setShowForm(true);
  };

  const handleUpload = async (file: File) => {
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await uploadImage(body).unwrap();
      setForm((f) => ({ ...f, image: res.url }));
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Image upload failed. Check the S3 bucket configuration."),
      );
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      benefits: benefitsText
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean),
    };

    try {
      if (editing) {
        await updateProduct({ ...payload, slug: editing }).unwrap();
        toast.success("Product updated");
      } else {
        await createProduct(payload).unwrap();
        toast.success("Product created");
      }
      setShowForm(false);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"? This can't be undone.`)) return;
    try {
      await deleteProduct(slug).unwrap();
      toast.success("Product deleted");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Delete failed."));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-light mb-1">Products</h1>
          <p className="text-sm text-[#16241a]/50">
            Products created here appear on the live Catalog alongside the
            built-in defaults.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#16241a] text-white text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          <Plus size={15} />
          New Product
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-sm text-[#16241a]/50">Loading…</p>
        ) : !products || products.length === 0 ? (
          <p className="p-6 text-sm text-[#16241a]/50">
            No admin-created products yet. The Catalog is currently showing
            only the built-in defaults.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#16241a]/45 border-b border-[#16241a]/10">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-b border-[#16241a]/5 last:border-0">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#d4e8d0] flex-shrink-0">
                      {p.image && (
                        <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                      )}
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="p-4 text-[#16241a]/60">{p.category}</td>
                  <td className="p-4">${p.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        aria-label="Edit"
                        className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center hover:bg-white"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.slug)}
                        aria-label="Delete"
                        className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center hover:bg-white"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-[#f4faf3] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {editing ? "Edit Product" : "New Product"}
              </h2>
              <button onClick={() => setShowForm(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                required
                placeholder="Slug (e.g. radiance-boost-serum)"
                value={form.slug}
                disabled={Boolean(editing)}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className={`${inputClass} disabled:opacity-50`}
              />
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value as Product["category"] }))
                }
                className={inputClass}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={form.price || ""}
                  onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                  className={inputClass}
                />
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="Original price"
                  value={form.originalPrice || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, originalPrice: Number(e.target.value) }))
                  }
                  className={inputClass}
                />
              </div>
              <input
                required
                placeholder="Tagline"
                value={form.tagline}
                onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                className={inputClass}
              />
              <textarea
                required
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className={`${inputClass} min-h-[80px]`}
              />
              <input
                placeholder="Benefits (comma-separated)"
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
                className={inputClass}
              />

              <div>
                <label className="flex items-center gap-2 text-xs text-[#16241a]/50 mb-2">
                  <Upload size={12} />
                  Product image
                </label>
                <div className="flex items-center gap-3">
                  {form.image && (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#d4e8d0] flex-shrink-0">
                      <Image src={form.image} alt="" fill className="object-contain p-1" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file);
                    }}
                    className="text-xs"
                  />
                  {uploading && <span className="text-xs text-[#16241a]/40">Uploading…</span>}
                </div>
              </div>

              {error && <p className="text-xs text-[#c0574c]">{error}</p>}

              <button
                type="submit"
                className="mt-2 bg-[#16241a] text-white text-sm font-semibold px-6 py-3 rounded-full"
              >
                {editing ? "Save Changes" : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
