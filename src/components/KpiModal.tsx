"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface HistoricalDataPoint {
  date: string;
  value: number;
}

interface HistoricalDataSets {
  "1Y": HistoricalDataPoint[];
  "5Y": HistoricalDataPoint[];
  "10Y": HistoricalDataPoint[];
  "Max": HistoricalDataPoint[];
}

type PeriodKey = keyof HistoricalDataSets;

interface KpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentValue: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  historicalData: HistoricalDataSets;
  unit?: string;
  description?: string;
  color?: string;
}

const periods: PeriodKey[] = ["1Y", "5Y", "10Y", "Max"];

const periodLabels: Record<PeriodKey, string> = {
  "1Y": "12-Month Trend",
  "5Y": "5-Year Trend",
  "10Y": "10-Year Trend",
  "Max": "All-Time Trend",
};

export default function KpiModal({
  isOpen,
  onClose,
  title,
  currentValue,
  change,
  trend,
  icon,
  historicalData,
  unit = "",
  description,
  color = "#6366f1",
}: KpiModalProps) {
  const [activePeriod, setActivePeriod] = useState<PeriodKey>("1Y");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset to 1Y when modal opens
  useEffect(() => {
    if (isOpen) {
      setActivePeriod("1Y");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentData = historicalData[activePeriod];

  // Calculate statistics
  const values = currentData.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const periodStart = currentData[0]?.value || 0;
  const current = currentData[currentData.length - 1]?.value || 0;
  const periodChange = periodStart ? ((current - periodStart) / periodStart) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-indigo-500/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl shadow-indigo-500/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-indigo-500/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-2xl">
              {icon}
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-sm text-slate-400">Historical Data & Trends</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Current Value Banner */}
          <div className="glass-card p-6 mb-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400 mb-1">Current Value</div>
              <div className="text-4xl font-bold">{currentValue}</div>
              <div
                className={`text-sm mt-2 flex items-center gap-1 ${
                  trend === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend === "up" ? "↑" : "↓"} {change}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Period High</div>
                <div className="text-lg font-semibold text-green-400">
                  {unit}{max.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Period Low</div>
                <div className="text-lg font-semibold text-red-400">
                  {unit}{min.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Average</div>
                <div className="text-lg font-semibold">
                  {unit}{avg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Period Change</div>
                <div
                  className={`text-lg font-semibold ${
                    periodChange >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {periodChange >= 0 ? "+" : ""}{periodChange.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{periodLabels[activePeriod]}</h3>
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                    tickFormatter={(value) => `${unit}${value.toLocaleString()}`}
                    domain={["dataMin - 5", "dataMax + 5"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [
                      `${unit}${Number(value).toLocaleString()}`,
                      title,
                    ]}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Historical Data</h3>
            <div className="grid grid-cols-4 gap-4 max-h-[300px] overflow-y-auto">
              {currentData.map((point, idx) => {
                const prevValue = idx > 0 ? currentData[idx - 1].value : point.value;
                const dataChange = ((point.value - prevValue) / prevValue) * 100;
                return (
                  <div
                    key={point.date}
                    className="bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800 transition-colors"
                  >
                    <div className="text-xs text-slate-400 mb-1">{point.date}</div>
                    <div className="text-lg font-semibold">
                      {unit}{point.value.toLocaleString()}
                    </div>
                    {idx > 0 && (
                      <div
                        className={`text-xs mt-1 ${
                          dataChange >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {dataChange >= 0 ? "↑" : "↓"} {Math.abs(dataChange).toFixed(1)}%
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mt-6 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <div className="text-sm text-slate-300">{description}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
