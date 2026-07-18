import { MvpPage } from "@/components/mvp/MvpShell";
import { WorldMapClient } from "@/components/mvp/WorldMapClient";
import { englishWorldIdentity } from "@/data/english-world-identity";
import { englishLevels } from "@/data/mvp-english-world";

export const metadata = {
  title: "English Forest World Map",
  description: "Play through 10 English Year 1 Forest World levels.",
};

export default function EnglishWorldMapPage() {
  return (
    <MvpPage
      eyebrow="English World Map"
      title="Forest World"
      description="Complete each English level to unlock the next reading mission. Level 1 starts unlocked."
    >
      <WorldMapClient
        levels={englishLevels}
        identity={englishWorldIdentity}
        packageLabel="Free English Starter World"
        levelHrefBase="/english/level"
        rewardsHref="/english/world-map"
        dashboardHref="/mvp/parent-dashboard"
      />
    </MvpPage>
  );
}
