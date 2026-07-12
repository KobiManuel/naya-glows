"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useListContentQuery } from "../../../store/adminApi";
import { contentRegistry } from "@/lib/content/registry";

export default function AdminContentIndexPage() {
  const { data: blocks } = useListContentQuery();
  const overriddenKeys = new Set(blocks?.map((b) => b.key));

  const groups = contentRegistry.reduce<Record<string, typeof contentRegistry>>((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-light mb-1">Content</h1>
      <p className="text-sm text-[#16241a]/50 mb-10 max-w-2xl">
        Editable sections of the site. Anything you save here replaces the
        built-in default shown on the live page; anything you leave alone
        keeps showing its default.
      </p>

      {Object.entries(groups).map(([group, items]) => (
        <div key={group} className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[#16241a]/40 mb-4">
            {group}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <Link
                key={item.key}
                href={`/admin/content/${item.key}`}
                className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 flex items-center justify-between gap-4 hover:bg-white/80 transition-colors group"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{item.label}</p>
                    {overriddenKeys.has(item.key) && (
                      <span className="text-[9px] font-semibold uppercase tracking-wide text-[#4f7957] bg-[#d4e8d0] px-2 py-0.5 rounded-full flex-shrink-0">
                        Customized
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#16241a]/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#16241a]/30 group-hover:text-[#16241a]/60 transition-colors flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
