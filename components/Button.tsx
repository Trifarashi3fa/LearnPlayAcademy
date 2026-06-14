import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type SharedButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "blue" | "green" | "purple";
  className?: string;
};

type LinkButtonProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseClasses =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-extrabold transition focus:outline-none focus:ring-4 focus:ring-sky/25";

const variantClasses = {
  primary:
    "bg-coral text-white shadow-playful hover:-translate-y-0.5 hover:bg-[#e83d8e]",
  secondary:
    "bg-white text-ink ring-2 ring-sky/20 hover:-translate-y-0.5 hover:ring-sky",
  blue: "bg-sky text-white shadow-playful hover:-translate-y-0.5 hover:bg-[#0a51c9]",
  green:
    "bg-mint text-ink shadow-playful hover:-translate-y-0.5 hover:bg-[#58b800]",
  purple:
    "bg-purple text-white shadow-playful hover:-translate-y-0.5 hover:bg-[#7b35dd]",
};

function isLinkButton(props: ButtonProps): props is LinkButtonProps {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (isLinkButton(props)) {
    const { href, children: _children, variant: _variant, className: _className, ...linkProps } = props;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { children: _children, variant: _variant, className: _className, ...buttonProps } = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
