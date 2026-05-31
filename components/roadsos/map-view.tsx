"use client"

import { MapPin, Ambulance, Hospital, Shield } from "lucide-react"

interface MapViewProps {
  showAmbulance?: boolean
  etaSeconds?: number
}

export function MapView({ showAmbulance = false, etaSeconds }: MapViewProps) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[oklch(0.11_0.01_240)] border border-border">
      {/* Simulated map grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.55 0 0)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Road lines */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* Horizontal roads */}
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="oklch(0.25 0.01 240)" strokeWidth="4" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="oklch(0.25 0.01 240)" strokeWidth="2" />
        {/* Vertical roads */}
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="oklch(0.25 0.01 240)" strokeWidth="2" />
        <line x1="65%" y1="0" x2="65%" y2="100%" stroke="oklch(0.25 0.01 240)" strokeWidth="4" />
        {/* Road markings */}
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="oklch(0.35 0 0)" strokeWidth="1" strokeDasharray="8,8" />
        <line x1="65%" y1="0" x2="65%" y2="100%" stroke="oklch(0.35 0 0)" strokeWidth="1" strokeDasharray="8,8" />
      </svg>

      {/* Route line from ambulance to victim */}
      {showAmbulance && (
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <polyline
            points="22%,22% 30%,22% 30%,40% 50%,40%"
            fill="none"
            stroke="oklch(0.55 0.22 27)"
            strokeWidth="2.5"
            strokeDasharray="6,4"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Victim ping */}
      <div className="absolute" style={{ left: "50%", top: "40%", transform: "translate(-50%,-50%)" }}>
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full bg-[oklch(0.55_0.22_27/0.2)] ping-slow" />
          <div className="relative z-10 w-7 h-7 rounded-full bg-[oklch(0.55_0.22_27)] flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-white" fill="white" aria-hidden="true" />
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-[oklch(0.65_0.22_27)] bg-card/90 px-2 py-0.5 rounded">
          You
        </div>
      </div>

      {/* Ambulance */}
      {showAmbulance && (
        <div
          className="absolute ambulance-move"
          style={{ left: "22%", top: "22%", transform: "translate(-50%,-50%)" }}
        >
          <div className="w-7 h-7 rounded-full bg-[oklch(0.55_0.22_27/0.15)] border border-[oklch(0.55_0.22_27/0.5)] flex items-center justify-center">
            <Ambulance className="w-4 h-4 text-[oklch(0.65_0.22_27)]" aria-hidden="true" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground bg-card/90 px-2 py-0.5 rounded">
            PCMC-47
          </div>
        </div>
      )}

      {/* Hospital */}
      <div className="absolute" style={{ left: "65%", top: "22%", transform: "translate(-50%,-50%)" }}>
        <div className="w-7 h-7 rounded-full bg-[oklch(0.62_0.18_150/0.15)] border border-[oklch(0.62_0.18_150/0.5)] flex items-center justify-center">
          <Hospital className="w-4 h-4 text-[oklch(0.72_0.18_150)]" aria-hidden="true" />
        </div>
      </div>

      {/* Police */}
      <div className="absolute" style={{ left: "30%", top: "70%", transform: "translate(-50%,-50%)" }}>
        <div className="w-7 h-7 rounded-full bg-[oklch(0.60_0.18_230/0.15)] border border-[oklch(0.60_0.18_230/0.5)] flex items-center justify-center">
          <Shield className="w-4 h-4 text-[oklch(0.70_0.18_230)]" aria-hidden="true" />
        </div>
      </div>

      {/* ETA overlay */}
      {showAmbulance && etaSeconds !== undefined && (
        <div className="absolute top-3 right-3 bg-card/95 border border-[oklch(0.55_0.22_27/0.4)] rounded-lg px-3 py-1.5">
          <div className="text-xs text-muted-foreground">Ambulance ETA</div>
          <div className="text-base font-bold text-[oklch(0.80_0.15_80)] font-mono">
            {Math.floor(etaSeconds / 60)}:{String(etaSeconds % 60).padStart(2, "0")}
          </div>
        </div>
      )}

      {/* GPS badge */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-card/90 border border-border rounded-lg px-2.5 py-1.5">
        <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.18_150)] status-glow" aria-hidden="true" />
        <span className="text-xs text-muted-foreground font-mono">18.5204°N  73.8567°E</span>
      </div>
    </div>
  )
}
