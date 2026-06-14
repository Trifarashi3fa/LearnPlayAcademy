import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8">
      <p className="font-black text-coral">Page not found</p>
      <h1 className="mt-3 text-5xl font-black text-ink">Let's get back to learning</h1>
      <p className="mt-5 text-lg font-bold leading-8 text-ink/70">
        This page is not available, but the games and subjects are ready to explore.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/">Back Home</Button>
      </div>
    </main>
  );
}
