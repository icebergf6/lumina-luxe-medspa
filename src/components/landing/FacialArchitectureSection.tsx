import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Activity,
  Layers,
  Clock,
  Calendar,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface FacialZone {
  id: string;
  name: string;
  landmark: string;
  x: number; // percentage
  y: number; // percentage
  recommendedServiceId: string;
  procedureName: string;
  primaryConcern: string;
  clinicalSolution: string;
  targetLayer: string;
  recoveryDowntime: string;
  typicalSessions: string;
  expectedResult: string;
}

export const FacialArchitectureSection: React.FC = () => {
  const { triggerBookingWithService } = useAuth();

  const facialZones: FacialZone[] = [
    {
      id: 'upper_brow',
      name: 'Frontalis & Glabella Apex',
      landmark: 'Upper Facial Third',
      x: 50,
      y: 19,
      recommendedServiceId: 'srv_xeomin',
      procedureName: 'Micro-Dosed Neurotoxin Smoothing',
      primaryConcern: 'Horizontal forehead bands & hyperactive frown furrowing',
      clinicalSolution: 'Hyper-targeted neuromodulator relaxation preserving full expressive brow mobility.',
      targetLayer: 'Intramuscular / Superficial Frontalis (1.5mm)',
      recoveryDowntime: 'Zero Social Downtime',
      typicalSessions: '1 Session / 3-4 Months',
      expectedResult: 'Velvety smooth forehead with natural expressive animation',
    },
    {
      id: 'periorbital',
      name: 'Periorbital & Tear Trough',
      landmark: 'Orbicularis Oculi Margin',
      x: 68,
      y: 34,
      recommendedServiceId: 'srv_hydra',
      procedureName: 'HydraFacial Eye Perk & Cellular Infusion',
      primaryConcern: 'Under-eye hollowing, micro-crepiness & lymphatic stagnation',
      clinicalSolution: 'Non-crosslinked hyaluronic matrix wash with bioactive peptides and LED phototherapy.',
      targetLayer: 'Papillary Dermis & Lymphatic Micro-Channels',
      recoveryDowntime: 'Instant Luminescence',
      typicalSessions: 'Monthly Maintenance',
      expectedResult: 'Refreshed, awake gaze with diminished dark cast',
    },
    {
      id: 'malar_cheek',
      name: 'Malar Apex & Mid-Face Vector',
      landmark: 'Zygomatic Arch & Sub-Malar Fat',
      x: 32,
      y: 45,
      recommendedServiceId: 'srv_sculptra',
      procedureName: 'Sculptra PLLA Biostimulation',
      primaryConcern: 'Volume deflation, temple flattening & structural descent',
      clinicalSolution: 'Subdermal micro-particle poly-L-lactic acid stimulating de-novo type I & III collagen deposition.',
      targetLayer: 'Deep Periosteal & Subdermal Fascia (4.0mm)',
      recoveryDowntime: '12–24h Mild Sensitivity',
      typicalSessions: '2–3 Sessions Over 16 Weeks',
      expectedResult: 'Sculpted youthful high-cheekbone lift without pillowy distortion',
    },
    {
      id: 'nasolabial_perioral',
      name: 'Nasolabial & Perioral Complex',
      landmark: 'Mid to Lower Transition',
      x: 50,
      y: 58,
      recommendedServiceId: 'srv_laser_genesis',
      procedureName: 'Laser Genesis Collagen Synthesis',
      primaryConcern: 'Smile fold deepening, marionette shadows & textural porosity',
      clinicalSolution: 'Gentle micro-pulsed 1064nm Nd:YAG laser heating microvasculature to accelerate dermal remodeling.',
      targetLayer: 'Upper Reticular Dermis',
      recoveryDowntime: 'Zero Downtime',
      typicalSessions: '4 Sessions / Bi-Weekly',
      expectedResult: 'Plumped, softened smile dynamics and refined pores',
    },
    {
      id: 'mandibular_jawline',
      name: 'Mandibular Border & Submental Angle',
      landmark: 'Cervicofacial & Jowl Margin',
      x: 50,
      y: 78,
      recommendedServiceId: 'srv_morpheus',
      procedureName: 'Morpheus8 Subdermal RF Remodeling',
      primaryConcern: 'Lower jawline softening, early jowling & submental laxity',
      clinicalSolution: 'Fractional gold-plated microneedle RF coagulation of fibroseptal network and adipose remodeling.',
      targetLayer: 'SMAS & Deep Subdermal Adipose (3.0mm – 4.0mm)',
      recoveryDowntime: '24–48 Hours',
      typicalSessions: '2–3 Sessions',
      expectedResult: 'Crisp, razor-defined jawline contour and taut neck angle',
    },
  ];

  const [activeZoneId, setActiveZoneId] = useState<string>('mandibular_jawline');
  const activeZone = facialZones.find((z) => z.id === activeZoneId) || facialZones[0];

  return (
    <section id="facial-architecture" className="py-24 bg-[#0A0F1D] relative border-b border-[#C5A880]/15 overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A880]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2A] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3.5 shadow-inner">
            <Activity className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="tracking-widest uppercase text-[11px] font-mono">
              Precision Anatomical Analysis
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            Interactive Facial <span className="gold-gradient-text italic font-normal">Architecture</span> Guide
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Select an anatomical facial zone to explore calibrated physician protocols engineered for golden ratio balance and regenerative longevity.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Silhouette Map */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Visual Silhouette Canvas Container */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#0B0F19] border border-[#C5A880]/30 shadow-2xl p-6 flex items-center justify-center overflow-hidden">
              
              {/* Silhouette Vector Blueprint Background */}
              <svg
                viewBox="0 0 300 380"
                className="w-full h-full opacity-70 filter drop-shadow-md select-none pointer-events-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Facial Head Outline */}
                <path
                  d="M150 45 C195 45 228 85 228 145 C228 210 200 280 150 330 C100 280 72 210 72 145 C72 85 105 45 150 45 Z"
                  stroke="#C5A880"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  opacity="0.4"
                />
                {/* Golden Ratio Anatomical Guide Axes */}
                <line x1="60" y1="120" x2="240" y2="120" stroke="#C5A880" strokeWidth="0.75" opacity="0.25" />
                <line x1="60" y1="195" x2="240" y2="195" stroke="#C5A880" strokeWidth="0.75" opacity="0.25" />
                <line x1="60" y1="265" x2="240" y2="265" stroke="#C5A880" strokeWidth="0.75" opacity="0.25" />
                <line x1="150" y1="40" x2="150" y2="340" stroke="#C5A880" strokeWidth="0.75" opacity="0.25" />

                {/* Subtle Facial Features Guidelines */}
                {/* Brows */}
                <path d="M105 118 Q125 110 142 118" stroke="#E2CFB6" strokeWidth="1.2" opacity="0.5" />
                <path d="M158 118 Q175 110 195 118" stroke="#E2CFB6" strokeWidth="1.2" opacity="0.5" />
                {/* Eyes */}
                <path d="M110 130 Q125 125 140 130 Q125 135 110 130 Z" stroke="#C5A880" strokeWidth="1" opacity="0.4" />
                <path d="M160 130 Q175 125 190 130 Q175 135 160 130 Z" stroke="#C5A880" strokeWidth="1" opacity="0.4" />
                {/* Nose Profile */}
                <path d="M150 120 L150 190 L140 195" stroke="#E2CFB6" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                {/* Lips */}
                <path d="M130 225 Q150 220 170 225 Q150 235 130 225 Z" stroke="#C5A880" strokeWidth="1" opacity="0.4" />
                {/* Jaw contour line */}
                <path d="M85 200 Q150 340 215 200" stroke="#E2CFB6" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.3" />
              </svg>

              {/* Interactive Golden Landmarks */}
              {facialZones.map((zone) => {
                const isActive = activeZoneId === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setActiveZoneId(zone.id)}
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                    aria-label={`Inspect ${zone.name}`}
                  >
                    {/* Pulsing Ripple on Active */}
                    {isActive && (
                      <span className="absolute -inset-2.5 rounded-full bg-[#C5A880]/30 animate-ping" />
                    )}
                    
                    {/* Node Core */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#9D7B50] text-[#0B0F19] shadow-lg shadow-[#C5A880]/50 scale-125'
                          : 'bg-slate-900/90 border border-[#C5A880]/60 text-[#E2CFB6] hover:scale-110 hover:border-[#C5A880]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden group-hover:block bg-[#0B0F19]/95 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-[#C5A880]/40 whitespace-nowrap shadow-xl z-20 pointer-events-none">
                      {zone.name}
                    </div>
                  </button>
                );
              })}

              {/* Subtle Overlay Instruction */}
              <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-slate-400 font-mono pointer-events-none">
                Tap any golden coordinate to diagnose
              </div>
            </div>

            {/* Quick Zone Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-md">
              {facialZones.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => setActiveZoneId(z.id)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    activeZoneId === z.id
                      ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-sm'
                      : 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {z.landmark}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Diagnostic Protocol Dossier */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-[#111827]/80 border border-[#C5A880]/35 shadow-2xl space-y-6">
              
              {/* Header Details */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-[#C5A880] uppercase tracking-widest font-mono font-semibold">
                    <span>{activeZone.landmark}</span>
                    <span>•</span>
                    <span className="text-emerald-400">Target Evaluated</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                    {activeZone.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">
                    Primary Concern: <span className="text-slate-200">{activeZone.primaryConcern}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#E2CFB6] border border-[#C5A880]/30 font-mono text-[10px] font-bold flex-shrink-0">
                  Zone Active
                </span>
              </div>

              {/* Recommended Clinical Protocol Box */}
              <div className="p-4 rounded-2xl bg-[#0B0F19]/90 border border-[#C5A880]/25 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                    Gold-Standard Modality
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> FDA Cleared
                  </span>
                </div>
                <div className="text-lg font-bold font-serif-luxury text-white text-[#E2CFB6]">
                  {activeZone.procedureName}
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {activeZone.clinicalSolution}
                </p>
              </div>

              {/* Clinical Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Tissue Plane</span>
                  <span className="font-semibold text-white mt-0.5 block truncate text-[11px]">
                    {activeZone.targetLayer}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Downtime</span>
                  <span className="font-semibold text-[#C5A880] mt-0.5 block truncate text-[11px]">
                    {activeZone.recoveryDowntime}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Cadence</span>
                  <span className="font-semibold text-white mt-0.5 block truncate text-[11px]">
                    {activeZone.typicalSessions}
                  </span>
                </div>
              </div>

              {/* Expected Clinical Trajectory */}
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span className="text-slate-300 text-[11px]">
                  <strong>Target Outcome:</strong> {activeZone.expectedResult}
                </span>
              </div>

              {/* Action Trigger */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => triggerBookingWithService(activeZone.recommendedServiceId)}
                  className="w-full sm:flex-1 btn-gold py-3.5 px-6 text-xs font-bold shadow-xl shadow-[#C5A880]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#0B0F19]" />
                  <span>Reserve Consultation for {activeZone.landmark}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
