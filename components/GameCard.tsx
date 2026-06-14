import { Card } from "@/components/Card";
import { typography } from "@/components/theme";

type GameCardProps = {
  title: string;
  description: string;
  badge: string;
  tone?: "blue" | "yellow" | "green" | "pink" | "purple";
  href?: string;
};

const badgeToneClasses = {
  blue: "bg-sky/15 text-sky",
  yellow: "bg-sunshine/80 text-ink",
  green: "bg-mint/20 text-mint",
  pink: "bg-coral/15 text-coral",
  purple: "bg-purple/15 text-purple",
};

export function GameCard({
  title,
  description,
  badge,
  tone = "blue",
  href = "#",
}: GameCardProps) {
  return (
    <a
      href={href}
      className="block rounded-3xl focus:outline-none focus:ring-4 focus:ring-sky/25"
      aria-label={`${title} demo card`}
    >
      <Card className="h-full transition hover:-translate-y-1 hover:shadow-playful" tone="white">
        <span className={`mb-5 inline-flex rounded-full px-3 py-1 text-sm font-black ${badgeToneClasses[tone]}`}>
          {badge}
        </span>
        <h3 className={typography.h3}>{title}</h3>
        <p className={`mt-3 ${typography.small}`}>{description}</p>
        <span className="mt-5 inline-flex font-black text-sky">View demo</span>
      </Card>
    </a>
  );
}
