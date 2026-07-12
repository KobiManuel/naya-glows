"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Package, Heart, LogOut, MapPin, X } from "lucide-react";
import GlassCard from "../helpers/glass/GlassCard";
import { useUserAuth } from "../../store/useUserAuth";
import { useListSavedProductsQuery, useToggleSavedProductMutation } from "../../store/userApi";
import { isApiConfigured } from "@/lib/api";

export default function AccountPage() {
  const { user, loading, logout } = useUserAuth();
  const { data: savedProducts = [] } = useListSavedProductsQuery(undefined, {
    skip: !isApiConfigured() || !user,
  });
  const [toggleSavedProduct] = useToggleSavedProductMutation();

  if (loading) {
    return (
      <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] min-h-screen" />
    );
  }

  if (!user) {
    return (
      <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen flex items-center justify-center px-5">
        <GlassCard className="max-w-md w-full text-center py-16 px-8">
          <div className="w-14 h-14 rounded-full bg-white/70 flex items-center justify-center mx-auto mb-5">
            <User size={22} className="text-[#6a9a72]" />
          </div>
          <h1 className="text-xl font-medium mb-2">Sign in to view your account</h1>
          <p className="text-sm text-[#16241a]/50 mb-8">
            Track orders, save favorites, and manage your details.
          </p>
          <Link
            href="/signin"
            className="inline-block text-sm font-semibold bg-[#16241a] text-white px-6 py-2.5 rounded-full"
          >
            Sign In
          </Link>
        </GlassCard>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <GlassCard className="p-8 flex items-center gap-5 mb-8 flex-wrap">
            <div className="w-16 h-16 rounded-full bg-[#16241a] flex items-center justify-center flex-shrink-0">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-[#16241a]/50">{user.email}</p>
              {user.country && (
                <p className="text-xs text-[#6a9a72] flex items-center gap-1 mt-1">
                  <MapPin size={11} />
                  {user.country} · {user.currency}
                </p>
              )}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-medium text-[#16241a]/60 hover:text-[#16241a] transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </GlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard className="p-8">
              <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center mb-4">
                <Package size={17} className="text-[#6a9a72]" />
              </div>
              <h2 className="text-base font-semibold mb-1">Order History</h2>
              <p className="text-sm text-[#16241a]/50 mb-4">
                You have no past orders yet.
              </p>
              <Link
                href="/catalog"
                className="text-sm font-semibold text-[#6a9a72] hover:underline"
              >
                Start shopping →
              </Link>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center mb-4">
                <Heart size={17} className="text-[#6a9a72]" />
              </div>
              <h2 className="text-base font-semibold mb-1">Saved Products</h2>
              {savedProducts.length === 0 ? (
                <>
                  <p className="text-sm text-[#16241a]/50 mb-4">
                    Your wishlist from the catalog will appear here.
                  </p>
                  <Link
                    href="/catalog"
                    className="text-sm font-semibold text-[#6a9a72] hover:underline"
                  >
                    Browse catalog →
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  {savedProducts.map((product) => (
                    <div key={product.slug} className="flex items-center gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#d4e8d0] flex-shrink-0"
                      >
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${product.slug}`}>
                          <p className="text-sm font-medium leading-snug line-clamp-1 hover:text-[#6a9a72] transition-colors">
                            {product.name}
                          </p>
                        </Link>
                        <p className="text-xs text-[#16241a]/50">${product.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => toggleSavedProduct({ slug: product.slug })}
                        aria-label="Remove from saved products"
                        className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0 hover:bg-white transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  );
}
