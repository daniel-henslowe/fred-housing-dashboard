"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const employmentData = [
  { month: "Mar '25", total: 8125, residential: 3485, nonResidential: 2145, specialty: 2495 },
  { month: "Apr '25", total: 8185, residential: 3515, nonResidential: 2165, specialty: 2505 },
  { month: "May '25", total: 8245, residential: 3545, nonResidential: 2185, specialty: 2515 },
  { month: "Jun '25", total: 8315, residential: 3585, nonResidential: 2205, specialty: 2525 },
  { month: "Jul '25", total: 8375, residential: 3615, nonResidential: 2225, specialty: 2535 },
  { month: "Aug '25", total: 8425, residential: 3645, nonResidential: 2245, specialty: 2535 },
  { month: "Sep '25", total: 8385, residential: 3625, nonResidential: 2235, specialty: 2525 },
  { month: "Oct '25", total: 8345, residential: 3605, nonResidential: 2225, specialty: 2515 },
  { month: "Nov '25", total: 8315, residential: 3585, nonResidential: 2215, specialty: 2515 },
  { month: "Dec '25", total: 8355, residential: 3605, nonResidential: 2225, specialty: 2525 },
  { month: "Jan '26", total: 8395, residential: 3625, nonResidential: 2235, specialty: 2535 },
  { month: "Feb '26", total: 8425, residential: 3645, nonResidential: 2245, specialty: 2535 },
];

const wageData = [
  { sector: "Residential", avgWage: 32.45, change: 4.2 },
  { sector: "Non-Residential", avgWage: 35.85, change: 3.8 },
  { sector: "Specialty Trade", avgWage: 34.25, change: 4.5 },
  { sector: "Heavy/Civil", avgWage: 36.95, change: 3.5 },
];

const jobOpenings = [
  { month: "Sep", openings: 425 },
  { month: "Oct", openings: 445 },
  { month: "Nov", openings: 435 },
  { month: "Dec", openings: 415 },
  { month: "Jan", openings: 428 },
  { month: "Feb", openings: 442 },
];

export default function ConstructionEmployment() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Construction Employment</h3>
          <p className="text-sm text-slate-400 mt-1">
            Employment levels and labor market indicators (thousands)
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">8.43M</div>
          <div className="text-xs text-green-400">↑ 3.7% YoY</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Employment Chart */}
        <div className="col-span-2">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={employmentData}>
                <defs>
                  <linearGradient id="colorResidential" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNonRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSpecialty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #6366f1",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                  formatter={(value) => [`${value}K`, ""]}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#e2e8f0" }}
                />
                <Area type="monotone" dataKey="residential" name="Residential" stackId="1" stroke="#6366f1" fill="url(#colorResidential)" />
                <Area type="monotone" dataKey="nonResidential" name="Non-Residential" stackId="1" stroke="#22c55e" fill="url(#colorNonRes)" />
                <Area type="monotone" dataKey="specialty" name="Specialty Trade" stackId="1" stroke="#f97316" fill="url(#colorSpecialty)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-xs text-slate-400">Residential (3.65M)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-slate-400">Non-Residential (2.25M)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs text-slate-400">Specialty Trade (2.54M)</span>
            </div>
          </div>
        </div>

        {/* Job Openings */}
        <div>
          <div className="text-sm font-medium mb-3">Job Openings (K)</div>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobOpenings}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[380, 460]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #6366f1",
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                  formatter={(value) => [`${value}K`, "Openings"]}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="openings" radius={[4, 4, 0, 0]}>
                  {jobOpenings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === jobOpenings.length - 1 ? "#22c55e" : "#6366f1"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            <div className="text-sm font-medium">Avg Hourly Wage by Sector</div>
            {wageData.map((item) => (
              <div key={item.sector} className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{item.sector}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">${item.avgWage}</span>
                  <span className="text-green-400">+{item.change}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
