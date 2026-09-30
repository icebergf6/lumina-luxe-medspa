import React from 'react';
import { ShieldCheck, Activity, Sparkles, Award, CheckCircle2, TrendingUp, Info } from 'lucide-react';

export const BiometricLongevityRadar: React.FC = () => {
  // Biometric radar indicators
  const metrics = [
    { label: 'Collagen Density', value: 94, benchmark: '92nd Percentile', status: 'Optimal' },
    { label: 'Deep Hydration', value: 91, benchmark: '88th Percentile', status: 'Hydrated' },
    { label: 'Barrier Resilience', value: 96, benchmark: '95th Percentile', status: 'Fortified' },
    { label: 'Elasticity Matrix', value: 89, benchmark: '86th Percentile', status: 'Firm' },
    { label: 'Vascular Uniformity', value: 93, benchmark: '90th Percentile', status: 'Even Tone' },
  ];

  // Radar points polygon calculations (Radius 90, Center 120, 120)
  // Angle: -90, -18, 54, 126, 198 degrees
  const center = 120;
  const maxR = 85;

  const getCoordinates = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (value / 100) * maxR;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polyPoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(m.value, i, metrics.length);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const baselinePoints = metrics
    .map((_, i) => {
      const { x, y } = getCoordinates(70, i, metrics.length); // 70% baseline before treatments
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="glass-panel bg-[#111827]/85 rounded-3xl p-6 sm:p-8 border border-[#C5A880]/35 shadow-2xl relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider mb-1 font-mono">
            <Activity className="w-4 h-4 text-[#C5A880]" />
            <span>Cellular Longevity & Dermal Health Passport</span>
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold text-white">
            Sophia Laurent's Biological Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrated post Morpheus8 & Sculptra biostimulation protocol · Last updated 48 hours ago
          </p>
        </div>

        {/* Longevity Score Badge */}
        <div className="flex items-center gap-3 bg-[#0B0F19]/90 px-4 py-2.5 rounded-2xl border border-[#C5A880]/40">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Skin Vitality Index</span>
            <span className="text-xl font-bold font-serif-luxury text-[#E2CFB6]">92.6 / 100</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
            -7.4y
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Vector + Telemetry Table + Board Seal */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: SVG Dermal Radar Diagram */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            <svg viewBox="0 0 240 240" className="w-full h-full filter drop-shadow-xl">
              {/* Background Concentric Radar Webs (20%, 40%, 60%, 80%, 100%) */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((step, idx) => {
                const ringPoints = metrics
                  .map((_, i) => {
                    const angle = (Math.PI * 2 / metrics.length) * i - Math.PI / 2;
                    const r = step * maxR;
                    return `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;
                  })
                  .join(' ');
                return (
                  <polygon
                    key={idx}
                    points={ringPoints}
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="1"
                    strokeDasharray={idx === 4 ? 'none' : '2 3'}
                  />
                );
              })}

              {/* Axis Spokes from center */}
              {metrics.map((_, i) => {
                const angle = (Math.PI * 2 / metrics.length) * i - Math.PI / 2;
                const x2 = center + maxR * Math.cos(angle);
                const y2 = center + maxR * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x2}
                    y2={y2}
                    stroke="#334155"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Baseline Polygon (Initial state, 70%) */}
              <polygon
                points={baselinePoints}
                fill="rgba(100, 116, 139, 0.15)"
                stroke="#64748B"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Active Current Dermal Matrix Polygon (Golden Gradient) */}
              <polygon
                points={polyPoints}
                fill="url(#radarGoldFill)"
                stroke="#C5A880"
                strokeWidth="2.2"
              />

              {/* Radar Coordinate Vertex Dots */}
              {metrics.map((m, i) => {
                const { x, y } = getCoordinates(m.value, i, metrics.length);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#E2CFB6"
                    stroke="#0B0F19"
                    strokeWidth="1.5"
                  />
                );
              })}

              <defs>
                <linearGradient id="radarGoldFill" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E2CFB6" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#C5A880" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono mt-2">
            <span className="flex items-center gap-1.5 text-[#E2CFB6]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
              <span>Current Matrix (92.6)</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-0.5 bg-slate-500 border border-slate-500" />
              <span>Pre-Treatment Baseline (70.0)</span>
            </span>
          </div>
        </div>

        {/* Right: Metrics Breakdown & Digital Wax Seal */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Metrics List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-[#C5A880]/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{m.label}</span>
                  <span className="font-mono font-bold text-[#E2CFB6]">{m.value}%</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>{m.benchmark}</span>
                  <span className="text-emerald-400 font-medium">{m.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Physician Evaluation Note & Digital Wax Seal Card */}
          <div className="p-4 rounded-2xl bg-[#0B0F19]/90 border border-[#C5A880]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="space-y-1">
              <div className="text-[10px] text-[#C5A880] uppercase tracking-wider font-mono font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Physician Longevity Attestation</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                "Patient exhibits robust cellular neocollagenesis. Extracellular framework exhibits youthful viscoelastic recoil with exceptional barrier hydration."
              </p>
              <div className="text-[11px] text-slate-400 pt-0.5">
                Dr. Eleanor Vance, MD • Medical Director
              </div>
            </div>

            {/* Digital Gold Wax Seal Stamp */}
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-[#E2CFB6] via-[#C5A880] to-[#7D5C2C] p-[1.5px] shadow-lg shadow-[#C5A880]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0E1524] rounded-full p-1 flex flex-col items-center justify-center text-center border border-[#C5A880]/50 relative">
                <Award className="w-4 h-4 text-[#E2CFB6] mb-0.5" />
                <span className="text-[7px] font-mono tracking-widest text-[#E2CFB6] uppercase font-bold leading-tight">
                  BEVERLY HILLS
                </span>
                <span className="text-[6px] font-mono text-[#C5A880] uppercase leading-none mt-0.5">
                  VERIFIED
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
