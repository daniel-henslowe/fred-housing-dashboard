interface KpiData {
  label: string;
  value: string;
  subValue?: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

const kpis: KpiData[] = [
  { label: "National Median", value: "$428,700", change: "+4.2% YoY", trend: "up", icon: "🏠" },
  { label: "National Average", value: "$516,500", change: "+3.8% YoY", trend: "up", icon: "📊" },
  { label: "Price per Sq Ft", value: "$225", change: "+5.1% YoY", trend: "up", icon: "📐" },
  { label: "Total Inventory", value: "1.14M", subValue: "homes", change: "+12.5% YoY", trend: "up", icon: "📦" },
  { label: "Avg Days on Market", value: "32", subValue: "days", change: "-3 days YoY", trend: "down", icon: "📅" },
  { label: "Homes Sold (Annual)", value: "5.2M", change: "-2.8% YoY", trend: "down", icon: "🏘️" },
];

export default function RegionalKpis() {
  return (
    <div className="grid grid-cols-6 gap-4 mb-7">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="glass-card p-4 relative overflow-hidden gradient-border-top">
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
  );
}
