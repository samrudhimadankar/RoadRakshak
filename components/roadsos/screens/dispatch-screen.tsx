"use client"

import { useState } from "react"
import { MapView } from "@/components/roadsos/map-view"
import { ResponderCard } from "@/components/roadsos/responder-card"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

const RESPONDERS = [
  {
    id: "amb1",
    type: "ambulance" as const,
    name: "PCMC-AMB-47 (ALS)",
    distance: "1.2 km",
    eta: "4 min",
    detail: "Driver: Suresh K. · +91 98765 43210",
    isNearest: true,
  },
  {
    id: "amb2",
    type: "ambulance" as const,
    name: "PCMC-AMB-12 (BLS)",
    distance: "2.8 km",
    eta: "8 min",
    detail: "Driver: Ramesh P.",
    isNearest: false,
  },
  {
    id: "pol1",
    type: "police" as const,
    name: "Highway Patrol — NH4",
    distance: "0.8 km",
    eta: "3 min",
    detail: "Unit HP-22 · PCR Van",
    isNearest: true,
  },
  {
    id: "hosp1",
    type: "hospital" as const,
    name: "Sassoon General Hospital",
    distance: "3.1 km",
    eta: "9 min",
    detail: "Level 1 Trauma · ICU: 4 beds available",
    level: "Level 1",
    isNearest: true,
  },
  {
    id: "hosp2",
    type: "hospital" as const,
    name: "KEM Hospital, Pune",
    distance: "5.4 km",
    eta: "14 min",
    detail: "Level 2 Trauma · 24×7 ER",
    level: "Level 2",
    isNearest: false,
  },
]

export function DispatchScreen() {
  const [dispatched, setDispatched] = useState<Set<string>>(new Set())
  const [allDispatched, setAllDispatched] = useState(false)

  const handleDispatch = (id: string) => {
    setDispatched((prev) => {
      const next = new Set(prev)
      next.add(id)
      if (next.size >= 3) setAllDispatched(true)
      return next
    })
  }

  const handleDispatchAll = () => {
    const ids = RESPONDERS.filter((r) => r.isNearest).map((r) => r.id)
    setDispatched(new Set(ids))
    setAllDispatched(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Nearby Services</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ranked by road distance + live ETA
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[oklch(0.55_0.22_27/0.4)] bg-[oklch(0.55_0.22_27/0.08)]">
            <AlertTriangle className="w-3.5 h-3.5 text-[oklch(0.65_0.22_27)]" aria-hidden="true" />
            <span className="text-xs font-medium text-[oklch(0.65_0.22_27)]">HIGH</span>
          </div>
        </div>

        {/* Triage badge */}
        <div className="mt-3 bg-card border border-border rounded-xl p-3 flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-[oklch(0.55_0.22_27)] status-glow" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">
              AI Triage:{" "}
              <span className="text-[oklch(0.65_0.22_27)]">ACCIDENT + INJURY</span>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
              Hindi detected · 1 victim · Fire: No · Breathing: Unconfirmed
            </p>
          </div>
          <span className="text-xs font-mono text-[oklch(0.72_0.18_150)] shrink-0">97.3%</span>
        </div>
      </div>

      {/* Map */}
      <div className="mx-5 mb-3 h-40 rounded-xl overflow-hidden shrink-0">
        <MapView />
      </div>

      {/* Responders list */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-2.5">
        {RESPONDERS.map((r) => (
          <ResponderCard
            key={r.id}
            type={r.type}
            name={r.name}
            distance={r.distance}
            eta={r.eta}
            detail={r.detail}
            level={"level" in r ? r.level : undefined}
            isNearest={r.isNearest}
            onDispatch={() => handleDispatch(r.id)}
            dispatched={dispatched.has(r.id)}
          />
        ))}
      </div>

      {/* Bottom action */}
      <div className="px-5 pb-4 pt-2 border-t border-border">
        {allDispatched ? (
          <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[oklch(0.62_0.18_150/0.1)] border border-[oklch(0.62_0.18_150/0.3)]">
            <CheckCircle2 className="w-5 h-5 text-[oklch(0.72_0.18_150)]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[oklch(0.72_0.18_150)]">
              All services dispatched — Help is en route
            </span>
          </div>
        ) : (
          <button
            onClick={handleDispatchAll}
            className="w-full py-3.5 rounded-xl bg-[oklch(0.55_0.22_27)] text-white font-semibold text-sm hover:bg-[oklch(0.60_0.24_27)] active:scale-95 transition-all cursor-pointer"
          >
            Dispatch All Nearest Services
          </button>
        )}
      </div>
    </div>
  )
}
