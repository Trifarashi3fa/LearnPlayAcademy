import { MvpPage } from "@/components/mvp/MvpShell";
import { WorldMapClient } from "@/components/mvp/WorldMapClient";

export const metadata = {
  title: "MVP Forest World Map",
  description: "Play through 10 Forest World levels with local progress and optional child-profile sync.",
};

export default function MvpWorldMapPage() {
  return (
    <MvpPage
      eyebrow="World Map"
      title="Forest World"
      description="Complete each level to unlock the next one. Level 1 starts unlocked."
    >
      <WorldMapClient />
    </MvpPage>
  );
}
