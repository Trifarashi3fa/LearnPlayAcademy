"use client";

import { MvpButton, MvpButtonLink, MvpEmptyState } from "@/components/mvp/MvpUi";

export default function MvpError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#FFFDF7] px-5 py-10 text-[#082B80]">
      <div className="mx-auto max-w-4xl">
        <MvpEmptyState
          title="This mission needs a quick refresh"
          description="Your progress is stored safely on this device. Try again or return to the Forest World map."
          action={(
            <div className="flex flex-wrap justify-center gap-3">
              <MvpButton onClick={reset}>Try Again</MvpButton>
              <MvpButtonLink href="/mvp/world-map" tone="white">World Map</MvpButtonLink>
            </div>
          )}
        />
      </div>
    </main>
  );
}
