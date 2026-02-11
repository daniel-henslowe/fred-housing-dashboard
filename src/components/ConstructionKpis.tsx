"use client";

const kpiData = [
  {
    label: "Housing Starts",
    value: "1.42M",
    change: 5.8,
    subtitle: "Annual Rate (SAAR)",
    icon: "🏗️",
    color: "from-indigo-500 to-purple-500",
  },
  {
    label: "Building Permits",
    value: "1.51M",
    change: 3.2,
    subtitle: "Annual Rate (SAAR)",
    icon: "📋",
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Completions",
    value: "1.38M",
    change: -2.1,
    subtitle: "Annual Rate (SAAR)",
    icon: "🏠",
    color: "from-orange-500 to-amber-500",
  },
  {
    label: "Under Construction",
    value: "1.67M",
    change: 1.5,
    subtitle: "Total Units",
    icon: "🔨",
    color: "from-cyan-500 to-blue-500",
  },
  {
    label: "Construction Spending",
    value: "$2.15T",
    change: 7.2,
    subtitle: "Annual Rate",
    icon: "💰",
    color: "from-pink-500 to-rose-500",
  },
  {
    label: "New Home Sales",
    value: "683K",
    change: 4.5,
    subtitle: "Annual Rate (SAAR)",
    icon: "🏡",
    color: "from-violet-500 to-indigo-500",
  },
];

export default function ConstructionKpis() {
  return (
    <div className="grid grid-cols-6 gap-4 mb-7">
      {kpiData.map((kpi) => (
        <div
          key={kpi.label}
          className="glass-card p-4 relative overflow-hidden group hover:scale-[1.02] transition-all"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{kpi.icon}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  kpi.change > 0
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {kpi.change > 0 ? "↑" : "↓"} {Math.abs(kpi.change)}%
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{kpi.value}</div>
            <div className="text-xs text-slate-400">{kpi.label}</div>
            <div className="text-xs text-slate-500 mt-1">{kpi.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
