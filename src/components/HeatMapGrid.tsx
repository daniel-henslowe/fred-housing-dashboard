"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

type MetricType = "medianPrice" | "yoyChange" | "inventory" | "daysOnMarket";
type TimePeriod = "1Y" | "5Y" | "10Y" | "Max";

interface CellData {
  state: string;
  fullName: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

interface HistoricalDataPoint {
  date: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

// State full names
const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "Washington D.C.", FL: "Florida",
  GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana",
  IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine",
  MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island",
  SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
  VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

// Generate historical data for a state based on its current values
const generateHistoricalData = (state: CellData): Record<TimePeriod, HistoricalDataPoint[]> => {
  const base = state.medianPrice;
  const growth = state.yoyChange / 100;

  return {
    "1Y": [
      { date: "Mar '25", medianPrice: Math.round(base * 0.96), yoyChange: state.yoyChange + 0.5, inventory: state.inventory + 0.3, daysOnMarket: state.daysOnMarket + 4 },
      { date: "Apr '25", medianPrice: Math.round(base * 0.965), yoyChange: state.yoyChange + 0.3, inventory: state.inventory + 0.2, daysOnMarket: state.daysOnMarket + 3 },
      { date: "May '25", medianPrice: Math.round(base * 0.97), yoyChange: state.yoyChange + 0.2, inventory: state.inventory + 0.1, daysOnMarket: state.daysOnMarket + 2 },
      { date: "Jun '25", medianPrice: Math.round(base * 0.975), yoyChange: state.yoyChange + 0.1, inventory: state.inventory, daysOnMarket: state.daysOnMarket + 1 },
      { date: "Jul '25", medianPrice: Math.round(base * 0.98), yoyChange: state.yoyChange, inventory: state.inventory - 0.1, daysOnMarket: state.daysOnMarket },
      { date: "Aug '25", medianPrice: Math.round(base * 0.985), yoyChange: state.yoyChange - 0.1, inventory: state.inventory - 0.1, daysOnMarket: state.daysOnMarket - 1 },
      { date: "Sep '25", medianPrice: Math.round(base * 0.99), yoyChange: state.yoyChange - 0.2, inventory: state.inventory - 0.2, daysOnMarket: state.daysOnMarket - 1 },
      { date: "Oct '25", medianPrice: Math.round(base * 0.992), yoyChange: state.yoyChange - 0.2, inventory: state.inventory - 0.1, daysOnMarket: state.daysOnMarket - 2 },
      { date: "Nov '25", medianPrice: Math.round(base * 0.995), yoyChange: state.yoyChange - 0.1, inventory: state.inventory, daysOnMarket: state.daysOnMarket - 1 },
      { date: "Dec '25", medianPrice: Math.round(base * 0.998), yoyChange: state.yoyChange, inventory: state.inventory, daysOnMarket: state.daysOnMarket },
      { date: "Jan '26", medianPrice: Math.round(base * 0.999), yoyChange: state.yoyChange, inventory: state.inventory, daysOnMarket: state.daysOnMarket },
      { date: "Feb '26", medianPrice: base, yoyChange: state.yoyChange, inventory: state.inventory, daysOnMarket: state.daysOnMarket },
    ],
    "5Y": [
      { date: "2021", medianPrice: Math.round(base * 0.75), yoyChange: 12.5, inventory: state.inventory + 1.2, daysOnMarket: state.daysOnMarket + 15 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: state.inventory + 0.8, daysOnMarket: state.daysOnMarket + 8 },
      { date: "2023", medianPrice: Math.round(base * 0.92), yoyChange: 4.5, inventory: state.inventory + 0.5, daysOnMarket: state.daysOnMarket + 5 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: state.yoyChange + 1.2, inventory: state.inventory + 0.2, daysOnMarket: state.daysOnMarket + 2 },
      { date: "2025", medianPrice: Math.round(base * 0.99), yoyChange: state.yoyChange + 0.5, inventory: state.inventory, daysOnMarket: state.daysOnMarket },
      { date: "2026", medianPrice: base, yoyChange: state.yoyChange, inventory: state.inventory, daysOnMarket: state.daysOnMarket },
    ],
    "10Y": [
      { date: "2016", medianPrice: Math.round(base * 0.48), yoyChange: 5.2, inventory: state.inventory + 2.5, daysOnMarket: state.daysOnMarket + 28 },
      { date: "2017", medianPrice: Math.round(base * 0.52), yoyChange: 6.8, inventory: state.inventory + 2.2, daysOnMarket: state.daysOnMarket + 24 },
      { date: "2018", medianPrice: Math.round(base * 0.56), yoyChange: 7.2, inventory: state.inventory + 1.9, daysOnMarket: state.daysOnMarket + 20 },
      { date: "2019", medianPrice: Math.round(base * 0.60), yoyChange: 5.5, inventory: state.inventory + 1.6, daysOnMarket: state.daysOnMarket + 18 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: state.inventory + 1.4, daysOnMarket: state.daysOnMarket + 16 },
      { date: "2021", medianPrice: Math.round(base * 0.75), yoyChange: 12.5, inventory: state.inventory + 1.2, daysOnMarket: state.daysOnMarket + 15 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: state.inventory + 0.8, daysOnMarket: state.daysOnMarket + 8 },
      { date: "2023", medianPrice: Math.round(base * 0.92), yoyChange: 4.5, inventory: state.inventory + 0.5, daysOnMarket: state.daysOnMarket + 5 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: state.yoyChange + 1.2, inventory: state.inventory + 0.2, daysOnMarket: state.daysOnMarket + 2 },
      { date: "2025", medianPrice: Math.round(base * 0.99), yoyChange: state.yoyChange + 0.5, inventory: state.inventory, daysOnMarket: state.daysOnMarket },
      { date: "2026", medianPrice: base, yoyChange: state.yoyChange, inventory: state.inventory, daysOnMarket: state.daysOnMarket },
    ],
    "Max": [
      { date: "1990", medianPrice: Math.round(base * 0.18), yoyChange: 2.5, inventory: 6.5, daysOnMarket: 85 },
      { date: "1995", medianPrice: Math.round(base * 0.22), yoyChange: 3.2, inventory: 5.8, daysOnMarket: 75 },
      { date: "2000", medianPrice: Math.round(base * 0.28), yoyChange: 6.5, inventory: 4.5, daysOnMarket: 62 },
      { date: "2005", medianPrice: Math.round(base * 0.45), yoyChange: 12.8, inventory: 3.8, daysOnMarket: 45 },
      { date: "2007", medianPrice: Math.round(base * 0.52), yoyChange: 8.2, inventory: 4.2, daysOnMarket: 52 },
      { date: "2009", medianPrice: Math.round(base * 0.38), yoyChange: -12.5, inventory: 8.5, daysOnMarket: 95 },
      { date: "2012", medianPrice: Math.round(base * 0.35), yoyChange: -2.5, inventory: 6.2, daysOnMarket: 78 },
      { date: "2015", medianPrice: Math.round(base * 0.45), yoyChange: 5.8, inventory: 4.5, daysOnMarket: 55 },
      { date: "2018", medianPrice: Math.round(base * 0.56), yoyChange: 7.2, inventory: state.inventory + 1.9, daysOnMarket: state.daysOnMarket + 20 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: state.inventory + 1.4, daysOnMarket: state.daysOnMarket + 16 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: state.inventory + 0.8, daysOnMarket: state.daysOnMarket + 8 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: state.yoyChange + 1.2, inventory: state.inventory + 0.2, daysOnMarket: state.daysOnMarket + 2 },
      { date: "2026", medianPrice: base, yoyChange: state.yoyChange, inventory: state.inventory, daysOnMarket: state.daysOnMarket },
    ],
  };
};

const stateGridData: (CellData | null)[][] = [
  [null, null, null, null, null, null, null, null, null, null, { state: "ME", fullName: "Maine", medianPrice: 385, yoyChange: 8.2, inventory: 2.8, daysOnMarket: 32 }],
  [{ state: "WA", fullName: "Washington", medianPrice: 585, yoyChange: 3.2, inventory: 2.5, daysOnMarket: 26 }, { state: "MT", fullName: "Montana", medianPrice: 485, yoyChange: 5.8, inventory: 3.2, daysOnMarket: 45 }, { state: "ND", fullName: "North Dakota", medianPrice: 265, yoyChange: 4.5, inventory: 3.8, daysOnMarket: 52 }, { state: "MN", fullName: "Minnesota", medianPrice: 365, yoyChange: 3.7, inventory: 2.4, daysOnMarket: 26 }, { state: "WI", fullName: "Wisconsin", medianPrice: 295, yoyChange: 6.2, inventory: 2.5, daysOnMarket: 28 }, null, { state: "MI", fullName: "Michigan", medianPrice: 235, yoyChange: 6.8, inventory: 2.3, daysOnMarket: 24 }, null, null, { state: "VT", fullName: "Vermont", medianPrice: 395, yoyChange: 9.1, inventory: 2.1, daysOnMarket: 28 }, { state: "NH", fullName: "New Hampshire", medianPrice: 485, yoyChange: 7.5, inventory: 1.9, daysOnMarket: 22 }],
  [{ state: "OR", fullName: "Oregon", medianPrice: 525, yoyChange: 2.1, inventory: 2.9, daysOnMarket: 34 }, { state: "ID", fullName: "Idaho", medianPrice: 485, yoyChange: 3.5, inventory: 3.5, daysOnMarket: 38 }, { state: "WY", fullName: "Wyoming", medianPrice: 345, yoyChange: 4.2, inventory: 4.2, daysOnMarket: 58 }, { state: "SD", fullName: "South Dakota", medianPrice: 295, yoyChange: 5.8, inventory: 3.5, daysOnMarket: 48 }, { state: "IA", fullName: "Iowa", medianPrice: 225, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 35 }, { state: "IL", fullName: "Illinois", medianPrice: 285, yoyChange: 5.2, inventory: 2.6, daysOnMarket: 30 }, { state: "IN", fullName: "Indiana", medianPrice: 245, yoyChange: 6.5, inventory: 2.4, daysOnMarket: 28 }, { state: "OH", fullName: "Ohio", medianPrice: 225, yoyChange: 7.1, inventory: 2.2, daysOnMarket: 24 }, { state: "PA", fullName: "Pennsylvania", medianPrice: 265, yoyChange: 5.9, inventory: 2.8, daysOnMarket: 28 }, { state: "NY", fullName: "New York", medianPrice: 445, yoyChange: 3.8, inventory: 4.2, daysOnMarket: 45 }, { state: "MA", fullName: "Massachusetts", medianPrice: 595, yoyChange: 5.8, inventory: 1.8, daysOnMarket: 20 }],
  [{ state: "CA", fullName: "California", medianPrice: 785, yoyChange: 4.2, inventory: 2.1, daysOnMarket: 22 }, { state: "NV", fullName: "Nevada", medianPrice: 425, yoyChange: 4.8, inventory: 2.8, daysOnMarket: 32 }, { state: "UT", fullName: "Utah", medianPrice: 545, yoyChange: 3.5, inventory: 2.6, daysOnMarket: 28 }, { state: "CO", fullName: "Colorado", medianPrice: 545, yoyChange: 2.5, inventory: 3.2, daysOnMarket: 32 }, { state: "NE", fullName: "Nebraska", medianPrice: 275, yoyChange: 6.2, inventory: 2.5, daysOnMarket: 32 }, { state: "MO", fullName: "Missouri", medianPrice: 255, yoyChange: 5.5, inventory: 2.6, daysOnMarket: 34 }, { state: "KY", fullName: "Kentucky", medianPrice: 225, yoyChange: 6.8, inventory: 2.8, daysOnMarket: 35 }, { state: "WV", fullName: "West Virginia", medianPrice: 165, yoyChange: 8.5, inventory: 3.2, daysOnMarket: 42 }, { state: "VA", fullName: "Virginia", medianPrice: 385, yoyChange: 4.5, inventory: 2.3, daysOnMarket: 24 }, { state: "NJ", fullName: "New Jersey", medianPrice: 485, yoyChange: 8.2, inventory: 2.1, daysOnMarket: 28 }, { state: "CT", fullName: "Connecticut", medianPrice: 425, yoyChange: 9.5, inventory: 1.8, daysOnMarket: 24 }],
  [null, { state: "AZ", fullName: "Arizona", medianPrice: 425, yoyChange: 2.8, inventory: 3.4, daysOnMarket: 32 }, { state: "NM", fullName: "New Mexico", medianPrice: 345, yoyChange: 5.2, inventory: 3.8, daysOnMarket: 45 }, { state: "KS", fullName: "Kansas", medianPrice: 235, yoyChange: 5.8, inventory: 2.8, daysOnMarket: 38 }, { state: "AR", fullName: "Arkansas", medianPrice: 225, yoyChange: 6.5, inventory: 3.2, daysOnMarket: 42 }, { state: "TN", fullName: "Tennessee", medianPrice: 365, yoyChange: 4.2, inventory: 3.1, daysOnMarket: 29 }, { state: "NC", fullName: "North Carolina", medianPrice: 365, yoyChange: 5.5, inventory: 2.4, daysOnMarket: 25 }, { state: "SC", fullName: "South Carolina", medianPrice: 325, yoyChange: 6.2, inventory: 2.8, daysOnMarket: 32 }, { state: "MD", fullName: "Maryland", medianPrice: 425, yoyChange: 4.8, inventory: 2.2, daysOnMarket: 24 }, { state: "DE", fullName: "Delaware", medianPrice: 365, yoyChange: 7.2, inventory: 2.4, daysOnMarket: 28 }, { state: "RI", fullName: "Rhode Island", medianPrice: 455, yoyChange: 10.2, inventory: 1.6, daysOnMarket: 18 }],
  [null, null, null, { state: "OK", fullName: "Oklahoma", medianPrice: 215, yoyChange: 4.8, inventory: 3.5, daysOnMarket: 42 }, { state: "LA", fullName: "Louisiana", medianPrice: 225, yoyChange: 3.5, inventory: 4.2, daysOnMarket: 52 }, { state: "MS", fullName: "Mississippi", medianPrice: 185, yoyChange: 5.2, inventory: 3.8, daysOnMarket: 48 }, { state: "AL", fullName: "Alabama", medianPrice: 245, yoyChange: 5.8, inventory: 3.2, daysOnMarket: 38 }, { state: "GA", fullName: "Georgia", medianPrice: 345, yoyChange: 4.8, inventory: 2.7, daysOnMarket: 27 }, { state: "FL", fullName: "Florida", medianPrice: 415, yoyChange: 6.5, inventory: 2.9, daysOnMarket: 28 }, null, null],
  [{ state: "AK", fullName: "Alaska", medianPrice: 365, yoyChange: 2.8, inventory: 4.5, daysOnMarket: 62 }, { state: "HI", fullName: "Hawaii", medianPrice: 895, yoyChange: 3.2, inventory: 3.2, daysOnMarket: 38 }, null, { state: "TX", fullName: "Texas", medianPrice: 335, yoyChange: 1.8, inventory: 3.8, daysOnMarket: 42 }, null, null, null, null, null, null, { state: "DC", fullName: "Washington D.C.", medianPrice: 595, yoyChange: 4.2, inventory: 2.5, daysOnMarket: 28 }],
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
  const [selectedState, setSelectedState] = useState<CellData | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1Y");

  const handleMouseEnter = (cell: CellData, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    setHoveredCell(cell);
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const handleStateClick = (cell: CellData) => {
    setSelectedState(cell);
    setTimePeriod("1Y");
  };

  const closeModal = () => {
    setSelectedState(null);
  };

  const historicalData = selectedState ? generateHistoricalData(selectedState) : null;

  return (
    <>
      <div className="glass-card p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold">US State Heat Map</h3>
            <p className="text-sm text-slate-400 mt-1">
              Click any state for historical data
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
                onClick={cell ? () => handleStateClick(cell) : undefined}
                className={`w-12 h-10 rounded flex flex-col items-center justify-center text-xs font-medium transition-all ${
                  cell
                    ? `${getHeatColor(cell[selectedMetric], selectedMetric)} hover:scale-110 hover:ring-2 hover:ring-white/50 cursor-pointer`
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

        {/* Hover Tooltip */}
        {hoveredCell && !selectedState && (
          <div
            className="fixed z-50 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm shadow-xl pointer-events-none"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y - 10,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="font-bold text-white mb-1">{hoveredCell.fullName}</div>
            <div className="text-slate-300">Median Price: <span className="text-white">${hoveredCell.medianPrice}K</span></div>
            <div className="text-slate-300">YoY Change: <span className="text-white">{hoveredCell.yoyChange > 0 ? "+" : ""}{hoveredCell.yoyChange}%</span></div>
            <div className="text-slate-300">Inventory: <span className="text-white">{hoveredCell.inventory} mo</span></div>
            <div className="text-slate-300">Days on Market: <span className="text-white">{hoveredCell.daysOnMarket}</span></div>
          </div>
        )}
      </div>

      {/* State Historical Data Modal */}
      {selectedState && historicalData && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedState.fullName}</h2>
                <p className="text-slate-400 mt-1">Historical housing market data</p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Current Stats */}
            <div className="p-6 border-b border-slate-800">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Median Price</div>
                  <div className="text-2xl font-bold text-indigo-400">${selectedState.medianPrice}K</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">YoY Change</div>
                  <div className={`text-2xl font-bold ${selectedState.yoyChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {selectedState.yoyChange > 0 ? "+" : ""}{selectedState.yoyChange}%
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Inventory</div>
                  <div className="text-2xl font-bold text-cyan-400">{selectedState.inventory} mo</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Days on Market</div>
                  <div className="text-2xl font-bold text-orange-400">{selectedState.daysOnMarket}</div>
                </div>
              </div>
            </div>

            {/* Time Period Selector */}
            <div className="px-6 pt-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Price History</h3>
              <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
                {(["1Y", "5Y", "10Y", "Max"] as TimePeriod[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTimePeriod(p)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      timePeriod === p
                        ? "bg-indigo-500 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Chart */}
            <div className="p-6">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData[timePeriod]}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `$${v}K`}
                      domain={["dataMin - 20", "dataMax + 20"]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #6366f1",
                        borderRadius: "12px",
                        padding: "12px",
                      }}
                      formatter={(value) => [`$${value}K`, "Median Price"]}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="medianPrice"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Additional Metrics Chart */}
            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold mb-4">Market Indicators</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData[timePeriod]}>
                    <XAxis
                      dataKey="date"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
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
                    <Line
                      type="monotone"
                      dataKey="yoyChange"
                      name="YoY Change (%)"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={timePeriod !== "1Y"}
                    />
                    <Line
                      type="monotone"
                      dataKey="inventory"
                      name="Inventory (mo)"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={timePeriod !== "1Y"}
                    />
                    <Line
                      type="monotone"
                      dataKey="daysOnMarket"
                      name="Days on Market"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={timePeriod !== "1Y"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-400">YoY Change</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="text-xs text-slate-400">Inventory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-xs text-slate-400">Days on Market</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
