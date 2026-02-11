"use client";

import { useState } from "react";
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

type TimePeriod = "1Y" | "5Y" | "10Y" | "Max";

const historicalData: Record<TimePeriod, { date: string; northeast: number; midwest: number; south: number; west: number }[]> = {
  "1Y": [
    { date: "Mar 2025", northeast: 465, midwest: 295, south: 358, west: 575 },
    { date: "Apr 2025", northeast: 470, midwest: 298, south: 362, west: 580 },
    { date: "May 2025", northeast: 475, midwest: 302, south: 368, west: 585 },
    { date: "Jun 2025", northeast: 478, midwest: 305, south: 372, west: 590 },
    { date: "Jul 2025", northeast: 480, midwest: 308, south: 375, west: 592 },
    { date: "Aug 2025", northeast: 482, midwest: 310, south: 376, west: 595 },
    { date: "Sep 2025", northeast: 484, midwest: 311, south: 377, west: 596 },
    { date: "Oct 2025", northeast: 483, midwest: 310, south: 376, west: 594 },
    { date: "Nov 2025", northeast: 484, midwest: 311, south: 377, west: 596 },
    { date: "Dec 2025", northeast: 485, midwest: 312, south: 378, west: 598 },
    { date: "Jan 2026", northeast: 486, midwest: 313, south: 379, west: 599 },
    { date: "Feb 2026", northeast: 485, midwest: 312, south: 378, west: 598 },
  ],
  "5Y": [
    { date: "2021", northeast: 385, midwest: 245, south: 295, west: 485 },
    { date: "2022", northeast: 425, midwest: 275, south: 335, west: 545 },
    { date: "2023", northeast: 445, midwest: 285, south: 350, west: 565 },
    { date: "2024", northeast: 470, midwest: 302, south: 368, west: 585 },
    { date: "2025", northeast: 482, midwest: 310, south: 375, west: 595 },
    { date: "2026", northeast: 485, midwest: 312, south: 378, west: 598 },
  ],
  "10Y": [
    { date: "2016", northeast: 295, midwest: 185, south: 215, west: 365 },
    { date: "2017", northeast: 310, midwest: 195, south: 228, west: 385 },
    { date: "2018", northeast: 328, midwest: 205, south: 242, west: 415 },
    { date: "2019", northeast: 345, midwest: 218, south: 258, west: 445 },
    { date: "2020", northeast: 365, midwest: 232, south: 278, west: 475 },
    { date: "2021", northeast: 385, midwest: 245, south: 295, west: 485 },
    { date: "2022", northeast: 425, midwest: 275, south: 335, west: 545 },
    { date: "2023", northeast: 445, midwest: 285, south: 350, west: 565 },
    { date: "2024", northeast: 470, midwest: 302, south: 368, west: 585 },
    { date: "2025", northeast: 482, midwest: 310, south: 375, west: 595 },
    { date: "2026", northeast: 485, midwest: 312, south: 378, west: 598 },
  ],
  "Max": [
    { date: "1990", northeast: 145, midwest: 85, south: 95, west: 185 },
    { date: "1995", northeast: 165, midwest: 98, south: 112, west: 205 },
    { date: "2000", northeast: 195, midwest: 125, south: 138, west: 265 },
    { date: "2005", northeast: 285, midwest: 168, south: 185, west: 385 },
    { date: "2007", northeast: 305, midwest: 175, south: 195, west: 425 },
    { date: "2009", northeast: 265, midwest: 155, south: 165, west: 345 },
    { date: "2012", northeast: 275, midwest: 165, south: 178, west: 355 },
    { date: "2015", northeast: 295, midwest: 182, south: 205, west: 385 },
    { date: "2018", northeast: 328, midwest: 205, south: 242, west: 415 },
    { date: "2020", northeast: 365, midwest: 232, south: 278, west: 475 },
    { date: "2022", northeast: 425, midwest: 275, south: 335, west: 545 },
    { date: "2024", northeast: 470, midwest: 302, south: 368, west: 585 },
    { date: "2026", northeast: 485, midwest: 312, south: 378, west: 598 },
  ],
};

const periodLabels: Record<TimePeriod, string> = {
  "1Y": "12-month",
  "5Y": "5-year",
  "10Y": "10-year",
  "Max": "All-time",
};

export default function RegionalTrends() {
  const [period, setPeriod] = useState<TimePeriod>("1Y");
  const data = historicalData[period];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Regional Price Trends</h3>
          <p className="text-sm text-slate-400 mt-1">
            {periodLabels[period]} median price trends by region ($K)
          </p>
        </div>
        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
          {(["1Y", "5Y", "10Y", "Max"] as TimePeriod[]).map((p) => (
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

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="date"
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
                backgroundColor: "#0f172a",
                border: "1px solid #6366f1",
                borderRadius: "12px",
                padding: "12px 16px",
              }}
              formatter={(value) => [`$${value}K`, ""]}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#e2e8f0" }}
            />
            <Legend wrapperStyle={{ color: "#e2e8f0" }} />
            <Line
              type="monotone"
              dataKey="west"
              name="West"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={period !== "1Y"}
            />
            <Line
              type="monotone"
              dataKey="northeast"
              name="Northeast"
              stroke="#6366f1"
              strokeWidth={2}
              dot={period !== "1Y"}
            />
            <Line
              type="monotone"
              dataKey="south"
              name="South"
              stroke="#f97316"
              strokeWidth={2}
              dot={period !== "1Y"}
            />
            <Line
              type="monotone"
              dataKey="midwest"
              name="Midwest"
              stroke="#22c55e"
              strokeWidth={2}
              dot={period !== "1Y"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
