import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import heroModelImg from '../../assets/images/hero-model.jpg';
import {
  ArrowRight,
  Calendar,
  Star,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Activity,
  Layers,
  Heart,
  Stethoscope,
  Check,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { goToDashboard, setOpenBookingModal, triggerBookingWithService } = useAuth();
  const [activeHighlight, setActiveHighlight] = useState<'morpheus' | 'hydra' | 'sculptra'>('morpheus');

  const highlightData = {
    morpheus: {
      id: 'srv_morpheus',
      title: 'Morpheus8 RF Microneedling',
      tag: 'Subdermal Adipose Remodeling',
      duration: '60 min',
      provider: 'Dr. Eleanor Vance, MD',
      downtime: '1-2 Days Social Recovery',
      clinicalFocus: 'Deep Collagen Matrix & Fractional Remodeling',
    },
    hydra: {
      id: 'srv_hydra',
      title: 'HydraFacial Deluxe & LED',
      tag: 'Vortex Nutrient Infusion',
      duration: '45 min',
      provider: 'Chloe Rivera, NP',
      downtime: 'Zero Downtime · Instant Glow',
      clinicalFocus: 'Cellular Hydration & Deep Follicular Cleanse',
    },
    sculptra: {
      id: 'srv_sculptra',
      title: 'Sculptra Biostimulation',
      tag: 'PLLA Collagen Regeneration',
      duration: '50 min',
      provider: 'Dr. Eleanor Vance, MD',
      downtime: 'Minimal Swelling · 24 Hours',
      clinicalFocus: 'Structural Volumization & Fibroblast Activation',
    },
  };

  const current = highlightData[activeHighlight];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-14 lg:pb-24 min-h-[85vh] flex items-center">
      {/* Background Model Image with Luxury Cinematic Overlay (Ultra-Clear Right Side) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={heroModelImg}
          alt="Lumina Luxe Aesthetic Sanctuary"
          className="w-full h-full object-cover object-[75%_25%] lg:object-right-top opacity-85 lg:opacity-95 filter contrast-105 brightness-100 transition-all duration-700"
        />
        {/* Horizontal Gradient: Darker behind left headline text for crisp contrast, completely clear on the model portrait */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 via-45% to-[#0B0F19]/30 lg:to-transparent" />
        {/* Vertical subtle vignette to ground navbar and next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-transparent to-[#0B0F19] pointer-events-none" />
        {/* Soft Ambient Gold Glow */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#C5A880]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Micro-Concierge Availability Alert */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-[#C5A880]/40 shadow-lg text-xs backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-300 font-medium">
              Next VIP Suite Availability:
            </span>
            <span className="text-[#E2CFB6] font-semibold">
              Today, 3:30 PM with Dr. Vance
            </span>
            <button
              type="button"
              onClick={() => setOpenBookingModal(true)}
              className="text-[#C5A880] hover:text-white underline underline-offset-2 font-semibold ml-1 cursor-pointer flex items-center gap-0.5"
            >
              <span>Reserve</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline, Value Proposition & Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Prestige Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2A]/90 border border-[#C5A880]/30 shadow-inner backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#E2CFB6]">
                Beverly Hills & Manhattan · Clinical Longevity OS
              </span>
            </div>

            {/* Main Luxury Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.08]">
              Elegance <span className="gold-gradient-text italic font-normal">Redefined</span>,<br />
              Clinical Science <span className="text-slate-100">Perfected.</span>
            </h1>

            {/* Editorial Narrative */}
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed prose-readable">
              A bespoke digital operating system crafted for premier medical aesthetics and longevity practices. Seamless online scheduling, digital consent charting, client records CRM, and real-time revenue velocity telemetry.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => setOpenBookingModal(true)}
                className="w-full sm:w-auto btn-gold px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-base font-bold shadow-2xl shadow-[#C5A880]/25 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4 text-[#0B0F19]" />
                <span>Reserve Consultation</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => goToDashboard()}
                className="w-full sm:w-auto btn-secondary px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-base font-semibold cursor-pointer flex items-center justify-center gap-2 group backdrop-blur-md bg-slate-900/80"
              >
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Launch Interactive Portal</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* High-Impact Clinical Telemetry Strip */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-6 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0 text-left">
              <div>
                <div className="flex items-center gap-1 text-[#C5A880] font-bold text-xl sm:text-2xl font-serif-luxury">
                  <span>4.98</span>
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">350+ Verified Client Reviews</div>
              </div>

              <div>
                <div className="text-white font-bold text-xl sm:text-2xl font-serif-luxury">94.6%</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">VIP Patient Retention</div>
              </div>

              <div>
                <div className="text-white font-bold text-xl sm:text-2xl font-serif-luxury">100%</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">FDA-Cleared Modalities</div>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Floating Glass Telemetry HUD (Doesn't block model background) */}
          <div className="lg:col-span-5 relative z-10 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md space-y-3.5">
              
              {/* Floating Specialist Live Status Pill */}
              <div className="p-3.5 rounded-2xl glass-panel bg-[#0B0F19]/65 backdrop-blur-xl border border-[#C5A880]/30 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1594824813627-c1040375f46a?auto=format&fit=crop&q=80&w=200"
                      alt="Dr. Eleanor Vance"
                      className="w-10 h-10 rounded-full object-cover border border-[#C5A880]/40"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B0F19]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Dr. Eleanor Vance, MD</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#C5A880]/20 text-[#E2CFB6] rounded border border-[#C5A880]/30 font-mono">
                        Chief Physician
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Clinical Suite 4 • Rodeo Drive Flagship
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-semibold block uppercase tracking-wider">
                    Available Today
                  </span>
                  <span className="text-xs font-bold text-[#E2CFB6] font-mono">
                    3:30 PM
                  </span>
                </div>
              </div>

              {/* Procedure Selector Mini-Tabs & Live Protocol HUD */}
              <div className="p-4 sm:p-5 rounded-3xl glass-panel bg-[#0B0F19]/70 backdrop-blur-2xl border border-[#C5A880]/35 shadow-2xl space-y-4">
                
                {/* Header & Tabs */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Signature Aesthetic Protocols</span>
                    </span>
                    <span className="text-[10px] text-[#C5A880] font-mono">Live Telemetry</span>
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-3 gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                    {(['morpheus', 'hydra', 'sculptra'] as const).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveHighlight(key)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                          activeHighlight === key
                            ? 'bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] text-[#0B0F19] font-bold shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        {key === 'morpheus' ? 'Morpheus8' : key === 'hydra' ? 'HydraFacial' : 'Sculptra'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Protocol Specs */}
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{current.title}</div>
                      <div className="text-[11px] text-[#C5A880] font-medium">{current.tag}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                      {current.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 font-light border-t border-slate-800/70 pt-2">
                    {current.clinicalFocus}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C5A880]" />
                      <span>{current.downtime}</span>
                    </span>
                    <span className="text-white font-medium">Attended by {current.provider.split(',')[0]}</span>
                  </div>
                </div>

                {/* Action button inside HUD */}
                <button
                  type="button"
                  onClick={() => triggerBookingWithService(current.id)}
                  className="w-full py-2.5 rounded-xl bg-[#C5A880]/20 hover:bg-[#C5A880]/30 border border-[#C5A880]/40 text-[#E2CFB6] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Book This Treatment</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

              </div>

              {/* Sub-Card Strip: Trust & Digital Intake */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-2xl glass-panel bg-[#0B0F19]/60 border border-slate-800/80 flex items-center gap-2.5 backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white truncate">Board Certified</div>
                    <div className="text-[9px] text-slate-400 truncate">Beverly Hills & Manhattan</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl glass-panel bg-[#0B0F19]/60 border border-slate-800/80 flex items-center gap-2.5 backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#E2CFB6] flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white truncate">Digital Consent E-Sign</div>
                    <div className="text-[9px] text-slate-400 truncate">Paperless Patient Intake</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Vetted Technology & Equipment Trust Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-5">
            Engineered For Modern Aesthetics & MedSpa Equipment Integrations
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 hover:border-[#C5A880]/40 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Morpheus8 RF Microneedling
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 hover:border-[#C5A880]/40 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> HydraFacial MD Vortex
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 hover:border-[#C5A880]/40 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Candela Medical Lasers
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 hover:border-[#C5A880]/40 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> LightStim Clinical LED
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 hover:border-[#C5A880]/40 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Allergan Aesthetics
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

