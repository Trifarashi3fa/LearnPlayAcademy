import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { StudentDashboard } from "@/components/StudentDashboard";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <div className="mx-auto flex max-w-6xl justify-end px-5 pt-6 lg:px-8">
        <LogoutButton />
      </div>
      <StudentDashboard userEmail={user.email ?? "Student"} />
    </div>
  );
}
