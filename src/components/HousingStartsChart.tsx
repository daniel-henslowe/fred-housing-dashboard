"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const housingStartsData = [
  { month: "Mar '25", total: 1380, singleFamily: 985, multiFamily: 395 },
  { month: "Apr '25", total: 1395, singleFamily: 995, multiFamily: 400 },
  { month: "May '25", total: 1420, singleFamily: 1010, multiFamily: 410 },
  { month: "Jun '25", total: 1455, singleFamily: 1035, multiFamily: 420 },
  { month: "Jul '25", total: 1470, singleFamily: 1045, multiFamily: 425 },
  { month: "Aug '25", total: 1445, singleFamily: 1025, multiFamily: 420 },
  { month: "Sep '25", total: 1430, singleFamily: 1015, multiFamily: 415 },
  { month: "Oct '25", total: 1410, singleFamily: 1005, multiFamily: 405 },
  { month: "Nov '25", total: 1395, singleFamily: 995, multiFamily: 400 },
  { month: "Dec '25", total: 1405, singleFamily: 1000, multiFamily: 405 },
  { month: "Jan '26", total: 1415, singleFamily: 1008, multiFamily: 407 },
  { month: "Feb '26", total: 1420, singleFamily: 1012, multiFamily: 408 },
];

export default function HousingStartsChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Housing Starts</h3>
          <p className="text-sm text-slate-400 mt-1">
            Monthly starts by housing type (thousands, SAAR)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-slate-400">Single Family</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-slate-400">Multi Family</span>
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={housingStartsData}>
            <defs>
              <linearGradient id="colorSingleFamily" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMultiFamily" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Area
              type="monotone"
              dataKey="singleFamily"
              name="Single Family"
              stackId="1"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorSingleFamily)"
            />
            <Area
              type="monotone"
              dataKey="multiFamily"
              name="Multi Family"
              stackId="1"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#colorMultiFamily)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700/50">
        <div className="text-center">
          <div className="text-lg font-bold text-indigo-400">1,012K</div>
          <div className="text-xs text-slate-400">Single Family</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-400">408K</div>
          <div className="text-xs text-slate-400">Multi Family</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-white">1,420K</div>
          <div className="text-xs text-slate-400">Total Starts</div>
        </div>
      </div>
    </div>
  );
}
