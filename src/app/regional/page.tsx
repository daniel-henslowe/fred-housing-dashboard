"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import RegionalKpis from "@/components/RegionalKpis";
import HeatMapGrid from "@/components/HeatMapGrid";
import NationalAverageCard from "@/components/NationalAverageCard";
import MetroHeatMap from "@/components/MetroHeatMap";
import RegionalPriceGrid from "@/components/RegionalPriceGrid";
import RegionalTrends from "@/components/RegionalTrends";
import StateDataTable from "@/components/StateDataTable";

const regions = ["All Regions", "Northeast", "Midwest", "South", "West"] as const;
type Region = typeof regions[number];

export default function RegionalPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region>("All Regions");

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-[260px] p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Regional Housing Data</h1>
            <p className="text-slate-400 mt-1">
              {selectedRegion === "All Regions"
                ? "FRED Regional Housing Metrics • Comprehensive geographic analysis"
                : `${selectedRegion} Region • Top 10 Cities Analysis`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as Region)}
              className="bg-slate-800/80 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/40 cursor-pointer"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <button className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm">
              Export Report
            </button>
          </div>
        </header>

        {/* KPI Cards - only show for All Regions */}
        {selectedRegion === "All Regions" && <RegionalKpis />}

        {/* US Heat Map / City Heat Map + National Average */}
        <div className="grid grid-cols-4 gap-6 mb-7">
          <div className="col-span-3">
            <HeatMapGrid selectedRegion={selectedRegion} />
          </div>
          {selectedRegion === "All Regions" && <NationalAverageCard />}
        </div>

        {selectedRegion === "All Regions" ? (
          <>
            {/* Regional Price Comparison */}
            <div className="mb-7">
              <RegionalPriceGrid />
            </div>

            {/* Regional Trends */}
            <div className="mb-7">
              <RegionalTrends />
            </div>

            {/* Metro Area Heat Map Table */}
            <div className="mb-7">
              <MetroHeatMap />
            </div>

            {/* State Level Data */}
            <StateDataTable />
          </>
        ) : (
          <>
            {/* Regional Trends */}
            <div className="mb-7">
              <RegionalTrends />
            </div>

            {/* Back to All Regions button */}
            <div className="text-center">
              <button
                onClick={() => setSelectedRegion("All Regions")}
                className="px-6 py-3 rounded-xl bg-slate-800/50 border border-indigo-500/20 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all"
              >
                ← Back to All Regions View
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
