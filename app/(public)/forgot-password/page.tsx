"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GlassCard from "../helpers/glass/GlassCard";
import PasswordInput from "../../components/PasswordInput";
import { useUserAuth } from "../../store/useUserAuth";
import { getApiErrorMessage } from "../../store/apiError";
import { isApiConfigured } from "@/lib/api";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

type Step = "request" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const {
    requestPasswordReset,
    requestingPasswordReset,
    confirmPasswordReset,
    confirmingPasswordReset,
  } = useUserAuth();
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const backendReady = isApiConfigured();

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!backendReady) {
      toast.error("Payments aren't connected yet (NEXT_PUBLIC_API_URL isn't set).");
      return;
    }
    try {
      await requestPasswordReset(email);
      setStep("reset");
      toast.success(`If an account exists for ${email}, a code is on its way.`);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Couldn't send a reset code. Please try again."));
    }
  };

  const handleResend = async () => {
    try {
      await requestPasswordReset(email);
      toast.success("Code resent.");
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await confirmPasswordReset(email, otpCode, newPassword);
      toast.success("Password reset — please sign in.");
      router.push("/signin");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Couldn't reset your password. Please try again."));
    }
  };

  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[480px] mx-auto">
          <GlassCard className="px-6 py-10 sm:p-10">
            <h1 className="text-2xl font-light mb-2">
              {step === "request" ? "Forgot your password?" : "Check your email"}
            </h1>
            <p className="text-sm text-[#16241a]/50 mb-8">
              {step === "request"
                ? "Enter your account email and we'll send you a code to reset it."
                : `We sent a 6-digit code to ${email}. Enter it below with your new password.`}
            </p>

            {step === "request" ? (
              <form onSubmit={handleRequest} className="flex flex-col gap-4">
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  disabled={requestingPasswordReset}
                  className="mt-2 bg-[#16241a] text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
                >
                  {requestingPasswordReset ? "Sending…" : "Send Reset Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleReset} className="flex flex-col gap-4">
                <input
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  className={`${inputClass} text-center text-lg tracking-[0.5em] font-semibold`}
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
                <div className="flex items-center justify-between text-xs text-[#16241a]/50">
                  <button
                    type="button"
                    onClick={() => setStep("request")}
                    className="font-medium hover:text-[#16241a] transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={requestingPasswordReset}
                    className="font-medium hover:text-[#16241a] transition-colors disabled:opacity-50"
                  >
                    {requestingPasswordReset ? "Sending…" : "Resend code"}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={confirmingPasswordReset}
                  className="mt-2 bg-[#16241a] text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
                >
                  {confirmingPasswordReset ? "Resetting…" : "Reset Password"}
                </button>
              </form>
            )}

            <p className="text-xs text-[#16241a]/45 mt-8 text-center">
              <Link href="/signin" className="font-semibold text-[#16241a] hover:underline">
                Back to Sign In
              </Link>
            </p>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
