import { MvpPage } from "@/components/mvp/MvpShell";
import { RewardsClient } from "@/components/mvp/RewardsClient";

export const metadata = {
  title: "MVP Rewards",
  description: "View XP, stars, badges, and Forest World rewards stored locally and, when available, synced to the selected child profile.",
};

export default function MvpRewardsPage() {
  return (
    <MvpPage
      eyebrow="Rewards"
      title="XP, Stars, and Badges"
      description="Rewards are saved locally first. Logged-in parent accounts with a selected child profile may also sync level-completion progress."
    >
      <RewardsClient />
    </MvpPage>
  );
}
