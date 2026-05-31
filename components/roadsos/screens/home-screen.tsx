"use client"

import { useState, useEffect } from "react"
import { SOSButton } from "@/components/roadsos/sos-button"
import { PipelineSteps, type PipelineStep } from "@/components/roadsos/pipeline-steps"
import { VoiceWave } from "@/components/roadsos/voice-wave"
import { Wifi, WifiOff, BatteryFull, Signal, MapPin, Mic, MicOff } from "lucide-react"

type HomePhase = "idle" | "listening" | "processing" | "done"

const TRANSCRIPT_LINES = [
  '"Accident hua, main injured hoon..."',
  '"हादसा हो गया, मदद चाहिए..."',
  '"Ambulance chahiye, NH4 highway..."',
]

interface HomeScreenProps {
  onDispatchReady: () => void
}

export function HomeScreen({ onDispatchReady }: HomeScreenProps) {
  const [phase, setPhase] = useState<HomePhase>("idle")
  const [steps, setSteps] = useState<PipelineStep[]>([
    { id: 1, label: "Voice Capture", sublabel: "Listening for distress phrase", status: "pending" },
    { id: 2, label: "AI Intent Classification", sublabel: "Claude API — multilingual NLU", status: "pending" },
    { id: 3, label: "GPS Lock", sublabel: "18.5204°N, 73.8567°E ±22m", status: "pending" },
    { id: 4, label: "Triage & ETA Ranking", sublabel: "Nearest: Ambulance 1.2km / 4 min", status: "pending" },
    { id: 5, label: "Dispatch Initiated", sublabel: "PCMC-AMB-47 → NH4 Highway", status: "pending" },
    { id: 6, label: "Family Notified", sublabel: "SMS + Live GPS link sent", status: "pending" },
  ])
  const [transcriptIdx, setTranscriptIdx] = useState(0)
  const [timer, setTimer] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (timerRunning) {
      interval = setInterval(() => setTimer((t) => t + 1), 100)
    }
    return () => clearInterval(interval)
  }, [timerRunning])

  const setStepStatus = (id: number, status: PipelineStep["status"], sublabel?: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, ...(sublabel ? { sublabel } : {}) } : s))
    )
  }

  const handleSOSTrigger = () => {
    if (phase !== "idle") return
    setPhase("listening")
    setTimerRunning(true)
    setStepStatus(1, "active")

    // Step 1: voice capture
    setTimeout(() => {
      setStepStatus(1, "done", '"Accident hua, main injured hoon"')
      setPhase("processing")
      setStepStatus(2, "active")
    }, 2000)

    // Step 2: AI classification
    setTimeout(() => {
      setStepStatus(2, "done", "ACCIDENT + INJURY detected | Severity: HIGH | Hindi")
      setStepStatus(3, "active")
    }, 3800)

    // Step 3: GPS
    setTimeout(() => {
      setStepStatus(3, "done", "18.5204°N, 73.8567°E ± 18m | Confidence: HIGH")
      setStepStatus(4, "active")
    }, 4800)

    // Step 4: Triage
    setTimeout(() => {
      setStepStatus(4, "done", "Ambulance: 1.2km / 4 min | Trauma: 3.1km | Police: 0.8km")
      setStepStatus(5, "active")
    }, 6200)

    // Step 5: Dispatch
    setTimeout(() => {
      setStepStatus(5, "done", "PCMC-AMB-47 dispatched | Hospital pre-alert sent")
      setStepStatus(6, "active")
    }, 7500)

    // Step 6: Family notified
    setTimeout(() => {
      setStepStatus(6, "done", "2 contacts notified | Live GPS link shared")
      setPhase("done")
      setTimerRunning(false)
    }, 8500)

    // Rotate transcript
    const rotateInterval = setInterval(() => {
      setTranscriptIdx((i) => (i + 1) % TRANSCRIPT_LINES.length)
    }, 1800)
    setTimeout(() => clearInterval(rotateInterval), 9000)
  }

  const handleReset = () => {
    setPhase("idle")
    setTimer(0)
    setTimerRunning(false)
    setTranscriptIdx(0)
    setSteps((prev) => prev.map((s) => ({ ...s, status: "pending" })))
  }

  const formatTimer = (t: number) => {
    const total = t / 10
    return total.toFixed(1) + "s"
  }

  return (
    <div className="flex flex-col h-full">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <div className="flex items-center gap-1.5">
          <Signal className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <span className="text-xs text-muted-foreground">Jio 4G</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi className="w-4 h-4 text-[oklch(0.72_0.18_150)]" aria-hidden="true" />
          <BatteryFull className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <span className="text-xs text-muted-foreground">87%</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">RoadSoS</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[oklch(0.55_0.22_27/0.15)] text-[oklch(0.65_0.22_27)] font-mono font-medium">SOS</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">Smart Emergency Response</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary border border-border">
          <MapPin className="w-3.5 h-3.5 text-[oklch(0.72_0.18_150)]" aria-hidden="true" />
          <span className="text-xs text-muted-foreground font-mono">NH-4 Highway</span>
        </div>
      </div>

      {/* SOS area */}
      <div className="flex flex-col items-center justify-center py-8 gap-6">
        {phase === "idle" && (
          <div className="flex flex-col items-center gap-4">
            <SOSButton onTrigger={handleSOSTrigger} size="lg" />
            <p className="text-sm text-muted-foreground text-center px-8 leading-relaxed">
              Press &amp; hold or say{" "}
              <span className="text-foreground font-medium">&quot;Accident hua&quot;</span>
              {" "}to trigger emergency response
            </p>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[oklch(0.72_0.18_150)]" aria-hidden="true" />
              <span className="text-xs text-[oklch(0.72_0.18_150)]">Wake word active — Hindi / Marathi / English</span>
            </div>
          </div>
        )}

        {(phase === "listening" || phase === "processing") && (
          <div className="flex flex-col items-center gap-5 w-full px-6">
            {/* Timer */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.55_0.22_27)] status-glow" aria-hidden="true" />
              <span className="text-3xl font-mono font-bold text-foreground">{formatTimer(timer)}</span>
              <span className="text-xs text-muted-foreground">to dispatch</span>
            </div>

            {/* Voice wave */}
            {phase === "listening" && (
              <div className="flex flex-col items-center gap-2">
                <VoiceWave active />
                <p className="text-sm text-muted-foreground">{TRANSCRIPT_LINES[transcriptIdx]}</p>
              </div>
            )}

            {phase === "processing" && (
              <div className="flex flex-col items-center gap-1">
                <VoiceWave active={false} />
                <p className="text-xs text-muted-foreground font-mono">
                  {TRANSCRIPT_LINES[transcriptIdx]}
                </p>
              </div>
            )}
          </div>
        )}

        {phase === "done" && (
          <div className="flex flex-col items-center gap-4 px-6">
            <div
              className="w-20 h-20 rounded-full bg-[oklch(0.62_0.18_150/0.15)] border-2 border-[oklch(0.62_0.18_150/0.5)] flex items-center justify-center"
              aria-label="Dispatch successful"
            >
              <span className="text-4xl font-bold text-[oklch(0.72_0.18_150)] font-mono">
                {formatTimer(timer)}
              </span>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-[oklch(0.72_0.18_150)]">Help is on the way</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                PCMC-AMB-47 dispatched · 4 min ETA · Family notified
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pipeline steps */}
      {phase !== "idle" && (
        <div className="flex-1 mx-5 mb-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                6-Stage Triage Pipeline
              </span>
              {phase === "done" && (
                <button
                  onClick={handleReset}
                  className="text-xs text-[oklch(0.65_0.22_27)] hover:underline cursor-pointer"
                >
                  Reset Demo
                </button>
              )}
            </div>
            <PipelineSteps steps={steps} />
          </div>
        </div>
      )}

      {/* Bottom hint */}
      {phase === "idle" && (
        <div className="mx-5 mb-4 rounded-xl bg-secondary border border-border p-3 flex items-start gap-3">
          <WifiOff className="w-4 h-4 text-[oklch(0.80_0.15_80)] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs font-medium text-foreground">Offline mode ready</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              SMS fallback enabled · 3 services cached · Last sync 4 min ago
            </p>
          </div>
        </div>
      )}

      {/* Dispatch now button */}
      {phase === "done" && (
        <div className="mx-5 mb-4">
          <button
            onClick={onDispatchReady}
            className="w-full py-3.5 rounded-xl bg-[oklch(0.55_0.22_27)] text-white font-semibold text-sm hover:bg-[oklch(0.60_0.24_27)] active:scale-95 transition-all cursor-pointer"
          >
            View Live Tracking
          </button>
        </div>
      )}
    </div>
  )
}
