"use client"

import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PipelineStep {
  id: number
  label: string
  sublabel?: string
  status: "pending" | "active" | "done"
}

interface PipelineStepsProps {
  steps: PipelineStep[]
}

export function PipelineSteps({ steps }: PipelineStepsProps) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, i) => (
        <li key={step.id} className="flex items-center gap-3">
          {/* Icon */}
          <div className="shrink-0">
            {step.status === "done" && (
              <CheckCircle2 className="w-5 h-5 text-[oklch(0.62_0.18_150)]" aria-hidden="true" />
            )}
            {step.status === "active" && (
              <Loader2 className="w-5 h-5 text-[oklch(0.55_0.22_27)] animate-spin" aria-hidden="true" />
            )}
            {step.status === "pending" && (
              <Circle className="w-5 h-5 text-border" aria-hidden="true" />
            )}
          </div>
          {/* Connector */}
          <div className="flex-1">
            <span
              className={cn(
                "text-sm font-medium",
                step.status === "done" && "text-[oklch(0.62_0.18_150)]",
                step.status === "active" && "text-foreground",
                step.status === "pending" && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
            {step.sublabel && step.status !== "pending" && (
              <p className="text-xs text-muted-foreground mt-0.5">{step.sublabel}</p>
            )}
          </div>
          {/* Step number badge */}
          <span className={cn(
            "text-xs font-mono shrink-0 px-1.5 py-0.5 rounded",
            step.status === "done" && "bg-[oklch(0.62_0.18_150/0.15)] text-[oklch(0.62_0.18_150)]",
            step.status === "active" && "bg-[oklch(0.55_0.22_27/0.15)] text-[oklch(0.55_0.22_27)]",
            step.status === "pending" && "bg-secondary text-muted-foreground"
          )}>
            {String(i + 1).padStart(2, "0")}
          </span>
        </li>
      ))}
    </ol>
  )
}
