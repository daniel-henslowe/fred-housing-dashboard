"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import KpiModal from "./KpiModal";

const nationalAverageData = {
  label: "National Average",
  value: "$516,500",
  change: "+3.8% YoY",
  trend: "up" as const,
  icon: "📊",
  color: "#22c55e",
  unit: "$",
  description: "The average sales price of houses sold in the United States. This metric is typically higher than the median due to high-end sales. Source: FRED ASPUS series.",
  historicalData: {
    "1Y": [
      { date: "Mar 2025", value: 478000 },
      { date: "Apr 2025", value: 482000 },
      { date: "May 2025", value: 488000 },
      { date: "Jun 2025", value: 495000 },
      { date: "Jul 2025", value: 502000 },
      { date: "Aug 2025", value: 508000 },
      { date: "Sep 2025", value: 512000 },
      { date: "Oct 2025", value: 515000 },
      { date: "Nov 2025", value: 518000 },
      { date: "Dec 2025", value: 516000 },
      { date: "Jan 2026", value: 515000 },
      { date: "Feb 2026", value: 516500 },
    ],
    "5Y": [
      { date: "2021", value: 385 },
      { date: "2022", value: 485 },
      { date: "2023", value: 475 },
      { date: "2024", value: 505 },
      { date: "2025", value: 512 },
      { date: "2026", value: 517 },
    ],
    "10Y": [
      { date: "2016 H1", value: 295000 },
      { date: "2016 H2", value: 305000 },
      { date: "2017 H1", value: 318000 },
      { date: "2017 H2", value: 332000 },
      { date: "2018 H1", value: 348000 },
      { date: "2018 H2", value: 358000 },
      { date: "2019 H1", value: 365000 },
      { date: "2019 H2", value: 375000 },
      { date: "2020 H1", value: 378000 },
      { date: "2020 H2", value: 398000 },
      { date: "2021 H1", value: 425000 },
      { date: "2021 H2", value: 445000 },
      { date: "2022 H1", value: 485000 },
      { date: "2022 H2", value: 478000 },
      { date: "2023 H1", value: 472000 },
      { date: "2023 H2", value: 488000 },
      { date: "2024 H1", value: 498000 },
      { date: "2024 H2", value: 512000 },
      { date: "2025 H1", value: 515000 },
      { date: "2025 H2", value: 516500 },
    ],
    "Max": [
      { date: "2000", value: 175000 },
      { date: "2002", value: 195000 },
      { date: "2004", value: 235000 },
      { date: "2006", value: 285000 },
      { date: "2008", value: 252000 },
      { date: "2010", value: 218000 },
      { date: "2012", value: 225000 },
      { date: "2014", value: 265000 },
      { date: "2016", value: 302000 },
      { date: "2018", value: 355000 },
      { date: "2020", value: 395000 },
      { date: "2022", value: 485000 },
      { date: "2024", value: 508000 },
      { date: "2026", value: 516500 },
    ],
  },
};

// Simplified 5Y data for the chart (in $K)
const chartData = [
  { year: "2021", value: 415 },
  { year: "2022", value: 485 },
  { year: "2023", value: 480 },
  { year: "2024", value: 505 },
  { year: "2025", value: 512 },
  { year: "2026", value: 517 },
];

export default function NationalAverageCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="glass-card p-6 h-full flex flex-col cursor-pointer transition-all duration-200 hover:scale-[1.01] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-3xl mb-2">{nationalAverageData.icon}</div>
            <div className="text-sm text-slate-400">{nationalAverageData.label}</div>
          </div>
          <div className={`text-sm px-2 py-1 rounded-full ${nationalAverageData.trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
            {nationalAverageData.trend === "up" ? "↑" : "↓"} {nationalAverageData.change}
          </div>
        </div>

        <div className="text-4xl font-bold mb-4">{nationalAverageData.value}</div>

        {/* 5 Year Chart */}
        <div className="flex-1 min-h-[180px]">
          <div className="text-xs text-slate-500 mb-2">5-Year Trend</div>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorNationalAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="year"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v}K`}
                domain={["dataMin - 20", "dataMax + 20"]}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #22c55e",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`$${value}K`, "Avg Price"]}
                labelStyle={{ color: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNationalAvg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-slate-500 mt-2 text-center">
          Click for detailed historical data
        </p>
      </div>

      {showModal && (
        <KpiModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={nationalAverageData.label}
          currentValue={nationalAverageData.value}
          change={nationalAverageData.change}
          trend={nationalAverageData.trend}
          icon={nationalAverageData.icon}
          historicalData={nationalAverageData.historicalData}
          unit={nationalAverageData.unit}
          description={nationalAverageData.description}
          color={nationalAverageData.color}
        />
      )}
    </>
  );
}
