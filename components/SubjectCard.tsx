type SubjectCardProps = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export function SubjectCard({
  title,
  description,
  icon,
  color,
}: SubjectCardProps) {
  return (
    <article className="group rounded-lg border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-playful">
      <div
        className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl text-2xl ${color}`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-black text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/70">{description}</p>
    </article>
  );
}
