import { cn } from "@/lib/utils"
import { Ambulance, Shield, Hospital, MapPin, Clock } from "lucide-react"

export type ResponderType = "ambulance" | "police" | "hospital"

interface ResponderCardProps {
  type: ResponderType
  name: string
  distance: string
  eta: string
  detail?: string
  level?: string
  isNearest?: boolean
  onDispatch?: () => void
  dispatched?: boolean
}

const typeConfig = {
  ambulance: {
    icon: Ambulance,
    label: "Ambulance",
    color: "text-[oklch(0.55_0.22_27)]",
    bg: "bg-[oklch(0.55_0.22_27/0.1)]",
    border: "border-[oklch(0.55_0.22_27/0.3)]",
  },
  police: {
    icon: Shield,
    label: "Police",
    color: "text-[oklch(0.60_0.18_230)]",
    bg: "bg-[oklch(0.60_0.18_230/0.1)]",
    border: "border-[oklch(0.60_0.18_230/0.3)]",
  },
  hospital: {
    icon: Hospital,
    label: "Trauma Centre",
    color: "text-[oklch(0.62_0.18_150)]",
    bg: "bg-[oklch(0.62_0.18_150/0.1)]",
    border: "border-[oklch(0.62_0.18_150/0.3)]",
  },
}

export function ResponderCard({
  type,
  name,
  distance,
  eta,
  detail,
  level,
  isNearest,
  onDispatch,
  dispatched,
}: ResponderCardProps) {
  const cfg = typeConfig[type]
  const Icon = cfg.icon

  return (
    <div
      className={cn(
        "rounded-xl border p-4 flex items-center gap-4",
        isNearest ? cfg.border : "border-border",
        "bg-card"
      )}
    >
      {/* Icon badge */}
      <div className={cn("rounded-lg p-2.5 shrink-0", cfg.bg)}>
        <Icon className={cn("w-5 h-5", cfg.color)} aria-hidden="true" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground truncate">{name}</span>
          {isNearest && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-[oklch(0.62_0.18_150/0.15)] text-[oklch(0.72_0.18_150)] font-medium shrink-0">
              Nearest
            </span>
          )}
          {level && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-medium shrink-0">
              {level}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            {distance}
          </span>
          <span className="text-xs flex items-center gap-1 text-[oklch(0.80_0.15_80)] font-medium">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {eta} ETA
          </span>
        </div>
        {detail && <p className="text-xs text-muted-foreground mt-0.5 truncate">{detail}</p>}
      </div>

      {/* Dispatch button */}
      {onDispatch && (
        <button
          onClick={onDispatch}
          disabled={dispatched}
          className={cn(
            "shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all",
            dispatched
              ? "bg-[oklch(0.62_0.18_150/0.2)] text-[oklch(0.72_0.18_150)] cursor-default"
              : "bg-[oklch(0.55_0.22_27)] text-white hover:bg-[oklch(0.60_0.24_27)] active:scale-95 cursor-pointer"
          )}
          aria-label={dispatched ? "Dispatched" : `Dispatch ${cfg.label}`}
        >
          {dispatched ? "Dispatched" : "Dispatch"}
        </button>
      )}
    </div>
  )
}
