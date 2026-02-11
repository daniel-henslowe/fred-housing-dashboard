"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const salesData = [
  { month: "Mar '25", sales: 645, medianPrice: 425, avgPrice: 485 },
  { month: "Apr '25", sales: 658, medianPrice: 428, avgPrice: 492 },
  { month: "May '25", sales: 672, medianPrice: 432, avgPrice: 498 },
  { month: "Jun '25", sales: 695, medianPrice: 438, avgPrice: 505 },
  { month: "Jul '25", sales: 708, medianPrice: 442, avgPrice: 512 },
  { month: "Aug '25", sales: 698, medianPrice: 445, avgPrice: 518 },
  { month: "Sep '25", sales: 685, medianPrice: 448, avgPrice: 522 },
  { month: "Oct '25", sales: 668, medianPrice: 445, avgPrice: 518 },
  { month: "Nov '25", sales: 655, medianPrice: 442, avgPrice: 515 },
  { month: "Dec '25", sales: 665, medianPrice: 445, avgPrice: 518 },
  { month: "Jan '26", sales: 675, medianPrice: 448, avgPrice: 522 },
  { month: "Feb '26", sales: 683, medianPrice: 450, avgPrice: 525 },
];

const supplyData = [
  { label: "Months Supply", value: "7.8", change: -0.3 },
  { label: "For Sale Inventory", value: "481K", change: 2.5 },
  { label: "Median Sale Price", value: "$450K", change: 5.9 },
  { label: "Avg Sale Price", value: "$525K", change: 8.2 },
];

export default function NewHomeSalesChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">New Home Sales</h3>
          <p className="text-sm text-slate-400 mt-1">
            Monthly new home sales (thousands, SAAR)
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">683K</div>
          <div className="text-xs text-green-400">↑ 4.5% YoY</div>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[600, 750]} />
            <ReferenceLine y={675} stroke="#6366f1" strokeDasharray="5 5" strokeOpacity={0.5} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #6366f1",
                borderRadius: "12px",
                padding: "12px",
              }}
              formatter={(value, name) => {
                if (name === "sales") return [`${value}K`, "Sales"];
                return [`$${value}K`, name === "medianPrice" ? "Median Price" : "Avg Price"];
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#e2e8f0" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              name="sales"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-700/50">
        {supplyData.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-lg font-bold">{item.value}</div>
            <div className="text-xs text-slate-400">{item.label}</div>
            <div className={`text-xs mt-1 ${item.change > 0 ? "text-green-400" : "text-red-400"}`}>
              {item.change > 0 ? "↑" : "↓"} {Math.abs(item.change)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
