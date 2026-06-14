type GameCardProps = {
  title: string;
  description: string;
  badge: string;
  accent: string;
  href?: string;
};

export function GameCard({
  title,
  description,
  badge,
  accent,
  href = "#",
}: GameCardProps) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-playful focus:outline-none focus:ring-4 focus:ring-sky/25"
      aria-label={`${title} demo card`}
    >
      <span
        className={`mb-5 inline-flex rounded-full px-3 py-1 text-sm font-black ${accent}`}
      >
        {badge}
      </span>
      <h3 className="text-2xl font-black text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-ink/70">{description}</p>
      <span className="mt-5 inline-flex font-black text-sky">View demo</span>
    </a>
  );
}
