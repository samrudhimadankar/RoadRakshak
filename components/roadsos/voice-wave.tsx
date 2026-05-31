"use client"

export function VoiceWave({ active = true }: { active?: boolean }) {
  return (
    <div className="flex items-end gap-1 h-10" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 rounded-full ${active ? "bg-[oklch(0.55_0.22_27)] voice-bar" : "bg-border"}`}
          style={{ height: active ? "100%" : "30%", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  )
}
