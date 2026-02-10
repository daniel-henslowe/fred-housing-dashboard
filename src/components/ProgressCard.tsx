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

interface ProgressItem {
  label: string;
  value: string;
  percent: number;
  color: "blue" | "green" | "purple" | "orange";
  icon: string;
  colorHex: string;
  description: string;
  trend: "up" | "down" | "neutral";
  change: string;
  historicalData: HistoricalDataSets;
}

const items: ProgressItem[] = [
  {
    label: "Homeownership Rate",
    value: "65.8%",
    percent: 65.8,
    color: "blue",
    icon: "🏠",
    colorHex: "#3b82f6",
    description: "The percentage of homes that are occupied by their owners. A key indicator of housing market stability and economic health. Source: FRED RHORUSQ156N series.",
    trend: "up",
    change: "+0.3%",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 65.2 },
        { date: "Apr 2025", value: 65.3 },
        { date: "May 2025", value: 65.4 },
        { date: "Jun 2025", value: 65.5 },
        { date: "Jul 2025", value: 65.5 },
        { date: "Aug 2025", value: 65.6 },
        { date: "Sep 2025", value: 65.6 },
        { date: "Oct 2025", value: 65.7 },
        { date: "Nov 2025", value: 65.7 },
        { date: "Dec 2025", value: 65.8 },
        { date: "Jan 2026", value: 65.8 },
        { date: "Feb 2026", value: 65.8 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 65.6 },
        { date: "Q2 2021", value: 65.4 },
        { date: "Q3 2021", value: 65.4 },
        { date: "Q4 2021", value: 65.5 },
        { date: "Q1 2022", value: 65.4 },
        { date: "Q2 2022", value: 65.8 },
        { date: "Q3 2022", value: 66.0 },
        { date: "Q4 2022", value: 65.9 },
        { date: "Q1 2023", value: 66.0 },
        { date: "Q2 2023", value: 65.9 },
        { date: "Q3 2023", value: 66.0 },
        { date: "Q4 2023", value: 65.7 },
        { date: "Q1 2024", value: 65.6 },
        { date: "Q2 2024", value: 65.6 },
        { date: "Q3 2024", value: 65.5 },
        { date: "Q4 2024", value: 65.7 },
        { date: "Q1 2025", value: 65.5 },
        { date: "Q2 2025", value: 65.6 },
        { date: "Q3 2025", value: 65.7 },
        { date: "Q4 2025", value: 65.8 },
      ],
      "10Y": [
        { date: "2016 H1", value: 63.5 },
        { date: "2016 H2", value: 63.7 },
        { date: "2017 H1", value: 63.6 },
        { date: "2017 H2", value: 64.2 },
        { date: "2018 H1", value: 64.3 },
        { date: "2018 H2", value: 64.4 },
        { date: "2019 H1", value: 64.1 },
        { date: "2019 H2", value: 64.8 },
        { date: "2020 H1", value: 65.3 },
        { date: "2020 H2", value: 65.8 },
        { date: "2021 H1", value: 65.4 },
        { date: "2021 H2", value: 65.5 },
        { date: "2022 H1", value: 65.8 },
        { date: "2022 H2", value: 66.0 },
        { date: "2023 H1", value: 66.0 },
        { date: "2023 H2", value: 65.7 },
        { date: "2024 H1", value: 65.6 },
        { date: "2024 H2", value: 65.6 },
        { date: "2025 H1", value: 65.6 },
        { date: "2025 H2", value: 65.8 },
      ],
      "Max": [
        { date: "2000", value: 67.4 },
        { date: "2002", value: 67.9 },
        { date: "2004", value: 69.0 },
        { date: "2006", value: 68.8 },
        { date: "2008", value: 67.8 },
        { date: "2010", value: 66.9 },
        { date: "2012", value: 65.4 },
        { date: "2014", value: 64.5 },
        { date: "2016", value: 63.7 },
        { date: "2018", value: 64.4 },
        { date: "2020", value: 65.8 },
        { date: "2022", value: 65.9 },
        { date: "2024", value: 65.6 },
        { date: "2026", value: 65.8 },
      ],
    },
  },
  {
    label: "Vacancy Rate",
    value: "6.2%",
    percent: 6.2,
    color: "green",
    icon: "🏚️",
    colorHex: "#22c55e",
    description: "The percentage of all available housing units that are vacant or unoccupied. Lower rates indicate tighter housing markets. Source: FRED RHVRUSQ156N series.",
    trend: "down",
    change: "-0.2%",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 6.5 },
        { date: "Apr 2025", value: 6.4 },
        { date: "May 2025", value: 6.4 },
        { date: "Jun 2025", value: 6.3 },
        { date: "Jul 2025", value: 6.3 },
        { date: "Aug 2025", value: 6.3 },
        { date: "Sep 2025", value: 6.2 },
        { date: "Oct 2025", value: 6.2 },
        { date: "Nov 2025", value: 6.2 },
        { date: "Dec 2025", value: 6.2 },
        { date: "Jan 2026", value: 6.2 },
        { date: "Feb 2026", value: 6.2 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 6.8 },
        { date: "Q2 2021", value: 6.5 },
        { date: "Q3 2021", value: 5.8 },
        { date: "Q4 2021", value: 5.6 },
        { date: "Q1 2022", value: 5.8 },
        { date: "Q2 2022", value: 5.6 },
        { date: "Q3 2022", value: 5.8 },
        { date: "Q4 2022", value: 5.8 },
        { date: "Q1 2023", value: 5.8 },
        { date: "Q2 2023", value: 6.3 },
        { date: "Q3 2023", value: 6.4 },
        { date: "Q4 2023", value: 6.6 },
        { date: "Q1 2024", value: 6.6 },
        { date: "Q2 2024", value: 6.6 },
        { date: "Q3 2024", value: 6.8 },
        { date: "Q4 2024", value: 6.9 },
        { date: "Q1 2025", value: 6.5 },
        { date: "Q2 2025", value: 6.4 },
        { date: "Q3 2025", value: 6.2 },
        { date: "Q4 2025", value: 6.2 },
      ],
      "10Y": [
        { date: "2016 H1", value: 7.0 },
        { date: "2016 H2", value: 6.9 },
        { date: "2017 H1", value: 7.0 },
        { date: "2017 H2", value: 6.8 },
        { date: "2018 H1", value: 6.8 },
        { date: "2018 H2", value: 6.6 },
        { date: "2019 H1", value: 6.8 },
        { date: "2019 H2", value: 6.4 },
        { date: "2020 H1", value: 6.6 },
        { date: "2020 H2", value: 6.5 },
        { date: "2021 H1", value: 6.5 },
        { date: "2021 H2", value: 5.6 },
        { date: "2022 H1", value: 5.6 },
        { date: "2022 H2", value: 5.8 },
        { date: "2023 H1", value: 6.1 },
        { date: "2023 H2", value: 6.6 },
        { date: "2024 H1", value: 6.6 },
        { date: "2024 H2", value: 6.8 },
        { date: "2025 H1", value: 6.4 },
        { date: "2025 H2", value: 6.2 },
      ],
      "Max": [
        { date: "2000", value: 8.0 },
        { date: "2002", value: 8.8 },
        { date: "2004", value: 9.8 },
        { date: "2006", value: 9.7 },
        { date: "2008", value: 10.1 },
        { date: "2010", value: 10.6 },
        { date: "2012", value: 8.7 },
        { date: "2014", value: 7.6 },
        { date: "2016", value: 6.9 },
        { date: "2018", value: 6.7 },
        { date: "2020", value: 6.5 },
        { date: "2022", value: 5.8 },
        { date: "2024", value: 6.7 },
        { date: "2026", value: 6.2 },
      ],
    },
  },
  {
    label: "Delinquency Rate",
    value: "2.1%",
    percent: 21,
    color: "purple",
    icon: "⚠️",
    colorHex: "#8b5cf6",
    description: "The percentage of mortgage loans that are 30 days or more past due. A key indicator of financial stress in the housing market. Source: FRED DRSFRMACBS series.",
    trend: "down",
    change: "-0.15%",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 2.35 },
        { date: "Apr 2025", value: 2.32 },
        { date: "May 2025", value: 2.28 },
        { date: "Jun 2025", value: 2.25 },
        { date: "Jul 2025", value: 2.22 },
        { date: "Aug 2025", value: 2.20 },
        { date: "Sep 2025", value: 2.18 },
        { date: "Oct 2025", value: 2.15 },
        { date: "Nov 2025", value: 2.12 },
        { date: "Dec 2025", value: 2.12 },
        { date: "Jan 2026", value: 2.10 },
        { date: "Feb 2026", value: 2.10 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 6.38 },
        { date: "Q2 2021", value: 5.47 },
        { date: "Q3 2021", value: 4.88 },
        { date: "Q4 2021", value: 4.65 },
        { date: "Q1 2022", value: 3.76 },
        { date: "Q2 2022", value: 3.50 },
        { date: "Q3 2022", value: 3.45 },
        { date: "Q4 2022", value: 3.38 },
        { date: "Q1 2023", value: 3.56 },
        { date: "Q2 2023", value: 3.37 },
        { date: "Q3 2023", value: 3.62 },
        { date: "Q4 2023", value: 3.88 },
        { date: "Q1 2024", value: 3.97 },
        { date: "Q2 2024", value: 3.66 },
        { date: "Q3 2024", value: 3.30 },
        { date: "Q4 2024", value: 2.85 },
        { date: "Q1 2025", value: 2.55 },
        { date: "Q2 2025", value: 2.35 },
        { date: "Q3 2025", value: 2.18 },
        { date: "Q4 2025", value: 2.10 },
      ],
      "10Y": [
        { date: "2016 H1", value: 4.77 },
        { date: "2016 H2", value: 4.52 },
        { date: "2017 H1", value: 4.24 },
        { date: "2017 H2", value: 4.88 },
        { date: "2018 H1", value: 3.82 },
        { date: "2018 H2", value: 3.88 },
        { date: "2019 H1", value: 3.77 },
        { date: "2019 H2", value: 3.65 },
        { date: "2020 H1", value: 4.36 },
        { date: "2020 H2", value: 6.65 },
        { date: "2021 H1", value: 5.92 },
        { date: "2021 H2", value: 4.65 },
        { date: "2022 H1", value: 3.62 },
        { date: "2022 H2", value: 3.42 },
        { date: "2023 H1", value: 3.45 },
        { date: "2023 H2", value: 3.75 },
        { date: "2024 H1", value: 3.82 },
        { date: "2024 H2", value: 3.08 },
        { date: "2025 H1", value: 2.45 },
        { date: "2025 H2", value: 2.10 },
      ],
      "Max": [
        { date: "2000", value: 4.55 },
        { date: "2002", value: 4.77 },
        { date: "2004", value: 4.44 },
        { date: "2006", value: 4.67 },
        { date: "2008", value: 7.88 },
        { date: "2010", value: 10.44 },
        { date: "2012", value: 7.40 },
        { date: "2014", value: 5.94 },
        { date: "2016", value: 4.52 },
        { date: "2018", value: 3.88 },
        { date: "2020", value: 5.52 },
        { date: "2022", value: 3.50 },
        { date: "2024", value: 3.45 },
        { date: "2026", value: 2.10 },
      ],
    },
  },
  {
    label: "Price-to-Rent Ratio",
    value: "78.4%",
    percent: 78.4,
    color: "orange",
    icon: "📊",
    colorHex: "#f97316",
    description: "Compares the cost of buying versus renting a home. Higher ratios suggest buying is relatively more expensive compared to renting. Source: Calculated from FRED housing and rental data.",
    trend: "up",
    change: "+2.1%",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 74.2 },
        { date: "Apr 2025", value: 74.8 },
        { date: "May 2025", value: 75.5 },
        { date: "Jun 2025", value: 76.2 },
        { date: "Jul 2025", value: 76.8 },
        { date: "Aug 2025", value: 77.2 },
        { date: "Sep 2025", value: 77.5 },
        { date: "Oct 2025", value: 77.8 },
        { date: "Nov 2025", value: 78.0 },
        { date: "Dec 2025", value: 78.2 },
        { date: "Jan 2026", value: 78.2 },
        { date: "Feb 2026", value: 78.4 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 58.2 },
        { date: "Q2 2021", value: 62.5 },
        { date: "Q3 2021", value: 65.8 },
        { date: "Q4 2021", value: 68.2 },
        { date: "Q1 2022", value: 72.5 },
        { date: "Q2 2022", value: 75.8 },
        { date: "Q3 2022", value: 76.2 },
        { date: "Q4 2022", value: 74.5 },
        { date: "Q1 2023", value: 72.8 },
        { date: "Q2 2023", value: 73.5 },
        { date: "Q3 2023", value: 74.2 },
        { date: "Q4 2023", value: 74.8 },
        { date: "Q1 2024", value: 75.2 },
        { date: "Q2 2024", value: 75.8 },
        { date: "Q3 2024", value: 76.5 },
        { date: "Q4 2024", value: 77.2 },
        { date: "Q1 2025", value: 76.2 },
        { date: "Q2 2025", value: 77.2 },
        { date: "Q3 2025", value: 77.8 },
        { date: "Q4 2025", value: 78.4 },
      ],
      "10Y": [
        { date: "2016 H1", value: 42.5 },
        { date: "2016 H2", value: 43.2 },
        { date: "2017 H1", value: 44.8 },
        { date: "2017 H2", value: 46.2 },
        { date: "2018 H1", value: 48.5 },
        { date: "2018 H2", value: 49.8 },
        { date: "2019 H1", value: 50.2 },
        { date: "2019 H2", value: 51.5 },
        { date: "2020 H1", value: 52.8 },
        { date: "2020 H2", value: 56.5 },
        { date: "2021 H1", value: 62.2 },
        { date: "2021 H2", value: 67.5 },
        { date: "2022 H1", value: 74.8 },
        { date: "2022 H2", value: 75.2 },
        { date: "2023 H1", value: 73.2 },
        { date: "2023 H2", value: 74.5 },
        { date: "2024 H1", value: 75.5 },
        { date: "2024 H2", value: 76.8 },
        { date: "2025 H1", value: 76.8 },
        { date: "2025 H2", value: 78.4 },
      ],
      "Max": [
        { date: "2000", value: 28.5 },
        { date: "2002", value: 32.2 },
        { date: "2004", value: 42.5 },
        { date: "2006", value: 55.8 },
        { date: "2008", value: 48.2 },
        { date: "2010", value: 35.5 },
        { date: "2012", value: 32.8 },
        { date: "2014", value: 38.2 },
        { date: "2016", value: 43.2 },
        { date: "2018", value: 49.5 },
        { date: "2020", value: 55.2 },
        { date: "2022", value: 75.0 },
        { date: "2024", value: 76.2 },
        { date: "2026", value: 78.4 },
      ],
    },
  },
];

const barColors = {
  blue: "from-blue-500 to-indigo-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-violet-500",
  orange: "from-orange-500 to-amber-400",
};

export default function ProgressCard() {
  const [selectedItem, setSelectedItem] = useState<ProgressItem | null>(null);

  return (
    <>
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6">Market Health Indicators</h3>
        <div className="space-y-5">
          {items.map((item) => (
            <div
              key={item.label}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer hover:bg-indigo-500/5 -mx-2 px-2 py-2 rounded-lg transition-colors"
            >
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-slate-300">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="h-2 bg-indigo-500/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${barColors[item.color]}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <KpiModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.label}
          currentValue={selectedItem.value}
          change={selectedItem.change}
          trend={selectedItem.trend}
          icon={selectedItem.icon}
          historicalData={selectedItem.historicalData}
          unit=""
          description={selectedItem.description}
          color={selectedItem.colorHex}
        />
      )}
    </>
  );
}
