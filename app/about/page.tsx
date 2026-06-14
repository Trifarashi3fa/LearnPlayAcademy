export default function AboutPage() {
  return (
    <main>
      <section className="bg-[#fff7d8]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <p className="font-black text-coral">About</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight text-ink">
            LearnPlay Academy helps children learn school skills through games,
            quizzes, and rewards.
          </h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 md:grid-cols-3 lg:px-8">
        {[
          {
            title: "Games",
            copy: "Learning starts with playful challenges that feel inviting and age-appropriate.",
          },
          {
            title: "Quizzes",
            copy: "Short practice moments help children build steady confidence over time.",
          },
          {
            title: "Rewards",
            copy: "Stars, streaks, and celebration moments make progress feel visible.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-ink">{item.title}</h2>
            <p className="mt-3 leading-7 text-ink/70">{item.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
