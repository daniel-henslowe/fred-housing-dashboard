"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MetricType = "medianPrice" | "yoyChange" | "inventory" | "daysOnMarket";
type TimePeriod = "1Y" | "5Y" | "10Y" | "Max";

interface CityData {
  city: string;
  state: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
  population: number;
}

interface HistoricalDataPoint {
  date: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

const regionCities: Record<string, CityData[]> = {
  Northeast: [
    { city: "New York", state: "NY", medianPrice: 785, yoyChange: 4.2, inventory: 2.8, daysOnMarket: 45, population: 8336817 },
    { city: "Boston", state: "MA", medianPrice: 695, yoyChange: 5.8, inventory: 1.9, daysOnMarket: 32, population: 675647 },
    { city: "Philadelphia", state: "PA", medianPrice: 385, yoyChange: 6.1, inventory: 2.5, daysOnMarket: 38, population: 1584064 },
    { city: "Pittsburgh", state: "PA", medianPrice: 245, yoyChange: 7.2, inventory: 2.8, daysOnMarket: 42, population: 302971 },
    { city: "Newark", state: "NJ", medianPrice: 485, yoyChange: 8.5, inventory: 2.2, daysOnMarket: 35, population: 311549 },
    { city: "Hartford", state: "CT", medianPrice: 365, yoyChange: 9.2, inventory: 2.1, daysOnMarket: 28, population: 121054 },
    { city: "Providence", state: "RI", medianPrice: 425, yoyChange: 10.5, inventory: 1.8, daysOnMarket: 25, population: 190934 },
    { city: "Buffalo", state: "NY", medianPrice: 225, yoyChange: 8.8, inventory: 2.4, daysOnMarket: 32, population: 278349 },
    { city: "Rochester", state: "NY", medianPrice: 215, yoyChange: 7.5, inventory: 2.6, daysOnMarket: 35, population: 211328 },
    { city: "Albany", state: "NY", medianPrice: 285, yoyChange: 6.8, inventory: 2.3, daysOnMarket: 38, population: 99224 },
  ],
  Midwest: [
    { city: "Chicago", state: "IL", medianPrice: 385, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 42, population: 2746388 },
    { city: "Detroit", state: "MI", medianPrice: 225, yoyChange: 9.2, inventory: 2.5, daysOnMarket: 38, population: 639111 },
    { city: "Minneapolis", state: "MN", medianPrice: 385, yoyChange: 6.1, inventory: 2.2, daysOnMarket: 28, population: 429954 },
    { city: "Cleveland", state: "OH", medianPrice: 215, yoyChange: 7.8, inventory: 2.4, daysOnMarket: 35, population: 372624 },
    { city: "Columbus", state: "OH", medianPrice: 325, yoyChange: 6.5, inventory: 2.1, daysOnMarket: 25, population: 905748 },
    { city: "Indianapolis", state: "IN", medianPrice: 295, yoyChange: 7.2, inventory: 2.3, daysOnMarket: 32, population: 887642 },
    { city: "Milwaukee", state: "WI", medianPrice: 285, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 38, population: 577222 },
    { city: "Kansas City", state: "MO", medianPrice: 275, yoyChange: 6.2, inventory: 2.4, daysOnMarket: 35, population: 508090 },
    { city: "St. Louis", state: "MO", medianPrice: 245, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 42, population: 301578 },
    { city: "Cincinnati", state: "OH", medianPrice: 265, yoyChange: 6.8, inventory: 2.3, daysOnMarket: 32, population: 309317 },
  ],
  South: [
    { city: "Miami", state: "FL", medianPrice: 545, yoyChange: 3.8, inventory: 3.5, daysOnMarket: 52, population: 442241 },
    { city: "Atlanta", state: "GA", medianPrice: 425, yoyChange: 5.2, inventory: 2.8, daysOnMarket: 35, population: 498715 },
    { city: "Dallas", state: "TX", medianPrice: 415, yoyChange: 4.5, inventory: 3.2, daysOnMarket: 42, population: 1304379 },
    { city: "Houston", state: "TX", medianPrice: 365, yoyChange: 4.8, inventory: 3.5, daysOnMarket: 45, population: 2304580 },
    { city: "Charlotte", state: "NC", medianPrice: 395, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 32, population: 874579 },
    { city: "Nashville", state: "TN", medianPrice: 445, yoyChange: 4.2, inventory: 2.8, daysOnMarket: 35, population: 689447 },
    { city: "Tampa", state: "FL", medianPrice: 385, yoyChange: 3.5, inventory: 3.2, daysOnMarket: 48, population: 384959 },
    { city: "Austin", state: "TX", medianPrice: 485, yoyChange: 2.8, inventory: 3.8, daysOnMarket: 55, population: 978908 },
    { city: "San Antonio", state: "TX", medianPrice: 315, yoyChange: 4.2, inventory: 3.2, daysOnMarket: 42, population: 1434625 },
    { city: "Orlando", state: "FL", medianPrice: 395, yoyChange: 5.5, inventory: 2.9, daysOnMarket: 38, population: 307573 },
  ],
  West: [
    { city: "Los Angeles", state: "CA", medianPrice: 895, yoyChange: 2.5, inventory: 2.5, daysOnMarket: 48, population: 3898747 },
    { city: "San Francisco", state: "CA", medianPrice: 1250, yoyChange: 1.8, inventory: 2.2, daysOnMarket: 42, population: 873965 },
    { city: "Seattle", state: "WA", medianPrice: 785, yoyChange: 3.2, inventory: 2.4, daysOnMarket: 35, population: 737015 },
    { city: "Denver", state: "CO", medianPrice: 585, yoyChange: 3.8, inventory: 2.8, daysOnMarket: 32, population: 715522 },
    { city: "Phoenix", state: "AZ", medianPrice: 445, yoyChange: 4.5, inventory: 3.5, daysOnMarket: 42, population: 1608139 },
    { city: "San Diego", state: "CA", medianPrice: 865, yoyChange: 2.8, inventory: 2.3, daysOnMarket: 38, population: 1386932 },
    { city: "Portland", state: "OR", medianPrice: 545, yoyChange: 3.5, inventory: 2.8, daysOnMarket: 38, population: 652503 },
    { city: "Las Vegas", state: "NV", medianPrice: 425, yoyChange: 4.2, inventory: 3.2, daysOnMarket: 45, population: 641903 },
    { city: "Sacramento", state: "CA", medianPrice: 525, yoyChange: 3.8, inventory: 2.6, daysOnMarket: 35, population: 524943 },
    { city: "Salt Lake City", state: "UT", medianPrice: 545, yoyChange: 3.2, inventory: 2.5, daysOnMarket: 28, population: 199723 },
  ],
};

const generateCityHistoricalData = (city: CityData): Record<TimePeriod, HistoricalDataPoint[]> => {
  const base = city.medianPrice;
  return {
    "1Y": [
      { date: "Mar '25", medianPrice: Math.round(base * 0.96), yoyChange: city.yoyChange + 0.5, inventory: city.inventory + 0.3, daysOnMarket: city.daysOnMarket + 4 },
      { date: "Apr '25", medianPrice: Math.round(base * 0.965), yoyChange: city.yoyChange + 0.3, inventory: city.inventory + 0.2, daysOnMarket: city.daysOnMarket + 3 },
      { date: "May '25", medianPrice: Math.round(base * 0.97), yoyChange: city.yoyChange + 0.2, inventory: city.inventory + 0.1, daysOnMarket: city.daysOnMarket + 2 },
      { date: "Jun '25", medianPrice: Math.round(base * 0.975), yoyChange: city.yoyChange + 0.1, inventory: city.inventory, daysOnMarket: city.daysOnMarket + 1 },
      { date: "Jul '25", medianPrice: Math.round(base * 0.98), yoyChange: city.yoyChange, inventory: city.inventory - 0.1, daysOnMarket: city.daysOnMarket },
      { date: "Aug '25", medianPrice: Math.round(base * 0.985), yoyChange: city.yoyChange - 0.1, inventory: city.inventory - 0.1, daysOnMarket: city.daysOnMarket - 1 },
      { date: "Sep '25", medianPrice: Math.round(base * 0.99), yoyChange: city.yoyChange - 0.2, inventory: city.inventory - 0.2, daysOnMarket: city.daysOnMarket - 1 },
      { date: "Oct '25", medianPrice: Math.round(base * 0.992), yoyChange: city.yoyChange - 0.2, inventory: city.inventory - 0.1, daysOnMarket: city.daysOnMarket - 2 },
      { date: "Nov '25", medianPrice: Math.round(base * 0.995), yoyChange: city.yoyChange - 0.1, inventory: city.inventory, daysOnMarket: city.daysOnMarket - 1 },
      { date: "Dec '25", medianPrice: Math.round(base * 0.998), yoyChange: city.yoyChange, inventory: city.inventory, daysOnMarket: city.daysOnMarket },
      { date: "Jan '26", medianPrice: Math.round(base * 0.999), yoyChange: city.yoyChange, inventory: city.inventory, daysOnMarket: city.daysOnMarket },
      { date: "Feb '26", medianPrice: base, yoyChange: city.yoyChange, inventory: city.inventory, daysOnMarket: city.daysOnMarket },
    ],
    "5Y": [
      { date: "2021", medianPrice: Math.round(base * 0.72), yoyChange: 14.5, inventory: city.inventory + 1.5, daysOnMarket: city.daysOnMarket + 18 },
      { date: "2022", medianPrice: Math.round(base * 0.85), yoyChange: 16.8, inventory: city.inventory + 1.0, daysOnMarket: city.daysOnMarket + 10 },
      { date: "2023", medianPrice: Math.round(base * 0.90), yoyChange: 5.2, inventory: city.inventory + 0.6, daysOnMarket: city.daysOnMarket + 6 },
      { date: "2024", medianPrice: Math.round(base * 0.95), yoyChange: city.yoyChange + 1.5, inventory: city.inventory + 0.3, daysOnMarket: city.daysOnMarket + 3 },
      { date: "2025", medianPrice: Math.round(base * 0.98), yoyChange: city.yoyChange + 0.5, inventory: city.inventory, daysOnMarket: city.daysOnMarket },
      { date: "2026", medianPrice: base, yoyChange: city.yoyChange, inventory: city.inventory, daysOnMarket: city.daysOnMarket },
    ],
    "10Y": [
      { date: "2016", medianPrice: Math.round(base * 0.45), yoyChange: 5.8, inventory: city.inventory + 3.0, daysOnMarket: city.daysOnMarket + 32 },
      { date: "2017", medianPrice: Math.round(base * 0.50), yoyChange: 7.2, inventory: city.inventory + 2.6, daysOnMarket: city.daysOnMarket + 28 },
      { date: "2018", medianPrice: Math.round(base * 0.55), yoyChange: 8.5, inventory: city.inventory + 2.2, daysOnMarket: city.daysOnMarket + 22 },
      { date: "2019", medianPrice: Math.round(base * 0.58), yoyChange: 5.2, inventory: city.inventory + 1.8, daysOnMarket: city.daysOnMarket + 18 },
      { date: "2020", medianPrice: Math.round(base * 0.62), yoyChange: 8.8, inventory: city.inventory + 1.6, daysOnMarket: city.daysOnMarket + 16 },
      { date: "2021", medianPrice: Math.round(base * 0.72), yoyChange: 14.5, inventory: city.inventory + 1.5, daysOnMarket: city.daysOnMarket + 18 },
      { date: "2022", medianPrice: Math.round(base * 0.85), yoyChange: 16.8, inventory: city.inventory + 1.0, daysOnMarket: city.daysOnMarket + 10 },
      { date: "2023", medianPrice: Math.round(base * 0.90), yoyChange: 5.2, inventory: city.inventory + 0.6, daysOnMarket: city.daysOnMarket + 6 },
      { date: "2024", medianPrice: Math.round(base * 0.95), yoyChange: city.yoyChange + 1.5, inventory: city.inventory + 0.3, daysOnMarket: city.daysOnMarket + 3 },
      { date: "2025", medianPrice: Math.round(base * 0.98), yoyChange: city.yoyChange + 0.5, inventory: city.inventory, daysOnMarket: city.daysOnMarket },
      { date: "2026", medianPrice: base, yoyChange: city.yoyChange, inventory: city.inventory, daysOnMarket: city.daysOnMarket },
    ],
    "Max": [
      { date: "1995", medianPrice: Math.round(base * 0.18), yoyChange: 3.5, inventory: 6.5, daysOnMarket: 85 },
      { date: "2000", medianPrice: Math.round(base * 0.25), yoyChange: 8.2, inventory: 5.2, daysOnMarket: 65 },
      { date: "2005", medianPrice: Math.round(base * 0.42), yoyChange: 15.5, inventory: 4.0, daysOnMarket: 42 },
      { date: "2007", medianPrice: Math.round(base * 0.48), yoyChange: 6.5, inventory: 5.5, daysOnMarket: 55 },
      { date: "2009", medianPrice: Math.round(base * 0.35), yoyChange: -15.2, inventory: 9.5, daysOnMarket: 105 },
      { date: "2012", medianPrice: Math.round(base * 0.32), yoyChange: -3.5, inventory: 7.2, daysOnMarket: 82 },
      { date: "2015", medianPrice: Math.round(base * 0.42), yoyChange: 6.8, inventory: 5.0, daysOnMarket: 58 },
      { date: "2018", medianPrice: Math.round(base * 0.55), yoyChange: 8.5, inventory: city.inventory + 2.2, daysOnMarket: city.daysOnMarket + 22 },
      { date: "2021", medianPrice: Math.round(base * 0.72), yoyChange: 14.5, inventory: city.inventory + 1.5, daysOnMarket: city.daysOnMarket + 18 },
      { date: "2024", medianPrice: Math.round(base * 0.95), yoyChange: city.yoyChange + 1.5, inventory: city.inventory + 0.3, daysOnMarket: city.daysOnMarket + 3 },
      { date: "2026", medianPrice: base, yoyChange: city.yoyChange, inventory: city.inventory, daysOnMarket: city.daysOnMarket },
    ],
  };
};

const metrics: { key: MetricType; label: string }[] = [
  { key: "medianPrice", label: "Median Price" },
  { key: "yoyChange", label: "YoY Change" },
  { key: "inventory", label: "Inventory" },
  { key: "daysOnMarket", label: "Days on Market" },
];

const getHeatColor = (value: number, metric: MetricType): string => {
  const ranges: Record<MetricType, { min: number; max: number; invert?: boolean }> = {
    medianPrice: { min: 200, max: 1300 },
    yoyChange: { min: -5, max: 15 },
    inventory: { min: 1.5, max: 4, invert: true },
    daysOnMarket: { min: 20, max: 60, invert: true },
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
    case "inventory": return `${value} mo`;
    case "daysOnMarket": return `${value}d`;
  }
};

interface CityHeatMapProps {
  region: string;
}

export default function CityHeatMap({ region }: CityHeatMapProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("medianPrice");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1Y");

  const cities = regionCities[region] || [];
  const historicalData = selectedCity ? generateCityHistoricalData(selectedCity) : null;

  const closeModal = () => setSelectedCity(null);

  return (
    <>
      <div className="glass-card p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold">{region} Region - Top 10 Cities</h3>
            <p className="text-sm text-slate-400 mt-1">
              Click any city for historical data
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

        {/* City Grid */}
        <div className="grid grid-cols-5 gap-3">
          {cities.map((city) => (
            <div
              key={city.city}
              onClick={() => setSelectedCity(city)}
              className={`${getHeatColor(city[selectedMetric], selectedMetric)} rounded-xl p-4 cursor-pointer transition-all hover:scale-105 hover:ring-2 hover:ring-white/30`}
            >
              <div className="font-bold text-sm">{city.city}</div>
              <div className="text-xs opacity-80">{city.state}</div>
              <div className="text-xl font-bold mt-2">
                {formatMetric(city[selectedMetric], selectedMetric)}
              </div>
              <div className="text-xs mt-1 opacity-70">
                Pop: {(city.population / 1000000).toFixed(1)}M
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs">
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

      {/* City Historical Data Modal */}
      {selectedCity && historicalData && (
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
                <h2 className="text-2xl font-bold">{selectedCity.city}, {selectedCity.state}</h2>
                <p className="text-slate-400 mt-1">Historical housing market data • Pop: {selectedCity.population.toLocaleString()}</p>
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
                  <div className="text-2xl font-bold text-indigo-400">${selectedCity.medianPrice}K</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">YoY Change</div>
                  <div className={`text-2xl font-bold ${selectedCity.yoyChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {selectedCity.yoyChange > 0 ? "+" : ""}{selectedCity.yoyChange}%
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Inventory</div>
                  <div className="text-2xl font-bold text-cyan-400">{selectedCity.inventory} mo</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Days on Market</div>
                  <div className="text-2xl font-bold text-orange-400">{selectedCity.daysOnMarket}</div>
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
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData[timePeriod]}>
                    <defs>
                      <linearGradient id="colorCityPrice" x1="0" y1="0" x2="0" y2="1">
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
                    <Area type="monotone" dataKey="medianPrice" stroke="#6366f1" strokeWidth={2} fill="url(#colorCityPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Market Indicators */}
            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold mb-4">Market Indicators</h3>
              <div className="h-[180px]">
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
