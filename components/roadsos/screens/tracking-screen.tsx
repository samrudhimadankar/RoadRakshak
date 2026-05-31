"use client"

import { useState, useEffect } from "react"
import { MapView } from "@/components/roadsos/map-view"
import { Ambulance, Shield, Hospital, CheckCircle2, Clock, Phone, Share2 } from "lucide-react"

const TIMELINE = [
  { id: 1, time: "14:23:07", event: "SOS triggered — voice: 'Accident hua'", done: true, icon: "sos" },
  { id: 2, time: "14:23:15", event: "AI triage: ACCIDENT+INJURY · Severity HIGH", done: true, icon: "ai" },
  { id: 3, time: "14:23:16", event: "GPS locked — 18.5204°N, 73.8567°E", done: true, icon: "gps" },
  { id: 4, time: "14:23:18", event: "PCMC-AMB-47 dispatched", done: true, icon: "amb" },
  { id: 5, time: "14:23:18", event: "Highway Patrol HP-22 dispatched", done: true, icon: "pol" },
  { id: 6, time: "14:23:19", event: "Hospital pre-alert sent — Sassoon General", done: true, icon: "hosp" },
  { id: 7, time: "14:23:20", event: "2 emergency contacts notified via SMS", done: true, icon: "sms" },
  { id: 8, time: "ETA 4 min", event: "Ambulance arriving...", done: false, icon: "eta" },
]

export function TrackingScreen() {
  const [etaSeconds, setEtaSeconds] = useState(240)
  const [distanceM, setDistanceM] = useState(1200)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setEtaSeconds((s) => Math.max(0, s - 1))
      setDistanceM((d) => Math.max(0, d - 5))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatEta = (s: number) => {
    if (s === 0) return "Arriving"
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${String(sec).padStart(2, "0")}`
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">Live Tracking</h1>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg bg-secondary border border-border cursor-pointer transition-colors"
            aria-label="Share live tracking link"
          >
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
            {copied ? "Copied!" : "Share link"}
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="mx-5 mb-4 h-52 shrink-0">
        <MapView showAmbulance etaSeconds={etaSeconds} />
      </div>

      {/* Responder status cards */}
      <div className="px-5 flex gap-3 mb-4">
        {/* Ambulance */}
        <div className="flex-1 bg-card border border-[oklch(0.55_0.22_27/0.3)] rounded-xl p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Ambulance className="w-4 h-4 text-[oklch(0.65_0.22_27)] ambulance-move" aria-hidden="true" />
            <span className="text-xs font-semibold text-foreground">PCMC-AMB-47</span>
          </div>
          <div className="text-xl font-bold font-mono text-[oklch(0.80_0.15_80)]">
            {formatEta(etaSeconds)}
          </div>
          <div className="text-xs text-muted-foreground">
            {distanceM > 0 ? `${distanceM}m away` : "Arrived"}
          </div>
          <button
            className="mt-1 flex items-center justify-center gap-1 text-xs py-1 rounded-lg bg-[oklch(0.55_0.22_27/0.1)] text-[oklch(0.65_0.22_27)] hover:bg-[oklch(0.55_0.22_27/0.2)] transition-colors cursor-pointer"
            aria-label="Call ambulance driver"
          >
            <Phone className="w-3 h-3" aria-hidden="true" />
            Call Driver
          </button>
        </div>

        {/* Police */}
        <div className="flex-1 bg-card border border-[oklch(0.60_0.18_230/0.3)] rounded-xl p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[oklch(0.70_0.18_230)]" aria-hidden="true" />
            <span className="text-xs font-semibold text-foreground">HP-22</span>
          </div>
          <div className="text-xl font-bold font-mono text-[oklch(0.80_0.15_80)]">
            {formatEta(Math.max(0, etaSeconds - 60))}
          </div>
          <div className="text-xs text-muted-foreground">
            {distanceM > 600 ? `${Math.max(0, distanceM - 400)}m away` : "Arrived"}
          </div>
          <button
            className="mt-1 flex items-center justify-center gap-1 text-xs py-1 rounded-lg bg-[oklch(0.60_0.18_230/0.1)] text-[oklch(0.70_0.18_230)] hover:bg-[oklch(0.60_0.18_230/0.2)] transition-colors cursor-pointer"
            aria-label="Call police unit"
          >
            <Phone className="w-3 h-3" aria-hidden="true" />
            Call Unit
          </button>
        </div>
      </div>

      {/* Hospital pre-alert */}
      <div className="mx-5 mb-4 bg-[oklch(0.62_0.18_150/0.08)] border border-[oklch(0.62_0.18_150/0.3)] rounded-xl p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Hospital className="w-4 h-4 text-[oklch(0.72_0.18_150)]" aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">Sassoon General Hospital</span>
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-[oklch(0.62_0.18_150/0.15)] text-[oklch(0.72_0.18_150)]">
            Pre-alerted
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Trauma team on standby · ICU bed reserved · Receiving in ~9 min
        </p>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Event Log
        </p>
        <ol className="flex flex-col gap-2.5" aria-label="Incident event timeline">
          {TIMELINE.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-[oklch(0.62_0.18_150)]" aria-hidden="true" />
                ) : (
                  <Clock className="w-4 h-4 text-[oklch(0.80_0.15_80)] status-glow" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-xs ${item.done ? "text-foreground" : "text-[oklch(0.80_0.15_80)]"}`}>
                  {item.event}
                </p>
              </div>
              <span className="text-xs font-mono text-muted-foreground shrink-0">{item.time}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
