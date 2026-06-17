import { redirect } from "next/navigation";

export const metadata = {
  title: "Parent Dashboard",
  description: "Redirects to the local LearnPlay MVP parent dashboard.",
};

export default function DashboardPage() {
  redirect("/mvp/parent-dashboard");
}