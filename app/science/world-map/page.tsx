import { MvpPage } from "@/components/mvp/MvpShell";
import { WorldMapClient } from "@/components/mvp/WorldMapClient";
import { scienceLevels } from "@/data/mvp-science-world";
import { scienceWorldIdentity } from "@/data/science-world-identity";

export const metadata = {
  title: "Science Forest World Map",
  description: "Play through 10 Science Year 1 Forest World levels.",
};

export default function ScienceWorldMapPage() {
  return (
    <MvpPage
      eyebrow="Science World Map"
      title="Forest World"
      description="Complete each Science level to unlock the next discovery mission. Level 1 starts unlocked."
    >
      <WorldMapClient
        levels={scienceLevels}
        identity={scienceWorldIdentity}
        packageLabel="Free Science Starter World"
        levelHrefBase="/science/level"
        rewardsHref="/science/world-map"
        dashboardHref="/mvp/parent-dashboard"
      />
    </MvpPage>
  );
}
