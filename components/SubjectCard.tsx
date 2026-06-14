import { Card } from "@/components/Card";
import { typography } from "@/components/theme";

type SubjectCardProps = {
  title: string;
  description: string;
  icon: string;
  tone?: "blue" | "yellow" | "green" | "pink" | "purple";
};

const iconToneClasses = {
  blue: "bg-sky text-white",
  yellow: "bg-sunshine text-ink",
  green: "bg-mint text-ink",
  pink: "bg-coral text-white",
  purple: "bg-purple text-white",
};

export function SubjectCard({
  title,
  description,
  icon,
  tone = "blue",
}: SubjectCardProps) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-playful" tone="white">
      <div className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl text-lg font-black ${iconToneClasses[tone]}`}>
        {icon}
      </div>
      <h3 className={typography.h3}>{title}</h3>
      <p className={`mt-2 ${typography.small}`}>{description}</p>
    </Card>
  );
}
