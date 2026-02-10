"use client";

import { useEffect, useState } from "react";

export default function AffordabilityGauge() {
  const score = 92.4;
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function for smooth animation
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(score * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Calculate needle rotation (-135deg to 135deg for 270deg arc)
  const needleRotation = -135 + (animatedScore / 100) * 270;

  // Get color based on score (lower = better/green, higher = worse/red) - 0-100 scale
  const getScoreColor = (s: number) => {
    if (s <= 25) return "#22c55e";
    if (s <= 50) return "#84cc16";
    if (s <= 70) return "#eab308";
    if (s <= 85) return "#f97316";
    return "#ef4444";
  };

  const getScoreLabel = (s: number) => {
    if (s <= 25) return "Excellent";
    if (s <= 50) return "Good";
    if (s <= 70) return "Fair";
    if (s <= 85) return "Poor";
    return "Critical";
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Affordability Index</h3>
        <p className="text-sm text-slate-400 mt-1">Housing affordability score</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-[280px] h-[180px]">
          {/* SVG Gauge */}
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <defs>
              {/* Gradient for the arc - green (good/low) to red (critical/high) */}
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="25%" stopColor="#84cc16" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="75%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Drop shadow for needle */}
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Background arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#1e293b"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Colored arc with gradient */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="16"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: "251.2",
                strokeDashoffset: 251.2 - (animatedScore / 100) * 251.2,
              }}
            />

            {/* Tick marks */}
            {[0, 20, 40, 60, 80, 100].map((tick, i) => {
              const angle = (-135 + (tick / 100) * 270) * (Math.PI / 180);
              const x1 = 100 + 65 * Math.cos(angle);
              const y1 = 100 + 65 * Math.sin(angle);
              const x2 = 100 + 72 * Math.cos(angle);
              const y2 = 100 + 72 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#475569"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Needle - white color, centered at gauge center */}
            <g
              transform={`rotate(${needleRotation}, 100, 100)`}
              filter="url(#shadow)"
            >
              <polygon
                points="100,40 96,100 104,100"
                fill="#ffffff"
                className="drop-shadow-lg"
              />
              <circle cx="100" cy="100" r="8" fill="#ffffff" />
              <circle cx="100" cy="100" r="4" fill="#0f172a" />
            </g>

            {/* Min/Max labels */}
            <text x="15" y="115" fill="#64748b" fontSize="10" textAnchor="middle">0</text>
            <text x="185" y="115" fill="#64748b" fontSize="10" textAnchor="middle">100</text>
          </svg>

        </div>

        {/* Score display - below the gauge */}
        <div className="text-center -mt-2">
          <div className="text-5xl font-bold text-white">
            {animatedScore.toFixed(1)}
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              backgroundColor: `${getScoreColor(score)}20`,
              color: getScoreColor(score),
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: getScoreColor(score) }}
            />
            {getScoreLabel(score)}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded-sm bg-green-500" />
            <span>Good</span>
          </div>
          <span className="mx-1">→</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded-sm bg-yellow-500" />
            <span>Fair</span>
          </div>
          <span className="mx-1">→</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded-sm bg-orange-500" />
            <span>Poor</span>
          </div>
          <span className="mx-1">→</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded-sm bg-red-500" />
            <span>Critical</span>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-4 text-center text-sm text-slate-400">
          Based on income-to-price ratio
        </div>
      </div>
    </div>
  );
}
