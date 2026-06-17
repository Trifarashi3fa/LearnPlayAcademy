import { redirect } from "next/navigation";

export const metadata = {
  title: "LearnPlay Academy MVP",
  description: "Redirects to the LearnPlay Academy MVP home flow.",
};

export default function MvpHomePage() {
  redirect("/");
}