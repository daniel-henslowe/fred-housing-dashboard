"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

type TimePeriod = "1Y" | "5Y" | "10Y";

const materialData: Record<TimePeriod, { date: string; lumber: number; steel: number; cement: number; copper: number; gypsum: number }[]> = {
  "1Y": [
    { date: "Mar '25", lumber: 445, steel: 148, cement: 172, copper: 425, gypsum: 118 },
    { date: "Apr '25", lumber: 462, steel: 152, cement: 175, copper: 432, gypsum: 120 },
    { date: "May '25", lumber: 478, steel: 155, cement: 178, copper: 445, gypsum: 122 },
    { date: "Jun '25", lumber: 495, steel: 158, cement: 180, copper: 458, gypsum: 124 },
    { date: "Jul '25", lumber: 512, steel: 162, cement: 182, copper: 472, gypsum: 126 },
    { date: "Aug '25", lumber: 498, steel: 165, cement: 184, copper: 465, gypsum: 128 },
    { date: "Sep '25", lumber: 485, steel: 162, cement: 183, copper: 458, gypsum: 127 },
    { date: "Oct '25", lumber: 472, steel: 158, cement: 181, copper: 448, gypsum: 125 },
    { date: "Nov '25", lumber: 465, steel: 155, cement: 180, copper: 442, gypsum: 124 },
    { date: "Dec '25", lumber: 458, steel: 152, cement: 178, copper: 438, gypsum: 123 },
    { date: "Jan '26", lumber: 468, steel: 155, cement: 180, copper: 445, gypsum: 125 },
    { date: "Feb '26", lumber: 475, steel: 158, cement: 182, copper: 452, gypsum: 126 },
  ],
  "5Y": [
    { date: "2021", lumber: 1515, steel: 185, cement: 158, copper: 445, gypsum: 108 },
    { date: "2022", lumber: 625, steel: 195, cement: 168, copper: 435, gypsum: 115 },
    { date: "2023", lumber: 395, steel: 165, cement: 172, copper: 385, gypsum: 118 },
    { date: "2024", lumber: 445, steel: 155, cement: 178, copper: 415, gypsum: 122 },
    { date: "2025", lumber: 485, steel: 158, cement: 182, copper: 455, gypsum: 125 },
    { date: "2026", lumber: 475, steel: 158, cement: 182, copper: 452, gypsum: 126 },
  ],
  "10Y": [
    { date: "2016", lumber: 285, steel: 92, cement: 118, copper: 215, gypsum: 85 },
    { date: "2018", lumber: 545, steel: 125, cement: 132, copper: 295, gypsum: 95 },
    { date: "2020", lumber: 895, steel: 142, cement: 148, copper: 285, gypsum: 102 },
    { date: "2022", lumber: 625, steel: 195, cement: 168, copper: 435, gypsum: 115 },
    { date: "2024", lumber: 445, steel: 155, cement: 178, copper: 415, gypsum: 122 },
    { date: "2026", lumber: 475, steel: 158, cement: 182, copper: 452, gypsum: 126 },
  ],
};

const materials = [
  { key: "lumber", name: "Lumber ($/1000 bf)", color: "#f97316", current: "$475", change: 6.8 },
  { key: "steel", name: "Steel ($/cwt)", color: "#6366f1", current: "$158", change: 2.1 },
  { key: "cement", name: "Cement (PPI Index)", color: "#22c55e", current: "182", change: 2.5 },
  { key: "copper", name: "Copper ($/lb)", color: "#ec4899", current: "$4.52", change: 8.9 },
  { key: "gypsum", name: "Gypsum (PPI Index)", color: "#06b6d4", current: "126", change: 3.2 },
];

export default function MaterialCostsChart() {
  const [period, setPeriod] = useState<TimePeriod>("1Y");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(["lumber", "steel", "copper"]);

  const toggleMaterial = (key: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key]
    );
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Construction Material Costs</h3>
          <p className="text-sm text-slate-400 mt-1">
            Producer Price Index & commodity prices for key building materials
          </p>
        </div>
        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
          {(["1Y", "5Y", "10Y"] as TimePeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                period === p
                  ? "bg-indigo-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Material toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        {materials.map((mat) => (
          <button
            key={mat.key}
            onClick={() => toggleMaterial(mat.key)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-2 ${
              selectedMaterials.includes(mat.key)
                ? "bg-slate-700 text-white"
                : "bg-slate-800/50 text-slate-500"
            }`}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: selectedMaterials.includes(mat.key) ? mat.color : "#64748b" }}
            />
            {mat.name.split(" (")[0]}
          </button>
        ))}
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={materialData[period]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #6366f1",
                borderRadius: "12px",
                padding: "12px",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#e2e8f0" }}
            />
            <Legend wrapperStyle={{ color: "#e2e8f0" }} />
            {materials.map(
              (mat) =>
                selectedMaterials.includes(mat.key) && (
                  <Line
                    key={mat.key}
                    type="monotone"
                    dataKey={mat.key}
                    name={mat.name}
                    stroke={mat.color}
                    strokeWidth={2}
                    dot={period !== "1Y"}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-3 mt-4 pt-4 border-t border-slate-700/50">
        {materials.map((mat) => (
          <div
            key={mat.key}
            className={`p-3 rounded-lg transition-all ${
              selectedMaterials.includes(mat.key) ? "bg-slate-800/50" : "bg-slate-800/20 opacity-50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: mat.color }} />
              <span className="text-xs text-slate-400">{mat.name.split(" (")[0]}</span>
            </div>
            <div className="text-lg font-bold">{mat.current}</div>
            <div className={`text-xs ${mat.change > 0 ? "text-green-400" : "text-red-400"}`}>
              {mat.change > 0 ? "↑" : "↓"} {Math.abs(mat.change)}% YoY
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
