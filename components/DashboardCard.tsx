import type { ReactNode } from "react";
import { Card } from "@/components/Card";

type DashboardCardProps = {
  title: string;
  value?: string | number;
  helper?: string;
  children?: ReactNode;
  tone?: "white" | "blue" | "yellow" | "green" | "pink" | "purple";
  className?: string;
};

export function DashboardCard({
  title,
  value,
  helper,
  children,
  tone = "white",
  className = "",
}: DashboardCardProps) {
  return (
    <Card className={`h-full ${className}`} tone={tone}>
      <p className="text-sm font-black uppercase tracking-wide text-ink/60">
        {title}
      </p>
      {value !== undefined ? (
        <p className="mt-3 text-4xl font-black text-ink">{value}</p>
      ) : null}
      {helper ? <p className="mt-2 text-sm font-bold text-ink/70">{helper}</p> : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </Card>
  );
}

export function ProgressBar({
  value,
  label,
  colorClass = "bg-sky",
}: {
  value: number;
  label?: string;
  colorClass?: string;
}) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm font-black text-ink/70">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      ) : null}
      <div className="h-3 overflow-hidden rounded-full bg-white">
        <div
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
