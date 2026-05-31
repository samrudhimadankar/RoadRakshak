"use client"

import { useState } from "react"
import { NavBar, type AppScreen } from "@/components/roadsos/nav-bar"
import { HomeScreen } from "@/components/roadsos/screens/home-screen"
import { DispatchScreen } from "@/components/roadsos/screens/dispatch-screen"
import { TrackingScreen } from "@/components/roadsos/screens/tracking-screen"
import { DashboardScreen } from "@/components/roadsos/screens/dashboard-screen"
import { AnalyticsScreen } from "@/components/roadsos/screens/analytics-screen"

export default function Page() {
  const [screen, setScreen] = useState<AppScreen>("home")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Mobile phone frame */}
      <div className="relative w-full max-w-[390px]">
        {/* Phone shell */}
        <div
          className="relative bg-card rounded-[2.5rem] overflow-hidden border border-border"
          style={{
            height: "844px",
            boxShadow:
              "0 0 0 1px oklch(0.30 0 0), 0 32px 80px oklch(0 0 0 / 0.6), 0 0 60px oklch(0.55 0.22 27 / 0.06)",
          }}
        >
          {/* Dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-background rounded-full z-20 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[oklch(0.55_0.22_27/0.4)]" aria-hidden="true" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          </div>

          {/* Screen content */}
          <div className="absolute inset-0 flex flex-col pt-10 pb-[72px] overflow-hidden">
            <div className="flex-1 overflow-hidden flex flex-col">
              {screen === "home" && (
                <HomeScreen onDispatchReady={() => setScreen("tracking")} />
              )}
              {screen === "dispatch" && <DispatchScreen />}
              {screen === "tracking" && <TrackingScreen />}
              {screen === "dashboard" && <DashboardScreen />}
              {screen === "analytics" && <AnalyticsScreen />}
            </div>
          </div>

          {/* Nav bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <NavBar active={screen} onChange={setScreen} />
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-muted-foreground/30 rounded-full" aria-hidden="true" />
        </div>

        {/* Branding below phone */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground font-semibold">RoadSoS</span>
            {" "}· IIT Madras AI Road Safety Hackathon 2026
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            CoERS & RBG Labs · Voice-First Emergency Response · India
          </p>
        </div>
      </div>

      {/* Background ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, oklch(0.55 0.22 27 / 0.04) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}
