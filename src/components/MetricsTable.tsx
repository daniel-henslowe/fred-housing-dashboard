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

interface Metric {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: string;
  unit: string;
  color: string;
  description: string;
  historicalData: HistoricalDataSets;
}

const metrics: Metric[] = [
  {
    name: "15-Yr Rate",
    value: "5.68%",
    change: "-0.12",
    trend: "down",
    icon: "📉",
    unit: "",
    color: "#ef4444",
    description: "The average 15-year fixed mortgage rate in the United States. This rate is typically lower than the 30-year rate and is popular for refinancing. Source: FRED MORTGAGE15US series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 6.15 },
        { date: "Apr 2025", value: 6.08 },
        { date: "May 2025", value: 6.02 },
        { date: "Jun 2025", value: 5.95 },
        { date: "Jul 2025", value: 6.02 },
        { date: "Aug 2025", value: 6.10 },
        { date: "Sep 2025", value: 5.98 },
        { date: "Oct 2025", value: 5.85 },
        { date: "Nov 2025", value: 5.78 },
        { date: "Dec 2025", value: 5.72 },
        { date: "Jan 2026", value: 5.80 },
        { date: "Feb 2026", value: 5.68 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 2.35 },
        { date: "Q2 2021", value: 2.42 },
        { date: "Q3 2021", value: 2.28 },
        { date: "Q4 2021", value: 2.52 },
        { date: "Q1 2022", value: 3.25 },
        { date: "Q2 2022", value: 4.92 },
        { date: "Q3 2022", value: 5.25 },
        { date: "Q4 2022", value: 6.12 },
        { date: "Q1 2023", value: 5.78 },
        { date: "Q2 2023", value: 6.02 },
        { date: "Q3 2023", value: 6.42 },
        { date: "Q4 2023", value: 6.78 },
        { date: "Q1 2024", value: 6.22 },
        { date: "Q2 2024", value: 6.35 },
        { date: "Q3 2024", value: 5.88 },
        { date: "Q4 2024", value: 6.02 },
        { date: "Q1 2025", value: 6.12 },
        { date: "Q2 2025", value: 5.98 },
        { date: "Q3 2025", value: 5.82 },
        { date: "Q4 2025", value: 5.68 },
      ],
      "10Y": [
        { date: "2016 H1", value: 2.98 },
        { date: "2016 H2", value: 2.85 },
        { date: "2017 H1", value: 3.42 },
        { date: "2017 H2", value: 3.22 },
        { date: "2018 H1", value: 3.85 },
        { date: "2018 H2", value: 4.12 },
        { date: "2019 H1", value: 3.58 },
        { date: "2019 H2", value: 3.02 },
        { date: "2020 H1", value: 2.78 },
        { date: "2020 H2", value: 2.25 },
        { date: "2021 H1", value: 2.38 },
        { date: "2021 H2", value: 2.45 },
        { date: "2022 H1", value: 4.02 },
        { date: "2022 H2", value: 5.82 },
        { date: "2023 H1", value: 5.88 },
        { date: "2023 H2", value: 6.62 },
        { date: "2024 H1", value: 6.28 },
        { date: "2024 H2", value: 5.95 },
        { date: "2025 H1", value: 6.05 },
        { date: "2025 H2", value: 5.68 },
      ],
      "Max": [
        { date: "2000", value: 7.72 },
        { date: "2002", value: 5.98 },
        { date: "2004", value: 5.21 },
        { date: "2006", value: 5.92 },
        { date: "2008", value: 5.48 },
        { date: "2010", value: 4.18 },
        { date: "2012", value: 2.98 },
        { date: "2014", value: 3.48 },
        { date: "2016", value: 2.92 },
        { date: "2018", value: 3.85 },
        { date: "2020", value: 2.52 },
        { date: "2022", value: 4.75 },
        { date: "2024", value: 6.12 },
        { date: "2026", value: 5.68 },
      ],
    },
  },
  {
    name: "Construction",
    value: "$1.82T",
    change: "+2.4%",
    trend: "up",
    icon: "🏗️",
    unit: "$",
    color: "#22c55e",
    description: "Total value of construction put in place in the United States, measuring the total dollar value of construction work done. Source: FRED TLRESCONS series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 1.68 },
        { date: "Apr 2025", value: 1.70 },
        { date: "May 2025", value: 1.72 },
        { date: "Jun 2025", value: 1.74 },
        { date: "Jul 2025", value: 1.75 },
        { date: "Aug 2025", value: 1.77 },
        { date: "Sep 2025", value: 1.78 },
        { date: "Oct 2025", value: 1.79 },
        { date: "Nov 2025", value: 1.80 },
        { date: "Dec 2025", value: 1.78 },
        { date: "Jan 2026", value: 1.80 },
        { date: "Feb 2026", value: 1.82 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 1.42 },
        { date: "Q2 2021", value: 1.48 },
        { date: "Q3 2021", value: 1.52 },
        { date: "Q4 2021", value: 1.58 },
        { date: "Q1 2022", value: 1.62 },
        { date: "Q2 2022", value: 1.68 },
        { date: "Q3 2022", value: 1.72 },
        { date: "Q4 2022", value: 1.65 },
        { date: "Q1 2023", value: 1.58 },
        { date: "Q2 2023", value: 1.62 },
        { date: "Q3 2023", value: 1.65 },
        { date: "Q4 2023", value: 1.68 },
        { date: "Q1 2024", value: 1.70 },
        { date: "Q2 2024", value: 1.72 },
        { date: "Q3 2024", value: 1.75 },
        { date: "Q4 2024", value: 1.78 },
        { date: "Q1 2025", value: 1.72 },
        { date: "Q2 2025", value: 1.75 },
        { date: "Q3 2025", value: 1.79 },
        { date: "Q4 2025", value: 1.82 },
      ],
      "10Y": [
        { date: "2016 H1", value: 0.98 },
        { date: "2016 H2", value: 1.02 },
        { date: "2017 H1", value: 1.08 },
        { date: "2017 H2", value: 1.12 },
        { date: "2018 H1", value: 1.18 },
        { date: "2018 H2", value: 1.22 },
        { date: "2019 H1", value: 1.25 },
        { date: "2019 H2", value: 1.28 },
        { date: "2020 H1", value: 1.22 },
        { date: "2020 H2", value: 1.35 },
        { date: "2021 H1", value: 1.48 },
        { date: "2021 H2", value: 1.55 },
        { date: "2022 H1", value: 1.68 },
        { date: "2022 H2", value: 1.68 },
        { date: "2023 H1", value: 1.62 },
        { date: "2023 H2", value: 1.68 },
        { date: "2024 H1", value: 1.72 },
        { date: "2024 H2", value: 1.76 },
        { date: "2025 H1", value: 1.75 },
        { date: "2025 H2", value: 1.82 },
      ],
      "Max": [
        { date: "2000", value: 0.42 },
        { date: "2002", value: 0.48 },
        { date: "2004", value: 0.62 },
        { date: "2006", value: 0.72 },
        { date: "2008", value: 0.52 },
        { date: "2010", value: 0.38 },
        { date: "2012", value: 0.45 },
        { date: "2014", value: 0.58 },
        { date: "2016", value: 1.00 },
        { date: "2018", value: 1.20 },
        { date: "2020", value: 1.30 },
        { date: "2022", value: 1.68 },
        { date: "2024", value: 1.75 },
        { date: "2026", value: 1.82 },
      ],
    },
  },
  {
    name: "Pending Sales",
    value: "77.8",
    change: "+1.2%",
    trend: "up",
    icon: "📝",
    unit: "",
    color: "#6366f1",
    description: "The Pending Home Sales Index measures housing contract activity based on signed real estate contracts. It's a leading indicator of housing activity. Source: FRED PHSI series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 72.5 },
        { date: "Apr 2025", value: 74.2 },
        { date: "May 2025", value: 76.8 },
        { date: "Jun 2025", value: 78.2 },
        { date: "Jul 2025", value: 77.5 },
        { date: "Aug 2025", value: 76.2 },
        { date: "Sep 2025", value: 75.8 },
        { date: "Oct 2025", value: 74.5 },
        { date: "Nov 2025", value: 75.2 },
        { date: "Dec 2025", value: 76.8 },
        { date: "Jan 2026", value: 76.9 },
        { date: "Feb 2026", value: 77.8 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 108.5 },
        { date: "Q2 2021", value: 112.2 },
        { date: "Q3 2021", value: 115.8 },
        { date: "Q4 2021", value: 118.2 },
        { date: "Q1 2022", value: 105.5 },
        { date: "Q2 2022", value: 92.2 },
        { date: "Q3 2022", value: 82.8 },
        { date: "Q4 2022", value: 75.5 },
        { date: "Q1 2023", value: 78.2 },
        { date: "Q2 2023", value: 82.5 },
        { date: "Q3 2023", value: 78.8 },
        { date: "Q4 2023", value: 72.5 },
        { date: "Q1 2024", value: 75.8 },
        { date: "Q2 2024", value: 72.2 },
        { date: "Q3 2024", value: 70.5 },
        { date: "Q4 2024", value: 74.8 },
        { date: "Q1 2025", value: 75.2 },
        { date: "Q2 2025", value: 77.5 },
        { date: "Q3 2025", value: 75.8 },
        { date: "Q4 2025", value: 77.8 },
      ],
      "10Y": [
        { date: "2016 H1", value: 108.2 },
        { date: "2016 H2", value: 105.5 },
        { date: "2017 H1", value: 108.8 },
        { date: "2017 H2", value: 105.2 },
        { date: "2018 H1", value: 102.5 },
        { date: "2018 H2", value: 98.8 },
        { date: "2019 H1", value: 102.2 },
        { date: "2019 H2", value: 105.5 },
        { date: "2020 H1", value: 92.8 },
        { date: "2020 H2", value: 118.2 },
        { date: "2021 H1", value: 112.5 },
        { date: "2021 H2", value: 115.8 },
        { date: "2022 H1", value: 98.2 },
        { date: "2022 H2", value: 78.5 },
        { date: "2023 H1", value: 80.2 },
        { date: "2023 H2", value: 75.5 },
        { date: "2024 H1", value: 74.2 },
        { date: "2024 H2", value: 72.8 },
        { date: "2025 H1", value: 76.2 },
        { date: "2025 H2", value: 77.8 },
      ],
      "Max": [
        { date: "2000", value: 95.2 },
        { date: "2002", value: 102.5 },
        { date: "2004", value: 118.8 },
        { date: "2006", value: 98.2 },
        { date: "2008", value: 72.5 },
        { date: "2010", value: 82.8 },
        { date: "2012", value: 95.2 },
        { date: "2014", value: 102.5 },
        { date: "2016", value: 108.2 },
        { date: "2018", value: 100.5 },
        { date: "2020", value: 105.8 },
        { date: "2022", value: 88.2 },
        { date: "2024", value: 73.5 },
        { date: "2026", value: 77.8 },
      ],
    },
  },
  {
    name: "Home Equity",
    value: "$32.6T",
    change: "+5.8%",
    trend: "up",
    icon: "💰",
    unit: "$",
    color: "#22c55e",
    description: "Total home equity held by U.S. homeowners, representing the difference between home values and mortgage debt. Source: FRED OEHRENWBSHNO series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 29.2 },
        { date: "Apr 2025", value: 29.8 },
        { date: "May 2025", value: 30.2 },
        { date: "Jun 2025", value: 30.8 },
        { date: "Jul 2025", value: 31.2 },
        { date: "Aug 2025", value: 31.5 },
        { date: "Sep 2025", value: 31.8 },
        { date: "Oct 2025", value: 32.0 },
        { date: "Nov 2025", value: 32.2 },
        { date: "Dec 2025", value: 32.0 },
        { date: "Jan 2026", value: 32.2 },
        { date: "Feb 2026", value: 32.6 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 21.5 },
        { date: "Q2 2021", value: 23.2 },
        { date: "Q3 2021", value: 24.8 },
        { date: "Q4 2021", value: 26.2 },
        { date: "Q1 2022", value: 27.5 },
        { date: "Q2 2022", value: 29.2 },
        { date: "Q3 2022", value: 29.8 },
        { date: "Q4 2022", value: 28.5 },
        { date: "Q1 2023", value: 27.8 },
        { date: "Q2 2023", value: 28.2 },
        { date: "Q3 2023", value: 28.8 },
        { date: "Q4 2023", value: 29.2 },
        { date: "Q1 2024", value: 29.8 },
        { date: "Q2 2024", value: 30.2 },
        { date: "Q3 2024", value: 30.8 },
        { date: "Q4 2024", value: 31.2 },
        { date: "Q1 2025", value: 30.5 },
        { date: "Q2 2025", value: 31.2 },
        { date: "Q3 2025", value: 32.0 },
        { date: "Q4 2025", value: 32.6 },
      ],
      "10Y": [
        { date: "2016 H1", value: 12.8 },
        { date: "2016 H2", value: 13.2 },
        { date: "2017 H1", value: 13.8 },
        { date: "2017 H2", value: 14.5 },
        { date: "2018 H1", value: 15.2 },
        { date: "2018 H2", value: 15.8 },
        { date: "2019 H1", value: 16.2 },
        { date: "2019 H2", value: 16.8 },
        { date: "2020 H1", value: 17.2 },
        { date: "2020 H2", value: 19.5 },
        { date: "2021 H1", value: 22.8 },
        { date: "2021 H2", value: 25.5 },
        { date: "2022 H1", value: 28.8 },
        { date: "2022 H2", value: 29.2 },
        { date: "2023 H1", value: 28.2 },
        { date: "2023 H2", value: 29.0 },
        { date: "2024 H1", value: 30.2 },
        { date: "2024 H2", value: 31.0 },
        { date: "2025 H1", value: 31.2 },
        { date: "2025 H2", value: 32.6 },
      ],
      "Max": [
        { date: "2000", value: 5.2 },
        { date: "2002", value: 6.8 },
        { date: "2004", value: 9.2 },
        { date: "2006", value: 12.5 },
        { date: "2008", value: 8.2 },
        { date: "2010", value: 6.5 },
        { date: "2012", value: 7.8 },
        { date: "2014", value: 10.2 },
        { date: "2016", value: 13.0 },
        { date: "2018", value: 15.8 },
        { date: "2020", value: 18.5 },
        { date: "2022", value: 29.0 },
        { date: "2024", value: 30.8 },
        { date: "2026", value: 32.6 },
      ],
    },
  },
];

export default function MetricsTable() {
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);

  return (
    <>
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Top Metrics</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-indigo-500/10">
              <th className="text-left text-xs uppercase text-slate-500 pb-3">
                Metric
              </th>
              <th className="text-left text-xs uppercase text-slate-500 pb-3">
                Value
              </th>
              <th className="text-left text-xs uppercase text-slate-500 pb-3">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr
                key={metric.name}
                onClick={() => setSelectedMetric(metric)}
                className="border-b border-indigo-500/5 hover:bg-indigo-500/10 cursor-pointer transition-colors"
              >
                <td className="py-4 font-medium">{metric.name}</td>
                <td className="py-4 text-slate-300">{metric.value}</td>
                <td className="py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                      metric.trend === "up"
                        ? "bg-green-500/15 text-green-400"
                        : metric.trend === "down"
                        ? "bg-red-500/15 text-red-400"
                        : "bg-slate-500/15 text-slate-400"
                    }`}
                  >
                    {metric.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMetric && (
        <KpiModal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={selectedMetric.name}
          currentValue={selectedMetric.value}
          change={selectedMetric.change}
          trend={selectedMetric.trend as "up" | "down"}
          icon={selectedMetric.icon}
          historicalData={selectedMetric.historicalData}
          unit={selectedMetric.unit}
          description={selectedMetric.description}
          color={selectedMetric.color}
        />
      )}
    </>
  );
}
