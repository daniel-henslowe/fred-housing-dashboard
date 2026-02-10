"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

interface MiniCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  data: number[];
  color: string;
}

export default function MiniCard({
  title,
  value,
  change,
  trend,
  data,
  color,
}: MiniCardProps) {
  const chartData = data.map((v, i) => ({ value: v, index: i }));

  const badgeColor = {
    up: "bg-green-500/15 text-green-400",
    down: "bg-red-500/15 text-red-400",
    neutral: "bg-slate-500/15 text-slate-400",
  };

  return (
    <div className="glass-card p-5">
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm text-slate-400">{title}</span>
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${badgeColor[trend]}`}>
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold mb-3">{value}</div>
      <div className="h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#gradient-${title})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
