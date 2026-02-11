"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const permitsData = [
  { month: "Mar '25", permits: 1425, color: "#6366f1" },
  { month: "Apr '25", permits: 1458, color: "#6366f1" },
  { month: "May '25", permits: 1492, color: "#6366f1" },
  { month: "Jun '25", permits: 1528, color: "#22c55e" },
  { month: "Jul '25", permits: 1545, color: "#22c55e" },
  { month: "Aug '25", permits: 1512, color: "#6366f1" },
  { month: "Sep '25", permits: 1485, color: "#6366f1" },
  { month: "Oct '25", permits: 1468, color: "#6366f1" },
  { month: "Nov '25", permits: 1475, color: "#6366f1" },
  { month: "Dec '25", permits: 1488, color: "#6366f1" },
  { month: "Jan '26", permits: 1502, color: "#6366f1" },
  { month: "Feb '26", permits: 1510, color: "#22c55e" },
];

const permitsByType = [
  { type: "Single Family", value: 985, percentage: 65.2, color: "#6366f1" },
  { type: "2-4 Units", value: 68, percentage: 4.5, color: "#8b5cf6" },
  { type: "5+ Units", value: 457, percentage: 30.3, color: "#a855f7" },
];

export default function BuildingPermitsChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Building Permits</h3>
          <p className="text-sm text-slate-400 mt-1">
            Monthly permits issued (thousands, SAAR)
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">1.51M</div>
          <div className="text-xs text-green-400">↑ 3.2% YoY</div>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={permitsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[1300, 1600]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #6366f1",
                borderRadius: "12px",
                padding: "12px",
              }}
              formatter={(value) => [`${value}K`, "Permits"]}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#e2e8f0" }}
            />
            <Bar dataKey="permits" radius={[4, 4, 0, 0]}>
              {permitsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="text-sm font-medium mb-3">Permits by Structure Type</div>
        <div className="space-y-2">
          {permitsByType.map((item) => (
            <div key={item.type} className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 text-sm text-slate-400">{item.type}</div>
              <div className="text-sm font-medium">{item.value}K</div>
              <div className="text-xs text-slate-500 w-12 text-right">
                {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
