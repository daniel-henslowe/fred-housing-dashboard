"use client";

import Sidebar from "@/components/Sidebar";
import ConstructionKpis from "@/components/ConstructionKpis";
import HousingStartsChart from "@/components/HousingStartsChart";
import BuildingPermitsChart from "@/components/BuildingPermitsChart";
import ConstructionSpendingChart from "@/components/ConstructionSpendingChart";
import MaterialCostsChart from "@/components/MaterialCostsChart";
import ConstructionEmployment from "@/components/ConstructionEmployment";
import RegionalConstruction from "@/components/RegionalConstruction";
import ConstructionPipeline from "@/components/ConstructionPipeline";
import NewHomeSalesChart from "@/components/NewHomeSalesChart";

export default function ConstructionPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-[260px] p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Construction Analytics</h1>
            <p className="text-slate-400 mt-1">
              FRED Construction Data • Housing Starts, Permits & Building Activity
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-slate-800/80 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/40 cursor-pointer">
              <option>Last 12 Months</option>
              <option>Last 5 Years</option>
              <option>Last 10 Years</option>
              <option>All Time</option>
            </select>
            <button className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm">
              Export Report
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <ConstructionKpis />

        {/* Housing Starts & Building Permits */}
        <div className="grid grid-cols-2 gap-6 mb-7">
          <HousingStartsChart />
          <BuildingPermitsChart />
        </div>

        {/* Construction Spending & New Home Sales */}
        <div className="grid grid-cols-2 gap-6 mb-7">
          <ConstructionSpendingChart />
          <NewHomeSalesChart />
        </div>

        {/* Material Costs */}
        <div className="mb-7">
          <MaterialCostsChart />
        </div>

        {/* Construction Employment & Pipeline */}
        <div className="grid grid-cols-3 gap-6 mb-7">
          <div className="col-span-2">
            <ConstructionEmployment />
          </div>
          <ConstructionPipeline />
        </div>

        {/* Regional Construction */}
        <RegionalConstruction />
      </main>
    </div>
  );
}
