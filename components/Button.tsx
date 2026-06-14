import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-coral text-white shadow-playful hover:-translate-y-0.5 hover:bg-[#ff5858]"
      : "bg-white text-ink ring-2 ring-sky/25 hover:-translate-y-0.5 hover:ring-sky";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-extrabold transition ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
