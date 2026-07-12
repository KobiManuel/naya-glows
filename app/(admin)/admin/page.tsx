"use client";

import { Package, Users, FileText, ShoppingCart } from "lucide-react";
import {
  useListProductsQuery,
  useListUsersQuery,
  useListContentQuery,
  useListOrdersQuery,
} from "../../store/adminApi";

export default function AdminOverviewPage() {
  const { data: products } = useListProductsQuery();
  const { data: users } = useListUsersQuery();
  const { data: content } = useListContentQuery();
  const { data: orders } = useListOrdersQuery();

  const stats = [
    { label: "Products", value: products?.length ?? null, icon: Package, href: "/admin/products" },
    { label: "Orders", value: orders?.length ?? null, icon: ShoppingCart, href: "/admin/orders" },
    { label: "Users", value: users?.length ?? null, icon: Users, href: "/admin/users" },
    {
      label: "Content overrides",
      value: content?.length ?? null,
      icon: FileText,
      href: "/admin/content",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-light mb-1">Overview</h1>
      <p className="text-sm text-[#16241a]/50 mb-8">
        A quick snapshot of what&apos;s live on the site.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6"
            >
              <div className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center mb-4">
                <Icon size={16} className="text-[#6a9a72]" />
              </div>
              <p className="text-2xl font-semibold">{s.value ?? "—"}</p>
              <p className="text-sm text-[#16241a]/50">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6">
        <h2 className="text-base font-semibold mb-2">Coming next</h2>
        <p className="text-sm text-[#16241a]/50 leading-relaxed">
          The Budget Tracker will start reporting once real payments come in
          (the schema and Orders are already live). Multi-currency display is
          also queued up next.
        </p>
      </div>
    </div>
  );
}
