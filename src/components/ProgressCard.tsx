interface ProgressItem {
  label: string;
  value: string;
  percent: number;
  color: "blue" | "green" | "purple" | "orange";
}

const items: ProgressItem[] = [
  { label: "Homeownership Rate", value: "65.8%", percent: 65.8, color: "blue" },
  { label: "Vacancy Rate", value: "6.2%", percent: 6.2, color: "green" },
  { label: "Delinquency Rate", value: "2.1%", percent: 21, color: "purple" },
  { label: "Price-to-Rent Ratio", value: "78.4%", percent: 78.4, color: "orange" },
];

const barColors = {
  blue: "from-blue-500 to-indigo-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-violet-500",
  orange: "from-orange-500 to-amber-400",
};

export default function ProgressCard() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">Market Health Indicators</h3>
      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.label}>
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
  );
}
