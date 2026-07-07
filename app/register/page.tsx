import { redirect } from "next/navigation";

export const metadata = {
  title: "Register",
  description: "Redirects to the LearnPlay Academy parent registration page.",
};

export default function RegisterPage() {
  redirect("/auth/register");
}
