import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
  description: "Redirects to the LearnPlay Academy parent login page.",
};

export default function LoginPage() {
  redirect("/auth/login");
}
