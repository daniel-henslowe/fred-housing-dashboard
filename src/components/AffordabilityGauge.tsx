"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Value", value: 92.4 },
  { name: "Remaining", value: 57.6 },
];

const COLORS = ["url(#gaugeGradient)", "#1e293b"];

export default function AffordabilityGauge() {
  return (
    <div className="glass-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Affordability Index</h3>
        <p className="text-sm text-slate-400 mt-1">Housing affordability score</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="h-[160px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="90%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <div className="text-4xl font-bold">92.4</div>
            <div className="text-sm text-slate-400 mt-1">
              Based on income-to-price ratio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
