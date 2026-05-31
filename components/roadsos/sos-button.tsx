"use client"

import { Phone } from "lucide-react"

interface SOSButtonProps {
  onTrigger: () => void
  size?: "lg" | "md"
}

export function SOSButton({ onTrigger, size = "lg" }: SOSButtonProps) {
  const isLg = size === "lg"

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ring */}
      <div
        className={`absolute rounded-full bg-[oklch(0.55_0.22_27/0.15)] ping-slow ${isLg ? "w-64 h-64" : "w-40 h-40"}`}
      />
      {/* Mid ring */}
      <div
        className={`absolute rounded-full bg-[oklch(0.55_0.22_27/0.2)] ${isLg ? "w-52 h-52" : "w-32 h-32"}`}
      />
      {/* Button */}
      <button
        onClick={onTrigger}
        className={`relative z-10 rounded-full bg-[oklch(0.55_0.22_27)] text-white font-bold tracking-widest uppercase flex flex-col items-center justify-center gap-1 sos-pulse active:scale-95 transition-transform cursor-pointer select-none ${
          isLg ? "w-44 h-44 text-4xl" : "w-28 h-28 text-2xl"
        }`}
        aria-label="Trigger emergency SOS"
        style={{ boxShadow: "0 0 0 4px oklch(0.55 0.22 27 / 0.4), 0 8px 32px oklch(0.55 0.22 27 / 0.5)" }}
      >
        <Phone className={`fill-white ${isLg ? "w-10 h-10 mb-1" : "w-6 h-6"}`} aria-hidden="true" />
        <span className={isLg ? "text-3xl" : "text-xl"}>SOS</span>
      </button>
    </div>
  )
}
