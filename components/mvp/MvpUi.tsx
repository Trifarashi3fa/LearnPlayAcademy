"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

type Tone = "blue" | "pink" | "green" | "yellow" | "white" | "danger" | "soft";
type Size = "sm" | "md" | "lg";

export const mvpFocusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0B63F6]/25";
export const mvpTapTarget = "min-h-12";
export const mvpCardClass = "rounded-[1.5rem] border border-[#DDE8F5] bg-white shadow-sm";
export const mvpInsetCardClass = "rounded-[1.25rem] border border-[#DDE8F5] bg-[#F8FBFF]";
export const mvpMutedText = "font-bold leading-7 text-[#5B6B94]";
export const mvpFieldClass = "min-h-12 w-full rounded-[1.25rem] border-2 border-[#DDE8F5] bg-white px-4 text-base font-bold text-[#082B80] outline-none transition placeholder:text-[#5B6B94]/60 focus:border-[#0B63F6] focus:ring-4 focus:ring-[#0B63F6]/20";

const toneClasses: Record<Tone, string> = {
  blue: "bg-[#0B63F6] text-white hover:bg-[#084FC5]",
  pink: "bg-[#FF4FA0] text-white hover:bg-[#E83D8E]",
  green: "bg-[#66CC00] text-[#082B80] hover:bg-[#58B800]",
  yellow: "bg-[#FFF3C4] text-[#082B80] hover:bg-[#FFE68A]",
  white: "border-2 border-[#DDE8F5] bg-white text-[#082B80] hover:border-[#0B63F6] hover:bg-[#EAF6FF]",
  danger: "border-2 border-[#FCA5A5] bg-white text-[#B91C1C] hover:bg-[#FEE2E2]",
  soft: "bg-[#EAF6FF] text-[#0B63F6] hover:bg-[#DCEEFF]",
};

const sizeClasses: Record<Size, string> = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-sm sm:text-base",
  lg: "min-h-14 px-7 py-4 text-base sm:text-lg",
};

export function mvpButtonClass({
  tone = "blue",
  size = "md",
  disabled = false,
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  disabled?: boolean;
  className?: string;
} = {}) {
  const disabledClass = disabled
    ? "cursor-not-allowed bg-[#C9D7EA] text-[#5B6B94] hover:bg-[#C9D7EA]"
    : toneClasses[tone];

  return [
    "inline-flex items-center justify-center rounded-full text-center font-black shadow-sm transition motion-reduce:transition-none",
    "active:scale-[0.98]",
    mvpFocusRing,
    sizeClasses[size],
    disabledClass,
    className,
  ].filter(Boolean).join(" ");
}

export function MvpButtonLink({
  href,
  children,
  tone = "blue",
  size = "md",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  return (
    <Link href={href} className={mvpButtonClass({ tone, size, className })} {...props}>
      {children}
    </Link>
  );
}

export function MvpButton({
  children,
  tone = "blue",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: Tone;
  size?: Size;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={mvpButtonClass({ tone, size, disabled, className })}
      {...props}
    >
      {children}
    </button>
  );
}

export function MvpField({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-[#082B80]">
      <span>{label}</span>
      {children}
      {helper ? <span className="text-xs font-bold leading-5 text-[#5B6B94]">{helper}</span> : null}
      {error ? <span className="text-xs font-bold leading-5 text-[#B91C1C]">{error}</span> : null}
    </label>
  );
}

export function MvpInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${mvpFieldClass} ${className}`} {...props} />;
}

export function MvpSelect({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`${mvpFieldClass} ${className}`} {...props}>{children}</select>;
}

export function MvpSurface({
  children,
  className = "",
  as: Component = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "aside" | "div";
}) {
  return <Component className={`${mvpCardClass} p-5 sm:p-6 ${className}`}>{children}</Component>;
}

export function MvpInsetSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${mvpInsetCardClass} p-4 ${className}`}>{children}</div>;
}

export function MvpProgressBar({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      {label ? <p className="sr-only">{label}: {safeValue}%</p> : null}
      <div className="h-3 overflow-hidden rounded-full bg-[#EAF6FF]" aria-hidden={Boolean(label)}>
        <div className="h-full rounded-full bg-[#22C55E] transition-[width] duration-500 ease-out motion-reduce:transition-none" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}

export function MvpMetricCard({
  label,
  value,
  tone = "blue",
}: {
  label: string;
  value: string | number;
  tone?: "blue" | "green" | "yellow" | "pink";
}) {
  const toneClass = {
    blue: "bg-[#EAF6FF]",
    green: "bg-[#EAFBF0]",
    yellow: "bg-[#FFF7D6]",
    pink: "bg-[#FFF0F7]",
  }[tone];

  return (
    <div className={`rounded-[1.5rem] p-5 transition-all duration-200 motion-reduce:transition-none ${toneClass}`}>
      <p className="text-sm font-black uppercase tracking-wide text-[#5B6B94]">{label}</p>
      <p className="mt-2 text-3xl font-black text-[#082B80]">{value}</p>
    </div>
  );
}

export function MvpEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <MvpSurface className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-[#EAF6FF] text-2xl font-black text-[#0B63F6]" aria-hidden>
        LP
      </div>
      <h2 className="mt-4 text-2xl font-black text-[#082B80]">{title}</h2>
      <p className={`mx-auto mt-2 max-w-xl ${mvpMutedText}`}>{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </MvpSurface>
  );
}

export function MvpStatusPill({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "yellow" | "pink" | "red";
}) {
  const toneClass = {
    blue: "bg-[#EAF6FF] text-[#0B63F6]",
    green: "bg-[#DCFCE7] text-[#15803D]",
    yellow: "bg-[#FFF3C4] text-[#9A6700]",
    pink: "bg-[#FFF0F7] text-[#C02670]",
    red: "bg-[#FEE2E2] text-[#B91C1C]",
  }[tone];

  return (
    <span className={`inline-flex min-h-8 items-center rounded-full px-3 py-1 text-xs font-black ${toneClass}`}>
      {children}
    </span>
  );
}
