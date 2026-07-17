"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MvpButton, MvpField, MvpInput, MvpStatusPill, MvpSurface } from "@/components/mvp/MvpUi";
import { trackLearningEvent } from "@/lib/learning-analytics/client";
import { getAuthRedirectUrl } from "@/lib/supabase/auth-redirect";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type ParentAuthFormProps = {
  mode: "login" | "register" | "forgot-password";
};

export function ParentAuthForm({ mode }: ParentAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const copy = useMemo(() => {
    if (mode === "register") {
      return {
        eyebrow: "Parent account",
        title: "Create your parent account",
        description: "Use a parent email and password to prepare one nickname-based child profile for the Forest World MVP.",
        button: "Create Account",
      };
    }

    if (mode === "forgot-password") {
      return {
        eyebrow: "Password help",
        title: "Reset your password",
        description: "Enter your email and Supabase will send a password reset link if the account exists.",
        button: "Send Reset Link",
      };
    }

    return {
      eyebrow: "Welcome back",
      title: "Log in to LearnPlay",
      description: "Continue to your parent account, child profile, and saved Forest World progress.",
      button: "Log In",
    };
  }, [mode]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!isSupabaseConfigured()) {
      trackLearningEvent("app_error", {
        area: "auth",
        message: "Supabase client is not configured.",
        recoverable: true,
      });
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.");
      return;
    }

    if (mode === "register") trackLearningEvent("auth_register_started", { method: "email" });
    if (mode === "login") trackLearningEvent("auth_login_started", { method: "email" });
    if (mode === "forgot-password") trackLearningEvent("auth_password_reset_requested", { method: "email" });

    setIsLoading(true);
    const supabase = createClient();
    const trimmedEmail = email.trim();

    if (mode === "forgot-password") {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo: getAuthRedirectUrl("/auth/login"),
      });

      setIsLoading(false);
      if (resetError) {
        trackLearningEvent("auth_password_reset_requested", { method: "email", result: "failure" });
        setError(resetError.message);
        return;
      }

      trackLearningEvent("auth_password_reset_requested", { method: "email", result: "success" });
      setMessage("If an account exists for this email, a password reset link has been sent.");
      return;
    }

    if (mode === "register") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          emailRedirectTo: getAuthRedirectUrl("/account"),
          data: {
            display_name: trimmedEmail.split("@")[0],
          },
        },
      });

      if (signUpError) {
        trackLearningEvent("auth_register_completed", { method: "email", result: "failure", reason: signUpError.message });
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      trackLearningEvent("auth_register_completed", { method: "email", result: "success" });
      if (data.session) {
        router.push("/account");
        router.refresh();
        return;
      }

      setMessage("Check your email to confirm your account, then log in.");
      setIsLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (signInError) {
      trackLearningEvent("auth_login_completed", { method: "email", result: "failure", reason: signInError.message });
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    trackLearningEvent("auth_login_completed", { method: "email", result: "success" });
    router.push(next);
    router.refresh();
  }

  return (
    <MvpSurface className="mx-auto max-w-xl shadow-playful">
      <div className="mb-5">
        <MvpStatusPill tone={mode === "register" ? "green" : "blue"}>{copy.eyebrow}</MvpStatusPill>
        <h1 className="mt-4 text-3xl font-black leading-tight text-[#082B80] sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 text-base font-bold leading-7 text-[#5B6B94]">{copy.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <MvpField label="Parent email">
          <MvpInput
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </MvpField>

        {mode !== "forgot-password" ? (
          <MvpField label="Password" helper={mode === "register" ? "Use at least 6 characters." : undefined}>
            <MvpInput
              id="password"
              type="password"
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
            />
          </MvpField>
        ) : null}

        {error ? <div className="rounded-[1.25rem] bg-[#FEE2E2] p-4 text-sm font-bold text-[#B91C1C]" role="alert">{error}</div> : null}
        {message ? <div className="rounded-[1.25rem] bg-[#DCFCE7] p-4 text-sm font-bold text-[#14532D]" role="status">{message}</div> : null}

        <MvpButton type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Please wait..." : copy.button}
        </MvpButton>

        <div className="rounded-[1.25rem] bg-[#EAF6FF] p-3 text-center text-xs font-bold leading-5 text-[#5B6B94]">
          The MVP child profile uses a nickname only. Do not enter a child legal name, school, address, phone number, or date of birth.
        </div>

        <div className="grid gap-2 text-center text-sm font-bold text-[#5B6B94]">
          {mode === "login" ? (
            <>
              <Link href="/auth/forgot-password" className="font-black text-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">Forgot password?</Link>
              <span>New to LearnPlay? <Link href="/auth/register" className="font-black text-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">Create an account</Link></span>
            </>
          ) : (
            <span>Already have an account? <Link href="/auth/login" className="font-black text-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">Log in</Link></span>
          )}
        </div>
      </form>
    </MvpSurface>
  );
}

