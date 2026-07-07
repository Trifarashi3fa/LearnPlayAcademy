"use client";

import { useRouter } from "next/navigation";
import { MvpButton } from "@/components/mvp/MvpUi";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }

    router.push("/auth/login");
    router.refresh();
  }

  return (
    <MvpButton onClick={handleLogout} tone="white" size="sm">
      Logout
    </MvpButton>
  );
}
