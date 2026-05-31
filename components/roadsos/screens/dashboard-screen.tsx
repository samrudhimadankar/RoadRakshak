"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle2, Clock, Ambulance, BedDouble, Activity, Bell, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const INCOMING = [
  {
    id: "INC-2847",
    type: "ACCIDENT + INJURY",
    severity: "CRITICAL" as const,
    eta: "4 min",
    blood: "B+",
    notes: "Adult male, road accident, possible TBI",
    ambulance: "PCMC-AMB-47",
    distance: "1.2 km",
  },
  {
    id: "INC-2843",
    type: "UNCONSCIOUS",
    severity: "HIGH" as const,
    eta: "12 min",
    blood: "Unknown",
    notes: "Unknown, found by bystander on NH-48",
    ambulance: "PCMC-AMB-03",
    distance: "4.8 km",
  },
]

const ACTIVE = [
  { id: "INC-2839", type: "Fracture", status: "In Treatment", bay: "Trauma Bay 1", time: "22 min ago" },
  { id: "INC-2835", type: "Burns", status: "ICU Admitted", bay: "ICU Room 4", time: "41 min ago" },
]

const severityConfig = {
  CRITICAL: {
    badge: "bg-[oklch(0.55_0.22_27/0.15)] text-[oklch(0.65_0.22_27)] border-[oklch(0.55_0.22_27/0.4)]",
    dot: "bg-[oklch(0.55_0.22_27)]",
  },
  HIGH: {
    badge: "bg-[oklch(0.75_0.15_80/0.15)] text-[oklch(0.80_0.15_80)] border-[oklch(0.75_0.15_80/0.4)]",
    dot: "bg-[oklch(0.75_0.15_80)]",
  },
}

export function DashboardScreen() {
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set())

  const handleAck = (id: string) => {
    setAcknowledged((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Hospital Portal</h1>
            <p className="text-xs text-muted-foreground">Sassoon General — Trauma Level 1</p>
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[oklch(0.55_0.22_27)] text-white text-xs flex items-center justify-center font-bold"
              aria-label="2 unread alerts"
            >
              2
            </span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2.5 mt-3">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <BedDouble className="w-4 h-4 text-[oklch(0.72_0.18_150)] mx-auto mb-1" aria-hidden="true" />
            <div className="text-xl font-bold font-mono text-foreground">4</div>
            <div className="text-xs text-muted-foreground">ICU Beds</div>
          </div>
          <div className="bg-card border border-[oklch(0.55_0.22_27/0.3)] rounded-xl p-3 text-center">
            <Ambulance className="w-4 h-4 text-[oklch(0.65_0.22_27)] mx-auto mb-1 ambulance-move" aria-hidden="true" />
            <div className="text-xl font-bold font-mono text-[oklch(0.65_0.22_27)]">2</div>
            <div className="text-xs text-muted-foreground">En Route</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <Activity className="w-4 h-4 text-[oklch(0.70_0.18_230)] mx-auto mb-1" aria-hidden="true" />
            <div className="text-xl font-bold font-mono text-foreground">2</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
        </div>
      </div>

      {/* Incoming pre-alerts */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
            Incoming Pre-Alerts
          </p>
          <div className="flex flex-col gap-3">
            {INCOMING.map((inc) => {
              const cfg = severityConfig[inc.severity]
              const isAck = acknowledged.has(inc.id)
              return (
                <div
                  key={inc.id}
                  className={cn(
                    "bg-card border rounded-xl p-4",
                    inc.severity === "CRITICAL" && !isAck
                      ? "border-[oklch(0.55_0.22_27/0.5)]"
                      : "border-border"
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full shrink-0", cfg.dot, !isAck && "status-glow")} aria-hidden="true" />
                      <span className="text-sm font-semibold text-foreground">{inc.type}</span>
                    </div>
                    <span className={cn("text-xs px-1.5 py-0.5 rounded border font-medium shrink-0", cfg.badge)}>
                      {inc.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{inc.notes}</p>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-muted-foreground font-mono">{inc.id}</span>
                    <span className="text-xs text-[oklch(0.80_0.15_80)] flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {inc.eta}
                    </span>
                    <span className="text-xs text-muted-foreground">Blood: {inc.blood}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAck ? (
                      <div className="flex items-center gap-1.5 text-xs text-[oklch(0.72_0.18_150)]">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        Trauma team alerted
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAck(inc.id)}
                        className="flex-1 py-2 rounded-lg bg-[oklch(0.55_0.22_27)] text-white text-xs font-semibold hover:bg-[oklch(0.60_0.24_27)] active:scale-95 transition-all cursor-pointer"
                      >
                        Acknowledge &amp; Prepare Team
                      </button>
                    )}
                    <button
                      className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground cursor-pointer"
                      aria-label="View details"
                    >
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Active incidents */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
            Active in Hospital
          </p>
          <div className="flex flex-col gap-2.5">
            {ACTIVE.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.18_150)] shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{item.bay}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-[oklch(0.72_0.18_150)]">{item.status}</p>
                  <p className="text-xs text-muted-foreground font-mono">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
