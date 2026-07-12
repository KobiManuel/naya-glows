"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GlassCard from "../helpers/glass/GlassCard";
import { useUserAuth } from "../../store/useUserAuth";
import { getApiErrorMessage } from "../../store/apiError";
import { countries } from "@/lib/countries";
import { isApiConfigured } from "@/lib/api";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("NG");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useUserAuth();
  const router = useRouter();

  const backendReady = isApiConfigured();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!backendReady) {
      setError(
        "The backend isn't connected yet (NEXT_PUBLIC_API_URL isn't set), so accounts can't be created right now.",
      );
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signin") {
        await login(email, password);
      } else {
        await register({ email, password, name, country });
      }
      router.push("/account");
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <GlassCard className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden !rounded-[2rem]">
            {/* Image side */}
            <div className="relative hidden lg:block min-h-[560px]">
              <Image
                src="/images/new/IMG_7419.JPG"
                alt="Naya Glows"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10160f]/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#c7ecc9] mb-2">
                  Naya Glows
                </p>
                <p className="text-white text-lg font-light leading-snug">
                  Clean, potent skincare — made for your glow.
                </p>
              </div>
            </div>

            {/* Form side */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-1 bg-white/70 rounded-full p-1 mb-8 w-fit">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`text-sm font-medium px-5 py-2 rounded-full transition-colors ${
                    mode === "signin" ? "bg-[#16241a] text-white" : "text-[#16241a]/60"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode("create")}
                  className={`text-sm font-medium px-5 py-2 rounded-full transition-colors ${
                    mode === "create" ? "bg-[#16241a] text-white" : "text-[#16241a]/60"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h1 className="text-2xl font-light mb-2">
                {mode === "signin" ? "Welcome back" : "Join Naya Glows"}
              </h1>
              <p className="text-sm text-[#16241a]/50 mb-8">
                {mode === "signin"
                  ? "Sign in to view your orders and saved products."
                  : "Create an account to track orders and save favorites."}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === "create" && (
                  <input
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                )}
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  minLength={8}
                />
                {mode === "create" && (
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={inputClass}
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                )}

                {error && <p className="text-xs text-[#c0574c]">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 bg-[#16241a] text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
                >
                  {submitting
                    ? "Please wait…"
                    : mode === "signin"
                      ? "Sign In"
                      : "Create Account"}
                </button>
              </form>

              {!backendReady && (
                <p className="text-xs text-[#16241a]/35 mt-6 leading-relaxed">
                  This is a preview experience — the backend isn&apos;t
                  connected yet, so sign in/create account won&apos;t work
                  until it is.
                </p>
              )}
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
