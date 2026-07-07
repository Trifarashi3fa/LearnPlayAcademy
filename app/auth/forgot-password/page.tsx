import type { Metadata } from "next";
import { Suspense } from "react";
import { ParentAuthForm } from "@/components/account/ParentAuthForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a LearnPlay Academy password reset email.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] px-5 py-12 text-[#082B80] lg:px-8">
      <Suspense fallback={<div className="mx-auto max-w-xl rounded-[1.5rem] bg-white p-6 text-center font-black text-[#082B80]">Loading password help...</div>}>
        <ParentAuthForm mode="forgot-password" />
      </Suspense>
    </main>
  );
}
