interface Metric {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

const metrics: Metric[] = [
  { name: "15-Yr Rate", value: "5.68%", change: "-0.12", trend: "down" },
  { name: "Construction", value: "$1.82T", change: "+2.4%", trend: "up" },
  { name: "Pending Sales", value: "77.8", change: "+1.2%", trend: "up" },
  { name: "Home Equity", value: "$32.6T", change: "+5.8%", trend: "up" },
];

export default function MetricsTable() {
  return (
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
              className="border-b border-indigo-500/5 hover:bg-indigo-500/5"
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
  );
}
