"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.",
      );
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const trimmedEmail = email.trim();

    if (isRegister) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      if (data.session) {
        router.push("/dashboard");
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
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="mx-auto max-w-xl shadow-playful" tone={isRegister ? "green" : "blue"}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="text-sm font-black uppercase text-ink/70">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 min-h-12 w-full rounded-3xl border-2 border-ink/10 bg-white px-4 text-base font-bold text-ink outline-none focus:border-sky"
            placeholder="student@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-black uppercase text-ink/70">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            className="mt-2 min-h-12 w-full rounded-3xl border-2 border-ink/10 bg-white px-4 text-base font-bold text-ink outline-none focus:border-sky"
            placeholder="At least 6 characters"
          />
        </div>
        {error ? (
          <div className="rounded-3xl bg-coral/10 p-4 text-sm font-bold text-ink">
            {error}
          </div>
        ) : null}
        {message ? (
          <div className="rounded-3xl bg-mint/15 p-4 text-sm font-bold text-ink">
            {message}
          </div>
        ) : null}
        <Button
          type="submit"
          disabled={isLoading}
          variant={isRegister ? "green" : "blue"}
          className="w-full"
        >
          {isLoading ? "Please wait..." : isRegister ? "Create Account" : "Log In"}
        </Button>
        <p className="text-center text-sm font-bold text-ink/70">
          {isRegister ? "Already have an account?" : "New to LearnPlay?"}{" "}
          <Link href={isRegister ? "/login" : "/register"} className="font-black text-sky">
            {isRegister ? "Log in" : "Register"}
          </Link>
        </p>
      </form>
    </Card>
  );
}
