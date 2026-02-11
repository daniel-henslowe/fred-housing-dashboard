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

interface CityData {
  city: string;
  state: string;
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

// City data for each region
const regionCities: Record<string, CityData[]> = {
  Northeast: [
    { city: "New York", state: "NY", medianPrice: 785, yoyChange: 4.2, inventory: 2.8, daysOnMarket: 45 },
    { city: "Boston", state: "MA", medianPrice: 695, yoyChange: 5.8, inventory: 1.9, daysOnMarket: 32 },
    { city: "Philadelphia", state: "PA", medianPrice: 385, yoyChange: 6.1, inventory: 2.5, daysOnMarket: 38 },
    { city: "Pittsburgh", state: "PA", medianPrice: 245, yoyChange: 7.2, inventory: 2.8, daysOnMarket: 42 },
    { city: "Newark", state: "NJ", medianPrice: 485, yoyChange: 8.5, inventory: 2.2, daysOnMarket: 35 },
    { city: "Hartford", state: "CT", medianPrice: 365, yoyChange: 9.2, inventory: 2.1, daysOnMarket: 28 },
    { city: "Providence", state: "RI", medianPrice: 425, yoyChange: 10.5, inventory: 1.8, daysOnMarket: 25 },
    { city: "Buffalo", state: "NY", medianPrice: 225, yoyChange: 8.8, inventory: 2.4, daysOnMarket: 32 },
    { city: "Rochester", state: "NY", medianPrice: 215, yoyChange: 7.5, inventory: 2.6, daysOnMarket: 35 },
    { city: "Albany", state: "NY", medianPrice: 285, yoyChange: 6.8, inventory: 2.3, daysOnMarket: 38 },
  ],
  Midwest: [
    { city: "Chicago", state: "IL", medianPrice: 385, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 42 },
    { city: "Detroit", state: "MI", medianPrice: 225, yoyChange: 9.2, inventory: 2.5, daysOnMarket: 38 },
    { city: "Minneapolis", state: "MN", medianPrice: 385, yoyChange: 6.1, inventory: 2.2, daysOnMarket: 28 },
    { city: "Cleveland", state: "OH", medianPrice: 215, yoyChange: 7.8, inventory: 2.4, daysOnMarket: 35 },
    { city: "Columbus", state: "OH", medianPrice: 325, yoyChange: 6.5, inventory: 2.1, daysOnMarket: 25 },
    { city: "Indianapolis", state: "IN", medianPrice: 295, yoyChange: 7.2, inventory: 2.3, daysOnMarket: 32 },
    { city: "Milwaukee", state: "WI", medianPrice: 285, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 38 },
    { city: "Kansas City", state: "MO", medianPrice: 275, yoyChange: 6.2, inventory: 2.4, daysOnMarket: 35 },
    { city: "St. Louis", state: "MO", medianPrice: 245, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 42 },
    { city: "Cincinnati", state: "OH", medianPrice: 265, yoyChange: 6.8, inventory: 2.3, daysOnMarket: 32 },
  ],
  South: [
    { city: "Miami", state: "FL", medianPrice: 545, yoyChange: 3.8, inventory: 3.5, daysOnMarket: 52 },
    { city: "Atlanta", state: "GA", medianPrice: 425, yoyChange: 5.2, inventory: 2.8, daysOnMarket: 35 },
    { city: "Dallas", state: "TX", medianPrice: 415, yoyChange: 4.5, inventory: 3.2, daysOnMarket: 42 },
    { city: "Houston", state: "TX", medianPrice: 365, yoyChange: 4.8, inventory: 3.5, daysOnMarket: 45 },
    { city: "Charlotte", state: "NC", medianPrice: 395, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 32 },
    { city: "Nashville", state: "TN", medianPrice: 445, yoyChange: 4.2, inventory: 2.8, daysOnMarket: 35 },
    { city: "Tampa", state: "FL", medianPrice: 385, yoyChange: 3.5, inventory: 3.2, daysOnMarket: 48 },
    { city: "Austin", state: "TX", medianPrice: 485, yoyChange: 2.8, inventory: 3.8, daysOnMarket: 55 },
    { city: "San Antonio", state: "TX", medianPrice: 315, yoyChange: 4.2, inventory: 3.2, daysOnMarket: 42 },
    { city: "Orlando", state: "FL", medianPrice: 395, yoyChange: 5.5, inventory: 2.9, daysOnMarket: 38 },
  ],
  West: [
    { city: "Los Angeles", state: "CA", medianPrice: 895, yoyChange: 2.5, inventory: 2.5, daysOnMarket: 48 },
    { city: "San Francisco", state: "CA", medianPrice: 1250, yoyChange: 1.8, inventory: 2.2, daysOnMarket: 42 },
    { city: "Seattle", state: "WA", medianPrice: 785, yoyChange: 3.2, inventory: 2.4, daysOnMarket: 35 },
    { city: "Denver", state: "CO", medianPrice: 585, yoyChange: 3.8, inventory: 2.8, daysOnMarket: 32 },
    { city: "Phoenix", state: "AZ", medianPrice: 445, yoyChange: 4.5, inventory: 3.5, daysOnMarket: 42 },
    { city: "San Diego", state: "CA", medianPrice: 865, yoyChange: 2.8, inventory: 2.3, daysOnMarket: 38 },
    { city: "Portland", state: "OR", medianPrice: 545, yoyChange: 3.5, inventory: 2.8, daysOnMarket: 38 },
    { city: "Las Vegas", state: "NV", medianPrice: 425, yoyChange: 4.2, inventory: 3.2, daysOnMarket: 45 },
    { city: "Sacramento", state: "CA", medianPrice: 525, yoyChange: 3.8, inventory: 2.6, daysOnMarket: 35 },
    { city: "Salt Lake City", state: "UT", medianPrice: 545, yoyChange: 3.2, inventory: 2.5, daysOnMarket: 28 },
  ],
};

// Generate historical data
const generateHistoricalData = (item: CellData | CityData): Record<TimePeriod, HistoricalDataPoint[]> => {
  const base = item.medianPrice;
  const yoy = "yoyChange" in item ? item.yoyChange : 5;
  const inv = item.inventory;
  const dom = item.daysOnMarket;

  return {
    "1Y": [
      { date: "Mar '25", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 0.5, inventory: inv + 0.3, daysOnMarket: dom + 4 },
      { date: "Apr '25", medianPrice: Math.round(base * 0.965), yoyChange: yoy + 0.3, inventory: inv + 0.2, daysOnMarket: dom + 3 },
      { date: "May '25", medianPrice: Math.round(base * 0.97), yoyChange: yoy + 0.2, inventory: inv + 0.1, daysOnMarket: dom + 2 },
      { date: "Jun '25", medianPrice: Math.round(base * 0.975), yoyChange: yoy + 0.1, inventory: inv, daysOnMarket: dom + 1 },
      { date: "Jul '25", medianPrice: Math.round(base * 0.98), yoyChange: yoy, inventory: inv - 0.1, daysOnMarket: dom },
      { date: "Aug '25", medianPrice: Math.round(base * 0.985), yoyChange: yoy - 0.1, inventory: inv - 0.1, daysOnMarket: dom - 1 },
      { date: "Sep '25", medianPrice: Math.round(base * 0.99), yoyChange: yoy - 0.2, inventory: inv - 0.2, daysOnMarket: dom - 1 },
      { date: "Oct '25", medianPrice: Math.round(base * 0.992), yoyChange: yoy - 0.2, inventory: inv - 0.1, daysOnMarket: dom - 2 },
      { date: "Nov '25", medianPrice: Math.round(base * 0.995), yoyChange: yoy - 0.1, inventory: inv, daysOnMarket: dom - 1 },
      { date: "Dec '25", medianPrice: Math.round(base * 0.998), yoyChange: yoy, inventory: inv, daysOnMarket: dom },
      { date: "Jan '26", medianPrice: Math.round(base * 0.999), yoyChange: yoy, inventory: inv, daysOnMarket: dom },
      { date: "Feb '26", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "5Y": [
      { date: "2021", medianPrice: Math.round(base * 0.75), yoyChange: 12.5, inventory: inv + 1.2, daysOnMarket: dom + 15 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: inv + 0.8, daysOnMarket: dom + 8 },
      { date: "2023", medianPrice: Math.round(base * 0.92), yoyChange: 4.5, inventory: inv + 0.5, daysOnMarket: dom + 5 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2, daysOnMarket: dom + 2 },
      { date: "2025", medianPrice: Math.round(base * 0.99), yoyChange: yoy + 0.5, inventory: inv, daysOnMarket: dom },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "10Y": [
      { date: "2016", medianPrice: Math.round(base * 0.48), yoyChange: 5.2, inventory: inv + 2.5, daysOnMarket: dom + 28 },
      { date: "2018", medianPrice: Math.round(base * 0.56), yoyChange: 7.2, inventory: inv + 1.9, daysOnMarket: dom + 20 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: inv + 1.4, daysOnMarket: dom + 16 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: inv + 0.8, daysOnMarket: dom + 8 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2, daysOnMarket: dom + 2 },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "Max": [
      { date: "1995", medianPrice: Math.round(base * 0.18), yoyChange: 3.2, inventory: 6.5, daysOnMarket: 85 },
      { date: "2000", medianPrice: Math.round(base * 0.25), yoyChange: 6.5, inventory: 4.5, daysOnMarket: 62 },
      { date: "2007", medianPrice: Math.round(base * 0.52), yoyChange: 8.2, inventory: 4.2, daysOnMarket: 52 },
      { date: "2009", medianPrice: Math.round(base * 0.38), yoyChange: -12.5, inventory: 8.5, daysOnMarket: 95 },
      { date: "2015", medianPrice: Math.round(base * 0.45), yoyChange: 5.8, inventory: 4.5, daysOnMarket: 55 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: inv + 1.4, daysOnMarket: dom + 16 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2, daysOnMarket: dom + 2 },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
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

const metrics: { key: MetricType; label: string }[] = [
  { key: "medianPrice", label: "Median Price ($K)" },
  { key: "yoyChange", label: "YoY Change (%)" },
  { key: "inventory", label: "Inventory (Months)" },
  { key: "daysOnMarket", label: "Days on Market" },
];

const getHeatColor = (value: number, metric: MetricType, forCities = false): string => {
  const ranges: Record<MetricType, { min: number; max: number; invert?: boolean }> = forCities ? {
    medianPrice: { min: 200, max: 1300 },
    yoyChange: { min: -5, max: 15 },
    inventory: { min: 1.5, max: 4, invert: true },
    daysOnMarket: { min: 20, max: 60, invert: true },
  } : {
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

const formatMetric = (value: number, metric: MetricType): string => {
  switch (metric) {
    case "medianPrice": return `$${value}K`;
    case "yoyChange": return `${value > 0 ? "+" : ""}${value}%`;
    case "inventory": return `${value}mo`;
    case "daysOnMarket": return `${value}d`;
  }
};

interface HeatMapGridProps {
  selectedRegion?: string;
}

export default function HeatMapGrid({ selectedRegion = "All Regions" }: HeatMapGridProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("medianPrice");
  const [hoveredCell, setHoveredCell] = useState<CellData | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<CellData | CityData | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1Y");

  const isRegionSelected = selectedRegion !== "All Regions";
  const cities = isRegionSelected ? regionCities[selectedRegion] || [] : [];

  const handleMouseEnter = (cell: CellData | CityData, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    if ("fullName" in cell) {
      setHoveredCell(cell);
    } else {
      setHoveredCity(cell);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
    setHoveredCity(null);
  };

  const handleItemClick = (item: CellData | CityData) => {
    setSelectedItem(item);
    setTimePeriod("1Y");
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const historicalData = selectedItem ? generateHistoricalData(selectedItem) : null;
  const itemName = selectedItem
    ? ("fullName" in selectedItem ? selectedItem.fullName : `${selectedItem.city}, ${selectedItem.state}`)
    : "";

  return (
    <>
      <div className="glass-card p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold">
              {isRegionSelected ? `${selectedRegion} Region - Top 10 Cities` : "US State Heat Map"}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Click any {isRegionSelected ? "city" : "state"} for historical data
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

        {isRegionSelected ? (
          /* City Grid View */
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-5 gap-3 w-full max-w-2xl">
              {cities.map((city) => (
                <div
                  key={city.city}
                  onClick={() => handleItemClick(city)}
                  onMouseEnter={(e) => handleMouseEnter(city, e)}
                  onMouseLeave={handleMouseLeave}
                  className={`${getHeatColor(city[selectedMetric], selectedMetric, true)} rounded-xl p-3 cursor-pointer transition-all hover:scale-105 hover:ring-2 hover:ring-white/30`}
                >
                  <div className="font-bold text-sm truncate">{city.city}</div>
                  <div className="text-xs opacity-80">{city.state}</div>
                  <div className="text-lg font-bold mt-1">
                    {formatMetric(city[selectedMetric], selectedMetric)}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
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
        ) : (
          /* State Grid View */
          <div className="flex flex-col items-center">
            <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(11, 1fr)" }}>
              {stateGridData.flat().map((cell, idx) => (
                <div
                  key={idx}
                  onClick={cell ? () => handleItemClick(cell) : undefined}
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
        )}

        {/* Hover Tooltip */}
        {(hoveredCell || hoveredCity) && !selectedItem && (
          <div
            className="fixed z-50 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm shadow-xl pointer-events-none"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y - 10,
              transform: "translate(-50%, -100%)",
            }}
          >
            {hoveredCell && (
              <>
                <div className="font-bold text-white mb-1">{hoveredCell.fullName}</div>
                <div className="text-slate-300">Median Price: <span className="text-white">${hoveredCell.medianPrice}K</span></div>
                <div className="text-slate-300">YoY Change: <span className="text-white">{hoveredCell.yoyChange > 0 ? "+" : ""}{hoveredCell.yoyChange}%</span></div>
                <div className="text-slate-300">Inventory: <span className="text-white">{hoveredCell.inventory} mo</span></div>
                <div className="text-slate-300">Days on Market: <span className="text-white">{hoveredCell.daysOnMarket}</span></div>
              </>
            )}
            {hoveredCity && (
              <>
                <div className="font-bold text-white mb-1">{hoveredCity.city}, {hoveredCity.state}</div>
                <div className="text-slate-300">Median Price: <span className="text-white">${hoveredCity.medianPrice}K</span></div>
                <div className="text-slate-300">YoY Change: <span className="text-white">{hoveredCity.yoyChange > 0 ? "+" : ""}{hoveredCity.yoyChange}%</span></div>
                <div className="text-slate-300">Inventory: <span className="text-white">{hoveredCity.inventory} mo</span></div>
                <div className="text-slate-300">Days on Market: <span className="text-white">{hoveredCity.daysOnMarket}</span></div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Historical Data Modal */}
      {selectedItem && historicalData && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{itemName}</h2>
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

            <div className="p-6 border-b border-slate-800">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Median Price</div>
                  <div className="text-2xl font-bold text-indigo-400">${selectedItem.medianPrice}K</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">YoY Change</div>
                  <div className={`text-2xl font-bold ${selectedItem.yoyChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {selectedItem.yoyChange > 0 ? "+" : ""}{selectedItem.yoyChange}%
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Inventory</div>
                  <div className="text-2xl font-bold text-cyan-400">{selectedItem.inventory} mo</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Days on Market</div>
                  <div className="text-2xl font-bold text-orange-400">{selectedItem.daysOnMarket}</div>
                </div>
              </div>
            </div>

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
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}K`} domain={["dataMin - 20", "dataMax + 20"]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #6366f1", borderRadius: "12px", padding: "12px" }}
                      formatter={(value) => [`$${value}K`, "Median Price"]}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Area type="monotone" dataKey="medianPrice" stroke="#6366f1" strokeWidth={2} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold mb-4">Market Indicators</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData[timePeriod]}>
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #6366f1", borderRadius: "12px", padding: "12px" }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Line type="monotone" dataKey="yoyChange" name="YoY Change (%)" stroke="#22c55e" strokeWidth={2} dot={timePeriod !== "1Y"} />
                    <Line type="monotone" dataKey="inventory" name="Inventory (mo)" stroke="#06b6d4" strokeWidth={2} dot={timePeriod !== "1Y"} />
                    <Line type="monotone" dataKey="daysOnMarket" name="Days on Market" stroke="#f97316" strokeWidth={2} dot={timePeriod !== "1Y"} />
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
