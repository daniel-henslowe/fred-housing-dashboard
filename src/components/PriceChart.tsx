"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", median: 395, newConstruction: 420 },
  { month: "Feb", median: 398, newConstruction: 425 },
  { month: "Mar", median: 405, newConstruction: 432 },
  { month: "Apr", median: 412, newConstruction: 438 },
  { month: "May", median: 418, newConstruction: 445 },
  { month: "Jun", median: 422, newConstruction: 450 },
  { month: "Jul", median: 425, newConstruction: 455 },
  { month: "Aug", median: 428, newConstruction: 460 },
  { month: "Sep", median: 430, newConstruction: 462 },
  { month: "Oct", median: 428, newConstruction: 458 },
  { month: "Nov", median: 427, newConstruction: 455 },
  { month: "Dec", median: 429, newConstruction: 458 },
];

const periods = ["1Y", "5Y", "10Y", "Max"];

export default function PriceChart() {
  const [activePeriod, setActivePeriod] = useState("1Y");

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">Home Price Trends</h3>
          <p className="text-sm text-slate-400 mt-1">
            National median home prices over time
          </p>
        </div>
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activePeriod === period
                  ? "bg-indigo-500/20 border border-indigo-500/30 text-white"
                  : "bg-indigo-500/10 border border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorMedian" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="median"
              name="Median Price ($K)"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorMedian)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="newConstruction"
              name="New Construction ($K)"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorNew)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
