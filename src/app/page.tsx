"use client";

import Sidebar from "@/components/Sidebar";
import KpiCard from "@/components/KpiCard";
import PriceChart from "@/components/PriceChart";
import AffordabilityGauge from "@/components/AffordabilityGauge";
import MiniCard from "@/components/MiniCard";
import RegionalChart from "@/components/RegionalChart";
import ProgressCard from "@/components/ProgressCard";
import MetricsTable from "@/components/MetricsTable";

const kpiData = [
  {
    icon: "🏠",
    iconBg: "blue" as const,
    label: "Median Home Price",
    value: "$428,700",
    change: "+4.2% from last year",
    trend: "up" as const,
  },
  {
    icon: "🏗️",
    iconBg: "green" as const,
    label: "Housing Starts",
    value: "1.42M",
    change: "+2.8% MoM",
    trend: "up" as const,
  },
  {
    icon: "📋",
    iconBg: "purple" as const,
    label: "Building Permits",
    value: "1.51M",
    change: "-1.3% MoM",
    trend: "down" as const,
  },
  {
    icon: "📊",
    iconBg: "orange" as const,
    label: "30-Yr Mortgage Rate",
    value: "6.42%",
    change: "-0.15 pts",
    trend: "down" as const,
  },
  {
    icon: "📈",
    iconBg: "cyan" as const,
    label: "Case-Shiller Index",
    value: "318.4",
    change: "+5.1% YoY",
    trend: "up" as const,
  },
];

const miniCardData = [
  {
    title: "New Home Sales",
    value: "682K",
    change: "+3.2%",
    trend: "up" as const,
    data: [620, 635, 650, 648, 660, 670, 665, 675, 680, 682],
    color: "#22c55e",
  },
  {
    title: "Existing Home Sales",
    value: "4.09M",
    change: "-1.8%",
    trend: "down" as const,
    data: [4.2, 4.15, 4.1, 4.05, 4.08, 4.12, 4.1, 4.08, 4.05, 4.09],
    color: "#ef4444",
  },
  {
    title: "Inventory (Months)",
    value: "3.2",
    change: "+0.3",
    trend: "up" as const,
    data: [2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.0, 3.1, 3.15, 3.2],
    color: "#6366f1",
  },
  {
    title: "Days on Market",
    value: "28",
    change: "±0",
    trend: "neutral" as const,
    data: [30, 29, 28, 27, 26, 27, 28, 28, 28, 28],
    color: "#94a3b8",
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-[260px] p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Housing Market Dashboard</h1>
            <p className="text-slate-400 mt-1">
              FRED Regional Housing Data • Last updated: Feb 10, 2026
            </p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search metrics..."
              className="bg-slate-800/80 border border-indigo-500/20 rounded-xl px-4 py-3 w-[280px] text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/40"
            />
            <button className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm">
              Export Data
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-5 mb-7">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-3 gap-6 mb-7">
          <div className="col-span-2">
            <PriceChart />
          </div>
          <AffordabilityGauge />
        </div>

        {/* Mini Cards */}
        <div className="grid grid-cols-4 gap-5 mb-7">
          {miniCardData.map((card) => (
            <MiniCard key={card.title} {...card} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          <RegionalChart />
          <ProgressCard />
          <MetricsTable />
        </div>
      </main>
    </div>
  );
}
