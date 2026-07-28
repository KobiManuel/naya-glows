"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../store/useAdminAuth";
import { getApiErrorMessage } from "../../../store/apiError";
import { isApiConfigured } from "@/lib/api";
import PasswordInput from "../../../components/PasswordInput";

const inputClass =
  "w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#8ab88e] transition-colors";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, loggingIn: submitting, logout } = useAdminAuth();
  const router = useRouter();
  const backendReady = isApiConfigured();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!backendReady) {
      setError("NEXT_PUBLIC_API_URL isn't configured yet.");
      return;
    }

    try {
      const user = await login(email, password);
      if (user.role !== "ADMIN") {
        logout();
        setError("This account doesn't have admin access.");
        return;
      }
      router.push("/admin");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <main className="min-h-screen bg-[#10160f] text-white flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#8ab88e] mb-2 text-center">
          Naya Glows
        </p>
        <h1 className="text-2xl font-light text-center mb-8">Admin Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <PasswordInput
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            autoComplete="current-password"
          />

          {error && <p className="text-xs text-[#e28a7d]">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-gradient-to-r from-[#8ab88e] to-[#4f7957] text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:brightness-105 transition-all disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
