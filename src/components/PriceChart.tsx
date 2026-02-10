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

// 1 Year data (monthly)
const data1Y = [
  { period: "Mar '25", median: 395, newConstruction: 420 },
  { period: "Apr '25", median: 398, newConstruction: 425 },
  { period: "May '25", median: 405, newConstruction: 432 },
  { period: "Jun '25", median: 412, newConstruction: 438 },
  { period: "Jul '25", median: 418, newConstruction: 445 },
  { period: "Aug '25", median: 422, newConstruction: 450 },
  { period: "Sep '25", median: 425, newConstruction: 455 },
  { period: "Oct '25", median: 428, newConstruction: 460 },
  { period: "Nov '25", median: 430, newConstruction: 462 },
  { period: "Dec '25", median: 428, newConstruction: 458 },
  { period: "Jan '26", median: 427, newConstruction: 455 },
  { period: "Feb '26", median: 429, newConstruction: 458 },
];

// 5 Year data (quarterly)
const data5Y = [
  { period: "Q1 '21", median: 315, newConstruction: 345 },
  { period: "Q2 '21", median: 335, newConstruction: 365 },
  { period: "Q3 '21", median: 352, newConstruction: 380 },
  { period: "Q4 '21", median: 365, newConstruction: 392 },
  { period: "Q1 '22", median: 375, newConstruction: 405 },
  { period: "Q2 '22", median: 395, newConstruction: 425 },
  { period: "Q3 '22", median: 405, newConstruction: 435 },
  { period: "Q4 '22", median: 392, newConstruction: 420 },
  { period: "Q1 '23", median: 380, newConstruction: 410 },
  { period: "Q2 '23", median: 388, newConstruction: 418 },
  { period: "Q3 '23", median: 395, newConstruction: 425 },
  { period: "Q4 '23", median: 398, newConstruction: 428 },
  { period: "Q1 '24", median: 402, newConstruction: 432 },
  { period: "Q2 '24", median: 410, newConstruction: 440 },
  { period: "Q3 '24", median: 418, newConstruction: 448 },
  { period: "Q4 '24", median: 422, newConstruction: 452 },
  { period: "Q1 '25", median: 415, newConstruction: 445 },
  { period: "Q2 '25", median: 420, newConstruction: 450 },
  { period: "Q3 '25", median: 428, newConstruction: 458 },
  { period: "Q4 '25", median: 429, newConstruction: 458 },
];

// 10 Year data (semi-annual)
const data10Y = [
  { period: "2016 H1", median: 235, newConstruction: 265 },
  { period: "2016 H2", median: 242, newConstruction: 272 },
  { period: "2017 H1", median: 252, newConstruction: 282 },
  { period: "2017 H2", median: 262, newConstruction: 292 },
  { period: "2018 H1", median: 275, newConstruction: 305 },
  { period: "2018 H2", median: 282, newConstruction: 312 },
  { period: "2019 H1", median: 288, newConstruction: 318 },
  { period: "2019 H2", median: 295, newConstruction: 325 },
  { period: "2020 H1", median: 298, newConstruction: 328 },
  { period: "2020 H2", median: 318, newConstruction: 348 },
  { period: "2021 H1", median: 345, newConstruction: 375 },
  { period: "2021 H2", median: 365, newConstruction: 395 },
  { period: "2022 H1", median: 395, newConstruction: 425 },
  { period: "2022 H2", median: 392, newConstruction: 422 },
  { period: "2023 H1", median: 385, newConstruction: 415 },
  { period: "2023 H2", median: 398, newConstruction: 428 },
  { period: "2024 H1", median: 408, newConstruction: 438 },
  { period: "2024 H2", median: 420, newConstruction: 450 },
  { period: "2025 H1", median: 422, newConstruction: 452 },
  { period: "2025 H2", median: 429, newConstruction: 458 },
];

// Max data (annual since 2000)
const dataMax = [
  { period: "2000", median: 135, newConstruction: 155 },
  { period: "2001", median: 142, newConstruction: 162 },
  { period: "2002", median: 152, newConstruction: 172 },
  { period: "2003", median: 165, newConstruction: 185 },
  { period: "2004", median: 185, newConstruction: 205 },
  { period: "2005", median: 210, newConstruction: 235 },
  { period: "2006", median: 222, newConstruction: 248 },
  { period: "2007", median: 215, newConstruction: 240 },
  { period: "2008", median: 195, newConstruction: 218 },
  { period: "2009", median: 172, newConstruction: 192 },
  { period: "2010", median: 168, newConstruction: 188 },
  { period: "2011", median: 162, newConstruction: 182 },
  { period: "2012", median: 172, newConstruction: 195 },
  { period: "2013", median: 192, newConstruction: 218 },
  { period: "2014", median: 205, newConstruction: 232 },
  { period: "2015", median: 218, newConstruction: 248 },
  { period: "2016", median: 235, newConstruction: 268 },
  { period: "2017", median: 255, newConstruction: 288 },
  { period: "2018", median: 278, newConstruction: 312 },
  { period: "2019", median: 292, newConstruction: 325 },
  { period: "2020", median: 315, newConstruction: 348 },
  { period: "2021", median: 358, newConstruction: 392 },
  { period: "2022", median: 395, newConstruction: 428 },
  { period: "2023", median: 392, newConstruction: 425 },
  { period: "2024", median: 415, newConstruction: 448 },
  { period: "2025", median: 429, newConstruction: 458 },
];

const datasets = {
  "1Y": data1Y,
  "5Y": data5Y,
  "10Y": data10Y,
  "Max": dataMax,
};

const periodLabels = {
  "1Y": "Monthly data for the past 12 months",
  "5Y": "Quarterly data since Q1 2021",
  "10Y": "Semi-annual data since 2016",
  "Max": "Annual data since 2000",
};

type PeriodKey = keyof typeof datasets;

const periods: PeriodKey[] = ["1Y", "5Y", "10Y", "Max"];

export default function PriceChart() {
  const [activePeriod, setActivePeriod] = useState<PeriodKey>("1Y");

  const currentData = datasets[activePeriod];

  // Calculate change for the period
  const firstValue = currentData[0].median;
  const lastValue = currentData[currentData.length - 1].median;
  const change = ((lastValue - firstValue) / firstValue) * 100;

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">Home Price Trends</h3>
          <p className="text-sm text-slate-400 mt-1">
            {periodLabels[activePeriod]}
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

      {/* Period Stats */}
      <div className="flex gap-6 mb-4 text-sm">
        <div>
          <span className="text-slate-400">Start: </span>
          <span className="font-medium">${firstValue}K</span>
        </div>
        <div>
          <span className="text-slate-400">Current: </span>
          <span className="font-medium">${lastValue}K</span>
        </div>
        <div>
          <span className="text-slate-400">Change: </span>
          <span className={`font-medium ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
            {change >= 0 ? "+" : ""}{change.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData}>
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
              dataKey="period"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              interval={activePeriod === "Max" ? 4 : activePeriod === "10Y" ? 3 : activePeriod === "5Y" ? 3 : 1}
              angle={activePeriod === "Max" ? -45 : 0}
              textAnchor={activePeriod === "Max" ? "end" : "middle"}
              height={activePeriod === "Max" ? 50 : 30}
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
