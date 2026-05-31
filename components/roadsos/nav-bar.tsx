"use client"

import { cn } from "@/lib/utils"
import { Home, Map, Navigation, LayoutDashboard, BarChart3 } from "lucide-react"

export type AppScreen = "home" | "dispatch" | "tracking" | "dashboard" | "analytics"

interface NavBarProps {
  active: AppScreen
  onChange: (screen: AppScreen) => void
}

const navItems: { id: AppScreen; label: string; icon: typeof Home }[] = [
  { id: "home", label: "SOS", icon: Home },
  { id: "dispatch", label: "Dispatch", icon: Map },
  { id: "tracking", label: "Track", icon: Navigation },
  { id: "dashboard", label: "Hospital", icon: LayoutDashboard },
  { id: "analytics", label: "Impact", icon: BarChart3 },
]

export function NavBar({ active, onChange }: NavBarProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border"
      aria-label="Main navigation"
    >
      <ul className="flex items-stretch" role="list">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => onChange(item.id)}
                className={cn(
                  "w-full flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-colors cursor-pointer",
                  isActive
                    ? "text-[oklch(0.65_0.22_27)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={cn("w-5 h-5 transition-transform", isActive && "scale-110")}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
