"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import KpiCard from "@/components/KpiCard";
import KpiModal from "@/components/KpiModal";
import PriceChart from "@/components/PriceChart";
import AffordabilityGauge from "@/components/AffordabilityGauge";
import MiniCard from "@/components/MiniCard";
import RegionalChart from "@/components/RegionalChart";
import ProgressCard from "@/components/ProgressCard";
import MetricsTable from "@/components/MetricsTable";

interface MetricDataItem {
  id: string;
  icon: string;
  iconBg?: "blue" | "green" | "purple" | "orange" | "cyan";
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  unit?: string;
  color: string;
  description: string;
  historicalData: { date: string; value: number }[];
  // For mini cards
  sparklineData?: number[];
}

const kpiData: MetricDataItem[] = [
  {
    id: "median-price",
    icon: "🏠",
    iconBg: "blue",
    label: "Median Home Price",
    value: "$428,700",
    change: "+4.2% from last year",
    trend: "up",
    unit: "$",
    color: "#3b82f6",
    description: "The median sales price of houses sold in the United States. This metric represents the middle point of all home sales, where half of homes sold for more and half sold for less. Source: FRED MSPUS series.",
    historicalData: [
      { date: "Mar 2025", value: 395000 },
      { date: "Apr 2025", value: 398000 },
      { date: "May 2025", value: 405000 },
      { date: "Jun 2025", value: 412000 },
      { date: "Jul 2025", value: 418000 },
      { date: "Aug 2025", value: 422000 },
      { date: "Sep 2025", value: 425000 },
      { date: "Oct 2025", value: 428000 },
      { date: "Nov 2025", value: 430000 },
      { date: "Dec 2025", value: 428000 },
      { date: "Jan 2026", value: 427000 },
      { date: "Feb 2026", value: 428700 },
    ],
  },
  {
    id: "housing-starts",
    icon: "🏗️",
    iconBg: "green",
    label: "Housing Starts",
    value: "1.42M",
    change: "+2.8% MoM",
    trend: "up",
    unit: "",
    color: "#22c55e",
    description: "Housing starts measure the number of new residential construction projects that have begun during a given period. This is a key indicator of economic health and future housing supply. Source: FRED HOUST series.",
    historicalData: [
      { date: "Mar 2025", value: 1.32 },
      { date: "Apr 2025", value: 1.35 },
      { date: "May 2025", value: 1.38 },
      { date: "Jun 2025", value: 1.36 },
      { date: "Jul 2025", value: 1.39 },
      { date: "Aug 2025", value: 1.41 },
      { date: "Sep 2025", value: 1.40 },
      { date: "Oct 2025", value: 1.38 },
      { date: "Nov 2025", value: 1.36 },
      { date: "Dec 2025", value: 1.35 },
      { date: "Jan 2026", value: 1.38 },
      { date: "Feb 2026", value: 1.42 },
    ],
  },
  {
    id: "building-permits",
    icon: "📋",
    iconBg: "purple",
    label: "Building Permits",
    value: "1.51M",
    change: "-1.3% MoM",
    trend: "down",
    unit: "",
    color: "#8b5cf6",
    description: "Building permits are authorizations granted by local governments for new construction. This leading indicator shows future construction activity and housing supply trends. Source: FRED PERMIT series.",
    historicalData: [
      { date: "Mar 2025", value: 1.48 },
      { date: "Apr 2025", value: 1.52 },
      { date: "May 2025", value: 1.55 },
      { date: "Jun 2025", value: 1.58 },
      { date: "Jul 2025", value: 1.56 },
      { date: "Aug 2025", value: 1.54 },
      { date: "Sep 2025", value: 1.52 },
      { date: "Oct 2025", value: 1.50 },
      { date: "Nov 2025", value: 1.53 },
      { date: "Dec 2025", value: 1.55 },
      { date: "Jan 2026", value: 1.53 },
      { date: "Feb 2026", value: 1.51 },
    ],
  },
  {
    id: "mortgage-rate",
    icon: "📊",
    iconBg: "orange",
    label: "30-Yr Mortgage Rate",
    value: "6.42%",
    change: "-0.15 pts",
    trend: "down",
    unit: "",
    color: "#f97316",
    description: "The average 30-year fixed mortgage rate in the United States. This rate significantly impacts home affordability and buyer demand. Source: FRED MORTGAGE30US series.",
    historicalData: [
      { date: "Mar 2025", value: 6.85 },
      { date: "Apr 2025", value: 6.78 },
      { date: "May 2025", value: 6.72 },
      { date: "Jun 2025", value: 6.68 },
      { date: "Jul 2025", value: 6.75 },
      { date: "Aug 2025", value: 6.82 },
      { date: "Sep 2025", value: 6.70 },
      { date: "Oct 2025", value: 6.58 },
      { date: "Nov 2025", value: 6.52 },
      { date: "Dec 2025", value: 6.48 },
      { date: "Jan 2026", value: 6.57 },
      { date: "Feb 2026", value: 6.42 },
    ],
  },
  {
    id: "case-shiller",
    icon: "📈",
    iconBg: "cyan",
    label: "Case-Shiller Index",
    value: "318.4",
    change: "+5.1% YoY",
    trend: "up",
    unit: "",
    color: "#06b6d4",
    description: "The S&P CoreLogic Case-Shiller U.S. National Home Price Index measures changes in the value of residential real estate nationally. It's the leading measure for U.S. residential real estate prices. Source: FRED CSUSHPINSA series.",
    historicalData: [
      { date: "Mar 2025", value: 290.2 },
      { date: "Apr 2025", value: 295.4 },
      { date: "May 2025", value: 300.1 },
      { date: "Jun 2025", value: 305.8 },
      { date: "Jul 2025", value: 308.2 },
      { date: "Aug 2025", value: 312.5 },
      { date: "Sep 2025", value: 315.1 },
      { date: "Oct 2025", value: 318.8 },
      { date: "Nov 2025", value: 320.2 },
      { date: "Dec 2025", value: 318.5 },
      { date: "Jan 2026", value: 316.8 },
      { date: "Feb 2026", value: 318.4 },
    ],
  },
];

const miniCardData: MetricDataItem[] = [
  {
    id: "new-home-sales",
    icon: "🏡",
    label: "New Home Sales",
    value: "682K",
    change: "+3.2%",
    trend: "up",
    unit: "",
    color: "#22c55e",
    sparklineData: [620, 635, 650, 648, 660, 670, 665, 675, 680, 682],
    description: "New home sales measure the number of newly constructed homes sold during a period. This is a key indicator of housing demand and builder confidence. Source: FRED HSN1F series.",
    historicalData: [
      { date: "Mar 2025", value: 620 },
      { date: "Apr 2025", value: 635 },
      { date: "May 2025", value: 650 },
      { date: "Jun 2025", value: 648 },
      { date: "Jul 2025", value: 660 },
      { date: "Aug 2025", value: 670 },
      { date: "Sep 2025", value: 665 },
      { date: "Oct 2025", value: 675 },
      { date: "Nov 2025", value: 680 },
      { date: "Dec 2025", value: 678 },
      { date: "Jan 2026", value: 680 },
      { date: "Feb 2026", value: 682 },
    ],
  },
  {
    id: "existing-home-sales",
    icon: "🏠",
    label: "Existing Home Sales",
    value: "4.09M",
    change: "-1.8%",
    trend: "down",
    unit: "",
    color: "#ef4444",
    sparklineData: [4.2, 4.15, 4.1, 4.05, 4.08, 4.12, 4.1, 4.08, 4.05, 4.09],
    description: "Existing home sales measure the number of previously owned homes sold. This represents the bulk of the housing market and indicates overall market health. Source: FRED EXHOSLUSM495S series.",
    historicalData: [
      { date: "Mar 2025", value: 4.20 },
      { date: "Apr 2025", value: 4.15 },
      { date: "May 2025", value: 4.10 },
      { date: "Jun 2025", value: 4.05 },
      { date: "Jul 2025", value: 4.08 },
      { date: "Aug 2025", value: 4.12 },
      { date: "Sep 2025", value: 4.10 },
      { date: "Oct 2025", value: 4.08 },
      { date: "Nov 2025", value: 4.05 },
      { date: "Dec 2025", value: 4.02 },
      { date: "Jan 2026", value: 4.05 },
      { date: "Feb 2026", value: 4.09 },
    ],
  },
  {
    id: "inventory-months",
    icon: "📦",
    label: "Inventory (Months)",
    value: "3.2",
    change: "+0.3",
    trend: "up",
    unit: "",
    color: "#6366f1",
    sparklineData: [2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.0, 3.1, 3.15, 3.2],
    description: "Months of supply represents how long it would take to sell all homes currently on the market at the current sales pace. A balanced market typically has 4-6 months of supply. Source: FRED MSACSR series.",
    historicalData: [
      { date: "Mar 2025", value: 2.5 },
      { date: "Apr 2025", value: 2.6 },
      { date: "May 2025", value: 2.7 },
      { date: "Jun 2025", value: 2.8 },
      { date: "Jul 2025", value: 2.9 },
      { date: "Aug 2025", value: 3.0 },
      { date: "Sep 2025", value: 3.0 },
      { date: "Oct 2025", value: 3.1 },
      { date: "Nov 2025", value: 3.15 },
      { date: "Dec 2025", value: 3.18 },
      { date: "Jan 2026", value: 3.2 },
      { date: "Feb 2026", value: 3.2 },
    ],
  },
  {
    id: "days-on-market",
    icon: "📅",
    label: "Days on Market",
    value: "28",
    change: "±0",
    trend: "neutral",
    unit: "",
    color: "#94a3b8",
    sparklineData: [30, 29, 28, 27, 26, 27, 28, 28, 28, 28],
    description: "Median days on market measures how long homes typically stay listed before selling. Lower numbers indicate a seller's market with high demand. Source: FRED regional data.",
    historicalData: [
      { date: "Mar 2025", value: 30 },
      { date: "Apr 2025", value: 29 },
      { date: "May 2025", value: 28 },
      { date: "Jun 2025", value: 27 },
      { date: "Jul 2025", value: 26 },
      { date: "Aug 2025", value: 27 },
      { date: "Sep 2025", value: 28 },
      { date: "Oct 2025", value: 28 },
      { date: "Nov 2025", value: 28 },
      { date: "Dec 2025", value: 29 },
      { date: "Jan 2026", value: 28 },
      { date: "Feb 2026", value: 28 },
    ],
  },
];

export default function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState<MetricDataItem | null>(null);

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
            <KpiCard
              key={kpi.id}
              icon={kpi.icon}
              iconBg={kpi.iconBg!}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              trend={kpi.trend as "up" | "down"}
              onClick={() => setSelectedMetric(kpi)}
            />
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
            <MiniCard
              key={card.id}
              title={card.label}
              value={card.value}
              change={card.change}
              trend={card.trend}
              data={card.sparklineData!}
              color={card.color}
              onClick={() => setSelectedMetric(card)}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          <RegionalChart />
          <ProgressCard />
          <MetricsTable />
        </div>
      </main>

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <KpiModal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={selectedMetric.label}
          currentValue={selectedMetric.value}
          change={selectedMetric.change}
          trend={selectedMetric.trend as "up" | "down"}
          icon={selectedMetric.icon}
          historicalData={selectedMetric.historicalData}
          unit={selectedMetric.unit}
          description={selectedMetric.description}
          color={selectedMetric.color}
        />
      )}
    </div>
  );
}
