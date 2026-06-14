import Link from "next/link";
import { Card } from "@/components/Card";
import { typography } from "@/components/theme";

type SubjectCardProps = {
  title: string;
  description: string;
  icon: string;
  tone?: "blue" | "yellow" | "green" | "pink" | "purple";
  href?: string;
};

const iconToneClasses = {
  blue: "bg-sky text-white",
  yellow: "bg-sunshine text-ink",
  green: "bg-mint text-ink",
  pink: "bg-coral text-white",
  purple: "bg-purple text-white",
};

function SubjectCardContent({
  title,
  description,
  icon,
  tone = "blue",
}: Omit<SubjectCardProps, "href">) {
  return (
    <Card className="h-full transition hover:-translate-y-1 hover:shadow-playful" tone="white">
      <div className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl text-lg font-black ${iconToneClasses[tone]}`}>
        {icon}
      </div>
      <h3 className={typography.h3}>{title}</h3>
      <p className={`mt-2 ${typography.small}`}>{description}</p>
      <span className="mt-5 inline-flex font-black text-sky">Start Learning</span>
    </Card>
  );
}

export function SubjectCard({
  title,
  description,
  icon,
  tone = "blue",
  href,
}: SubjectCardProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-3xl focus:outline-none focus:ring-4 focus:ring-sky/25"
        aria-label={`Start learning ${title}`}
      >
        <SubjectCardContent
          title={title}
          description={description}
          icon={icon}
          tone={tone}
        />
      </Link>
    );
  }

  return (
    <SubjectCardContent
      title={title}
      description={description}
      icon={icon}
      tone={tone}
    />
  );
}