"use client";

import { useState, useRef } from "react";

type MetricType = "medianPrice" | "yoyChange" | "inventory" | "daysOnMarket";

interface CellData {
  state: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

const stateGridData: (CellData | null)[][] = [
  [null, null, null, null, null, null, null, null, null, null, { state: "ME", medianPrice: 385, yoyChange: 8.2, inventory: 2.8, daysOnMarket: 32 }],
  [{ state: "WA", medianPrice: 585, yoyChange: 3.2, inventory: 2.5, daysOnMarket: 26 }, { state: "MT", medianPrice: 485, yoyChange: 5.8, inventory: 3.2, daysOnMarket: 45 }, { state: "ND", medianPrice: 265, yoyChange: 4.5, inventory: 3.8, daysOnMarket: 52 }, { state: "MN", medianPrice: 365, yoyChange: 3.7, inventory: 2.4, daysOnMarket: 26 }, { state: "WI", medianPrice: 295, yoyChange: 6.2, inventory: 2.5, daysOnMarket: 28 }, null, { state: "MI", medianPrice: 235, yoyChange: 6.8, inventory: 2.3, daysOnMarket: 24 }, null, null, { state: "VT", medianPrice: 395, yoyChange: 9.1, inventory: 2.1, daysOnMarket: 28 }, { state: "NH", medianPrice: 485, yoyChange: 7.5, inventory: 1.9, daysOnMarket: 22 }],
  [{ state: "OR", medianPrice: 525, yoyChange: 2.1, inventory: 2.9, daysOnMarket: 34 }, { state: "ID", medianPrice: 485, yoyChange: 3.5, inventory: 3.5, daysOnMarket: 38 }, { state: "WY", medianPrice: 345, yoyChange: 4.2, inventory: 4.2, daysOnMarket: 58 }, { state: "SD", medianPrice: 295, yoyChange: 5.8, inventory: 3.5, daysOnMarket: 48 }, { state: "IA", medianPrice: 225, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 35 }, { state: "IL", medianPrice: 285, yoyChange: 5.2, inventory: 2.6, daysOnMarket: 30 }, { state: "IN", medianPrice: 245, yoyChange: 6.5, inventory: 2.4, daysOnMarket: 28 }, { state: "OH", medianPrice: 225, yoyChange: 7.1, inventory: 2.2, daysOnMarket: 24 }, { state: "PA", medianPrice: 265, yoyChange: 5.9, inventory: 2.8, daysOnMarket: 28 }, { state: "NY", medianPrice: 445, yoyChange: 3.8, inventory: 4.2, daysOnMarket: 45 }, { state: "MA", medianPrice: 595, yoyChange: 5.8, inventory: 1.8, daysOnMarket: 20 }],
  [{ state: "CA", medianPrice: 785, yoyChange: 4.2, inventory: 2.1, daysOnMarket: 22 }, { state: "NV", medianPrice: 425, yoyChange: 4.8, inventory: 2.8, daysOnMarket: 32 }, { state: "UT", medianPrice: 545, yoyChange: 3.5, inventory: 2.6, daysOnMarket: 28 }, { state: "CO", medianPrice: 545, yoyChange: 2.5, inventory: 3.2, daysOnMarket: 32 }, { state: "NE", medianPrice: 275, yoyChange: 6.2, inventory: 2.5, daysOnMarket: 32 }, { state: "MO", medianPrice: 255, yoyChange: 5.5, inventory: 2.6, daysOnMarket: 34 }, { state: "KY", medianPrice: 225, yoyChange: 6.8, inventory: 2.8, daysOnMarket: 35 }, { state: "WV", medianPrice: 165, yoyChange: 8.5, inventory: 3.2, daysOnMarket: 42 }, { state: "VA", medianPrice: 385, yoyChange: 4.5, inventory: 2.3, daysOnMarket: 24 }, { state: "NJ", medianPrice: 485, yoyChange: 8.2, inventory: 2.1, daysOnMarket: 28 }, { state: "CT", medianPrice: 425, yoyChange: 9.5, inventory: 1.8, daysOnMarket: 24 }],
  [null, { state: "AZ", medianPrice: 425, yoyChange: 2.8, inventory: 3.4, daysOnMarket: 32 }, { state: "NM", medianPrice: 345, yoyChange: 5.2, inventory: 3.8, daysOnMarket: 45 }, { state: "KS", medianPrice: 235, yoyChange: 5.8, inventory: 2.8, daysOnMarket: 38 }, { state: "AR", medianPrice: 225, yoyChange: 6.5, inventory: 3.2, daysOnMarket: 42 }, { state: "TN", medianPrice: 365, yoyChange: 4.2, inventory: 3.1, daysOnMarket: 29 }, { state: "NC", medianPrice: 365, yoyChange: 5.5, inventory: 2.4, daysOnMarket: 25 }, { state: "SC", medianPrice: 325, yoyChange: 6.2, inventory: 2.8, daysOnMarket: 32 }, { state: "MD", medianPrice: 425, yoyChange: 4.8, inventory: 2.2, daysOnMarket: 24 }, { state: "DE", medianPrice: 365, yoyChange: 7.2, inventory: 2.4, daysOnMarket: 28 }, { state: "RI", medianPrice: 455, yoyChange: 10.2, inventory: 1.6, daysOnMarket: 18 }],
  [null, null, null, { state: "OK", medianPrice: 215, yoyChange: 4.8, inventory: 3.5, daysOnMarket: 42 }, { state: "LA", medianPrice: 225, yoyChange: 3.5, inventory: 4.2, daysOnMarket: 52 }, { state: "MS", medianPrice: 185, yoyChange: 5.2, inventory: 3.8, daysOnMarket: 48 }, { state: "AL", medianPrice: 245, yoyChange: 5.8, inventory: 3.2, daysOnMarket: 38 }, { state: "GA", medianPrice: 345, yoyChange: 4.8, inventory: 2.7, daysOnMarket: 27 }, { state: "FL", medianPrice: 415, yoyChange: 6.5, inventory: 2.9, daysOnMarket: 28 }, null, null],
  [{ state: "AK", medianPrice: 365, yoyChange: 2.8, inventory: 4.5, daysOnMarket: 62 }, { state: "HI", medianPrice: 895, yoyChange: 3.2, inventory: 3.2, daysOnMarket: 38 }, null, { state: "TX", medianPrice: 335, yoyChange: 1.8, inventory: 3.8, daysOnMarket: 42 }, null, null, null, null, null, null, { state: "DC", medianPrice: 595, yoyChange: 4.2, inventory: 2.5, daysOnMarket: 28 }],
];

const metrics: { key: MetricType; label: string; format: (v: number) => string }[] = [
  { key: "medianPrice", label: "Median Price ($K)", format: (v) => `$${v}K` },
  { key: "yoyChange", label: "YoY Change (%)", format: (v) => `${v > 0 ? "+" : ""}${v}%` },
  { key: "inventory", label: "Inventory (Months)", format: (v) => `${v} mo` },
  { key: "daysOnMarket", label: "Days on Market", format: (v) => `${v} days` },
];

const getHeatColor = (value: number, metric: MetricType): string => {
  const ranges: Record<MetricType, { min: number; max: number; invert?: boolean }> = {
    medianPrice: { min: 150, max: 900 },
    yoyChange: { min: -2, max: 12 },
    inventory: { min: 1, max: 5, invert: true },
    daysOnMarket: { min: 15, max: 65, invert: true },
  };

  const range = ranges[metric];
  let ratio = (value - range.min) / (range.max - range.min);
  ratio = Math.max(0, Math.min(1, ratio));

  if (range.invert) ratio = 1 - ratio;

  if (ratio < 0.2) return "bg-emerald-600/90 text-white";
  if (ratio < 0.4) return "bg-emerald-500/70 text-white";
  if (ratio < 0.6) return "bg-yellow-500/70 text-black";
  if (ratio < 0.8) return "bg-orange-500/80 text-white";
  return "bg-red-500/90 text-white";
};

export default function HeatMapGrid() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("medianPrice");
  const [hoveredCell, setHoveredCell] = useState<CellData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const currentMetricConfig = metrics.find((m) => m.key === selectedMetric)!;

  const handleMouseEnter = (cell: CellData, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    setHoveredCell(cell);
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">US State Heat Map</h3>
          <p className="text-sm text-slate-400 mt-1">
            Geographic distribution of housing metrics
          </p>
        </div>
        <div className="flex gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`px-3 py-2 rounded-lg text-xs transition-all ${
                selectedMetric === metric.key
                  ? "bg-indigo-500/20 border border-indigo-500/30 text-white"
                  : "bg-slate-800/50 border border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(11, 1fr)" }}>
          {stateGridData.flat().map((cell, idx) => (
            <div
              key={idx}
              className={`w-12 h-10 rounded flex flex-col items-center justify-center text-xs font-medium transition-all ${
                cell
                  ? `${getHeatColor(cell[selectedMetric], selectedMetric)} hover:scale-110 cursor-pointer`
                  : "bg-transparent"
              }`}
              onMouseEnter={cell ? (e) => handleMouseEnter(cell, e) : undefined}
              onMouseLeave={handleMouseLeave}
            >
              {cell && (
                <span className="font-bold">{cell.state}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6 text-xs">
          <span className="text-slate-400">
            {selectedMetric === "inventory" || selectedMetric === "daysOnMarket" ? "Better" : "Lower"}
          </span>
          <div className="flex gap-1">
            <div className="w-8 h-4 rounded bg-emerald-600/90"></div>
            <div className="w-8 h-4 rounded bg-emerald-500/70"></div>
            <div className="w-8 h-4 rounded bg-yellow-500/70"></div>
            <div className="w-8 h-4 rounded bg-orange-500/80"></div>
            <div className="w-8 h-4 rounded bg-red-500/90"></div>
          </div>
          <span className="text-slate-400">
            {selectedMetric === "inventory" || selectedMetric === "daysOnMarket" ? "Worse" : "Higher"}
          </span>
        </div>
      </div>

      {/* Custom Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm shadow-xl pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 10,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-bold text-white mb-1">{hoveredCell.state}</div>
          <div className="text-slate-300">Median Price: <span className="text-white">${hoveredCell.medianPrice}K</span></div>
          <div className="text-slate-300">YoY Change: <span className="text-white">{hoveredCell.yoyChange > 0 ? "+" : ""}{hoveredCell.yoyChange}%</span></div>
          <div className="text-slate-300">Inventory: <span className="text-white">{hoveredCell.inventory} mo</span></div>
          <div className="text-slate-300">Days on Market: <span className="text-white">{hoveredCell.daysOnMarket}</span></div>
        </div>
      )}
    </div>
  );
}
