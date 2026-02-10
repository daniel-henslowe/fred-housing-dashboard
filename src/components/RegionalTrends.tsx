"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const trendData = [
  { month: "Mar", northeast: 465, midwest: 295, south: 358, west: 575 },
  { month: "Apr", northeast: 470, midwest: 298, south: 362, west: 580 },
  { month: "May", northeast: 475, midwest: 302, south: 368, west: 585 },
  { month: "Jun", northeast: 478, midwest: 305, south: 372, west: 590 },
  { month: "Jul", northeast: 480, midwest: 308, south: 375, west: 592 },
  { month: "Aug", northeast: 482, midwest: 310, south: 376, west: 595 },
  { month: "Sep", northeast: 484, midwest: 311, south: 377, west: 596 },
  { month: "Oct", northeast: 483, midwest: 310, south: 376, west: 594 },
  { month: "Nov", northeast: 484, midwest: 311, south: 377, west: 596 },
  { month: "Dec", northeast: 485, midwest: 312, south: 378, west: 598 },
  { month: "Jan", northeast: 486, midwest: 313, south: 379, west: 599 },
  { month: "Feb", northeast: 485, midwest: 312, south: 378, west: 598 },
];

export default function RegionalTrends() {
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Regional Price Trends</h3>
        <p className="text-sm text-slate-400 mt-1">
          12-month median price trends by region ($K)
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}K`}
              domain={["dataMin - 20", "dataMax + 20"]}
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
            <Line
              type="monotone"
              dataKey="west"
              name="West"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="northeast"
              name="Northeast"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="south"
              name="South"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="midwest"
              name="Midwest"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
