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
} from "recharts";
import KpiModal from "./KpiModal";

interface RegionData {
  region: string;
  price: number;
  color: string;
  change: string;
  trend: "up" | "down";
  historicalData: {
    "1Y": { date: string; value: number }[];
    "5Y": { date: string; value: number }[];
    "10Y": { date: string; value: number }[];
    "Max": { date: string; value: number }[];
  };
}

const data: RegionData[] = [
  {
    region: "Northeast",
    price: 485,
    color: "#6366f1",
    change: "+4.2%",
    trend: "up",
    historicalData: {
      "1Y": [
        { date: "Mar 25", value: 458 }, { date: "Apr 25", value: 462 }, { date: "May 25", value: 468 },
        { date: "Jun 25", value: 471 }, { date: "Jul 25", value: 475 }, { date: "Aug 25", value: 478 },
        { date: "Sep 25", value: 476 }, { date: "Oct 25", value: 479 }, { date: "Nov 25", value: 481 },
        { date: "Dec 25", value: 480 }, { date: "Jan 26", value: 483 }, { date: "Feb 26", value: 485 },
      ],
      "5Y": [
        { date: "2021", value: 385 }, { date: "2022", value: 425 }, { date: "2023", value: 455 },
        { date: "2024", value: 468 }, { date: "2025", value: 478 }, { date: "2026", value: 485 },
      ],
      "10Y": [
        { date: "2016", value: 285 }, { date: "2017", value: 298 }, { date: "2018", value: 315 },
        { date: "2019", value: 335 }, { date: "2020", value: 358 }, { date: "2021", value: 385 },
        { date: "2022", value: 425 }, { date: "2023", value: 455 }, { date: "2024", value: 468 },
        { date: "2025", value: 478 }, { date: "2026", value: 485 },
      ],
      "Max": [
        { date: "2000", value: 165 }, { date: "2005", value: 245 }, { date: "2010", value: 225 },
        { date: "2015", value: 268 }, { date: "2020", value: 358 }, { date: "2026", value: 485 },
      ],
    },
  },
  {
    region: "Midwest",
    price: 312,
    color: "#22c55e",
    change: "+5.8%",
    trend: "up",
    historicalData: {
      "1Y": [
        { date: "Mar 25", value: 289 }, { date: "Apr 25", value: 292 }, { date: "May 25", value: 295 },
        { date: "Jun 25", value: 298 }, { date: "Jul 25", value: 301 }, { date: "Aug 25", value: 303 },
        { date: "Sep 25", value: 305 }, { date: "Oct 25", value: 307 }, { date: "Nov 25", value: 308 },
        { date: "Dec 25", value: 309 }, { date: "Jan 26", value: 311 }, { date: "Feb 26", value: 312 },
      ],
      "5Y": [
        { date: "2021", value: 245 }, { date: "2022", value: 268 }, { date: "2023", value: 285 },
        { date: "2024", value: 298 }, { date: "2025", value: 305 }, { date: "2026", value: 312 },
      ],
      "10Y": [
        { date: "2016", value: 175 }, { date: "2017", value: 185 }, { date: "2018", value: 195 },
        { date: "2019", value: 208 }, { date: "2020", value: 225 }, { date: "2021", value: 245 },
        { date: "2022", value: 268 }, { date: "2023", value: 285 }, { date: "2024", value: 298 },
        { date: "2025", value: 305 }, { date: "2026", value: 312 },
      ],
      "Max": [
        { date: "2000", value: 115 }, { date: "2005", value: 155 }, { date: "2010", value: 138 },
        { date: "2015", value: 165 }, { date: "2020", value: 225 }, { date: "2026", value: 312 },
      ],
    },
  },
  {
    region: "South",
    price: 378,
    color: "#f97316",
    change: "+6.5%",
    trend: "up",
    historicalData: {
      "1Y": [
        { date: "Mar 25", value: 348 }, { date: "Apr 25", value: 352 }, { date: "May 25", value: 356 },
        { date: "Jun 25", value: 360 }, { date: "Jul 25", value: 364 }, { date: "Aug 25", value: 367 },
        { date: "Sep 25", value: 369 }, { date: "Oct 25", value: 371 }, { date: "Nov 25", value: 374 },
        { date: "Dec 25", value: 375 }, { date: "Jan 26", value: 377 }, { date: "Feb 26", value: 378 },
      ],
      "5Y": [
        { date: "2021", value: 285 }, { date: "2022", value: 325 }, { date: "2023", value: 348 },
        { date: "2024", value: 362 }, { date: "2025", value: 371 }, { date: "2026", value: 378 },
      ],
      "10Y": [
        { date: "2016", value: 195 }, { date: "2017", value: 208 }, { date: "2018", value: 225 },
        { date: "2019", value: 242 }, { date: "2020", value: 265 }, { date: "2021", value: 285 },
        { date: "2022", value: 325 }, { date: "2023", value: 348 }, { date: "2024", value: 362 },
        { date: "2025", value: 371 }, { date: "2026", value: 378 },
      ],
      "Max": [
        { date: "2000", value: 125 }, { date: "2005", value: 175 }, { date: "2010", value: 155 },
        { date: "2015", value: 185 }, { date: "2020", value: 265 }, { date: "2026", value: 378 },
      ],
    },
  },
  {
    region: "West",
    price: 598,
    color: "#8b5cf6",
    change: "+3.2%",
    trend: "up",
    historicalData: {
      "1Y": [
        { date: "Mar 25", value: 572 }, { date: "Apr 25", value: 576 }, { date: "May 25", value: 580 },
        { date: "Jun 25", value: 583 }, { date: "Jul 25", value: 586 }, { date: "Aug 25", value: 588 },
        { date: "Sep 25", value: 590 }, { date: "Oct 25", value: 592 }, { date: "Nov 25", value: 594 },
        { date: "Dec 25", value: 595 }, { date: "Jan 26", value: 597 }, { date: "Feb 26", value: 598 },
      ],
      "5Y": [
        { date: "2021", value: 485 }, { date: "2022", value: 545 }, { date: "2023", value: 568 },
        { date: "2024", value: 582 }, { date: "2025", value: 592 }, { date: "2026", value: 598 },
      ],
      "10Y": [
        { date: "2016", value: 365 }, { date: "2017", value: 385 }, { date: "2018", value: 415 },
        { date: "2019", value: 438 }, { date: "2020", value: 465 }, { date: "2021", value: 485 },
        { date: "2022", value: 545 }, { date: "2023", value: 568 }, { date: "2024", value: 582 },
        { date: "2025", value: 592 }, { date: "2026", value: 598 },
      ],
      "Max": [
        { date: "2000", value: 225 }, { date: "2005", value: 385 }, { date: "2010", value: 325 },
        { date: "2015", value: 345 }, { date: "2020", value: 465 }, { date: "2026", value: 598 },
      ],
    },
  },
];

export default function RegionalChart() {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const handleBarClick = (regionData: RegionData) => {
    setSelectedRegion(regionData);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">Regional Distribution</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              formatter={(value) => [`$${value}K`, "Median Price"]}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="price" radius={[8, 8, 0, 0]} cursor="pointer">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity"
                  onClick={() => handleBarClick(entry)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {selectedRegion && (
        <KpiModal
          isOpen={!!selectedRegion}
          onClose={() => setSelectedRegion(null)}
          title={`${selectedRegion.region} Median Home Price`}
          currentValue={`$${selectedRegion.price}K`}
          change={selectedRegion.change}
          trend={selectedRegion.trend}
          icon="🏠"
          historicalData={selectedRegion.historicalData}
          unit="$"
          description={`Median home price for the ${selectedRegion.region} region of the United States. Data sourced from FRED.`}
          color={selectedRegion.color}
        />
      )}
    </div>
  );
}
