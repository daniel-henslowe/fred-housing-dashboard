"use client";

import { useState } from "react";
import KpiModal from "./KpiModal";

interface HistoricalDataPoint {
  date: string;
  value: number;
}

interface HistoricalDataSets {
  "1Y": HistoricalDataPoint[];
  "5Y": HistoricalDataPoint[];
  "10Y": HistoricalDataPoint[];
  "Max": HistoricalDataPoint[];
}

interface KpiData {
  label: string;
  value: string;
  subValue?: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  color: string;
  unit: string;
  description: string;
  historicalData: HistoricalDataSets;
}

const kpis: KpiData[] = [
  {
    label: "National Median",
    value: "$428,700",
    change: "+4.2% YoY",
    trend: "up",
    icon: "🏠",
    color: "#3b82f6",
    unit: "$",
    description: "The median sales price of houses sold in the United States. This metric represents the middle point of all home sales. Source: FRED MSPUS series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 395000 },
        { date: "Apr 2025", value: 398000 },
        { date: "May 2025", value: 405000 },
        { date: "Jun 2025", value: 412000 },
        { date: "Jul 2025", value: 418000 },
        { date: "Aug 2025", value: 422000 },
        { date: "Sep 2025", value: 425000 },
        { date: "Oct 2025", value: 428000 },
        { date: "Nov 2025", value: 430000 },
        { date: "Dec 2025", value: 428000 },
        { date: "Jan 2026", value: 427000 },
        { date: "Feb 2026", value: 428700 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 315000 },
        { date: "Q2 2021", value: 335000 },
        { date: "Q3 2021", value: 352000 },
        { date: "Q4 2021", value: 365000 },
        { date: "Q1 2022", value: 375000 },
        { date: "Q2 2022", value: 395000 },
        { date: "Q3 2022", value: 405000 },
        { date: "Q4 2022", value: 392000 },
        { date: "Q1 2023", value: 380000 },
        { date: "Q2 2023", value: 388000 },
        { date: "Q3 2023", value: 395000 },
        { date: "Q4 2023", value: 398000 },
        { date: "Q1 2024", value: 402000 },
        { date: "Q2 2024", value: 410000 },
        { date: "Q3 2024", value: 418000 },
        { date: "Q4 2024", value: 422000 },
        { date: "Q1 2025", value: 415000 },
        { date: "Q2 2025", value: 420000 },
        { date: "Q3 2025", value: 428000 },
        { date: "Q4 2025", value: 428700 },
      ],
      "10Y": [
        { date: "2016 H1", value: 235000 },
        { date: "2016 H2", value: 242000 },
        { date: "2017 H1", value: 252000 },
        { date: "2017 H2", value: 262000 },
        { date: "2018 H1", value: 275000 },
        { date: "2018 H2", value: 282000 },
        { date: "2019 H1", value: 288000 },
        { date: "2019 H2", value: 295000 },
        { date: "2020 H1", value: 298000 },
        { date: "2020 H2", value: 318000 },
        { date: "2021 H1", value: 345000 },
        { date: "2021 H2", value: 365000 },
        { date: "2022 H1", value: 395000 },
        { date: "2022 H2", value: 392000 },
        { date: "2023 H1", value: 385000 },
        { date: "2023 H2", value: 398000 },
        { date: "2024 H1", value: 408000 },
        { date: "2024 H2", value: 420000 },
        { date: "2025 H1", value: 422000 },
        { date: "2025 H2", value: 428700 },
      ],
      "Max": [
        { date: "2000", value: 135000 },
        { date: "2002", value: 152000 },
        { date: "2004", value: 185000 },
        { date: "2006", value: 222000 },
        { date: "2008", value: 195000 },
        { date: "2010", value: 168000 },
        { date: "2012", value: 172000 },
        { date: "2014", value: 205000 },
        { date: "2016", value: 235000 },
        { date: "2018", value: 278000 },
        { date: "2020", value: 315000 },
        { date: "2022", value: 395000 },
        { date: "2024", value: 415000 },
        { date: "2026", value: 428700 },
      ],
    },
  },
  {
    label: "Price per Sq Ft",
    value: "$225",
    change: "+5.1% YoY",
    trend: "up",
    icon: "📐",
    color: "#8b5cf6",
    unit: "$",
    description: "The average price per square foot for homes sold nationally. This metric helps compare value across different sized homes. Source: Calculated from FRED and Census data.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 205 },
        { date: "Apr 2025", value: 208 },
        { date: "May 2025", value: 212 },
        { date: "Jun 2025", value: 215 },
        { date: "Jul 2025", value: 218 },
        { date: "Aug 2025", value: 220 },
        { date: "Sep 2025", value: 222 },
        { date: "Oct 2025", value: 223 },
        { date: "Nov 2025", value: 224 },
        { date: "Dec 2025", value: 224 },
        { date: "Jan 2026", value: 224 },
        { date: "Feb 2026", value: 225 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 155 },
        { date: "Q2 2021", value: 165 },
        { date: "Q3 2021", value: 172 },
        { date: "Q4 2021", value: 178 },
        { date: "Q1 2022", value: 185 },
        { date: "Q2 2022", value: 195 },
        { date: "Q3 2022", value: 200 },
        { date: "Q4 2022", value: 195 },
        { date: "Q1 2023", value: 188 },
        { date: "Q2 2023", value: 192 },
        { date: "Q3 2023", value: 198 },
        { date: "Q4 2023", value: 202 },
        { date: "Q1 2024", value: 205 },
        { date: "Q2 2024", value: 210 },
        { date: "Q3 2024", value: 215 },
        { date: "Q4 2024", value: 218 },
        { date: "Q1 2025", value: 215 },
        { date: "Q2 2025", value: 218 },
        { date: "Q3 2025", value: 222 },
        { date: "Q4 2025", value: 225 },
      ],
      "10Y": [
        { date: "2016 H1", value: 115 },
        { date: "2016 H2", value: 118 },
        { date: "2017 H1", value: 122 },
        { date: "2017 H2", value: 128 },
        { date: "2018 H1", value: 135 },
        { date: "2018 H2", value: 138 },
        { date: "2019 H1", value: 140 },
        { date: "2019 H2", value: 145 },
        { date: "2020 H1", value: 148 },
        { date: "2020 H2", value: 158 },
        { date: "2021 H1", value: 168 },
        { date: "2021 H2", value: 178 },
        { date: "2022 H1", value: 195 },
        { date: "2022 H2", value: 195 },
        { date: "2023 H1", value: 190 },
        { date: "2023 H2", value: 200 },
        { date: "2024 H1", value: 208 },
        { date: "2024 H2", value: 216 },
        { date: "2025 H1", value: 218 },
        { date: "2025 H2", value: 225 },
      ],
      "Max": [
        { date: "2000", value: 68 },
        { date: "2002", value: 75 },
        { date: "2004", value: 92 },
        { date: "2006", value: 112 },
        { date: "2008", value: 98 },
        { date: "2010", value: 82 },
        { date: "2012", value: 85 },
        { date: "2014", value: 102 },
        { date: "2016", value: 118 },
        { date: "2018", value: 138 },
        { date: "2020", value: 155 },
        { date: "2022", value: 195 },
        { date: "2024", value: 212 },
        { date: "2026", value: 225 },
      ],
    },
  },
  {
    label: "Total Inventory",
    value: "1.14M",
    subValue: "homes",
    change: "+12.5% YoY",
    trend: "up",
    icon: "📦",
    color: "#f97316",
    unit: "",
    description: "Total number of homes available for sale nationally. Higher inventory typically indicates a buyer's market with more choices. Source: FRED ACTLISCOUUS series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 0.95 },
        { date: "Apr 2025", value: 0.98 },
        { date: "May 2025", value: 1.02 },
        { date: "Jun 2025", value: 1.05 },
        { date: "Jul 2025", value: 1.08 },
        { date: "Aug 2025", value: 1.10 },
        { date: "Sep 2025", value: 1.11 },
        { date: "Oct 2025", value: 1.12 },
        { date: "Nov 2025", value: 1.13 },
        { date: "Dec 2025", value: 1.12 },
        { date: "Jan 2026", value: 1.13 },
        { date: "Feb 2026", value: 1.14 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 0.98 },
        { date: "Q2 2021", value: 1.08 },
        { date: "Q3 2021", value: 1.15 },
        { date: "Q4 2021", value: 0.88 },
        { date: "Q1 2022", value: 0.78 },
        { date: "Q2 2022", value: 0.98 },
        { date: "Q3 2022", value: 1.22 },
        { date: "Q4 2022", value: 1.02 },
        { date: "Q1 2023", value: 0.88 },
        { date: "Q2 2023", value: 1.02 },
        { date: "Q3 2023", value: 1.12 },
        { date: "Q4 2023", value: 0.95 },
        { date: "Q1 2024", value: 0.85 },
        { date: "Q2 2024", value: 1.05 },
        { date: "Q3 2024", value: 1.18 },
        { date: "Q4 2024", value: 1.02 },
        { date: "Q1 2025", value: 0.92 },
        { date: "Q2 2025", value: 1.05 },
        { date: "Q3 2025", value: 1.12 },
        { date: "Q4 2025", value: 1.14 },
      ],
      "10Y": [
        { date: "2016 H1", value: 1.95 },
        { date: "2016 H2", value: 1.88 },
        { date: "2017 H1", value: 1.78 },
        { date: "2017 H2", value: 1.68 },
        { date: "2018 H1", value: 1.72 },
        { date: "2018 H2", value: 1.82 },
        { date: "2019 H1", value: 1.68 },
        { date: "2019 H2", value: 1.58 },
        { date: "2020 H1", value: 1.42 },
        { date: "2020 H2", value: 1.05 },
        { date: "2021 H1", value: 1.02 },
        { date: "2021 H2", value: 0.88 },
        { date: "2022 H1", value: 0.88 },
        { date: "2022 H2", value: 1.12 },
        { date: "2023 H1", value: 0.95 },
        { date: "2023 H2", value: 1.02 },
        { date: "2024 H1", value: 0.95 },
        { date: "2024 H2", value: 1.10 },
        { date: "2025 H1", value: 1.00 },
        { date: "2025 H2", value: 1.14 },
      ],
      "Max": [
        { date: "2000", value: 2.05 },
        { date: "2002", value: 2.18 },
        { date: "2004", value: 2.42 },
        { date: "2006", value: 3.55 },
        { date: "2008", value: 4.02 },
        { date: "2010", value: 3.85 },
        { date: "2012", value: 2.42 },
        { date: "2014", value: 2.28 },
        { date: "2016", value: 1.92 },
        { date: "2018", value: 1.75 },
        { date: "2020", value: 1.22 },
        { date: "2022", value: 1.00 },
        { date: "2024", value: 1.02 },
        { date: "2026", value: 1.14 },
      ],
    },
  },
  {
    label: "Avg Days on Market",
    value: "32",
    subValue: "days",
    change: "-3 days YoY",
    trend: "down",
    icon: "📅",
    color: "#06b6d4",
    unit: "",
    description: "Average number of days homes stay on the market before selling. Lower numbers indicate a seller's market with high demand. Source: FRED regional market data.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 38 },
        { date: "Apr 2025", value: 36 },
        { date: "May 2025", value: 34 },
        { date: "Jun 2025", value: 32 },
        { date: "Jul 2025", value: 30 },
        { date: "Aug 2025", value: 31 },
        { date: "Sep 2025", value: 32 },
        { date: "Oct 2025", value: 33 },
        { date: "Nov 2025", value: 34 },
        { date: "Dec 2025", value: 35 },
        { date: "Jan 2026", value: 33 },
        { date: "Feb 2026", value: 32 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 22 },
        { date: "Q2 2021", value: 18 },
        { date: "Q3 2021", value: 16 },
        { date: "Q4 2021", value: 18 },
        { date: "Q1 2022", value: 22 },
        { date: "Q2 2022", value: 18 },
        { date: "Q3 2022", value: 28 },
        { date: "Q4 2022", value: 38 },
        { date: "Q1 2023", value: 48 },
        { date: "Q2 2023", value: 32 },
        { date: "Q3 2023", value: 26 },
        { date: "Q4 2023", value: 42 },
        { date: "Q1 2024", value: 52 },
        { date: "Q2 2024", value: 38 },
        { date: "Q3 2024", value: 30 },
        { date: "Q4 2024", value: 40 },
        { date: "Q1 2025", value: 45 },
        { date: "Q2 2025", value: 34 },
        { date: "Q3 2025", value: 32 },
        { date: "Q4 2025", value: 32 },
      ],
      "10Y": [
        { date: "2016 H1", value: 52 },
        { date: "2016 H2", value: 48 },
        { date: "2017 H1", value: 44 },
        { date: "2017 H2", value: 40 },
        { date: "2018 H1", value: 38 },
        { date: "2018 H2", value: 42 },
        { date: "2019 H1", value: 38 },
        { date: "2019 H2", value: 35 },
        { date: "2020 H1", value: 32 },
        { date: "2020 H2", value: 22 },
        { date: "2021 H1", value: 18 },
        { date: "2021 H2", value: 18 },
        { date: "2022 H1", value: 22 },
        { date: "2022 H2", value: 35 },
        { date: "2023 H1", value: 40 },
        { date: "2023 H2", value: 34 },
        { date: "2024 H1", value: 45 },
        { date: "2024 H2", value: 35 },
        { date: "2025 H1", value: 38 },
        { date: "2025 H2", value: 32 },
      ],
      "Max": [
        { date: "2000", value: 62 },
        { date: "2002", value: 55 },
        { date: "2004", value: 42 },
        { date: "2006", value: 58 },
        { date: "2008", value: 95 },
        { date: "2010", value: 105 },
        { date: "2012", value: 82 },
        { date: "2014", value: 62 },
        { date: "2016", value: 48 },
        { date: "2018", value: 40 },
        { date: "2020", value: 26 },
        { date: "2022", value: 28 },
        { date: "2024", value: 40 },
        { date: "2026", value: 32 },
      ],
    },
  },
  {
    label: "Homes Sold (Annual)",
    value: "5.2M",
    change: "-2.8% YoY",
    trend: "down",
    icon: "🏘️",
    color: "#ef4444",
    unit: "",
    description: "Total number of homes sold annually in the United States, including both new and existing homes. Source: FRED EXHOSLUSM495S and HSN1F series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 5.45 },
        { date: "Apr 2025", value: 5.42 },
        { date: "May 2025", value: 5.38 },
        { date: "Jun 2025", value: 5.35 },
        { date: "Jul 2025", value: 5.32 },
        { date: "Aug 2025", value: 5.30 },
        { date: "Sep 2025", value: 5.28 },
        { date: "Oct 2025", value: 5.25 },
        { date: "Nov 2025", value: 5.22 },
        { date: "Dec 2025", value: 5.20 },
        { date: "Jan 2026", value: 5.20 },
        { date: "Feb 2026", value: 5.20 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 6.32 },
        { date: "Q2 2021", value: 6.18 },
        { date: "Q3 2021", value: 6.25 },
        { date: "Q4 2021", value: 6.45 },
        { date: "Q1 2022", value: 6.12 },
        { date: "Q2 2022", value: 5.45 },
        { date: "Q3 2022", value: 5.02 },
        { date: "Q4 2022", value: 4.32 },
        { date: "Q1 2023", value: 4.42 },
        { date: "Q2 2023", value: 4.58 },
        { date: "Q3 2023", value: 4.35 },
        { date: "Q4 2023", value: 4.12 },
        { date: "Q1 2024", value: 4.35 },
        { date: "Q2 2024", value: 4.28 },
        { date: "Q3 2024", value: 4.18 },
        { date: "Q4 2024", value: 4.32 },
        { date: "Q1 2025", value: 5.45 },
        { date: "Q2 2025", value: 5.38 },
        { date: "Q3 2025", value: 5.28 },
        { date: "Q4 2025", value: 5.20 },
      ],
      "10Y": [
        { date: "2016 H1", value: 5.72 },
        { date: "2016 H2", value: 5.82 },
        { date: "2017 H1", value: 5.88 },
        { date: "2017 H2", value: 5.78 },
        { date: "2018 H1", value: 5.82 },
        { date: "2018 H2", value: 5.52 },
        { date: "2019 H1", value: 5.58 },
        { date: "2019 H2", value: 5.72 },
        { date: "2020 H1", value: 5.05 },
        { date: "2020 H2", value: 6.18 },
        { date: "2021 H1", value: 6.28 },
        { date: "2021 H2", value: 6.38 },
        { date: "2022 H1", value: 5.78 },
        { date: "2022 H2", value: 4.65 },
        { date: "2023 H1", value: 4.48 },
        { date: "2023 H2", value: 4.22 },
        { date: "2024 H1", value: 4.32 },
        { date: "2024 H2", value: 4.25 },
        { date: "2025 H1", value: 5.42 },
        { date: "2025 H2", value: 5.20 },
      ],
      "Max": [
        { date: "2000", value: 5.45 },
        { date: "2002", value: 5.88 },
        { date: "2004", value: 7.08 },
        { date: "2006", value: 6.82 },
        { date: "2008", value: 5.22 },
        { date: "2010", value: 4.48 },
        { date: "2012", value: 4.95 },
        { date: "2014", value: 5.22 },
        { date: "2016", value: 5.78 },
        { date: "2018", value: 5.65 },
        { date: "2020", value: 5.65 },
        { date: "2022", value: 5.32 },
        { date: "2024", value: 4.28 },
        { date: "2026", value: 5.20 },
      ],
    },
  },
];

export default function RegionalKpis() {
  const [selectedKpi, setSelectedKpi] = useState<KpiData | null>(null);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 mb-7">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            onClick={() => setSelectedKpi(kpi)}
            className="glass-card p-4 relative overflow-hidden gradient-border-top-hover cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="text-2xl mb-3">{kpi.icon}</div>
            <div className="text-xs text-slate-400 mb-1">{kpi.label}</div>
            <div className="text-xl font-bold">
              {kpi.value}
              {kpi.subValue && <span className="text-sm font-normal text-slate-400 ml-1">{kpi.subValue}</span>}
            </div>
            <div className={`text-xs mt-2 ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}>
              {kpi.trend === "up" ? "↑" : "↓"} {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {selectedKpi && (
        <KpiModal
          isOpen={!!selectedKpi}
          onClose={() => setSelectedKpi(null)}
          title={selectedKpi.label}
          currentValue={selectedKpi.value}
          change={selectedKpi.change}
          trend={selectedKpi.trend}
          icon={selectedKpi.icon}
          historicalData={selectedKpi.historicalData}
          unit={selectedKpi.unit}
          description={selectedKpi.description}
          color={selectedKpi.color}
        />
      )}
    </>
  );
}
