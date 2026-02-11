"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";

interface RegionData {
  region: string;
  starts: number;
  permits: number;
  completions: number;
  underConstruction: number;
  yoyChange: number;
  color: string;
}

const regionalData: RegionData[] = [
  { region: "South", starts: 625, permits: 685, completions: 585, underConstruction: 725, yoyChange: 8.2, color: "#f97316" },
  { region: "West", starts: 335, permits: 365, completions: 315, underConstruction: 385, yoyChange: 2.5, color: "#8b5cf6" },
  { region: "Midwest", starts: 245, permits: 265, completions: 235, underConstruction: 285, yoyChange: 5.8, color: "#22c55e" },
  { region: "Northeast", starts: 215, permits: 235, completions: 205, underConstruction: 275, yoyChange: 3.2, color: "#6366f1" },
];

const stateData = [
  { state: "Texas", starts: 225, change: 12.5 },
  { state: "Florida", starts: 185, change: 8.8 },
  { state: "California", starts: 115, change: -2.5 },
  { state: "North Carolina", starts: 85, change: 9.2 },
  { state: "Georgia", starts: 75, change: 7.5 },
  { state: "Arizona", starts: 65, change: 4.2 },
  { state: "Tennessee", starts: 55, change: 6.8 },
  { state: "Colorado", starts: 45, change: 1.5 },
  { state: "Washington", starts: 42, change: 3.2 },
  { state: "Virginia", starts: 38, change: 5.5 },
];

const pieData = regionalData.map((r) => ({
  name: r.region,
  value: r.starts,
  color: r.color,
}));

type MetricType = "starts" | "permits" | "completions" | "underConstruction";

const metrics: { key: MetricType; label: string }[] = [
  { key: "starts", label: "Housing Starts" },
  { key: "permits", label: "Building Permits" },
  { key: "completions", label: "Completions" },
  { key: "underConstruction", label: "Under Construction" },
];

export default function RegionalConstruction() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("starts");

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Regional Construction Activity</h3>
          <p className="text-sm text-slate-400 mt-1">
            Housing starts and permits by Census region (thousands, SAAR)
          </p>
        </div>
        <div className="flex gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                selectedMetric === metric.key
                  ? "bg-indigo-500/20 border border-indigo-500/30 text-white"
                  : "bg-slate-800/50 text-slate-400 hover:text-white"
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Regional Bar Chart */}
        <div className="col-span-2">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis type="category" dataKey="region" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #6366f1",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                  formatter={(value) => [`${value}K`, metrics.find(m => m.key === selectedMetric)?.label]}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#e2e8f0" }}
                />
                <Bar dataKey={selectedMetric} radius={[0, 4, 4, 0]} cursor="pointer">
                  {regionalData.map((entry) => (
                    <Cell key={entry.region} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div>
          <div className="text-sm font-medium mb-2 text-center">Share by Region</div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #6366f1",
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                  formatter={(value) => [`${value}K`, "Starts"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {regionalData.map((region) => (
              <div key={region.region} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                <span className="text-xs text-slate-400">{region.region}</span>
                <span className={`text-xs ml-auto ${region.yoyChange > 0 ? "text-green-400" : "text-red-400"}`}>
                  {region.yoyChange > 0 ? "+" : ""}{region.yoyChange}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top States */}
        <div>
          <div className="text-sm font-medium mb-3">Top 10 States (Starts)</div>
          <div className="space-y-2">
            {stateData.map((state, index) => (
              <div key={state.state} className="flex items-center gap-2">
                <span className="w-4 text-xs text-slate-500">{index + 1}</span>
                <span className="flex-1 text-sm">{state.state}</span>
                <span className="text-sm font-medium">{state.starts}K</span>
                <span className={`text-xs w-12 text-right ${state.change > 0 ? "text-green-400" : "text-red-400"}`}>
                  {state.change > 0 ? "+" : ""}{state.change}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Detail Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/50">
        {regionalData.map((region) => (
          <div
            key={region.region}
            className="bg-slate-800/30 rounded-xl p-4 border-l-4 hover:bg-slate-800/50 transition-all cursor-pointer"
            style={{ borderLeftColor: region.color }}
          >
            <div className="text-sm font-medium mb-3">{region.region}</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-slate-500">Starts</div>
                <div className="text-lg font-bold">{region.starts}K</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Permits</div>
                <div className="text-lg font-bold">{region.permits}K</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Completions</div>
                <div className="text-lg font-bold">{region.completions}K</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Under Const.</div>
                <div className="text-lg font-bold">{region.underConstruction}K</div>
              </div>
            </div>
            <div className={`text-xs mt-3 ${region.yoyChange > 0 ? "text-green-400" : "text-red-400"}`}>
              {region.yoyChange > 0 ? "↑" : "↓"} {Math.abs(region.yoyChange)}% YoY change
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
