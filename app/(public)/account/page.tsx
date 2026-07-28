"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Package, Heart, LogOut, MapPin, X, Pencil, KeyRound } from "lucide-react";
import GlassCard from "../helpers/glass/GlassCard";
import PasswordInput from "../../components/PasswordInput";
import { useUserAuth } from "../../store/useUserAuth";
import { useCurrencyDisplay } from "../../store/useCurrencyDisplay";
import { getApiErrorMessage } from "../../store/apiError";
import { countries } from "@/lib/countries";
import {
  useListSavedProductsQuery,
  useToggleSavedProductMutation,
  useListMyOrdersQuery,
} from "../../store/userApi";
import { isApiConfigured } from "@/lib/api";

const statusStyles: Record<string, string> = {
  PAID: "bg-[#d4e8d0] text-[#4f7957]",
  PENDING: "bg-[#f4e8c9] text-[#8a6f1f]",
  FAILED: "bg-[#f5d9d5] text-[#c0574c]",
  CANCELLED: "bg-[#e5e5e5] text-[#666]",
};

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

function EditProfileModal({
  onClose,
  currentName,
  currentEmail,
  currentCountry,
}: {
  onClose: () => void;
  currentName: string;
  currentEmail: string;
  currentCountry: string | null;
}) {
  const { updateProfile, updatingProfile: saving } = useUserAuth();
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [country, setCountry] = useState(currentCountry ?? "NG");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, email, country });
      toast.success("Profile updated");
      onClose();
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Couldn't update your profile. Please try again."));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <GlassCard className="max-w-sm w-full py-8 px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            required
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={saving}
            className="mt-2 bg-[#16241a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const { changePassword, changingPassword: saving } = useUserAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(currentPassword, newPassword);
      toast.success("Password updated");
      onClose();
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Couldn't update your password. Please try again."));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <GlassCard className="max-w-sm w-full py-8 px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PasswordInput
            required
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
            autoComplete="current-password"
          />
          <PasswordInput
            required
            minLength={8}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={saving}
            className="mt-2 bg-[#16241a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
          >
            {saving ? "Updating…" : "Update Password"}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, logout } = useUserAuth();
  const { format: formatPrice } = useCurrencyDisplay();
  const { data: savedProducts = [] } = useListSavedProductsQuery(undefined, {
    skip: !isApiConfigured() || !user,
  });
  const [toggleSavedProduct, { isLoading: togglingSaved, originalArgs: togglingSavedArgs }] =
    useToggleSavedProductMutation();
  const { data: myOrders = [] } = useListMyOrdersQuery(undefined, {
    skip: !isApiConfigured() || !user,
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] min-h-screen" />
    );
  }

  if (!user) {
    return (
      <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen flex items-center justify-center px-5">
        <GlassCard className="max-w-md w-full text-center py-16 px-6 sm:px-8">
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
          <GlassCard className="px-5 py-8 sm:p-8 flex items-center gap-5 mb-8 flex-wrap">
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
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setShowEditProfile(true)}
                className="flex items-center gap-2 text-sm font-medium text-[#16241a]/60 hover:text-[#16241a] transition-colors"
              >
                <Pencil size={14} />
                Edit Profile
              </button>
              <button
                onClick={() => setShowChangePassword(true)}
                className="flex items-center gap-2 text-sm font-medium text-[#16241a]/60 hover:text-[#16241a] transition-colors"
              >
                <KeyRound size={14} />
                Change Password
              </button>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-2 text-sm font-medium text-[#16241a]/60 hover:text-[#16241a] transition-colors"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard className="px-5 py-8 sm:p-8">
              <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center mb-4">
                <Package size={17} className="text-[#6a9a72]" />
              </div>
              <h2 className="text-base font-semibold mb-1">Order History</h2>
              {myOrders.length === 0 ? (
                <>
                  <p className="text-sm text-[#16241a]/50 mb-4">
                    You have no past orders yet.
                  </p>
                  <Link
                    href="/catalog"
                    className="text-sm font-semibold text-[#6a9a72] hover:underline"
                  >
                    Start shopping →
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  {myOrders.map((order) => {
                    const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0);
                    return (
                      <Link
                        key={order.id}
                        href={`/track-order?id=${encodeURIComponent(order.id)}&email=${encodeURIComponent(user.email)}`}
                        className="flex items-center justify-between gap-3 hover:opacity-80 transition-opacity"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-snug">
                            {itemCount} item(s) · {order.currency} {order.total.toLocaleString()}
                          </p>
                          <p className="text-xs text-[#16241a]/45">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full flex-shrink-0 ${
                            statusStyles[order.status] ?? "bg-white/60 text-[#16241a]/60"
                          }`}
                        >
                          {order.status}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </GlassCard>

            <GlassCard className="px-5 py-8 sm:p-8">
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
                        <p className="text-xs text-[#16241a]/50">{formatPrice(product.price)}</p>
                      </div>
                      <button
                        onClick={() => toggleSavedProduct({ slug: product.slug })}
                        disabled={togglingSaved && togglingSavedArgs?.slug === product.slug}
                        aria-label="Remove from saved products"
                        className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0 hover:bg-white transition-colors disabled:opacity-60"
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

      {showEditProfile && (
        <EditProfileModal
          onClose={() => setShowEditProfile(false)}
          currentName={user.name}
          currentEmail={user.email}
          currentCountry={user.country}
        />
      )}

      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <GlassCard className="max-w-sm w-full text-center py-8 px-6">
            <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center mx-auto mb-4">
              <LogOut size={18} className="text-[#c0574c]" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Sign out?</h2>
            <p className="text-sm text-[#16241a]/50 mb-6">
              You&apos;ll need to sign in again to view your orders and saved products.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="text-sm font-semibold border border-[#16241a]/20 text-[#16241a] px-6 py-2.5 rounded-full hover:bg-[#16241a]/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="text-sm font-semibold bg-[#c0574c] text-white px-6 py-2.5 rounded-full hover:bg-[#a84740] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </main>
  );
}
