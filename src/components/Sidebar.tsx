"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ChartBarIcon,
  TableCellsIcon,
  CalendarIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

const mainNav = [
  { name: "Dashboard", icon: HomeIcon, href: "/" },
  { name: "Regional Data", icon: TableCellsIcon, href: "/regional" },
  { name: "Analytics", icon: ChartBarIcon, href: "/analytics" },
  { name: "Historical", icon: CalendarIcon, href: "/historical" },
];

const metricsNav = [
  { name: "Home Prices", icon: CreditCardIcon, href: "/prices" },
  { name: "Construction", icon: BuildingOfficeIcon, href: "/construction" },
  { name: "Sales Data", icon: ShoppingCartIcon, href: "/sales" },
  { name: "Mortgage Rates", icon: BanknotesIcon, href: "/rates" },
];

const settingsNav = [
  { name: "Settings", icon: Cog6ToothIcon, href: "/settings" },
  { name: "Help", icon: QuestionMarkCircleIcon, href: "/help" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 bg-gradient-to-b from-slate-900/95 to-slate-950/98 border-r border-indigo-500/10 p-6 overflow-y-auto">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 px-3 mb-8">
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-indigo-500/30">
          <Image
            src="/macroedge-logo.jpg"
            alt="MacroEdge Logo"
            width={44}
            height={44}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-lg font-bold leading-tight">
            Macro<span className="text-blue-500">Edge</span>
          </div>
          <div className="text-[11px] text-slate-500 leading-tight">
            powered by <span className="text-indigo-400 font-medium">FRED</span>
          </div>
        </div>
      </Link>

      {/* Main Nav */}
      <nav className="mb-6">
        <div className="text-xs uppercase text-slate-500 tracking-wider px-3 mb-3">
          Main
        </div>
        {mainNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
              isActive(item.href)
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/40"
                : "text-slate-400 hover:bg-indigo-500/10 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 opacity-80" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Metrics Nav */}
      <nav className="mb-6">
        <div className="text-xs uppercase text-slate-500 tracking-wider px-3 mb-3">
          Metrics
        </div>
        {metricsNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
              isActive(item.href)
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/40"
                : "text-slate-400 hover:bg-indigo-500/10 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 opacity-80" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Settings Nav */}
      <nav>
        <div className="text-xs uppercase text-slate-500 tracking-wider px-3 mb-3">
          Settings
        </div>
        {settingsNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
              isActive(item.href)
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/40"
                : "text-slate-400 hover:bg-indigo-500/10 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 opacity-80" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
