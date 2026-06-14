import type { ReactNode } from "react";
import { typography } from "@/components/theme";

type PageLayoutProps = {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  heroTone?: "plain" | "yellow" | "blue";
};

const heroToneClasses = {
  plain: "bg-transparent",
  yellow: "bg-[#FFF6D8]",
  blue: "bg-[#EEF6FF]",
};

export function PageLayout({
  children,
  eyebrow,
  title,
  description,
  heroTone = "plain",
}: PageLayoutProps) {
  return (
    <main>
      {title ? (
        <section className={heroToneClasses[heroTone]}>
          <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
            {eyebrow ? <p className={typography.eyebrow}>{eyebrow}</p> : null}
            <h1 className={`mt-3 ${typography.h1}`}>{title}</h1>
            {description ? (
              <p className={`mt-5 max-w-3xl ${typography.body}`}>{description}</p>
            ) : null}
          </div>
        </section>
      ) : null}
      {children}
    </main>
  );
}

export function PageSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`mx-auto max-w-6xl px-5 py-14 lg:px-8 ${className}`}>{children}</section>;
}
