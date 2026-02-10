"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import KpiCard from "@/components/KpiCard";
import KpiModal from "@/components/KpiModal";
import PriceChart from "@/components/PriceChart";
import AffordabilityGauge from "@/components/AffordabilityGauge";
import MiniCard from "@/components/MiniCard";
import RegionalChart from "@/components/RegionalChart";
import ProgressCard from "@/components/ProgressCard";
import MetricsTable from "@/components/MetricsTable";

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

interface MetricDataItem {
  id: string;
  icon: string;
  iconBg?: "blue" | "green" | "purple" | "orange" | "cyan";
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  unit?: string;
  color: string;
  description: string;
  historicalData: HistoricalDataSets;
  // For mini cards
  sparklineData?: number[];
}

const kpiData: MetricDataItem[] = [
  {
    id: "median-price",
    icon: "🏠",
    iconBg: "blue",
    label: "Median Home Price",
    value: "$428,700",
    change: "+4.2% from last year",
    trend: "up",
    unit: "$",
    color: "#3b82f6",
    description: "The median sales price of houses sold in the United States. This metric represents the middle point of all home sales, where half of homes sold for more and half sold for less. Source: FRED MSPUS series.",
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
    id: "housing-starts",
    icon: "🏗️",
    iconBg: "green",
    label: "Housing Starts",
    value: "1.42M",
    change: "+2.8% MoM",
    trend: "up",
    unit: "",
    color: "#22c55e",
    description: "Housing starts measure the number of new residential construction projects that have begun during a given period. This is a key indicator of economic health and future housing supply. Source: FRED HOUST series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 1.32 },
        { date: "Apr 2025", value: 1.35 },
        { date: "May 2025", value: 1.38 },
        { date: "Jun 2025", value: 1.36 },
        { date: "Jul 2025", value: 1.39 },
        { date: "Aug 2025", value: 1.41 },
        { date: "Sep 2025", value: 1.40 },
        { date: "Oct 2025", value: 1.38 },
        { date: "Nov 2025", value: 1.36 },
        { date: "Dec 2025", value: 1.35 },
        { date: "Jan 2026", value: 1.38 },
        { date: "Feb 2026", value: 1.42 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 1.58 },
        { date: "Q2 2021", value: 1.62 },
        { date: "Q3 2021", value: 1.55 },
        { date: "Q4 2021", value: 1.68 },
        { date: "Q1 2022", value: 1.72 },
        { date: "Q2 2022", value: 1.55 },
        { date: "Q3 2022", value: 1.45 },
        { date: "Q4 2022", value: 1.38 },
        { date: "Q1 2023", value: 1.42 },
        { date: "Q2 2023", value: 1.45 },
        { date: "Q3 2023", value: 1.35 },
        { date: "Q4 2023", value: 1.48 },
        { date: "Q1 2024", value: 1.52 },
        { date: "Q2 2024", value: 1.35 },
        { date: "Q3 2024", value: 1.38 },
        { date: "Q4 2024", value: 1.32 },
        { date: "Q1 2025", value: 1.35 },
        { date: "Q2 2025", value: 1.38 },
        { date: "Q3 2025", value: 1.40 },
        { date: "Q4 2025", value: 1.42 },
      ],
      "10Y": [
        { date: "2016 H1", value: 1.15 },
        { date: "2016 H2", value: 1.18 },
        { date: "2017 H1", value: 1.22 },
        { date: "2017 H2", value: 1.28 },
        { date: "2018 H1", value: 1.32 },
        { date: "2018 H2", value: 1.25 },
        { date: "2019 H1", value: 1.28 },
        { date: "2019 H2", value: 1.35 },
        { date: "2020 H1", value: 1.18 },
        { date: "2020 H2", value: 1.52 },
        { date: "2021 H1", value: 1.62 },
        { date: "2021 H2", value: 1.58 },
        { date: "2022 H1", value: 1.65 },
        { date: "2022 H2", value: 1.42 },
        { date: "2023 H1", value: 1.45 },
        { date: "2023 H2", value: 1.42 },
        { date: "2024 H1", value: 1.45 },
        { date: "2024 H2", value: 1.35 },
        { date: "2025 H1", value: 1.38 },
        { date: "2025 H2", value: 1.42 },
      ],
      "Max": [
        { date: "2000", value: 1.57 },
        { date: "2002", value: 1.70 },
        { date: "2004", value: 1.95 },
        { date: "2006", value: 1.80 },
        { date: "2008", value: 0.90 },
        { date: "2010", value: 0.58 },
        { date: "2012", value: 0.78 },
        { date: "2014", value: 1.00 },
        { date: "2016", value: 1.17 },
        { date: "2018", value: 1.25 },
        { date: "2020", value: 1.38 },
        { date: "2022", value: 1.55 },
        { date: "2024", value: 1.38 },
        { date: "2026", value: 1.42 },
      ],
    },
  },
  {
    id: "building-permits",
    icon: "📋",
    iconBg: "purple",
    label: "Building Permits",
    value: "1.51M",
    change: "-1.3% MoM",
    trend: "down",
    unit: "",
    color: "#8b5cf6",
    description: "Building permits are authorizations granted by local governments for new construction. This leading indicator shows future construction activity and housing supply trends. Source: FRED PERMIT series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 1.48 },
        { date: "Apr 2025", value: 1.52 },
        { date: "May 2025", value: 1.55 },
        { date: "Jun 2025", value: 1.58 },
        { date: "Jul 2025", value: 1.56 },
        { date: "Aug 2025", value: 1.54 },
        { date: "Sep 2025", value: 1.52 },
        { date: "Oct 2025", value: 1.50 },
        { date: "Nov 2025", value: 1.53 },
        { date: "Dec 2025", value: 1.55 },
        { date: "Jan 2026", value: 1.53 },
        { date: "Feb 2026", value: 1.51 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 1.72 },
        { date: "Q2 2021", value: 1.68 },
        { date: "Q3 2021", value: 1.65 },
        { date: "Q4 2021", value: 1.78 },
        { date: "Q1 2022", value: 1.85 },
        { date: "Q2 2022", value: 1.68 },
        { date: "Q3 2022", value: 1.55 },
        { date: "Q4 2022", value: 1.48 },
        { date: "Q1 2023", value: 1.52 },
        { date: "Q2 2023", value: 1.55 },
        { date: "Q3 2023", value: 1.45 },
        { date: "Q4 2023", value: 1.58 },
        { date: "Q1 2024", value: 1.62 },
        { date: "Q2 2024", value: 1.48 },
        { date: "Q3 2024", value: 1.52 },
        { date: "Q4 2024", value: 1.45 },
        { date: "Q1 2025", value: 1.50 },
        { date: "Q2 2025", value: 1.55 },
        { date: "Q3 2025", value: 1.52 },
        { date: "Q4 2025", value: 1.51 },
      ],
      "10Y": [
        { date: "2016 H1", value: 1.18 },
        { date: "2016 H2", value: 1.22 },
        { date: "2017 H1", value: 1.28 },
        { date: "2017 H2", value: 1.32 },
        { date: "2018 H1", value: 1.35 },
        { date: "2018 H2", value: 1.28 },
        { date: "2019 H1", value: 1.32 },
        { date: "2019 H2", value: 1.38 },
        { date: "2020 H1", value: 1.22 },
        { date: "2020 H2", value: 1.58 },
        { date: "2021 H1", value: 1.72 },
        { date: "2021 H2", value: 1.68 },
        { date: "2022 H1", value: 1.78 },
        { date: "2022 H2", value: 1.52 },
        { date: "2023 H1", value: 1.55 },
        { date: "2023 H2", value: 1.52 },
        { date: "2024 H1", value: 1.55 },
        { date: "2024 H2", value: 1.48 },
        { date: "2025 H1", value: 1.52 },
        { date: "2025 H2", value: 1.51 },
      ],
      "Max": [
        { date: "2000", value: 1.60 },
        { date: "2002", value: 1.75 },
        { date: "2004", value: 2.05 },
        { date: "2006", value: 1.85 },
        { date: "2008", value: 0.88 },
        { date: "2010", value: 0.60 },
        { date: "2012", value: 0.82 },
        { date: "2014", value: 1.05 },
        { date: "2016", value: 1.20 },
        { date: "2018", value: 1.32 },
        { date: "2020", value: 1.45 },
        { date: "2022", value: 1.65 },
        { date: "2024", value: 1.52 },
        { date: "2026", value: 1.51 },
      ],
    },
  },
  {
    id: "mortgage-rate",
    icon: "📊",
    iconBg: "orange",
    label: "30-Yr Mortgage Rate",
    value: "6.42%",
    change: "-0.15 pts",
    trend: "down",
    unit: "",
    color: "#f97316",
    description: "The average 30-year fixed mortgage rate in the United States. This rate significantly impacts home affordability and buyer demand. Source: FRED MORTGAGE30US series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 6.85 },
        { date: "Apr 2025", value: 6.78 },
        { date: "May 2025", value: 6.72 },
        { date: "Jun 2025", value: 6.68 },
        { date: "Jul 2025", value: 6.75 },
        { date: "Aug 2025", value: 6.82 },
        { date: "Sep 2025", value: 6.70 },
        { date: "Oct 2025", value: 6.58 },
        { date: "Nov 2025", value: 6.52 },
        { date: "Dec 2025", value: 6.48 },
        { date: "Jan 2026", value: 6.57 },
        { date: "Feb 2026", value: 6.42 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 2.95 },
        { date: "Q2 2021", value: 3.02 },
        { date: "Q3 2021", value: 2.88 },
        { date: "Q4 2021", value: 3.12 },
        { date: "Q1 2022", value: 3.85 },
        { date: "Q2 2022", value: 5.52 },
        { date: "Q3 2022", value: 5.85 },
        { date: "Q4 2022", value: 6.82 },
        { date: "Q1 2023", value: 6.48 },
        { date: "Q2 2023", value: 6.72 },
        { date: "Q3 2023", value: 7.12 },
        { date: "Q4 2023", value: 7.48 },
        { date: "Q1 2024", value: 6.92 },
        { date: "Q2 2024", value: 7.05 },
        { date: "Q3 2024", value: 6.58 },
        { date: "Q4 2024", value: 6.72 },
        { date: "Q1 2025", value: 6.85 },
        { date: "Q2 2025", value: 6.72 },
        { date: "Q3 2025", value: 6.58 },
        { date: "Q4 2025", value: 6.42 },
      ],
      "10Y": [
        { date: "2016 H1", value: 3.68 },
        { date: "2016 H2", value: 3.55 },
        { date: "2017 H1", value: 4.12 },
        { date: "2017 H2", value: 3.92 },
        { date: "2018 H1", value: 4.55 },
        { date: "2018 H2", value: 4.82 },
        { date: "2019 H1", value: 4.28 },
        { date: "2019 H2", value: 3.72 },
        { date: "2020 H1", value: 3.48 },
        { date: "2020 H2", value: 2.85 },
        { date: "2021 H1", value: 2.98 },
        { date: "2021 H2", value: 3.05 },
        { date: "2022 H1", value: 4.72 },
        { date: "2022 H2", value: 6.52 },
        { date: "2023 H1", value: 6.58 },
        { date: "2023 H2", value: 7.32 },
        { date: "2024 H1", value: 6.98 },
        { date: "2024 H2", value: 6.65 },
        { date: "2025 H1", value: 6.78 },
        { date: "2025 H2", value: 6.42 },
      ],
      "Max": [
        { date: "2000", value: 8.05 },
        { date: "2002", value: 6.55 },
        { date: "2004", value: 5.82 },
        { date: "2006", value: 6.42 },
        { date: "2008", value: 6.05 },
        { date: "2010", value: 4.72 },
        { date: "2012", value: 3.65 },
        { date: "2014", value: 4.18 },
        { date: "2016", value: 3.65 },
        { date: "2018", value: 4.55 },
        { date: "2020", value: 3.12 },
        { date: "2022", value: 5.35 },
        { date: "2024", value: 6.85 },
        { date: "2026", value: 6.42 },
      ],
    },
  },
  {
    id: "case-shiller",
    icon: "📈",
    iconBg: "cyan",
    label: "Case-Shiller Index",
    value: "318.4",
    change: "+5.1% YoY",
    trend: "up",
    unit: "",
    color: "#06b6d4",
    description: "The S&P CoreLogic Case-Shiller U.S. National Home Price Index measures changes in the value of residential real estate nationally. It's the leading measure for U.S. residential real estate prices. Source: FRED CSUSHPINSA series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 290.2 },
        { date: "Apr 2025", value: 295.4 },
        { date: "May 2025", value: 300.1 },
        { date: "Jun 2025", value: 305.8 },
        { date: "Jul 2025", value: 308.2 },
        { date: "Aug 2025", value: 312.5 },
        { date: "Sep 2025", value: 315.1 },
        { date: "Oct 2025", value: 318.8 },
        { date: "Nov 2025", value: 320.2 },
        { date: "Dec 2025", value: 318.5 },
        { date: "Jan 2026", value: 316.8 },
        { date: "Feb 2026", value: 318.4 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 215.2 },
        { date: "Q2 2021", value: 228.5 },
        { date: "Q3 2021", value: 242.8 },
        { date: "Q4 2021", value: 255.2 },
        { date: "Q1 2022", value: 268.5 },
        { date: "Q2 2022", value: 282.8 },
        { date: "Q3 2022", value: 288.2 },
        { date: "Q4 2022", value: 280.5 },
        { date: "Q1 2023", value: 275.2 },
        { date: "Q2 2023", value: 278.8 },
        { date: "Q3 2023", value: 285.2 },
        { date: "Q4 2023", value: 288.5 },
        { date: "Q1 2024", value: 292.8 },
        { date: "Q2 2024", value: 298.2 },
        { date: "Q3 2024", value: 305.5 },
        { date: "Q4 2024", value: 310.8 },
        { date: "Q1 2025", value: 302.5 },
        { date: "Q2 2025", value: 308.2 },
        { date: "Q3 2025", value: 315.8 },
        { date: "Q4 2025", value: 318.4 },
      ],
      "10Y": [
        { date: "2016 H1", value: 165.2 },
        { date: "2016 H2", value: 168.5 },
        { date: "2017 H1", value: 175.2 },
        { date: "2017 H2", value: 182.8 },
        { date: "2018 H1", value: 192.5 },
        { date: "2018 H2", value: 198.2 },
        { date: "2019 H1", value: 202.5 },
        { date: "2019 H2", value: 208.8 },
        { date: "2020 H1", value: 212.2 },
        { date: "2020 H2", value: 225.5 },
        { date: "2021 H1", value: 242.8 },
        { date: "2021 H2", value: 258.2 },
        { date: "2022 H1", value: 278.5 },
        { date: "2022 H2", value: 282.2 },
        { date: "2023 H1", value: 278.5 },
        { date: "2023 H2", value: 288.2 },
        { date: "2024 H1", value: 298.5 },
        { date: "2024 H2", value: 308.2 },
        { date: "2025 H1", value: 310.5 },
        { date: "2025 H2", value: 318.4 },
      ],
      "Max": [
        { date: "2000", value: 100.0 },
        { date: "2002", value: 115.2 },
        { date: "2004", value: 142.5 },
        { date: "2006", value: 185.2 },
        { date: "2008", value: 162.5 },
        { date: "2010", value: 128.8 },
        { date: "2012", value: 125.2 },
        { date: "2014", value: 148.5 },
        { date: "2016", value: 168.2 },
        { date: "2018", value: 198.5 },
        { date: "2020", value: 218.8 },
        { date: "2022", value: 282.5 },
        { date: "2024", value: 305.8 },
        { date: "2026", value: 318.4 },
      ],
    },
  },
];

const miniCardData: MetricDataItem[] = [
  {
    id: "new-home-sales",
    icon: "🏡",
    label: "New Home Sales",
    value: "682K",
    change: "+3.2%",
    trend: "up",
    unit: "",
    color: "#22c55e",
    sparklineData: [620, 635, 650, 648, 660, 670, 665, 675, 680, 682],
    description: "New home sales measure the number of newly constructed homes sold during a period. This is a key indicator of housing demand and builder confidence. Source: FRED HSN1F series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 620 },
        { date: "Apr 2025", value: 635 },
        { date: "May 2025", value: 650 },
        { date: "Jun 2025", value: 648 },
        { date: "Jul 2025", value: 660 },
        { date: "Aug 2025", value: 670 },
        { date: "Sep 2025", value: 665 },
        { date: "Oct 2025", value: 675 },
        { date: "Nov 2025", value: 680 },
        { date: "Dec 2025", value: 678 },
        { date: "Jan 2026", value: 680 },
        { date: "Feb 2026", value: 682 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 985 },
        { date: "Q2 2021", value: 775 },
        { date: "Q3 2021", value: 745 },
        { date: "Q4 2021", value: 825 },
        { date: "Q1 2022", value: 795 },
        { date: "Q2 2022", value: 685 },
        { date: "Q3 2022", value: 605 },
        { date: "Q4 2022", value: 625 },
        { date: "Q1 2023", value: 640 },
        { date: "Q2 2023", value: 715 },
        { date: "Q3 2023", value: 675 },
        { date: "Q4 2023", value: 665 },
        { date: "Q1 2024", value: 685 },
        { date: "Q2 2024", value: 738 },
        { date: "Q3 2024", value: 695 },
        { date: "Q4 2024", value: 665 },
        { date: "Q1 2025", value: 645 },
        { date: "Q2 2025", value: 660 },
        { date: "Q3 2025", value: 675 },
        { date: "Q4 2025", value: 682 },
      ],
      "10Y": [
        { date: "2016 H1", value: 548 },
        { date: "2016 H2", value: 565 },
        { date: "2017 H1", value: 595 },
        { date: "2017 H2", value: 625 },
        { date: "2018 H1", value: 658 },
        { date: "2018 H2", value: 615 },
        { date: "2019 H1", value: 685 },
        { date: "2019 H2", value: 725 },
        { date: "2020 H1", value: 685 },
        { date: "2020 H2", value: 945 },
        { date: "2021 H1", value: 875 },
        { date: "2021 H2", value: 785 },
        { date: "2022 H1", value: 735 },
        { date: "2022 H2", value: 615 },
        { date: "2023 H1", value: 678 },
        { date: "2023 H2", value: 670 },
        { date: "2024 H1", value: 712 },
        { date: "2024 H2", value: 680 },
        { date: "2025 H1", value: 660 },
        { date: "2025 H2", value: 682 },
      ],
      "Max": [
        { date: "2000", value: 875 },
        { date: "2002", value: 975 },
        { date: "2004", value: 1205 },
        { date: "2006", value: 1048 },
        { date: "2008", value: 485 },
        { date: "2010", value: 322 },
        { date: "2012", value: 368 },
        { date: "2014", value: 435 },
        { date: "2016", value: 558 },
        { date: "2018", value: 635 },
        { date: "2020", value: 825 },
        { date: "2022", value: 678 },
        { date: "2024", value: 695 },
        { date: "2026", value: 682 },
      ],
    },
  },
  {
    id: "existing-home-sales",
    icon: "🏠",
    label: "Existing Home Sales",
    value: "4.09M",
    change: "-1.8%",
    trend: "down",
    unit: "",
    color: "#ef4444",
    sparklineData: [4.2, 4.15, 4.1, 4.05, 4.08, 4.12, 4.1, 4.08, 4.05, 4.09],
    description: "Existing home sales measure the number of previously owned homes sold. This represents the bulk of the housing market and indicates overall market health. Source: FRED EXHOSLUSM495S series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 4.20 },
        { date: "Apr 2025", value: 4.15 },
        { date: "May 2025", value: 4.10 },
        { date: "Jun 2025", value: 4.05 },
        { date: "Jul 2025", value: 4.08 },
        { date: "Aug 2025", value: 4.12 },
        { date: "Sep 2025", value: 4.10 },
        { date: "Oct 2025", value: 4.08 },
        { date: "Nov 2025", value: 4.05 },
        { date: "Dec 2025", value: 4.02 },
        { date: "Jan 2026", value: 4.05 },
        { date: "Feb 2026", value: 4.09 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 6.02 },
        { date: "Q2 2021", value: 5.85 },
        { date: "Q3 2021", value: 5.92 },
        { date: "Q4 2021", value: 6.12 },
        { date: "Q1 2022", value: 5.78 },
        { date: "Q2 2022", value: 5.12 },
        { date: "Q3 2022", value: 4.72 },
        { date: "Q4 2022", value: 4.02 },
        { date: "Q1 2023", value: 4.12 },
        { date: "Q2 2023", value: 4.28 },
        { date: "Q3 2023", value: 4.05 },
        { date: "Q4 2023", value: 3.82 },
        { date: "Q1 2024", value: 4.05 },
        { date: "Q2 2024", value: 3.98 },
        { date: "Q3 2024", value: 3.88 },
        { date: "Q4 2024", value: 4.02 },
        { date: "Q1 2025", value: 4.15 },
        { date: "Q2 2025", value: 4.08 },
        { date: "Q3 2025", value: 4.05 },
        { date: "Q4 2025", value: 4.09 },
      ],
      "10Y": [
        { date: "2016 H1", value: 5.42 },
        { date: "2016 H2", value: 5.52 },
        { date: "2017 H1", value: 5.58 },
        { date: "2017 H2", value: 5.48 },
        { date: "2018 H1", value: 5.52 },
        { date: "2018 H2", value: 5.22 },
        { date: "2019 H1", value: 5.28 },
        { date: "2019 H2", value: 5.42 },
        { date: "2020 H1", value: 4.75 },
        { date: "2020 H2", value: 5.85 },
        { date: "2021 H1", value: 5.95 },
        { date: "2021 H2", value: 6.05 },
        { date: "2022 H1", value: 5.45 },
        { date: "2022 H2", value: 4.35 },
        { date: "2023 H1", value: 4.18 },
        { date: "2023 H2", value: 3.92 },
        { date: "2024 H1", value: 4.02 },
        { date: "2024 H2", value: 3.95 },
        { date: "2025 H1", value: 4.12 },
        { date: "2025 H2", value: 4.09 },
      ],
      "Max": [
        { date: "2000", value: 5.15 },
        { date: "2002", value: 5.58 },
        { date: "2004", value: 6.72 },
        { date: "2006", value: 6.48 },
        { date: "2008", value: 4.92 },
        { date: "2010", value: 4.18 },
        { date: "2012", value: 4.65 },
        { date: "2014", value: 4.92 },
        { date: "2016", value: 5.48 },
        { date: "2018", value: 5.35 },
        { date: "2020", value: 5.35 },
        { date: "2022", value: 5.02 },
        { date: "2024", value: 3.98 },
        { date: "2026", value: 4.09 },
      ],
    },
  },
  {
    id: "inventory-months",
    icon: "📦",
    label: "Inventory (Months)",
    value: "3.2",
    change: "+0.3",
    trend: "up",
    unit: "",
    color: "#6366f1",
    sparklineData: [2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.0, 3.1, 3.15, 3.2],
    description: "Months of supply represents how long it would take to sell all homes currently on the market at the current sales pace. A balanced market typically has 4-6 months of supply. Source: FRED MSACSR series.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 2.5 },
        { date: "Apr 2025", value: 2.6 },
        { date: "May 2025", value: 2.7 },
        { date: "Jun 2025", value: 2.8 },
        { date: "Jul 2025", value: 2.9 },
        { date: "Aug 2025", value: 3.0 },
        { date: "Sep 2025", value: 3.0 },
        { date: "Oct 2025", value: 3.1 },
        { date: "Nov 2025", value: 3.15 },
        { date: "Dec 2025", value: 3.18 },
        { date: "Jan 2026", value: 3.2 },
        { date: "Feb 2026", value: 3.2 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 1.9 },
        { date: "Q2 2021", value: 2.3 },
        { date: "Q3 2021", value: 2.4 },
        { date: "Q4 2021", value: 1.8 },
        { date: "Q1 2022", value: 1.6 },
        { date: "Q2 2022", value: 2.5 },
        { date: "Q3 2022", value: 3.2 },
        { date: "Q4 2022", value: 3.3 },
        { date: "Q1 2023", value: 2.6 },
        { date: "Q2 2023", value: 2.9 },
        { date: "Q3 2023", value: 3.4 },
        { date: "Q4 2023", value: 3.5 },
        { date: "Q1 2024", value: 2.9 },
        { date: "Q2 2024", value: 3.7 },
        { date: "Q3 2024", value: 4.2 },
        { date: "Q4 2024", value: 3.8 },
        { date: "Q1 2025", value: 2.7 },
        { date: "Q2 2025", value: 2.9 },
        { date: "Q3 2025", value: 3.1 },
        { date: "Q4 2025", value: 3.2 },
      ],
      "10Y": [
        { date: "2016 H1", value: 4.5 },
        { date: "2016 H2", value: 4.2 },
        { date: "2017 H1", value: 3.8 },
        { date: "2017 H2", value: 3.5 },
        { date: "2018 H1", value: 3.8 },
        { date: "2018 H2", value: 4.2 },
        { date: "2019 H1", value: 4.0 },
        { date: "2019 H2", value: 3.8 },
        { date: "2020 H1", value: 3.5 },
        { date: "2020 H2", value: 2.2 },
        { date: "2021 H1", value: 2.0 },
        { date: "2021 H2", value: 1.9 },
        { date: "2022 H1", value: 2.2 },
        { date: "2022 H2", value: 3.2 },
        { date: "2023 H1", value: 2.8 },
        { date: "2023 H2", value: 3.4 },
        { date: "2024 H1", value: 3.3 },
        { date: "2024 H2", value: 4.0 },
        { date: "2025 H1", value: 2.8 },
        { date: "2025 H2", value: 3.2 },
      ],
      "Max": [
        { date: "2000", value: 4.2 },
        { date: "2002", value: 4.5 },
        { date: "2004", value: 4.0 },
        { date: "2006", value: 6.5 },
        { date: "2008", value: 10.5 },
        { date: "2010", value: 9.5 },
        { date: "2012", value: 6.2 },
        { date: "2014", value: 5.2 },
        { date: "2016", value: 4.3 },
        { date: "2018", value: 4.0 },
        { date: "2020", value: 2.8 },
        { date: "2022", value: 2.7 },
        { date: "2024", value: 3.6 },
        { date: "2026", value: 3.2 },
      ],
    },
  },
  {
    id: "days-on-market",
    icon: "📅",
    label: "Days on Market",
    value: "28",
    change: "±0",
    trend: "neutral",
    unit: "",
    color: "#94a3b8",
    sparklineData: [30, 29, 28, 27, 26, 27, 28, 28, 28, 28],
    description: "Median days on market measures how long homes typically stay listed before selling. Lower numbers indicate a seller's market with high demand. Source: FRED regional data.",
    historicalData: {
      "1Y": [
        { date: "Mar 2025", value: 30 },
        { date: "Apr 2025", value: 29 },
        { date: "May 2025", value: 28 },
        { date: "Jun 2025", value: 27 },
        { date: "Jul 2025", value: 26 },
        { date: "Aug 2025", value: 27 },
        { date: "Sep 2025", value: 28 },
        { date: "Oct 2025", value: 28 },
        { date: "Nov 2025", value: 28 },
        { date: "Dec 2025", value: 29 },
        { date: "Jan 2026", value: 28 },
        { date: "Feb 2026", value: 28 },
      ],
      "5Y": [
        { date: "Q1 2021", value: 18 },
        { date: "Q2 2021", value: 15 },
        { date: "Q3 2021", value: 14 },
        { date: "Q4 2021", value: 16 },
        { date: "Q1 2022", value: 18 },
        { date: "Q2 2022", value: 16 },
        { date: "Q3 2022", value: 22 },
        { date: "Q4 2022", value: 32 },
        { date: "Q1 2023", value: 42 },
        { date: "Q2 2023", value: 28 },
        { date: "Q3 2023", value: 22 },
        { date: "Q4 2023", value: 35 },
        { date: "Q1 2024", value: 45 },
        { date: "Q2 2024", value: 32 },
        { date: "Q3 2024", value: 26 },
        { date: "Q4 2024", value: 34 },
        { date: "Q1 2025", value: 38 },
        { date: "Q2 2025", value: 28 },
        { date: "Q3 2025", value: 27 },
        { date: "Q4 2025", value: 28 },
      ],
      "10Y": [
        { date: "2016 H1", value: 45 },
        { date: "2016 H2", value: 42 },
        { date: "2017 H1", value: 38 },
        { date: "2017 H2", value: 35 },
        { date: "2018 H1", value: 32 },
        { date: "2018 H2", value: 35 },
        { date: "2019 H1", value: 32 },
        { date: "2019 H2", value: 30 },
        { date: "2020 H1", value: 28 },
        { date: "2020 H2", value: 18 },
        { date: "2021 H1", value: 15 },
        { date: "2021 H2", value: 16 },
        { date: "2022 H1", value: 18 },
        { date: "2022 H2", value: 28 },
        { date: "2023 H1", value: 35 },
        { date: "2023 H2", value: 28 },
        { date: "2024 H1", value: 38 },
        { date: "2024 H2", value: 30 },
        { date: "2025 H1", value: 32 },
        { date: "2025 H2", value: 28 },
      ],
      "Max": [
        { date: "2000", value: 55 },
        { date: "2002", value: 48 },
        { date: "2004", value: 38 },
        { date: "2006", value: 52 },
        { date: "2008", value: 85 },
        { date: "2010", value: 92 },
        { date: "2012", value: 72 },
        { date: "2014", value: 55 },
        { date: "2016", value: 42 },
        { date: "2018", value: 34 },
        { date: "2020", value: 22 },
        { date: "2022", value: 24 },
        { date: "2024", value: 34 },
        { date: "2026", value: 28 },
      ],
    },
  },
];

export default function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState<MetricDataItem | null>(null);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-[260px] p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Housing Market Dashboard</h1>
            <p className="text-slate-400 mt-1">
              FRED Regional Housing Data • Last updated: Feb 10, 2026
            </p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search metrics..."
              className="bg-slate-800/80 border border-indigo-500/20 rounded-xl px-4 py-3 w-[280px] text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/40"
            />
            <button className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm">
              Export Data
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-5 mb-7">
          {kpiData.map((kpi) => (
            <KpiCard
              key={kpi.id}
              icon={kpi.icon}
              iconBg={kpi.iconBg!}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              trend={kpi.trend as "up" | "down"}
              onClick={() => setSelectedMetric(kpi)}
            />
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-3 gap-6 mb-7">
          <div className="col-span-2">
            <PriceChart />
          </div>
          <AffordabilityGauge />
        </div>

        {/* Mini Cards */}
        <div className="grid grid-cols-4 gap-5 mb-7">
          {miniCardData.map((card) => (
            <MiniCard
              key={card.id}
              title={card.label}
              value={card.value}
              change={card.change}
              trend={card.trend}
              data={card.sparklineData!}
              color={card.color}
              onClick={() => setSelectedMetric(card)}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          <RegionalChart />
          <ProgressCard />
          <MetricsTable />
        </div>
      </main>

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <KpiModal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={selectedMetric.label}
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
    </div>
  );
}
