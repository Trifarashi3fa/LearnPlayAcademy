import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  tone?: "white" | "blue" | "yellow" | "green" | "pink" | "purple";
};

const toneClasses = {
  white: "border-ink/10 bg-white",
  blue: "border-sky/15 bg-[#EEF6FF]",
  yellow: "border-sunshine/30 bg-[#FFF6D8]",
  green: "border-mint/20 bg-mint/10",
  pink: "border-coral/20 bg-coral/10",
  purple: "border-purple/20 bg-purple/10",
};

export function Card({
  children,
  className = "",
  tone = "white",
  ...props
}: CardProps) {
  return (
    <article
      className={`rounded-3xl border p-6 shadow-sm ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}