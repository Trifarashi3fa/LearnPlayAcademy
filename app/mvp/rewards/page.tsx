import { MvpPage } from "@/components/mvp/MvpShell";
import { RewardsClient } from "@/components/mvp/RewardsClient";

export const metadata = {
  title: "MVP Rewards",
  description: "View local XP, stars, badges, and Forest World rewards.",
};

export default function MvpRewardsPage() {
  return (
    <MvpPage
      eyebrow="Rewards"
      title="XP, Stars, and Badges"
      description="Rewards are saved locally on this device using browser localStorage."
    >
      <RewardsClient />
    </MvpPage>
  );
}