"use client";

import { useState } from "react";

interface MetroArea {
  name: string;
  state: string;
  medianPrice: number;
  avgPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

const metroData: MetroArea[] = [
  { name: "San Francisco", state: "CA", medianPrice: 1285000, avgPrice: 1420000, yoyChange: 3.2, inventory: 1.8, daysOnMarket: 21 },
  { name: "San Jose", state: "CA", medianPrice: 1450000, avgPrice: 1580000, yoyChange: 4.1, inventory: 1.5, daysOnMarket: 18 },
  { name: "Los Angeles", state: "CA", medianPrice: 895000, avgPrice: 985000, yoyChange: 5.8, inventory: 2.1, daysOnMarket: 24 },
  { name: "San Diego", state: "CA", medianPrice: 925000, avgPrice: 1020000, yoyChange: 6.2, inventory: 1.9, daysOnMarket: 22 },
  { name: "Seattle", state: "WA", medianPrice: 785000, avgPrice: 865000, yoyChange: 4.5, inventory: 2.3, daysOnMarket: 19 },
  { name: "Denver", state: "CO", medianPrice: 585000, avgPrice: 645000, yoyChange: 3.8, inventory: 2.8, daysOnMarket: 26 },
  { name: "Austin", state: "TX", medianPrice: 545000, avgPrice: 598000, yoyChange: -2.1, inventory: 3.5, daysOnMarket: 38 },
  { name: "Phoenix", state: "AZ", medianPrice: 445000, avgPrice: 485000, yoyChange: 2.4, inventory: 3.2, daysOnMarket: 32 },
  { name: "Miami", state: "FL", medianPrice: 585000, avgPrice: 695000, yoyChange: 7.8, inventory: 2.4, daysOnMarket: 28 },
  { name: "Tampa", state: "FL", medianPrice: 385000, avgPrice: 425000, yoyChange: 5.2, inventory: 2.9, daysOnMarket: 31 },
  { name: "Nashville", state: "TN", medianPrice: 445000, avgPrice: 495000, yoyChange: 3.1, inventory: 3.1, daysOnMarket: 29 },
  { name: "Atlanta", state: "GA", medianPrice: 385000, avgPrice: 435000, yoyChange: 4.2, inventory: 2.7, daysOnMarket: 27 },
  { name: "Charlotte", state: "NC", medianPrice: 395000, avgPrice: 445000, yoyChange: 5.5, inventory: 2.5, daysOnMarket: 25 },
  { name: "Raleigh", state: "NC", medianPrice: 425000, avgPrice: 475000, yoyChange: 4.8, inventory: 2.3, daysOnMarket: 23 },
  { name: "Boston", state: "MA", medianPrice: 725000, avgPrice: 815000, yoyChange: 5.1, inventory: 1.9, daysOnMarket: 20 },
  { name: "New York", state: "NY", medianPrice: 685000, avgPrice: 825000, yoyChange: 3.9, inventory: 3.8, daysOnMarket: 45 },
  { name: "Washington DC", state: "DC", medianPrice: 595000, avgPrice: 685000, yoyChange: 4.3, inventory: 2.2, daysOnMarket: 24 },
  { name: "Philadelphia", state: "PA", medianPrice: 325000, avgPrice: 375000, yoyChange: 6.1, inventory: 2.8, daysOnMarket: 28 },
  { name: "Chicago", state: "IL", medianPrice: 335000, avgPrice: 385000, yoyChange: 5.4, inventory: 2.6, daysOnMarket: 30 },
  { name: "Minneapolis", state: "MN", medianPrice: 365000, avgPrice: 415000, yoyChange: 3.7, inventory: 2.4, daysOnMarket: 26 },
  { name: "Detroit", state: "MI", medianPrice: 235000, avgPrice: 275000, yoyChange: 7.2, inventory: 2.1, daysOnMarket: 24 },
  { name: "Cleveland", state: "OH", medianPrice: 215000, avgPrice: 255000, yoyChange: 8.1, inventory: 2.3, daysOnMarket: 27 },
  { name: "Columbus", state: "OH", medianPrice: 295000, avgPrice: 335000, yoyChange: 6.4, inventory: 2.0, daysOnMarket: 22 },
  { name: "Pittsburgh", state: "PA", medianPrice: 225000, avgPrice: 265000, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 29 },
  { name: "Dallas", state: "TX", medianPrice: 425000, avgPrice: 475000, yoyChange: 1.2, inventory: 3.8, daysOnMarket: 42 },
  { name: "Houston", state: "TX", medianPrice: 335000, avgPrice: 385000, yoyChange: 2.8, inventory: 3.4, daysOnMarket: 38 },
  { name: "San Antonio", state: "TX", medianPrice: 295000, avgPrice: 335000, yoyChange: 1.5, inventory: 4.1, daysOnMarket: 45 },
  { name: "Las Vegas", state: "NV", medianPrice: 425000, avgPrice: 465000, yoyChange: 4.8, inventory: 2.8, daysOnMarket: 32 },
  { name: "Portland", state: "OR", medianPrice: 525000, avgPrice: 585000, yoyChange: 2.1, inventory: 2.9, daysOnMarket: 34 },
  { name: "Salt Lake City", state: "UT", medianPrice: 545000, avgPrice: 595000, yoyChange: 3.5, inventory: 2.6, daysOnMarket: 28 },
];

type SortKey = "medianPrice" | "avgPrice" | "yoyChange" | "inventory" | "daysOnMarket";

const getHeatColor = (value: number, min: number, max: number) => {
  const ratio = (value - min) / (max - min);
  if (ratio < 0.2) return "bg-emerald-500/80";
  if (ratio < 0.4) return "bg-emerald-400/60";
  if (ratio < 0.6) return "bg-yellow-500/60";
  if (ratio < 0.8) return "bg-orange-500/70";
  return "bg-red-500/80";
};

const getChangeColor = (change: number) => {
  if (change > 5) return "text-green-400";
  if (change > 0) return "text-emerald-400";
  if (change > -2) return "text-yellow-400";
  return "text-red-400";
};

export default function MetroHeatMap() {
  const [sortKey, setSortKey] = useState<SortKey>("medianPrice");
  const [sortAsc, setSortAsc] = useState(false);

  const sortedData = [...metroData].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortAsc ? diff : -diff;
  });

  const minPrice = Math.min(...metroData.map((m) => m.medianPrice));
  const maxPrice = Math.max(...metroData.map((m) => m.medianPrice));

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const SortHeader = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <th
      className="text-left text-xs uppercase text-slate-500 pb-4 cursor-pointer hover:text-white transition-colors"
      onClick={() => handleSort(sortKeyName)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortKey === sortKeyName && (
          <span className="text-indigo-400">{sortAsc ? "↑" : "↓"}</span>
        )}
      </div>
    </th>
  );

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">Metro Area Price Heat Map</h3>
          <p className="text-sm text-slate-400 mt-1">
            Top 30 metropolitan areas by population
          </p>
        </div>
        <div className="flex gap-2 items-center text-xs">
          <span className="text-slate-400">Price Range:</span>
          <div className="flex gap-1">
            <div className="w-6 h-4 rounded bg-emerald-500/80"></div>
            <div className="w-6 h-4 rounded bg-emerald-400/60"></div>
            <div className="w-6 h-4 rounded bg-yellow-500/60"></div>
            <div className="w-6 h-4 rounded bg-orange-500/70"></div>
            <div className="w-6 h-4 rounded bg-red-500/80"></div>
          </div>
          <span className="text-slate-400">Low → High</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-indigo-500/10">
              <th className="text-left text-xs uppercase text-slate-500 pb-4">Metro Area</th>
              <SortHeader label="Median Price" sortKeyName="medianPrice" />
              <SortHeader label="Avg Price" sortKeyName="avgPrice" />
              <SortHeader label="YoY Change" sortKeyName="yoyChange" />
              <SortHeader label="Inventory (Mo)" sortKeyName="inventory" />
              <SortHeader label="Days on Market" sortKeyName="daysOnMarket" />
              <th className="text-left text-xs uppercase text-slate-500 pb-4">Heat</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((metro) => (
              <tr
                key={metro.name}
                className="border-b border-indigo-500/5 hover:bg-indigo-500/5 transition-colors"
              >
                <td className="py-3">
                  <div className="font-medium">{metro.name}</div>
                  <div className="text-xs text-slate-500">{metro.state}</div>
                </td>
                <td className="py-3 font-mono">
                  ${(metro.medianPrice / 1000).toFixed(0)}K
                </td>
                <td className="py-3 font-mono text-slate-400">
                  ${(metro.avgPrice / 1000).toFixed(0)}K
                </td>
                <td className={`py-3 font-mono ${getChangeColor(metro.yoyChange)}`}>
                  {metro.yoyChange > 0 ? "+" : ""}{metro.yoyChange.toFixed(1)}%
                </td>
                <td className="py-3 font-mono text-slate-400">
                  {metro.inventory.toFixed(1)}
                </td>
                <td className="py-3 font-mono text-slate-400">
                  {metro.daysOnMarket}
                </td>
                <td className="py-3">
                  <div
                    className={`w-12 h-6 rounded ${getHeatColor(
                      metro.medianPrice,
                      minPrice,
                      maxPrice
                    )}`}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
