"use client"

import { StatCard } from "@/components/roadsos/stat-card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { ArrowDown, TrendingDown, Users, Zap } from "lucide-react"

const responseTimeData = [
  { label: "Current", value: 38, color: "oklch(0.55 0.22 27)" },
  { label: "Target", value: 8, color: "oklch(0.62 0.18 150)" },
]

const monthlyCases = [
  { month: "Nov", cases: 14 },
  { month: "Dec", cases: 19 },
  { month: "Jan", cases: 23 },
  { month: "Feb", cases: 18 },
  { month: "Mar", cases: 31 },
  { month: "Apr", cases: 27 },
  { month: "May", cases: 35 },
]

const COMPARISON = [
  { name: "112 India", voiceFirst: false, aiTriage: false, multilingual: "Partial", offline: true, dispatch: "Manual" },
  { name: "Nek Insan", voiceFirst: "Partial", aiTriage: false, multilingual: false, offline: false, dispatch: "Manual" },
  { name: "RoadSoS", voiceFirst: true, aiTriage: true, multilingual: "3 Lang", offline: true, dispatch: "Auto <10s" },
]

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs">
        <span className="text-foreground font-medium">{payload[0].value} min avg</span>
      </div>
    )
  }
  return null
}

export function AnalyticsScreen() {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 shrink-0">
        <h1 className="text-lg font-bold text-foreground">Impact & Analytics</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          IIT Madras Road Safety Hackathon 2026
        </p>
      </div>

      {/* Key stats grid */}
      <div className="px-5 grid grid-cols-2 gap-2.5 mb-5 shrink-0">
        <StatCard
          value="1.73L"
          label="Road Deaths/yr (India)"
          sublabel="MoRTH 2023"
          variant="danger"
        />
        <StatCard
          value="<20%"
          label="Reach care in Golden Hour"
          sublabel="Harvard HHR, 2025"
          variant="danger"
        />
        <StatCard
          value="25–35m"
          label="Avg Highway EMS Response"
          sublabel="Giribabu et al., 2024"
          variant="warning"
        />
        <StatCard
          value="~50K"
          label="Preventable deaths/yr"
          sublabel="With 8 min response"
          variant="warning"
        />
        <StatCard
          value="<10s"
          label="RoadSoS target"
          sublabel="Panic to dispatch"
          variant="success"
        />
        <StatCard
          value="8.5s"
          label="Demo time achieved"
          sublabel="Live triage pipeline"
          variant="success"
        />
      </div>

      {/* Response time comparison */}
      <div className="px-5 mb-5 shrink-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Response Time: India vs RoadSoS Target
        </p>
        <div className="bg-card border border-border rounded-xl p-4">
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
                <XAxis
                  dataKey="label"
                  tick={{ fill: "oklch(0.55 0 0)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "oklch(0.55 0 0)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  unit="m"
                  width={30}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(0.25 0 0 / 0.3)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {responseTimeData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <ArrowDown className="w-4 h-4 text-[oklch(0.72_0.18_150)]" aria-hidden="true" />
            <span className="text-xs text-[oklch(0.72_0.18_150)] font-medium">79% reduction in response time</span>
          </div>
        </div>
      </div>

      {/* Monthly cases chart */}
      <div className="px-5 mb-5 shrink-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Incidents Handled (Demo Data)
        </p>
        <div className="bg-card border border-border rounded-xl p-4">
          <div style={{ height: 120 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCases} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "oklch(0.55 0 0)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(0.25 0 0 / 0.3)" }} />
                <Bar dataKey="cases" fill="oklch(0.55 0.22 27 / 0.7)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Competitor comparison */}
      <div className="px-5 mb-5 shrink-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Competitive Analysis
        </p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-xs" aria-label="Competitor comparison">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 py-2.5 text-muted-foreground font-medium">Solution</th>
                <th className="text-center px-2 py-2.5 text-muted-foreground font-medium">Voice AI</th>
                <th className="text-center px-2 py-2.5 text-muted-foreground font-medium">Triage</th>
                <th className="text-center px-2 py-2.5 text-muted-foreground font-medium">Offline</th>
                <th className="text-right px-3 py-2.5 text-muted-foreground font-medium">Dispatch</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => {
                const isRoadSoS = row.name === "RoadSoS"
                return (
                  <tr
                    key={row.name}
                    className={`${i < COMPARISON.length - 1 ? "border-b border-border" : ""} ${isRoadSoS ? "bg-[oklch(0.55_0.22_27/0.06)]" : ""}`}
                  >
                    <td className={`px-3 py-2.5 font-medium ${isRoadSoS ? "text-[oklch(0.65_0.22_27)]" : "text-foreground"}`}>
                      {row.name}
                    </td>
                    <td className="text-center px-2 py-2.5">
                      <span className={row.voiceFirst === true ? "text-[oklch(0.72_0.18_150)]" : row.voiceFirst === false ? "text-muted-foreground" : "text-[oklch(0.80_0.15_80)]"}>
                        {row.voiceFirst === true ? "Yes" : row.voiceFirst === false ? "No" : row.voiceFirst}
                      </span>
                    </td>
                    <td className="text-center px-2 py-2.5">
                      <span className={row.aiTriage === true ? "text-[oklch(0.72_0.18_150)]" : "text-muted-foreground"}>
                        {row.aiTriage === true ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="text-center px-2 py-2.5">
                      <span className={row.offline === true ? "text-[oklch(0.72_0.18_150)]" : "text-muted-foreground"}>
                        {row.offline === true ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className={`text-right px-3 py-2.5 font-medium ${isRoadSoS ? "text-[oklch(0.72_0.18_150)]" : "text-muted-foreground"}`}>
                      {row.dispatch}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact callout */}
      <div className="px-5 shrink-0">
        <div className="bg-card border border-[oklch(0.55_0.22_27/0.3)] rounded-xl p-4">
          <div className="flex items-start gap-3">
            <TrendingDown className="w-5 h-5 text-[oklch(0.65_0.22_27)] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground leading-relaxed">
                &quot;Every year, 50,000 Indians survive the crash — and die waiting for help.&quot;
              </p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                RoadSoS compresses the average 38–63 minute EMS delay to under 10 seconds by eliminating every systematic failure point: incident detection, wrong-service routing, language barriers, manual dispatch, and family notification.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border">
            <Zap className="w-4 h-4 text-[oklch(0.80_0.15_80)]" aria-hidden="true" />
            <span className="text-xs text-[oklch(0.80_0.15_80)] font-medium">IIT Madras AI Road Safety Hackathon 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}
