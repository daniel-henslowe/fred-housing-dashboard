interface KpiCardProps {
  icon: string;
  iconBg: "blue" | "green" | "purple" | "orange" | "cyan";
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  onClick?: () => void;
}

const bgColors = {
  blue: "bg-blue-500/20 text-blue-400",
  green: "bg-green-500/20 text-green-400",
  purple: "bg-purple-500/20 text-purple-400",
  orange: "bg-orange-500/20 text-orange-400",
  cyan: "bg-cyan-500/20 text-cyan-400",
};

export default function KpiCard({
  icon,
  iconBg,
  label,
  value,
  change,
  trend,
  onClick,
}: KpiCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 relative overflow-hidden gradient-border-top-hover transition-all duration-200 ${
        onClick
          ? "cursor-pointer hover:scale-[1.02] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
          : ""
      }`}
    >
      {/* Click indicator */}
      {onClick && (
        <div className="absolute top-3 right-3 text-slate-500 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-5 h-5 rounded bg-slate-700/50 flex items-center justify-center text-[10px]">↗</span>
        </div>
      )}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-xl ${bgColors[iconBg]}`}
      >
        {icon}
      </div>
      <div className="text-sm text-slate-400 mb-2">{label}</div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div
        className={`text-sm flex items-center gap-1 ${
          trend === "up" ? "text-green-400" : "text-red-400"
        }`}
      >
        {trend === "up" ? "↑" : "↓"} {change}
      </div>
      {onClick && (
        <div className="absolute bottom-3 right-3 text-xs text-slate-500">
          Click for details
        </div>
      )}
    </div>
  );
}
