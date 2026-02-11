"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

interface RegionData {
  region: string;
  medianPrice: number;
  avgPrice: number;
  yoyChange: number;
  color: string;
}

interface CityData {
  city: string;
  medianPrice: number;
  avgPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

type TimePeriod = "1Y" | "5Y" | "10Y" | "Max";

interface HistoricalDataPoint {
  date: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

const generateCityHistoricalData = (city: CityData): Record<TimePeriod, HistoricalDataPoint[]> => {
  const base = city.medianPrice;
  const yoy = city.yoyChange;
  const inv = city.inventory;
  const dom = city.daysOnMarket;

  return {
    "1Y": [
      { date: "Mar '25", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 0.5, inventory: inv + 500, daysOnMarket: dom + 4 },
      { date: "Apr '25", medianPrice: Math.round(base * 0.965), yoyChange: yoy + 0.3, inventory: inv + 400, daysOnMarket: dom + 3 },
      { date: "May '25", medianPrice: Math.round(base * 0.97), yoyChange: yoy + 0.2, inventory: inv + 300, daysOnMarket: dom + 2 },
      { date: "Jun '25", medianPrice: Math.round(base * 0.975), yoyChange: yoy + 0.1, inventory: inv + 200, daysOnMarket: dom + 1 },
      { date: "Jul '25", medianPrice: Math.round(base * 0.98), yoyChange: yoy, inventory: inv + 100, daysOnMarket: dom },
      { date: "Aug '25", medianPrice: Math.round(base * 0.985), yoyChange: yoy - 0.1, inventory: inv, daysOnMarket: dom - 1 },
      { date: "Sep '25", medianPrice: Math.round(base * 0.99), yoyChange: yoy - 0.2, inventory: inv - 100, daysOnMarket: dom - 1 },
      { date: "Oct '25", medianPrice: Math.round(base * 0.992), yoyChange: yoy - 0.2, inventory: inv - 50, daysOnMarket: dom - 2 },
      { date: "Nov '25", medianPrice: Math.round(base * 0.995), yoyChange: yoy - 0.1, inventory: inv, daysOnMarket: dom - 1 },
      { date: "Dec '25", medianPrice: Math.round(base * 0.998), yoyChange: yoy, inventory: inv, daysOnMarket: dom },
      { date: "Jan '26", medianPrice: Math.round(base * 0.999), yoyChange: yoy, inventory: inv, daysOnMarket: dom },
      { date: "Feb '26", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "5Y": [
      { date: "2021", medianPrice: Math.round(base * 0.75), yoyChange: 12.5, inventory: inv + 2500, daysOnMarket: dom + 15 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: inv + 1500, daysOnMarket: dom + 8 },
      { date: "2023", medianPrice: Math.round(base * 0.92), yoyChange: 4.5, inventory: inv + 800, daysOnMarket: dom + 5 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 300, daysOnMarket: dom + 2 },
      { date: "2025", medianPrice: Math.round(base * 0.99), yoyChange: yoy + 0.5, inventory: inv, daysOnMarket: dom },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "10Y": [
      { date: "2016", medianPrice: Math.round(base * 0.48), yoyChange: 5.2, inventory: inv + 5000, daysOnMarket: dom + 28 },
      { date: "2018", medianPrice: Math.round(base * 0.56), yoyChange: 7.2, inventory: inv + 4000, daysOnMarket: dom + 20 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: inv + 3000, daysOnMarket: dom + 16 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: inv + 1500, daysOnMarket: dom + 8 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 300, daysOnMarket: dom + 2 },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "Max": [
      { date: "1995", medianPrice: Math.round(base * 0.18), yoyChange: 3.2, inventory: inv * 3, daysOnMarket: 85 },
      { date: "2000", medianPrice: Math.round(base * 0.25), yoyChange: 6.5, inventory: inv * 2.5, daysOnMarket: 62 },
      { date: "2007", medianPrice: Math.round(base * 0.52), yoyChange: 8.2, inventory: inv * 2, daysOnMarket: 52 },
      { date: "2009", medianPrice: Math.round(base * 0.38), yoyChange: -12.5, inventory: inv * 3.5, daysOnMarket: 95 },
      { date: "2015", medianPrice: Math.round(base * 0.45), yoyChange: 5.8, inventory: inv * 2, daysOnMarket: 55 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: inv + 3000, daysOnMarket: dom + 16 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 300, daysOnMarket: dom + 2 },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
  };
};

interface RegionCities {
  [key: string]: CityData[];
}

const regionData: RegionData[] = [
  { region: "Northeast", medianPrice: 485, avgPrice: 545, yoyChange: 5.2, color: "#6366f1" },
  { region: "Midwest", medianPrice: 312, avgPrice: 358, yoyChange: 6.8, color: "#22c55e" },
  { region: "South", medianPrice: 378, avgPrice: 425, yoyChange: 4.5, color: "#f97316" },
  { region: "West", medianPrice: 598, avgPrice: 685, yoyChange: 3.1, color: "#8b5cf6" },
];

const regionCities: RegionCities = {
  Northeast: [
    { city: "New York, NY", medianPrice: 785, avgPrice: 925, yoyChange: 4.2, inventory: 12500, daysOnMarket: 45 },
    { city: "Boston, MA", medianPrice: 695, avgPrice: 780, yoyChange: 5.8, inventory: 4200, daysOnMarket: 32 },
    { city: "Philadelphia, PA", medianPrice: 385, avgPrice: 425, yoyChange: 6.1, inventory: 5800, daysOnMarket: 38 },
    { city: "Pittsburgh, PA", medianPrice: 245, avgPrice: 285, yoyChange: 7.2, inventory: 3100, daysOnMarket: 42 },
    { city: "Hartford, CT", medianPrice: 365, avgPrice: 410, yoyChange: 5.5, inventory: 2400, daysOnMarket: 35 },
    { city: "Providence, RI", medianPrice: 425, avgPrice: 475, yoyChange: 6.8, inventory: 1800, daysOnMarket: 28 },
    { city: "Newark, NJ", medianPrice: 485, avgPrice: 545, yoyChange: 4.9, inventory: 3500, daysOnMarket: 40 },
    { city: "Buffalo, NY", medianPrice: 225, avgPrice: 265, yoyChange: 8.1, inventory: 2200, daysOnMarket: 36 },
  ],
  Midwest: [
    { city: "Chicago, IL", medianPrice: 385, avgPrice: 445, yoyChange: 5.5, inventory: 9800, daysOnMarket: 42 },
    { city: "Detroit, MI", medianPrice: 225, avgPrice: 275, yoyChange: 9.2, inventory: 4500, daysOnMarket: 48 },
    { city: "Minneapolis, MN", medianPrice: 385, avgPrice: 425, yoyChange: 6.1, inventory: 3800, daysOnMarket: 35 },
    { city: "Cleveland, OH", medianPrice: 215, avgPrice: 255, yoyChange: 7.8, inventory: 3200, daysOnMarket: 45 },
    { city: "Indianapolis, IN", medianPrice: 295, avgPrice: 335, yoyChange: 7.5, inventory: 4100, daysOnMarket: 38 },
    { city: "Columbus, OH", medianPrice: 325, avgPrice: 365, yoyChange: 6.9, inventory: 3600, daysOnMarket: 32 },
    { city: "Milwaukee, WI", medianPrice: 285, avgPrice: 325, yoyChange: 5.8, inventory: 2800, daysOnMarket: 40 },
    { city: "Kansas City, MO", medianPrice: 275, avgPrice: 315, yoyChange: 6.4, inventory: 3400, daysOnMarket: 36 },
  ],
  South: [
    { city: "Miami, FL", medianPrice: 545, avgPrice: 625, yoyChange: 3.8, inventory: 8500, daysOnMarket: 52 },
    { city: "Atlanta, GA", medianPrice: 425, avgPrice: 485, yoyChange: 5.2, inventory: 7200, daysOnMarket: 38 },
    { city: "Dallas, TX", medianPrice: 415, avgPrice: 475, yoyChange: 4.5, inventory: 9100, daysOnMarket: 42 },
    { city: "Houston, TX", medianPrice: 365, avgPrice: 415, yoyChange: 4.8, inventory: 10200, daysOnMarket: 45 },
    { city: "Charlotte, NC", medianPrice: 395, avgPrice: 445, yoyChange: 5.8, inventory: 4800, daysOnMarket: 35 },
    { city: "Nashville, TN", medianPrice: 445, avgPrice: 505, yoyChange: 4.2, inventory: 4200, daysOnMarket: 32 },
    { city: "Tampa, FL", medianPrice: 385, avgPrice: 435, yoyChange: 3.5, inventory: 5600, daysOnMarket: 48 },
    { city: "Austin, TX", medianPrice: 485, avgPrice: 555, yoyChange: 2.8, inventory: 6800, daysOnMarket: 55 },
  ],
  West: [
    { city: "Los Angeles, CA", medianPrice: 895, avgPrice: 1050, yoyChange: 2.5, inventory: 11500, daysOnMarket: 58 },
    { city: "San Francisco, CA", medianPrice: 1250, avgPrice: 1425, yoyChange: 1.8, inventory: 3200, daysOnMarket: 48 },
    { city: "Seattle, WA", medianPrice: 785, avgPrice: 885, yoyChange: 3.2, inventory: 4500, daysOnMarket: 42 },
    { city: "Denver, CO", medianPrice: 585, avgPrice: 665, yoyChange: 3.8, inventory: 5200, daysOnMarket: 38 },
    { city: "Phoenix, AZ", medianPrice: 445, avgPrice: 505, yoyChange: 4.5, inventory: 8800, daysOnMarket: 45 },
    { city: "San Diego, CA", medianPrice: 865, avgPrice: 985, yoyChange: 2.8, inventory: 3800, daysOnMarket: 52 },
    { city: "Portland, OR", medianPrice: 545, avgPrice: 615, yoyChange: 3.5, inventory: 3400, daysOnMarket: 40 },
    { city: "Las Vegas, NV", medianPrice: 425, avgPrice: 485, yoyChange: 4.2, inventory: 6200, daysOnMarket: 48 },
  ],
};

// Get color based on price relative to region
const getHeatColor = (price: number, regionPrices: number[]) => {
  const min = Math.min(...regionPrices);
  const max = Math.max(...regionPrices);
  const normalized = (price - min) / (max - min);

  if (normalized < 0.25) return { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" };
  if (normalized < 0.5) return { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" };
  if (normalized < 0.75) return { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" };
  return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" };
};

export default function RegionalPriceGrid() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1Y");

  const handleBarClick = (data: RegionData) => {
    setSelectedRegion(data.region);
  };

  const closeModal = () => {
    setSelectedRegion(null);
  };

  const closeCityModal = () => {
    setSelectedCity(null);
  };

  const handleCityClick = (city: CityData) => {
    setSelectedCity(city);
    setTimePeriod("1Y");
  };

  const selectedCities = selectedRegion ? regionCities[selectedRegion] : [];
  const regionPrices = selectedCities.map(c => c.medianPrice);
  const selectedRegionData = regionData.find(r => r.region === selectedRegion);
  const cityHistoricalData = selectedCity ? generateCityHistoricalData(selectedCity) : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {/* Median vs Average Price Comparison */}
        <div className="glass-card p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Median vs Average Prices by Region</h3>
            <p className="text-sm text-slate-400 mt-1">Click a region to view city breakdown</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="region"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
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
                    backgroundColor: "#0f172a",
                    border: "1px solid #6366f1",
                    borderRadius: "12px",
                    padding: "12px 16px",
                  }}
                  cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                  formatter={(value) => [`$${value}K`, ""]}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#e2e8f0" }}
                />
                <Legend wrapperStyle={{ color: "#e2e8f0" }} />
                <Bar
                  dataKey="avgPrice"
                  name="Average Price"
                  radius={[4, 4, 0, 0]}
                  cursor="pointer"
                >
                  {regionData.map((entry, index) => (
                    <Cell
                      key={`avg-${index}`}
                      fill="#6366f1"
                      onClick={() => handleBarClick(entry)}
                    />
                  ))}
                </Bar>
                <Bar
                  dataKey="medianPrice"
                  name="Median Price"
                  radius={[4, 4, 0, 0]}
                  cursor="pointer"
                >
                  {regionData.map((entry, index) => (
                    <Cell
                      key={`median-${index}`}
                      fill="#8b5cf6"
                      onClick={() => handleBarClick(entry)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {regionData.map((region) => (
            <div
              key={region.region}
              onClick={() => setSelectedRegion(region.region)}
              className="glass-card p-5 relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
              style={{ borderLeft: `4px solid ${region.color}` }}
            >
              <div className="text-sm text-slate-400 mb-2">{region.region}</div>
              <div className="text-2xl font-bold mb-1">${region.medianPrice}K</div>
              <div className="text-sm text-slate-500 mb-3">
                Avg: ${region.avgPrice}K
              </div>
              <div
                className={`text-sm font-medium ${
                  region.yoyChange > 5
                    ? "text-green-400"
                    : region.yoyChange > 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {region.yoyChange > 0 ? "↑" : "↓"} {Math.abs(region.yoyChange)}% YoY
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                Click for cities →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Heat Map Modal */}
      {selectedRegion && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedRegionData?.color }}
                  />
                  {selectedRegion} Region - City Heat Map
                </h2>
                <p className="text-slate-400 mt-1">
                  Housing prices across major metropolitan areas
                </p>
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

            {/* Regional Summary */}
            <div className="p-6 border-b border-slate-800">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Regional Median</div>
                  <div className="text-2xl font-bold">${selectedRegionData?.medianPrice}K</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Regional Average</div>
                  <div className="text-2xl font-bold">${selectedRegionData?.avgPrice}K</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">YoY Change</div>
                  <div className={`text-2xl font-bold ${(selectedRegionData?.yoyChange ?? 0) > 0 ? "text-green-400" : "text-red-400"}`}>
                    {(selectedRegionData?.yoyChange ?? 0) > 0 ? "+" : ""}{selectedRegionData?.yoyChange}%
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Cities Tracked</div>
                  <div className="text-2xl font-bold">{selectedCities.length}</div>
                </div>
              </div>
            </div>

            {/* Heat Map Legend */}
            <div className="px-6 pt-4">
              <div className="flex items-center gap-6 text-sm">
                <span className="text-slate-400">Price Heat:</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500/40 border border-green-500/50" />
                  <span className="text-slate-400">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500/40 border border-yellow-500/50" />
                  <span className="text-slate-400">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-500/40 border border-orange-500/50" />
                  <span className="text-slate-400">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500/40 border border-red-500/50" />
                  <span className="text-slate-400">Very High</span>
                </div>
              </div>
            </div>

            {/* City Grid */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedCities.map((city) => {
                const heatColor = getHeatColor(city.medianPrice, regionPrices);
                return (
                  <div
                    key={city.city}
                    onClick={() => handleCityClick(city)}
                    className={`${heatColor.bg} border ${heatColor.border} rounded-xl p-4 transition-all hover:scale-[1.02] cursor-pointer hover:ring-2 hover:ring-white/20`}
                  >
                    <div className="font-semibold mb-2 text-white">{city.city}</div>
                    <div className={`text-2xl font-bold ${heatColor.text}`}>
                      ${city.medianPrice}K
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      Avg: ${city.avgPrice}K
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-700/50 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500">YoY</span>
                        <div className={city.yoyChange > 0 ? "text-green-400" : "text-red-400"}>
                          {city.yoyChange > 0 ? "+" : ""}{city.yoyChange}%
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500">DOM</span>
                        <div className="text-slate-300">{city.daysOnMarket}d</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500">Inventory</span>
                        <div className="text-slate-300">{city.inventory.toLocaleString()} homes</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* City Historical Data Modal */}
      {selectedCity && cityHistoricalData && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={closeCityModal}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedCity.city}</h2>
                <p className="text-slate-400 mt-1">Historical housing market data</p>
              </div>
              <button
                onClick={closeCityModal}
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
                  <div className="text-2xl font-bold text-cyan-400">{selectedCity.inventory.toLocaleString()}</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Days on Market</div>
                  <div className="text-2xl font-bold text-orange-400">{selectedCity.daysOnMarket}</div>
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
                  <AreaChart data={cityHistoricalData[timePeriod]}>
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

            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold mb-4">Market Indicators</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cityHistoricalData[timePeriod]}>
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #6366f1", borderRadius: "12px", padding: "12px" }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Line type="monotone" dataKey="yoyChange" name="YoY Change (%)" stroke="#22c55e" strokeWidth={2} dot={timePeriod !== "1Y"} />
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
