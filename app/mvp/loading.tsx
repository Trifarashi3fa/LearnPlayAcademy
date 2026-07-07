import { MvpEmptyState } from "@/components/mvp/MvpUi";

export default function MvpLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] px-5 py-10 text-[#082B80]">
      <div className="mx-auto max-w-4xl">
        <MvpEmptyState
          title="Loading your learning adventure"
          description="LearnBot is getting the Forest World mission ready."
        />
      </div>
    </main>
  );
}
