import { cn } from "@/lib/utils"

interface StatCardProps {
  value: string
  label: string
  sublabel?: string
  variant?: "danger" | "warning" | "success" | "info" | "neutral"
  className?: string
}

const variantStyles: Record<NonNullable<StatCardProps["variant"]>, string> = {
  danger: "border-[oklch(0.55_0.22_27/0.4)] bg-[oklch(0.55_0.22_27/0.08)]",
  warning: "border-[oklch(0.75_0.15_80/0.4)] bg-[oklch(0.75_0.15_80/0.08)]",
  success: "border-[oklch(0.62_0.18_150/0.4)] bg-[oklch(0.62_0.18_150/0.08)]",
  info: "border-[oklch(0.60_0.18_230/0.4)] bg-[oklch(0.60_0.18_230/0.08)]",
  neutral: "border-border bg-secondary",
}

const valueStyles: Record<NonNullable<StatCardProps["variant"]>, string> = {
  danger: "text-[oklch(0.65_0.22_27)]",
  warning: "text-[oklch(0.80_0.15_80)]",
  success: "text-[oklch(0.72_0.18_150)]",
  info: "text-[oklch(0.70_0.18_230)]",
  neutral: "text-foreground",
}

export function StatCard({ value, label, sublabel, variant = "neutral", className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border p-4 flex flex-col gap-1", variantStyles[variant], className)}>
      <span className={cn("text-2xl font-bold font-mono leading-none", valueStyles[variant])}>
        {value}
      </span>
      <span className="text-xs font-medium text-foreground leading-relaxed">{label}</span>
      {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
    </div>
  )
}
