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
} from "recharts";

const data = [
  { region: "Northeast", price: 485, color: "#6366f1" },
  { region: "Midwest", price: 312, color: "#22c55e" },
  { region: "South", price: 378, color: "#f97316" },
  { region: "West", price: 598, color: "#8b5cf6" },
];

export default function RegionalChart() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">Regional Distribution</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
              formatter={(value) => [`$${value}K`, "Median Price"]}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="price" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
