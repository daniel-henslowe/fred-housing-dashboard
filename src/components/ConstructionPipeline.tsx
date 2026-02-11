"use client";

const pipelineData = [
  {
    stage: "Permits Issued",
    count: "1.51M",
    icon: "📋",
    color: "bg-indigo-500",
    subtext: "SAAR",
  },
  {
    stage: "Under Construction",
    count: "1.67M",
    icon: "🔨",
    color: "bg-amber-500",
    subtext: "Total Units",
  },
  {
    stage: "Completed",
    count: "1.38M",
    icon: "✅",
    color: "bg-emerald-500",
    subtext: "SAAR",
  },
];

const timelineData = [
  { phase: "Permitting", avgDays: 45, trend: -5 },
  { phase: "Foundation", avgDays: 21, trend: 0 },
  { phase: "Framing", avgDays: 35, trend: 3 },
  { phase: "Systems Install", avgDays: 42, trend: 2 },
  { phase: "Finishing", avgDays: 38, trend: -2 },
  { phase: "Inspection", avgDays: 14, trend: 1 },
];

const completionRates = [
  { type: "Single Family", rate: 92.5, time: "7.2 mo" },
  { type: "Multi Family", rate: 88.2, time: "18.5 mo" },
  { type: "Townhomes", rate: 94.1, time: "6.8 mo" },
];

export default function ConstructionPipeline() {
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Construction Pipeline</h3>
        <p className="text-sm text-slate-400 mt-1">Current status & timelines</p>
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-3 mb-6">
        {pipelineData.map((item, index) => (
          <div key={item.stage} className="relative">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-lg`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.stage}</span>
                  <span className="text-lg font-bold">{item.count}</span>
                </div>
                <div className="text-xs text-slate-500">{item.subtext}</div>
              </div>
            </div>
            {index < pipelineData.length - 1 && (
              <div className="absolute left-5 top-12 w-px h-3 bg-slate-700" />
            )}
          </div>
        ))}
      </div>

      {/* Construction Timeline */}
      <div className="border-t border-slate-700/50 pt-4 mb-4">
        <div className="text-sm font-medium mb-3">Avg Build Timeline (Days)</div>
        <div className="space-y-2">
          {timelineData.map((phase) => (
            <div key={phase.phase} className="flex items-center gap-2">
              <div className="w-20 text-xs text-slate-400">{phase.phase}</div>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${(phase.avgDays / 50) * 100}%` }}
                />
              </div>
              <div className="w-8 text-xs text-right font-medium">{phase.avgDays}</div>
              <div className={`w-8 text-xs text-right ${phase.trend > 0 ? "text-red-400" : phase.trend < 0 ? "text-green-400" : "text-slate-500"}`}>
                {phase.trend > 0 ? "+" : ""}{phase.trend}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-500 mt-2 text-right">Total: ~195 days avg</div>
      </div>

      {/* Completion Rates */}
      <div className="border-t border-slate-700/50 pt-4">
        <div className="text-sm font-medium mb-3">Completion Rates</div>
        <div className="space-y-2">
          {completionRates.map((item) => (
            <div key={item.type} className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{item.type}</span>
              <div className="flex items-center gap-3">
                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
                <span className="text-xs font-medium w-10">{item.rate}%</span>
                <span className="text-xs text-slate-500 w-12">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
