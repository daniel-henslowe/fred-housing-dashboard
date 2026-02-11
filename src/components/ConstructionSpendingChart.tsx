"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const spendingData = [
  { month: "Mar '25", residential: 875, nonResidential: 585, total: 1460, growth: 6.8 },
  { month: "Apr '25", residential: 892, nonResidential: 595, total: 1487, growth: 7.2 },
  { month: "May '25", residential: 915, nonResidential: 608, total: 1523, growth: 7.5 },
  { month: "Jun '25", residential: 935, nonResidential: 622, total: 1557, growth: 7.8 },
  { month: "Jul '25", residential: 948, nonResidential: 635, total: 1583, growth: 8.1 },
  { month: "Aug '25", residential: 955, nonResidential: 645, total: 1600, growth: 7.9 },
  { month: "Sep '25", residential: 942, nonResidential: 652, total: 1594, growth: 7.5 },
  { month: "Oct '25", residential: 928, nonResidential: 658, total: 1586, growth: 7.2 },
  { month: "Nov '25", residential: 935, nonResidential: 665, total: 1600, growth: 7.0 },
  { month: "Dec '25", residential: 945, nonResidential: 672, total: 1617, growth: 7.1 },
  { month: "Jan '26", residential: 952, nonResidential: 678, total: 1630, growth: 7.2 },
  { month: "Feb '26", residential: 958, nonResidential: 685, total: 1643, growth: 7.2 },
];

const spendingCategories = [
  { category: "New Single Family", value: 425, change: 8.5 },
  { category: "New Multi Family", value: 145, change: 5.2 },
  { category: "Residential Improvements", value: 388, change: 6.8 },
  { category: "Non-Residential", value: 685, change: 7.5 },
];

export default function ConstructionSpendingChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Construction Spending</h3>
          <p className="text-sm text-slate-400 mt-1">
            Monthly spending by sector ($B, SAAR)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-slate-400">Residential</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-cyan-500" />
            <span className="text-slate-400">Non-Residential</span>
          </div>
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 12]} tickFormatter={(v) => `${v}%`} />
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
            <Bar yAxisId="left" dataKey="residential" name="Residential" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
            <Bar yAxisId="left" dataKey="nonResidential" name="Non-Residential" stackId="a" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="growth" name="YoY Growth" stroke="#f97316" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-700/50">
        {spendingCategories.map((cat) => (
          <div key={cat.category} className="bg-slate-800/30 rounded-lg p-3">
            <div className="text-xs text-slate-400">{cat.category}</div>
            <div className="flex items-end justify-between mt-1">
              <span className="text-lg font-bold">${cat.value}B</span>
              <span className={`text-xs ${cat.change > 0 ? "text-green-400" : "text-red-400"}`}>
                {cat.change > 0 ? "+" : ""}{cat.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
