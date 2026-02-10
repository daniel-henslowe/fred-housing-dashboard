"use client";

import Sidebar from "@/components/Sidebar";
import RegionalKpis from "@/components/RegionalKpis";
import HeatMapGrid from "@/components/HeatMapGrid";
import MetroHeatMap from "@/components/MetroHeatMap";
import RegionalPriceGrid from "@/components/RegionalPriceGrid";
import RegionalTrends from "@/components/RegionalTrends";
import StateDataTable from "@/components/StateDataTable";

export default function RegionalPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-[260px] p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Regional Housing Data</h1>
            <p className="text-slate-400 mt-1">
              FRED Regional Housing Metrics • Comprehensive geographic analysis
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-slate-800/80 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/40">
              <option>All Regions</option>
              <option>Northeast</option>
              <option>Midwest</option>
              <option>South</option>
              <option>West</option>
            </select>
            <button className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm">
              Export Report
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <RegionalKpis />

        {/* US Heat Map */}
        <div className="mb-7">
          <HeatMapGrid />
        </div>

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
      </main>
    </div>
  );
}
