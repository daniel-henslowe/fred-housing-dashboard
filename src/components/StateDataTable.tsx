"use client";

import { useState } from "react";

interface StateData {
  state: string;
  abbr: string;
  medianPrice: number;
  avgPrice: number;
  pricePerSqFt: number;
  yoyChange: number;
  inventory: number;
  homesSold: number;
  population: number;
}

const stateData: StateData[] = [
  { state: "California", abbr: "CA", medianPrice: 785000, avgPrice: 895000, pricePerSqFt: 485, yoyChange: 4.2, inventory: 2.1, homesSold: 385000, population: 39.5 },
  { state: "Texas", abbr: "TX", medianPrice: 335000, avgPrice: 385000, pricePerSqFt: 165, yoyChange: 1.8, inventory: 3.8, homesSold: 425000, population: 30.0 },
  { state: "Florida", abbr: "FL", medianPrice: 415000, avgPrice: 485000, pricePerSqFt: 245, yoyChange: 6.5, inventory: 2.9, homesSold: 385000, population: 22.2 },
  { state: "New York", abbr: "NY", medianPrice: 445000, avgPrice: 565000, pricePerSqFt: 325, yoyChange: 3.8, inventory: 4.2, homesSold: 185000, population: 19.5 },
  { state: "Pennsylvania", abbr: "PA", medianPrice: 265000, avgPrice: 315000, pricePerSqFt: 155, yoyChange: 5.9, inventory: 2.8, homesSold: 165000, population: 13.0 },
  { state: "Illinois", abbr: "IL", medianPrice: 285000, avgPrice: 335000, pricePerSqFt: 175, yoyChange: 5.2, inventory: 2.6, homesSold: 145000, population: 12.6 },
  { state: "Ohio", abbr: "OH", medianPrice: 225000, avgPrice: 265000, pricePerSqFt: 135, yoyChange: 7.1, inventory: 2.2, homesSold: 155000, population: 11.8 },
  { state: "Georgia", abbr: "GA", medianPrice: 345000, avgPrice: 395000, pricePerSqFt: 185, yoyChange: 4.8, inventory: 2.7, homesSold: 145000, population: 10.9 },
  { state: "North Carolina", abbr: "NC", medianPrice: 365000, avgPrice: 415000, pricePerSqFt: 195, yoyChange: 5.5, inventory: 2.4, homesSold: 135000, population: 10.7 },
  { state: "Michigan", abbr: "MI", medianPrice: 235000, avgPrice: 275000, pricePerSqFt: 145, yoyChange: 6.8, inventory: 2.3, homesSold: 125000, population: 10.0 },
  { state: "New Jersey", abbr: "NJ", medianPrice: 485000, avgPrice: 545000, pricePerSqFt: 295, yoyChange: 8.2, inventory: 2.1, homesSold: 95000, population: 9.3 },
  { state: "Virginia", abbr: "VA", medianPrice: 385000, avgPrice: 445000, pricePerSqFt: 215, yoyChange: 4.5, inventory: 2.3, homesSold: 105000, population: 8.6 },
  { state: "Washington", abbr: "WA", medianPrice: 585000, avgPrice: 665000, pricePerSqFt: 345, yoyChange: 3.2, inventory: 2.5, homesSold: 95000, population: 7.8 },
  { state: "Arizona", abbr: "AZ", medianPrice: 425000, avgPrice: 475000, pricePerSqFt: 265, yoyChange: 2.8, inventory: 3.4, homesSold: 115000, population: 7.4 },
  { state: "Massachusetts", abbr: "MA", medianPrice: 595000, avgPrice: 685000, pricePerSqFt: 385, yoyChange: 5.8, inventory: 1.8, homesSold: 75000, population: 7.0 },
  { state: "Tennessee", abbr: "TN", medianPrice: 365000, avgPrice: 415000, pricePerSqFt: 195, yoyChange: 4.2, inventory: 3.1, homesSold: 95000, population: 7.0 },
  { state: "Indiana", abbr: "IN", medianPrice: 245000, avgPrice: 285000, pricePerSqFt: 145, yoyChange: 6.5, inventory: 2.4, homesSold: 85000, population: 6.8 },
  { state: "Maryland", abbr: "MD", medianPrice: 425000, avgPrice: 485000, pricePerSqFt: 245, yoyChange: 4.8, inventory: 2.2, homesSold: 65000, population: 6.2 },
  { state: "Missouri", abbr: "MO", medianPrice: 255000, avgPrice: 295000, pricePerSqFt: 155, yoyChange: 5.5, inventory: 2.6, homesSold: 75000, population: 6.2 },
  { state: "Colorado", abbr: "CO", medianPrice: 545000, avgPrice: 615000, pricePerSqFt: 295, yoyChange: 2.5, inventory: 3.2, homesSold: 85000, population: 5.8 },
];

type SortKey = keyof Omit<StateData, "state" | "abbr">;

export default function StateDataTable() {
  const [sortKey, setSortKey] = useState<SortKey>("medianPrice");
  const [sortAsc, setSortAsc] = useState(false);

  const sortedData = [...stateData].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortAsc ? diff : -diff;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const SortHeader = ({ label, sortKeyName, className = "" }: { label: string; sortKeyName: SortKey; className?: string }) => (
    <th
      className={`text-left text-xs uppercase text-slate-500 pb-4 cursor-pointer hover:text-white transition-colors ${className}`}
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">State-Level Housing Data</h3>
          <p className="text-sm text-slate-400 mt-1">
            Top 20 states by population with detailed housing metrics
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-indigo-500/10">
              <th className="text-left text-xs uppercase text-slate-500 pb-4">State</th>
              <SortHeader label="Median" sortKeyName="medianPrice" />
              <SortHeader label="Average" sortKeyName="avgPrice" />
              <SortHeader label="$/SqFt" sortKeyName="pricePerSqFt" />
              <SortHeader label="YoY %" sortKeyName="yoyChange" />
              <SortHeader label="Inventory" sortKeyName="inventory" />
              <SortHeader label="Homes Sold" sortKeyName="homesSold" />
              <SortHeader label="Pop (M)" sortKeyName="population" />
            </tr>
          </thead>
          <tbody>
            {sortedData.map((state) => (
              <tr
                key={state.abbr}
                className="border-b border-indigo-500/5 hover:bg-indigo-500/5 transition-colors"
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-6 rounded bg-indigo-500/20 flex items-center justify-center text-xs font-medium text-indigo-300">
                      {state.abbr}
                    </span>
                    <span className="font-medium">{state.state}</span>
                  </div>
                </td>
                <td className="py-3 font-mono">${formatNumber(state.medianPrice)}</td>
                <td className="py-3 font-mono text-slate-400">${formatNumber(state.avgPrice)}</td>
                <td className="py-3 font-mono text-slate-400">${state.pricePerSqFt}</td>
                <td className={`py-3 font-mono ${state.yoyChange > 5 ? "text-green-400" : state.yoyChange > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {state.yoyChange > 0 ? "+" : ""}{state.yoyChange.toFixed(1)}%
                </td>
                <td className="py-3 font-mono text-slate-400">{state.inventory.toFixed(1)} mo</td>
                <td className="py-3 font-mono text-slate-400">{formatNumber(state.homesSold)}</td>
                <td className="py-3 font-mono text-slate-400">{state.population.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
