"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

interface RegionData {
  region: string;
  medianPrice: number;
  avgPrice: number;
  yoyChange: number;
  color: string;
}

const regionData: RegionData[] = [
  { region: "Northeast", medianPrice: 485, avgPrice: 545, yoyChange: 5.2, color: "#6366f1" },
  { region: "Midwest", medianPrice: 312, avgPrice: 358, yoyChange: 6.8, color: "#22c55e" },
  { region: "South", medianPrice: 378, avgPrice: 425, yoyChange: 4.5, color: "#f97316" },
  { region: "West", medianPrice: 598, avgPrice: 685, yoyChange: 3.1, color: "#8b5cf6" },
];

export default function RegionalPriceGrid() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Median vs Average Price Comparison */}
      <div className="glass-card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Median vs Average Prices by Region</h3>
          <p className="text-sm text-slate-400 mt-1">Comparison in thousands ($K)</p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="region"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${value}K`, ""]}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Bar
                dataKey="medianPrice"
                name="Median Price"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="avgPrice"
                name="Average Price"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {regionData.map((region) => (
          <div
            key={region.region}
            className="glass-card p-5 relative overflow-hidden"
            style={{ borderLeft: `4px solid ${region.color}` }}
          >
            <div className="text-sm text-slate-400 mb-2">{region.region}</div>
            <div className="text-2xl font-bold mb-1">${region.medianPrice}K</div>
            <div className="text-sm text-slate-500 mb-3">
              Avg: ${region.avgPrice}K
            </div>
            <div
              className={`text-sm font-medium ${
                region.yoyChange > 5
                  ? "text-green-400"
                  : region.yoyChange > 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {region.yoyChange > 0 ? "↑" : "↓"} {Math.abs(region.yoyChange)}% YoY
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
