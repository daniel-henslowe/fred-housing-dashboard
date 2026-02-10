"use client";

import { useState } from "react";
import KpiModal from "./KpiModal";

const nationalAverageData = {
  label: "National Average",
  value: "$516,500",
  change: "+3.8% YoY",
  trend: "up" as const,
  icon: "📊",
  color: "#22c55e",
  unit: "$",
  description: "The average sales price of houses sold in the United States. This metric is typically higher than the median due to high-end sales. Source: FRED ASPUS series.",
  historicalData: {
    "1Y": [
      { date: "Mar 2025", value: 478000 },
      { date: "Apr 2025", value: 482000 },
      { date: "May 2025", value: 488000 },
      { date: "Jun 2025", value: 495000 },
      { date: "Jul 2025", value: 502000 },
      { date: "Aug 2025", value: 508000 },
      { date: "Sep 2025", value: 512000 },
      { date: "Oct 2025", value: 515000 },
      { date: "Nov 2025", value: 518000 },
      { date: "Dec 2025", value: 516000 },
      { date: "Jan 2026", value: 515000 },
      { date: "Feb 2026", value: 516500 },
    ],
    "5Y": [
      { date: "Q1 2021", value: 385000 },
      { date: "Q2 2021", value: 408000 },
      { date: "Q3 2021", value: 425000 },
      { date: "Q4 2021", value: 445000 },
      { date: "Q1 2022", value: 455000 },
      { date: "Q2 2022", value: 485000 },
      { date: "Q3 2022", value: 498000 },
      { date: "Q4 2022", value: 478000 },
      { date: "Q1 2023", value: 465000 },
      { date: "Q2 2023", value: 475000 },
      { date: "Q3 2023", value: 485000 },
      { date: "Q4 2023", value: 488000 },
      { date: "Q1 2024", value: 492000 },
      { date: "Q2 2024", value: 502000 },
      { date: "Q3 2024", value: 510000 },
      { date: "Q4 2024", value: 515000 },
      { date: "Q1 2025", value: 508000 },
      { date: "Q2 2025", value: 512000 },
      { date: "Q3 2025", value: 518000 },
      { date: "Q4 2025", value: 516500 },
    ],
    "10Y": [
      { date: "2016 H1", value: 295000 },
      { date: "2016 H2", value: 305000 },
      { date: "2017 H1", value: 318000 },
      { date: "2017 H2", value: 332000 },
      { date: "2018 H1", value: 348000 },
      { date: "2018 H2", value: 358000 },
      { date: "2019 H1", value: 365000 },
      { date: "2019 H2", value: 375000 },
      { date: "2020 H1", value: 378000 },
      { date: "2020 H2", value: 398000 },
      { date: "2021 H1", value: 425000 },
      { date: "2021 H2", value: 445000 },
      { date: "2022 H1", value: 485000 },
      { date: "2022 H2", value: 478000 },
      { date: "2023 H1", value: 472000 },
      { date: "2023 H2", value: 488000 },
      { date: "2024 H1", value: 498000 },
      { date: "2024 H2", value: 512000 },
      { date: "2025 H1", value: 515000 },
      { date: "2025 H2", value: 516500 },
    ],
    "Max": [
      { date: "2000", value: 175000 },
      { date: "2002", value: 195000 },
      { date: "2004", value: 235000 },
      { date: "2006", value: 285000 },
      { date: "2008", value: 252000 },
      { date: "2010", value: 218000 },
      { date: "2012", value: 225000 },
      { date: "2014", value: 265000 },
      { date: "2016", value: 302000 },
      { date: "2018", value: 355000 },
      { date: "2020", value: 395000 },
      { date: "2022", value: 485000 },
      { date: "2024", value: 508000 },
      { date: "2026", value: 516500 },
    ],
  },
};

export default function NationalAverageCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="glass-card p-6 h-full flex flex-col justify-center cursor-pointer transition-all duration-200 hover:scale-[1.01] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
      >
        <div className="text-4xl mb-4">{nationalAverageData.icon}</div>
        <div className="text-sm text-slate-400 mb-2">{nationalAverageData.label}</div>
        <div className="text-4xl font-bold mb-3">{nationalAverageData.value}</div>
        <div className={`text-sm ${nationalAverageData.trend === "up" ? "text-green-400" : "text-red-400"}`}>
          {nationalAverageData.trend === "up" ? "↑" : "↓"} {nationalAverageData.change}
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Click to view historical trends
        </p>
      </div>

      {showModal && (
        <KpiModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={nationalAverageData.label}
          currentValue={nationalAverageData.value}
          change={nationalAverageData.change}
          trend={nationalAverageData.trend}
          icon={nationalAverageData.icon}
          historicalData={nationalAverageData.historicalData}
          unit={nationalAverageData.unit}
          description={nationalAverageData.description}
          color={nationalAverageData.color}
        />
      )}
    </>
  );
}
