"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import GlassCard from "../helpers/glass/GlassCard";
import PasswordInput from "../../components/PasswordInput";
import { useUserAuth } from "../../store/useUserAuth";
import { getApiErrorMessage } from "../../store/apiError";
import { countries } from "@/lib/countries";
import { isApiConfigured } from "@/lib/api";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

type Mode = "signin" | "create";
// "form" collects account details and requests the OTP; "otp" verifies it
// and actually creates the account — nothing exists server-side until then.
type CreateStep = "form" | "otp";

// Split out from SignInForm and mounted with key={mode} below — this is
// what actually fixes the shared-loading-state bug: useUserAuth()'s
// login/register/requestSignupOtp mutations each track isLoading locally
// to the *hook instance* that called them, not globally. With one shared
// SignInForm instance calling all three unconditionally, submitting the
// Create Account tab left `registering`/`requestingSignupOtp` sitting at
// true, and switching to Sign In showed that same stale flag on an
// unrelated button. Remounting this component on every mode switch (via
// the `key` on its usage below) throws that whole hook subscription away
// and starts a brand new one at isLoading:false, regardless of whatever
// the previous mode's request is still doing in the background.
function AuthSubmitForm({
  mode,
  createStep,
  setCreateStep,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  country,
  setCountry,
  referralCode,
  setReferralCode,
  otpCode,
  setOtpCode,
  error,
  setError,
  backendReady,
  redirectAfterAuth,
}: {
  mode: Mode;
  createStep: CreateStep;
  setCreateStep: (step: CreateStep) => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  referralCode: string;
  setReferralCode: (v: string) => void;
  otpCode: string;
  setOtpCode: (v: string) => void;
  error: string | null;
  setError: (v: string | null) => void;
  backendReady: boolean;
  redirectAfterAuth: (role: string) => void;
}) {
  const { login, loggingIn, register, registering, requestSignupOtp, requestingSignupOtp } =
    useUserAuth();
  const submitting = loggingIn || registering || requestingSignupOtp;
  const resending = requestingSignupOtp;
  const showingOtpStep = mode === "create" && createStep === "otp";

  const handleResend = async () => {
    setError(null);
    try {
      await requestSignupOtp(email);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!backendReady) {
      setError(
        "The backend isn't connected yet (NEXT_PUBLIC_API_URL isn't set), so accounts can't be created right now.",
      );
      return;
    }

    try {
      if (mode === "signin") {
        const user = await login(email, password);
        redirectAfterAuth(user.role);
        return;
      }

      if (createStep === "form") {
        await requestSignupOtp(email);
        setCreateStep("otp");
        return;
      }

      const user = await register({
        email,
        password,
        name,
        country,
        referralCode: referralCode || undefined,
        otpCode,
      });
      redirectAfterAuth(user.role);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {mode === "create" && showingOtpStep ? (
        <>
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
          <div className="flex items-center justify-between text-xs text-[#16241a]/50">
            <button
              type="button"
              onClick={() => {
                setCreateStep("form");
                setOtpCode("");
                setError(null);
              }}
              className="font-medium hover:text-[#16241a] transition-colors"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-medium hover:text-[#16241a] transition-colors disabled:opacity-50"
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          </div>
        </>
      ) : (
        <>
          {mode === "create" && (
            <input
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              autoComplete="name"
            />
          )}
          <input
            required
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
          <PasswordInput
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            minLength={8}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
          />
          {mode === "signin" && (
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[#16241a]/50 hover:text-[#16241a] transition-colors -mt-2 self-end"
            >
              Forgot password?
            </Link>
          )}
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
          {mode === "create" && (
            <input
              placeholder="Referral code (optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              className={inputClass}
            />
          )}
        </>
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
            : showingOtpStep
              ? "Verify & Create Account"
              : "Send Verification Code"}
      </button>
    </form>
  );
}

function SignInForm() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("signin");
  const [createStep, setCreateStep] = useState<CreateStep>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("NG");
  const [referralCode, setReferralCode] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useUserAuth();
  const router = useRouter();

  const backendReady = isApiConfigured();

  // Already signed in — this page has nothing to offer, and letting a
  // signed-in visitor sit on the sign-in/create-account form is confusing.
  useEffect(() => {
    if (authLoading || !user) return;
    const redirect = searchParams.get("redirect");
    if (redirect && redirect.startsWith("/")) {
      router.replace(redirect);
    } else {
      router.replace(user.role === "INFLUENCER" ? "/influencer" : "/account");
    }
  }, [authLoading, user, router, searchParams]);

  // A referral link (e.g. shared by an influencer) looks like /signin?ref=CODE
  // — prefill it and default straight to the Create Account tab.
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralCode(ref.toUpperCase());
      setMode("create");
    }
  }, [searchParams]);

  // Switching tabs starts that flow fresh — an error (or a half-finished
  // OTP step) from the other tab has no business following you here.
  const switchMode = (next: Mode) => {
    setMode(next);
    setCreateStep("form");
    setOtpCode("");
    setError(null);
  };

  const redirectAfterAuth = (role: string) => {
    // A same-origin path the caller was bounced from (e.g. checkout,
    // influencer/apply) takes priority over the default role-based landing
    // page — only ever a relative path, never an external URL.
    const redirect = searchParams.get("redirect");
    if (redirect && redirect.startsWith("/")) {
      router.push(redirect);
    } else {
      router.push(role === "INFLUENCER" ? "/influencer" : "/account");
    }
  };

  const showingOtpStep = mode === "create" && createStep === "otp";

  // Loading (auth still resolving) or already signed in (the effect above
  // is about to redirect away) — either way, the form has nothing useful
  // to show right now.
  if (authLoading || user) {
    return <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] min-h-screen" />;
  }

  return (
    <main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] text-[#16241a] min-h-screen">
      <section className="pt-32 sm:pt-36 pb-24 px-0 sm:px-8 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <GlassCard className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden !rounded-none sm:!rounded-[2rem]">
            {/* Image side */}
            <div className="relative hidden lg:block min-h-[560px]">
              <Image
                src="https://res.cloudinary.com/bhozkz7o/image/upload/v1784381916/naya-glows/legacy/new/img_7419.jpg"
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
            <div className="px-5 py-10 sm:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-1 bg-white/70 rounded-full p-1 mb-8 w-fit">
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className={`text-sm font-medium px-5 py-2 rounded-full transition-colors ${
                    mode === "signin" ? "bg-[#16241a] text-white" : "text-[#16241a]/60"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("create")}
                  className={`text-sm font-medium px-5 py-2 rounded-full transition-colors ${
                    mode === "create" ? "bg-[#16241a] text-white" : "text-[#16241a]/60"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h1 className="text-2xl font-light mb-2">
                {mode === "signin"
                  ? "Welcome back"
                  : showingOtpStep
                    ? "Check your email"
                    : "Join Naya Glows"}
              </h1>
              <p className="text-sm text-[#16241a]/50 mb-8">
                {mode === "signin"
                  ? "Sign in to view your orders and saved products."
                  : showingOtpStep
                    ? `We sent a 6-digit code to ${email}. Enter it below to finish creating your account.`
                    : "Create an account to track orders and save favorites."}
              </p>

              <AuthSubmitForm
                key={mode}
                mode={mode}
                createStep={createStep}
                setCreateStep={setCreateStep}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                country={country}
                setCountry={setCountry}
                referralCode={referralCode}
                setReferralCode={setReferralCode}
                otpCode={otpCode}
                setOtpCode={setOtpCode}
                error={error}
                setError={setError}
                backendReady={backendReady}
                redirectAfterAuth={redirectAfterAuth}
              />

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

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="bg-gradient-to-b from-[#eafbf0] to-[#f4faf3] min-h-screen" />}>
      <SignInForm />
    </Suspense>
  );
}
