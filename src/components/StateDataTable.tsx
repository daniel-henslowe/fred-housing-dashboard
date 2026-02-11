"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

interface CityData {
  city: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

type TimePeriod = "1Y" | "5Y" | "10Y" | "Max";

interface HistoricalDataPoint {
  date: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
}

const stateCities: Record<string, CityData[]> = {
  CA: [
    { city: "Los Angeles", medianPrice: 895, yoyChange: 5.8, inventory: 2.1, daysOnMarket: 24 },
    { city: "San Francisco", medianPrice: 1285, yoyChange: 3.2, inventory: 1.8, daysOnMarket: 21 },
    { city: "San Diego", medianPrice: 925, yoyChange: 6.2, inventory: 1.9, daysOnMarket: 22 },
    { city: "San Jose", medianPrice: 1450, yoyChange: 4.1, inventory: 1.5, daysOnMarket: 18 },
    { city: "Sacramento", medianPrice: 525, yoyChange: 3.8, inventory: 2.6, daysOnMarket: 28 },
    { city: "Fresno", medianPrice: 385, yoyChange: 5.2, inventory: 2.8, daysOnMarket: 32 },
    { city: "Oakland", medianPrice: 785, yoyChange: 2.5, inventory: 2.2, daysOnMarket: 26 },
    { city: "Long Beach", medianPrice: 745, yoyChange: 4.8, inventory: 2.0, daysOnMarket: 24 },
    { city: "Bakersfield", medianPrice: 345, yoyChange: 6.5, inventory: 3.1, daysOnMarket: 35 },
    { city: "Irvine", medianPrice: 1125, yoyChange: 3.5, inventory: 1.7, daysOnMarket: 20 },
  ],
  TX: [
    { city: "Houston", medianPrice: 335, yoyChange: 2.8, inventory: 3.4, daysOnMarket: 38 },
    { city: "Dallas", medianPrice: 425, yoyChange: 1.2, inventory: 3.8, daysOnMarket: 42 },
    { city: "Austin", medianPrice: 545, yoyChange: -2.1, inventory: 3.5, daysOnMarket: 38 },
    { city: "San Antonio", medianPrice: 295, yoyChange: 1.5, inventory: 4.1, daysOnMarket: 45 },
    { city: "Fort Worth", medianPrice: 365, yoyChange: 2.2, inventory: 3.6, daysOnMarket: 40 },
    { city: "El Paso", medianPrice: 245, yoyChange: 3.5, inventory: 3.2, daysOnMarket: 42 },
    { city: "Arlington", medianPrice: 345, yoyChange: 1.8, inventory: 3.5, daysOnMarket: 38 },
    { city: "Plano", medianPrice: 485, yoyChange: 0.8, inventory: 3.9, daysOnMarket: 44 },
    { city: "Corpus Christi", medianPrice: 265, yoyChange: 2.5, inventory: 3.8, daysOnMarket: 48 },
    { city: "Lubbock", medianPrice: 225, yoyChange: 4.2, inventory: 3.4, daysOnMarket: 40 },
  ],
  FL: [
    { city: "Miami", medianPrice: 585, yoyChange: 7.8, inventory: 2.4, daysOnMarket: 28 },
    { city: "Tampa", medianPrice: 385, yoyChange: 5.2, inventory: 2.9, daysOnMarket: 31 },
    { city: "Orlando", medianPrice: 395, yoyChange: 6.5, inventory: 2.7, daysOnMarket: 29 },
    { city: "Jacksonville", medianPrice: 345, yoyChange: 5.8, inventory: 2.8, daysOnMarket: 32 },
    { city: "Fort Lauderdale", medianPrice: 525, yoyChange: 6.2, inventory: 2.5, daysOnMarket: 30 },
    { city: "West Palm Beach", medianPrice: 485, yoyChange: 7.1, inventory: 2.6, daysOnMarket: 28 },
    { city: "St. Petersburg", medianPrice: 365, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 30 },
    { city: "Cape Coral", medianPrice: 395, yoyChange: 4.8, inventory: 3.2, daysOnMarket: 35 },
    { city: "Sarasota", medianPrice: 445, yoyChange: 5.2, inventory: 3.0, daysOnMarket: 33 },
    { city: "Naples", medianPrice: 625, yoyChange: 4.5, inventory: 3.5, daysOnMarket: 38 },
  ],
  NY: [
    { city: "New York City", medianPrice: 685, yoyChange: 3.9, inventory: 3.8, daysOnMarket: 45 },
    { city: "Buffalo", medianPrice: 225, yoyChange: 8.1, inventory: 2.2, daysOnMarket: 28 },
    { city: "Rochester", medianPrice: 215, yoyChange: 7.5, inventory: 2.4, daysOnMarket: 30 },
    { city: "Albany", medianPrice: 285, yoyChange: 6.8, inventory: 2.3, daysOnMarket: 32 },
    { city: "Syracuse", medianPrice: 195, yoyChange: 8.5, inventory: 2.5, daysOnMarket: 35 },
    { city: "Yonkers", medianPrice: 545, yoyChange: 4.2, inventory: 3.2, daysOnMarket: 38 },
    { city: "White Plains", medianPrice: 625, yoyChange: 3.8, inventory: 3.5, daysOnMarket: 40 },
    { city: "Ithaca", medianPrice: 345, yoyChange: 5.2, inventory: 2.8, daysOnMarket: 32 },
    { city: "Poughkeepsie", medianPrice: 385, yoyChange: 6.5, inventory: 2.6, daysOnMarket: 34 },
    { city: "Binghamton", medianPrice: 165, yoyChange: 9.2, inventory: 2.8, daysOnMarket: 38 },
  ],
  PA: [
    { city: "Philadelphia", medianPrice: 325, yoyChange: 6.1, inventory: 2.8, daysOnMarket: 28 },
    { city: "Pittsburgh", medianPrice: 225, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 29 },
    { city: "Allentown", medianPrice: 285, yoyChange: 7.2, inventory: 2.4, daysOnMarket: 26 },
    { city: "Reading", medianPrice: 215, yoyChange: 8.5, inventory: 2.6, daysOnMarket: 30 },
    { city: "Scranton", medianPrice: 185, yoyChange: 9.1, inventory: 2.8, daysOnMarket: 35 },
    { city: "Harrisburg", medianPrice: 225, yoyChange: 6.8, inventory: 2.5, daysOnMarket: 28 },
    { city: "Lancaster", medianPrice: 295, yoyChange: 5.5, inventory: 2.3, daysOnMarket: 25 },
    { city: "Erie", medianPrice: 165, yoyChange: 7.8, inventory: 2.9, daysOnMarket: 38 },
    { city: "York", medianPrice: 235, yoyChange: 6.2, inventory: 2.6, daysOnMarket: 32 },
    { city: "Bethlehem", medianPrice: 295, yoyChange: 5.8, inventory: 2.4, daysOnMarket: 28 },
  ],
  IL: [
    { city: "Chicago", medianPrice: 335, yoyChange: 5.4, inventory: 2.6, daysOnMarket: 30 },
    { city: "Aurora", medianPrice: 295, yoyChange: 4.8, inventory: 2.8, daysOnMarket: 32 },
    { city: "Naperville", medianPrice: 485, yoyChange: 3.5, inventory: 2.2, daysOnMarket: 25 },
    { city: "Rockford", medianPrice: 185, yoyChange: 7.2, inventory: 2.9, daysOnMarket: 35 },
    { city: "Joliet", medianPrice: 265, yoyChange: 5.5, inventory: 2.7, daysOnMarket: 30 },
    { city: "Springfield", medianPrice: 165, yoyChange: 6.8, inventory: 3.1, daysOnMarket: 38 },
    { city: "Peoria", medianPrice: 145, yoyChange: 7.5, inventory: 3.2, daysOnMarket: 40 },
    { city: "Elgin", medianPrice: 285, yoyChange: 5.2, inventory: 2.6, daysOnMarket: 28 },
    { city: "Champaign", medianPrice: 195, yoyChange: 4.8, inventory: 2.8, daysOnMarket: 32 },
    { city: "Evanston", medianPrice: 445, yoyChange: 3.8, inventory: 2.4, daysOnMarket: 28 },
  ],
  OH: [
    { city: "Columbus", medianPrice: 295, yoyChange: 6.4, inventory: 2.0, daysOnMarket: 22 },
    { city: "Cleveland", medianPrice: 215, yoyChange: 8.1, inventory: 2.3, daysOnMarket: 27 },
    { city: "Cincinnati", medianPrice: 265, yoyChange: 6.8, inventory: 2.2, daysOnMarket: 25 },
    { city: "Toledo", medianPrice: 165, yoyChange: 9.2, inventory: 2.5, daysOnMarket: 32 },
    { city: "Akron", medianPrice: 175, yoyChange: 8.5, inventory: 2.4, daysOnMarket: 30 },
    { city: "Dayton", medianPrice: 185, yoyChange: 7.8, inventory: 2.6, daysOnMarket: 28 },
    { city: "Canton", medianPrice: 155, yoyChange: 9.5, inventory: 2.7, daysOnMarket: 35 },
    { city: "Youngstown", medianPrice: 125, yoyChange: 10.2, inventory: 2.9, daysOnMarket: 38 },
    { city: "Parma", medianPrice: 195, yoyChange: 7.2, inventory: 2.3, daysOnMarket: 26 },
    { city: "Lorain", medianPrice: 145, yoyChange: 8.8, inventory: 2.6, daysOnMarket: 32 },
  ],
  GA: [
    { city: "Atlanta", medianPrice: 385, yoyChange: 4.2, inventory: 2.7, daysOnMarket: 27 },
    { city: "Savannah", medianPrice: 345, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 28 },
    { city: "Augusta", medianPrice: 245, yoyChange: 6.5, inventory: 2.8, daysOnMarket: 32 },
    { city: "Columbus", medianPrice: 215, yoyChange: 5.2, inventory: 3.0, daysOnMarket: 35 },
    { city: "Macon", medianPrice: 185, yoyChange: 6.8, inventory: 3.2, daysOnMarket: 38 },
    { city: "Athens", medianPrice: 325, yoyChange: 4.5, inventory: 2.6, daysOnMarket: 28 },
    { city: "Sandy Springs", medianPrice: 485, yoyChange: 3.8, inventory: 2.4, daysOnMarket: 25 },
    { city: "Roswell", medianPrice: 445, yoyChange: 4.2, inventory: 2.5, daysOnMarket: 26 },
    { city: "Marietta", medianPrice: 395, yoyChange: 4.8, inventory: 2.6, daysOnMarket: 28 },
    { city: "Johns Creek", medianPrice: 525, yoyChange: 3.5, inventory: 2.3, daysOnMarket: 24 },
  ],
  NC: [
    { city: "Charlotte", medianPrice: 395, yoyChange: 5.5, inventory: 2.5, daysOnMarket: 25 },
    { city: "Raleigh", medianPrice: 425, yoyChange: 4.8, inventory: 2.3, daysOnMarket: 23 },
    { city: "Durham", medianPrice: 385, yoyChange: 5.2, inventory: 2.4, daysOnMarket: 24 },
    { city: "Greensboro", medianPrice: 285, yoyChange: 6.5, inventory: 2.6, daysOnMarket: 28 },
    { city: "Winston-Salem", medianPrice: 265, yoyChange: 6.8, inventory: 2.7, daysOnMarket: 30 },
    { city: "Fayetteville", medianPrice: 225, yoyChange: 5.8, inventory: 2.9, daysOnMarket: 32 },
    { city: "Cary", medianPrice: 485, yoyChange: 4.2, inventory: 2.2, daysOnMarket: 22 },
    { city: "Wilmington", medianPrice: 385, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 28 },
    { city: "Asheville", medianPrice: 445, yoyChange: 4.5, inventory: 2.6, daysOnMarket: 26 },
    { city: "Chapel Hill", medianPrice: 525, yoyChange: 3.8, inventory: 2.4, daysOnMarket: 24 },
  ],
  MI: [
    { city: "Detroit", medianPrice: 235, yoyChange: 7.2, inventory: 2.1, daysOnMarket: 24 },
    { city: "Grand Rapids", medianPrice: 295, yoyChange: 5.8, inventory: 2.2, daysOnMarket: 22 },
    { city: "Ann Arbor", medianPrice: 445, yoyChange: 4.2, inventory: 1.9, daysOnMarket: 20 },
    { city: "Lansing", medianPrice: 195, yoyChange: 7.5, inventory: 2.4, daysOnMarket: 28 },
    { city: "Flint", medianPrice: 125, yoyChange: 10.5, inventory: 2.8, daysOnMarket: 35 },
    { city: "Dearborn", medianPrice: 225, yoyChange: 6.8, inventory: 2.3, daysOnMarket: 26 },
    { city: "Troy", medianPrice: 385, yoyChange: 4.8, inventory: 2.0, daysOnMarket: 22 },
    { city: "Kalamazoo", medianPrice: 215, yoyChange: 6.2, inventory: 2.5, daysOnMarket: 28 },
    { city: "Warren", medianPrice: 195, yoyChange: 7.8, inventory: 2.4, daysOnMarket: 26 },
    { city: "Sterling Heights", medianPrice: 265, yoyChange: 5.5, inventory: 2.2, daysOnMarket: 24 },
  ],
  NJ: [
    { city: "Newark", medianPrice: 485, yoyChange: 8.5, inventory: 2.2, daysOnMarket: 28 },
    { city: "Jersey City", medianPrice: 585, yoyChange: 6.2, inventory: 2.0, daysOnMarket: 25 },
    { city: "Paterson", medianPrice: 385, yoyChange: 9.2, inventory: 2.3, daysOnMarket: 30 },
    { city: "Elizabeth", medianPrice: 425, yoyChange: 8.8, inventory: 2.2, daysOnMarket: 28 },
    { city: "Trenton", medianPrice: 285, yoyChange: 10.5, inventory: 2.5, daysOnMarket: 32 },
    { city: "Clifton", medianPrice: 485, yoyChange: 7.5, inventory: 2.1, daysOnMarket: 26 },
    { city: "Camden", medianPrice: 185, yoyChange: 12.5, inventory: 2.8, daysOnMarket: 35 },
    { city: "Passaic", medianPrice: 395, yoyChange: 8.2, inventory: 2.3, daysOnMarket: 28 },
    { city: "Union City", medianPrice: 445, yoyChange: 7.8, inventory: 2.2, daysOnMarket: 27 },
    { city: "Hoboken", medianPrice: 725, yoyChange: 4.5, inventory: 1.8, daysOnMarket: 22 },
  ],
  VA: [
    { city: "Virginia Beach", medianPrice: 365, yoyChange: 4.8, inventory: 2.4, daysOnMarket: 26 },
    { city: "Norfolk", medianPrice: 285, yoyChange: 5.5, inventory: 2.6, daysOnMarket: 28 },
    { city: "Richmond", medianPrice: 365, yoyChange: 4.2, inventory: 2.3, daysOnMarket: 24 },
    { city: "Arlington", medianPrice: 685, yoyChange: 3.2, inventory: 2.0, daysOnMarket: 20 },
    { city: "Alexandria", medianPrice: 625, yoyChange: 3.5, inventory: 2.1, daysOnMarket: 22 },
    { city: "Newport News", medianPrice: 265, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 28 },
    { city: "Hampton", medianPrice: 245, yoyChange: 6.2, inventory: 2.6, daysOnMarket: 30 },
    { city: "Chesapeake", medianPrice: 345, yoyChange: 4.5, inventory: 2.4, daysOnMarket: 26 },
    { city: "Roanoke", medianPrice: 225, yoyChange: 6.8, inventory: 2.8, daysOnMarket: 32 },
    { city: "Charlottesville", medianPrice: 425, yoyChange: 4.2, inventory: 2.2, daysOnMarket: 24 },
  ],
  WA: [
    { city: "Seattle", medianPrice: 785, yoyChange: 4.5, inventory: 2.3, daysOnMarket: 19 },
    { city: "Spokane", medianPrice: 385, yoyChange: 5.2, inventory: 2.6, daysOnMarket: 28 },
    { city: "Tacoma", medianPrice: 485, yoyChange: 4.8, inventory: 2.4, daysOnMarket: 24 },
    { city: "Vancouver", medianPrice: 485, yoyChange: 3.8, inventory: 2.5, daysOnMarket: 26 },
    { city: "Bellevue", medianPrice: 1185, yoyChange: 2.5, inventory: 1.8, daysOnMarket: 18 },
    { city: "Everett", medianPrice: 545, yoyChange: 4.2, inventory: 2.4, daysOnMarket: 24 },
    { city: "Kent", medianPrice: 525, yoyChange: 4.5, inventory: 2.3, daysOnMarket: 22 },
    { city: "Renton", medianPrice: 585, yoyChange: 3.8, inventory: 2.2, daysOnMarket: 21 },
    { city: "Kirkland", medianPrice: 985, yoyChange: 2.8, inventory: 1.9, daysOnMarket: 19 },
    { city: "Redmond", medianPrice: 1085, yoyChange: 2.2, inventory: 1.8, daysOnMarket: 18 },
  ],
  AZ: [
    { city: "Phoenix", medianPrice: 445, yoyChange: 2.4, inventory: 3.2, daysOnMarket: 32 },
    { city: "Tucson", medianPrice: 325, yoyChange: 4.5, inventory: 3.0, daysOnMarket: 35 },
    { city: "Mesa", medianPrice: 425, yoyChange: 2.8, inventory: 3.1, daysOnMarket: 30 },
    { city: "Scottsdale", medianPrice: 785, yoyChange: 1.8, inventory: 3.5, daysOnMarket: 38 },
    { city: "Chandler", medianPrice: 485, yoyChange: 2.5, inventory: 3.0, daysOnMarket: 28 },
    { city: "Gilbert", medianPrice: 525, yoyChange: 2.2, inventory: 2.9, daysOnMarket: 26 },
    { city: "Glendale", medianPrice: 385, yoyChange: 3.2, inventory: 3.2, daysOnMarket: 32 },
    { city: "Tempe", medianPrice: 445, yoyChange: 2.8, inventory: 2.8, daysOnMarket: 28 },
    { city: "Peoria", medianPrice: 425, yoyChange: 3.5, inventory: 3.1, daysOnMarket: 30 },
    { city: "Surprise", medianPrice: 395, yoyChange: 3.8, inventory: 3.2, daysOnMarket: 32 },
  ],
  MA: [
    { city: "Boston", medianPrice: 725, yoyChange: 5.1, inventory: 1.9, daysOnMarket: 20 },
    { city: "Worcester", medianPrice: 385, yoyChange: 7.2, inventory: 2.1, daysOnMarket: 24 },
    { city: "Springfield", medianPrice: 285, yoyChange: 8.5, inventory: 2.3, daysOnMarket: 28 },
    { city: "Cambridge", medianPrice: 985, yoyChange: 3.8, inventory: 1.6, daysOnMarket: 18 },
    { city: "Lowell", medianPrice: 425, yoyChange: 6.8, inventory: 2.0, daysOnMarket: 22 },
    { city: "Brockton", medianPrice: 445, yoyChange: 7.5, inventory: 2.1, daysOnMarket: 24 },
    { city: "Quincy", medianPrice: 585, yoyChange: 5.2, inventory: 1.8, daysOnMarket: 20 },
    { city: "Lynn", medianPrice: 485, yoyChange: 6.5, inventory: 1.9, daysOnMarket: 22 },
    { city: "Newton", medianPrice: 1125, yoyChange: 3.2, inventory: 1.5, daysOnMarket: 16 },
    { city: "Somerville", medianPrice: 785, yoyChange: 4.5, inventory: 1.7, daysOnMarket: 18 },
  ],
  TN: [
    { city: "Nashville", medianPrice: 445, yoyChange: 3.1, inventory: 3.1, daysOnMarket: 29 },
    { city: "Memphis", medianPrice: 245, yoyChange: 5.8, inventory: 3.4, daysOnMarket: 38 },
    { city: "Knoxville", medianPrice: 345, yoyChange: 4.5, inventory: 2.8, daysOnMarket: 28 },
    { city: "Chattanooga", medianPrice: 325, yoyChange: 4.8, inventory: 2.9, daysOnMarket: 30 },
    { city: "Clarksville", medianPrice: 295, yoyChange: 5.2, inventory: 3.0, daysOnMarket: 32 },
    { city: "Murfreesboro", medianPrice: 385, yoyChange: 3.8, inventory: 2.8, daysOnMarket: 28 },
    { city: "Franklin", medianPrice: 625, yoyChange: 2.5, inventory: 2.5, daysOnMarket: 25 },
    { city: "Jackson", medianPrice: 225, yoyChange: 6.2, inventory: 3.2, daysOnMarket: 35 },
    { city: "Johnson City", medianPrice: 285, yoyChange: 5.5, inventory: 2.8, daysOnMarket: 30 },
    { city: "Hendersonville", medianPrice: 425, yoyChange: 3.5, inventory: 2.7, daysOnMarket: 27 },
  ],
  IN: [
    { city: "Indianapolis", medianPrice: 265, yoyChange: 6.5, inventory: 2.4, daysOnMarket: 28 },
    { city: "Fort Wayne", medianPrice: 215, yoyChange: 7.8, inventory: 2.2, daysOnMarket: 26 },
    { city: "Evansville", medianPrice: 185, yoyChange: 6.8, inventory: 2.6, daysOnMarket: 32 },
    { city: "South Bend", medianPrice: 195, yoyChange: 7.2, inventory: 2.5, daysOnMarket: 30 },
    { city: "Carmel", medianPrice: 445, yoyChange: 4.5, inventory: 2.0, daysOnMarket: 22 },
    { city: "Fishers", medianPrice: 385, yoyChange: 5.2, inventory: 2.1, daysOnMarket: 24 },
    { city: "Bloomington", medianPrice: 285, yoyChange: 5.8, inventory: 2.4, daysOnMarket: 28 },
    { city: "Hammond", medianPrice: 175, yoyChange: 8.5, inventory: 2.7, daysOnMarket: 34 },
    { city: "Gary", medianPrice: 125, yoyChange: 10.2, inventory: 3.0, daysOnMarket: 42 },
    { city: "Lafayette", medianPrice: 225, yoyChange: 6.5, inventory: 2.5, daysOnMarket: 28 },
  ],
  MD: [
    { city: "Baltimore", medianPrice: 285, yoyChange: 5.8, inventory: 2.4, daysOnMarket: 28 },
    { city: "Frederick", medianPrice: 425, yoyChange: 4.2, inventory: 2.2, daysOnMarket: 24 },
    { city: "Rockville", medianPrice: 585, yoyChange: 3.5, inventory: 2.0, daysOnMarket: 22 },
    { city: "Gaithersburg", medianPrice: 485, yoyChange: 4.5, inventory: 2.1, daysOnMarket: 24 },
    { city: "Bowie", medianPrice: 445, yoyChange: 4.8, inventory: 2.2, daysOnMarket: 26 },
    { city: "Hagerstown", medianPrice: 285, yoyChange: 6.8, inventory: 2.5, daysOnMarket: 30 },
    { city: "Annapolis", medianPrice: 545, yoyChange: 3.8, inventory: 2.3, daysOnMarket: 25 },
    { city: "College Park", medianPrice: 425, yoyChange: 5.2, inventory: 2.3, daysOnMarket: 26 },
    { city: "Salisbury", medianPrice: 285, yoyChange: 6.2, inventory: 2.6, daysOnMarket: 30 },
    { city: "Bethesda", medianPrice: 925, yoyChange: 2.8, inventory: 1.8, daysOnMarket: 20 },
  ],
  MO: [
    { city: "Kansas City", medianPrice: 275, yoyChange: 5.5, inventory: 2.6, daysOnMarket: 28 },
    { city: "St. Louis", medianPrice: 245, yoyChange: 5.8, inventory: 2.5, daysOnMarket: 30 },
    { city: "Springfield", medianPrice: 225, yoyChange: 6.2, inventory: 2.8, daysOnMarket: 32 },
    { city: "Columbia", medianPrice: 285, yoyChange: 4.8, inventory: 2.4, daysOnMarket: 26 },
    { city: "Independence", medianPrice: 215, yoyChange: 6.5, inventory: 2.7, daysOnMarket: 30 },
    { city: "Lee's Summit", medianPrice: 345, yoyChange: 4.5, inventory: 2.3, daysOnMarket: 25 },
    { city: "O'Fallon", medianPrice: 325, yoyChange: 4.8, inventory: 2.4, daysOnMarket: 26 },
    { city: "St. Joseph", medianPrice: 165, yoyChange: 7.5, inventory: 3.0, daysOnMarket: 38 },
    { city: "St. Charles", medianPrice: 295, yoyChange: 5.2, inventory: 2.5, daysOnMarket: 28 },
    { city: "Blue Springs", medianPrice: 285, yoyChange: 5.5, inventory: 2.5, daysOnMarket: 28 },
  ],
  CO: [
    { city: "Denver", medianPrice: 585, yoyChange: 3.8, inventory: 2.8, daysOnMarket: 26 },
    { city: "Colorado Springs", medianPrice: 445, yoyChange: 2.5, inventory: 3.2, daysOnMarket: 32 },
    { city: "Aurora", medianPrice: 485, yoyChange: 3.2, inventory: 2.9, daysOnMarket: 28 },
    { city: "Fort Collins", medianPrice: 545, yoyChange: 2.8, inventory: 3.0, daysOnMarket: 30 },
    { city: "Lakewood", medianPrice: 525, yoyChange: 3.5, inventory: 2.8, daysOnMarket: 27 },
    { city: "Boulder", medianPrice: 885, yoyChange: 1.8, inventory: 2.5, daysOnMarket: 24 },
    { city: "Thornton", medianPrice: 485, yoyChange: 3.2, inventory: 2.9, daysOnMarket: 28 },
    { city: "Arvada", medianPrice: 545, yoyChange: 2.8, inventory: 2.8, daysOnMarket: 26 },
    { city: "Westminster", medianPrice: 525, yoyChange: 3.0, inventory: 2.9, daysOnMarket: 28 },
    { city: "Pueblo", medianPrice: 285, yoyChange: 5.5, inventory: 3.4, daysOnMarket: 38 },
  ],
};

const generateStateHistoricalData = (state: StateData): Record<TimePeriod, HistoricalDataPoint[]> => {
  const base = state.medianPrice / 1000;
  const yoy = state.yoyChange;
  const inv = state.inventory;

  return {
    "1Y": [
      { date: "Mar '25", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 0.5, inventory: inv + 0.3 },
      { date: "Apr '25", medianPrice: Math.round(base * 0.965), yoyChange: yoy + 0.3, inventory: inv + 0.2 },
      { date: "May '25", medianPrice: Math.round(base * 0.97), yoyChange: yoy + 0.2, inventory: inv + 0.1 },
      { date: "Jun '25", medianPrice: Math.round(base * 0.975), yoyChange: yoy + 0.1, inventory: inv },
      { date: "Jul '25", medianPrice: Math.round(base * 0.98), yoyChange: yoy, inventory: inv - 0.1 },
      { date: "Aug '25", medianPrice: Math.round(base * 0.985), yoyChange: yoy - 0.1, inventory: inv - 0.1 },
      { date: "Sep '25", medianPrice: Math.round(base * 0.99), yoyChange: yoy - 0.2, inventory: inv - 0.2 },
      { date: "Oct '25", medianPrice: Math.round(base * 0.992), yoyChange: yoy - 0.2, inventory: inv - 0.1 },
      { date: "Nov '25", medianPrice: Math.round(base * 0.995), yoyChange: yoy - 0.1, inventory: inv },
      { date: "Dec '25", medianPrice: Math.round(base * 0.998), yoyChange: yoy, inventory: inv },
      { date: "Jan '26", medianPrice: Math.round(base * 0.999), yoyChange: yoy, inventory: inv },
      { date: "Feb '26", medianPrice: Math.round(base), yoyChange: yoy, inventory: inv },
    ],
    "5Y": [
      { date: "2021", medianPrice: Math.round(base * 0.75), yoyChange: 12.5, inventory: inv + 1.2 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: inv + 0.8 },
      { date: "2023", medianPrice: Math.round(base * 0.92), yoyChange: 4.5, inventory: inv + 0.5 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2 },
      { date: "2025", medianPrice: Math.round(base * 0.99), yoyChange: yoy + 0.5, inventory: inv },
      { date: "2026", medianPrice: Math.round(base), yoyChange: yoy, inventory: inv },
    ],
    "10Y": [
      { date: "2016", medianPrice: Math.round(base * 0.48), yoyChange: 5.2, inventory: inv + 2.5 },
      { date: "2018", medianPrice: Math.round(base * 0.56), yoyChange: 7.2, inventory: inv + 1.9 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: inv + 1.4 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: inv + 0.8 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2 },
      { date: "2026", medianPrice: Math.round(base), yoyChange: yoy, inventory: inv },
    ],
    "Max": [
      { date: "1995", medianPrice: Math.round(base * 0.18), yoyChange: 3.2, inventory: 6.5 },
      { date: "2000", medianPrice: Math.round(base * 0.25), yoyChange: 6.5, inventory: 4.5 },
      { date: "2007", medianPrice: Math.round(base * 0.52), yoyChange: 8.2, inventory: 4.2 },
      { date: "2009", medianPrice: Math.round(base * 0.38), yoyChange: -12.5, inventory: 8.5 },
      { date: "2015", medianPrice: Math.round(base * 0.45), yoyChange: 5.8, inventory: 4.5 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: inv + 1.4 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2 },
      { date: "2026", medianPrice: Math.round(base), yoyChange: yoy, inventory: inv },
    ],
  };
};

const getCityHeatColor = (price: number, prices: number[]) => {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const ratio = (price - min) / (max - min);
  if (ratio < 0.25) return "bg-emerald-500/20 border-emerald-500/30 text-emerald-400";
  if (ratio < 0.5) return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
  if (ratio < 0.75) return "bg-orange-500/20 border-orange-500/30 text-orange-400";
  return "bg-red-500/20 border-red-500/30 text-red-400";
};

interface CityHistoricalDataPoint {
  date: string;
  medianPrice: number;
  yoyChange: number;
  inventory: number;
  daysOnMarket: number;
}

const generateCityHistoricalData = (city: CityData): Record<TimePeriod, CityHistoricalDataPoint[]> => {
  const base = city.medianPrice;
  const yoy = city.yoyChange;
  const inv = city.inventory;
  const dom = city.daysOnMarket;

  return {
    "1Y": [
      { date: "Mar '25", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 0.5, inventory: inv + 0.3, daysOnMarket: dom + 4 },
      { date: "Apr '25", medianPrice: Math.round(base * 0.965), yoyChange: yoy + 0.3, inventory: inv + 0.2, daysOnMarket: dom + 3 },
      { date: "May '25", medianPrice: Math.round(base * 0.97), yoyChange: yoy + 0.2, inventory: inv + 0.1, daysOnMarket: dom + 2 },
      { date: "Jun '25", medianPrice: Math.round(base * 0.975), yoyChange: yoy + 0.1, inventory: inv, daysOnMarket: dom + 1 },
      { date: "Jul '25", medianPrice: Math.round(base * 0.98), yoyChange: yoy, inventory: inv - 0.1, daysOnMarket: dom },
      { date: "Aug '25", medianPrice: Math.round(base * 0.985), yoyChange: yoy - 0.1, inventory: inv - 0.1, daysOnMarket: dom - 1 },
      { date: "Sep '25", medianPrice: Math.round(base * 0.99), yoyChange: yoy - 0.2, inventory: inv - 0.2, daysOnMarket: dom - 1 },
      { date: "Oct '25", medianPrice: Math.round(base * 0.992), yoyChange: yoy - 0.2, inventory: inv - 0.1, daysOnMarket: dom - 2 },
      { date: "Nov '25", medianPrice: Math.round(base * 0.995), yoyChange: yoy - 0.1, inventory: inv, daysOnMarket: dom - 1 },
      { date: "Dec '25", medianPrice: Math.round(base * 0.998), yoyChange: yoy, inventory: inv, daysOnMarket: dom },
      { date: "Jan '26", medianPrice: Math.round(base * 0.999), yoyChange: yoy, inventory: inv, daysOnMarket: dom },
      { date: "Feb '26", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "5Y": [
      { date: "2021", medianPrice: Math.round(base * 0.75), yoyChange: 12.5, inventory: inv + 1.2, daysOnMarket: dom + 15 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: inv + 0.8, daysOnMarket: dom + 8 },
      { date: "2023", medianPrice: Math.round(base * 0.92), yoyChange: 4.5, inventory: inv + 0.5, daysOnMarket: dom + 5 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2, daysOnMarket: dom + 2 },
      { date: "2025", medianPrice: Math.round(base * 0.99), yoyChange: yoy + 0.5, inventory: inv, daysOnMarket: dom },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "10Y": [
      { date: "2016", medianPrice: Math.round(base * 0.48), yoyChange: 5.2, inventory: inv + 2.5, daysOnMarket: dom + 28 },
      { date: "2018", medianPrice: Math.round(base * 0.56), yoyChange: 7.2, inventory: inv + 1.9, daysOnMarket: dom + 20 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: inv + 1.4, daysOnMarket: dom + 16 },
      { date: "2022", medianPrice: Math.round(base * 0.88), yoyChange: 15.2, inventory: inv + 0.8, daysOnMarket: dom + 8 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2, daysOnMarket: dom + 2 },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
    "Max": [
      { date: "1995", medianPrice: Math.round(base * 0.18), yoyChange: 3.2, inventory: 6.5, daysOnMarket: 85 },
      { date: "2000", medianPrice: Math.round(base * 0.25), yoyChange: 6.5, inventory: 4.5, daysOnMarket: 62 },
      { date: "2007", medianPrice: Math.round(base * 0.52), yoyChange: 8.2, inventory: 4.2, daysOnMarket: 52 },
      { date: "2009", medianPrice: Math.round(base * 0.38), yoyChange: -12.5, inventory: 8.5, daysOnMarket: 95 },
      { date: "2015", medianPrice: Math.round(base * 0.45), yoyChange: 5.8, inventory: 4.5, daysOnMarket: 55 },
      { date: "2020", medianPrice: Math.round(base * 0.65), yoyChange: 8.2, inventory: inv + 1.4, daysOnMarket: dom + 16 },
      { date: "2024", medianPrice: Math.round(base * 0.96), yoyChange: yoy + 1.2, inventory: inv + 0.2, daysOnMarket: dom + 2 },
      { date: "2026", medianPrice: base, yoyChange: yoy, inventory: inv, daysOnMarket: dom },
    ],
  };
};

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
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1Y");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [cityTimePeriod, setCityTimePeriod] = useState<TimePeriod>("1Y");

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

  const handleStateClick = (state: StateData) => {
    setSelectedState(state);
    setTimePeriod("1Y");
  };

  const closeModal = () => {
    setSelectedState(null);
  };

  const handleCityClick = (city: CityData) => {
    setSelectedCity(city);
    setCityTimePeriod("1Y");
  };

  const closeCityModal = () => {
    setSelectedCity(null);
  };

  const historicalData = selectedState ? generateStateHistoricalData(selectedState) : null;
  const cities = selectedState ? stateCities[selectedState.abbr] || [] : [];
  const cityPrices = cities.map(c => c.medianPrice);
  const cityHistoricalData = selectedCity ? generateCityHistoricalData(selectedCity) : null;

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
                onClick={() => handleStateClick(state)}
                className="border-b border-indigo-500/5 hover:bg-indigo-500/5 transition-colors cursor-pointer"
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

      {/* State Detail Modal */}
      {selectedState && historicalData && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="w-10 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-sm font-medium text-indigo-300">
                    {selectedState.abbr}
                  </span>
                  {selectedState.state}
                </h2>
                <p className="text-slate-400 mt-1">Historical data & top 10 cities</p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* State Stats */}
            <div className="p-6 border-b border-slate-800">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Median Price</div>
                  <div className="text-2xl font-bold text-indigo-400">${formatNumber(selectedState.medianPrice)}</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">YoY Change</div>
                  <div className={`text-2xl font-bold ${selectedState.yoyChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {selectedState.yoyChange > 0 ? "+" : ""}{selectedState.yoyChange}%
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Inventory</div>
                  <div className="text-2xl font-bold text-cyan-400">{selectedState.inventory} mo</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Homes Sold</div>
                  <div className="text-2xl font-bold text-orange-400">{formatNumber(selectedState.homesSold)}</div>
                </div>
              </div>
            </div>

            {/* Price History Chart */}
            <div className="px-6 pt-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Price History</h3>
              <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
                {(["1Y", "5Y", "10Y", "Max"] as TimePeriod[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTimePeriod(p)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      timePeriod === p
                        ? "bg-indigo-500 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData[timePeriod]}>
                    <defs>
                      <linearGradient id="colorStatePrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}K`} domain={["dataMin - 20", "dataMax + 20"]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #6366f1", borderRadius: "12px", padding: "12px" }}
                      formatter={(value) => [`$${value}K`, "Median Price"]}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Area type="monotone" dataKey="medianPrice" stroke="#6366f1" strokeWidth={2} fill="url(#colorStatePrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Market Indicators */}
            <div className="px-6">
              <h3 className="text-lg font-semibold mb-4">Market Indicators</h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData[timePeriod]}>
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #6366f1", borderRadius: "12px", padding: "12px" }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Line type="monotone" dataKey="yoyChange" name="YoY Change (%)" stroke="#22c55e" strokeWidth={2} dot={timePeriod !== "1Y"} />
                    <Line type="monotone" dataKey="inventory" name="Inventory (mo)" stroke="#06b6d4" strokeWidth={2} dot={timePeriod !== "1Y"} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-400">YoY Change</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="text-xs text-slate-400">Inventory</span>
                </div>
              </div>
            </div>

            {/* Top 10 Cities */}
            {cities.length > 0 && (
              <div className="px-6 pb-6">
                <h3 className="text-lg font-semibold mb-4">Top 10 Cities in {selectedState.state}</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {cities.map((city) => {
                    const heatColor = getCityHeatColor(city.medianPrice, cityPrices);
                    return (
                      <div
                        key={city.city}
                        onClick={() => handleCityClick(city)}
                        className={`${heatColor} border rounded-xl p-3 transition-all hover:scale-[1.02] cursor-pointer hover:ring-2 hover:ring-white/20`}
                      >
                        <div className="font-semibold text-sm text-white truncate">{city.city}</div>
                        <div className="text-xl font-bold mt-1">${city.medianPrice}K</div>
                        <div className="mt-2 pt-2 border-t border-slate-700/50 grid grid-cols-2 gap-1 text-xs">
                          <div>
                            <span className="text-slate-500">YoY</span>
                            <div className={city.yoyChange > 0 ? "text-green-400" : "text-red-400"}>
                              {city.yoyChange > 0 ? "+" : ""}{city.yoyChange}%
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500">DOM</span>
                            <div className="text-slate-300">{city.daysOnMarket}d</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* City Historical Data Modal */}
      {selectedCity && cityHistoricalData && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={closeCityModal}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedCity.city}</h2>
                <p className="text-slate-400 mt-1">Historical housing market data</p>
              </div>
              <button
                onClick={closeCityModal}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 border-b border-slate-800">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Median Price</div>
                  <div className="text-2xl font-bold text-indigo-400">${selectedCity.medianPrice}K</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">YoY Change</div>
                  <div className={`text-2xl font-bold ${selectedCity.yoyChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {selectedCity.yoyChange > 0 ? "+" : ""}{selectedCity.yoyChange}%
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Inventory</div>
                  <div className="text-2xl font-bold text-cyan-400">{selectedCity.inventory} mo</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Days on Market</div>
                  <div className="text-2xl font-bold text-orange-400">{selectedCity.daysOnMarket}</div>
                </div>
              </div>
            </div>

            <div className="px-6 pt-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Price History</h3>
              <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
                {(["1Y", "5Y", "10Y", "Max"] as TimePeriod[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCityTimePeriod(p)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      cityTimePeriod === p
                        ? "bg-indigo-500 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cityHistoricalData[cityTimePeriod]}>
                    <defs>
                      <linearGradient id="colorCityPriceState" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}K`} domain={["dataMin - 20", "dataMax + 20"]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #6366f1", borderRadius: "12px", padding: "12px" }}
                      formatter={(value) => [`$${value}K`, "Median Price"]}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Area type="monotone" dataKey="medianPrice" stroke="#6366f1" strokeWidth={2} fill="url(#colorCityPriceState)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold mb-4">Market Indicators</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cityHistoricalData[cityTimePeriod]}>
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #6366f1", borderRadius: "12px", padding: "12px" }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Line type="monotone" dataKey="yoyChange" name="YoY Change (%)" stroke="#22c55e" strokeWidth={2} dot={cityTimePeriod !== "1Y"} />
                    <Line type="monotone" dataKey="inventory" name="Inventory (mo)" stroke="#06b6d4" strokeWidth={2} dot={cityTimePeriod !== "1Y"} />
                    <Line type="monotone" dataKey="daysOnMarket" name="Days on Market" stroke="#f97316" strokeWidth={2} dot={cityTimePeriod !== "1Y"} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-400">YoY Change</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="text-xs text-slate-400">Inventory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-xs text-slate-400">Days on Market</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
