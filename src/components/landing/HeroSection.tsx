import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
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
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { goToDashboard, setOpenBookingModal } = useAuth();
  const [activeHighlight, setActiveHighlight] = useState<'morpheus' | 'hydra' | 'sculptra'>('morpheus');

  const highlightData = {
    morpheus: {
      title: 'Morpheus8 RF Microneedling',
      tag: 'Subdermal Adipose Remodeling',
      duration: '60 min',
      provider: 'Dr. Eleanor Vance, MD',
      downtime: '1-2 Days Social Recovery',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=900',
    },
    hydra: {
      title: 'HydraFacial Deluxe & LED',
      tag: 'Vortex Nutrient Infusion',
      duration: '45 min',
      provider: 'Chloe Rivera, NP',
      downtime: 'Zero Downtime · Instant Glow',
      image: 'https://images.unsplash.com/photo-1512290900672-1f4a9744cf2f?auto=format&fit=crop&q=80&w=900',
    },
    sculptra: {
      title: 'Sculptra Biostimulation',
      tag: 'PLLA Collagen Regeneration',
      duration: '50 min',
      provider: 'Dr. Eleanor Vance, MD',
      downtime: 'Minimal Swelling · 24 Hours',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900',
    },
  };

  const current = highlightData[activeHighlight];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Model Image with Luxury Cinematic Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/images/hero-model.jpg"
          alt="Lumina Luxe Aesthetic Model"
          className="w-full h-full object-cover object-[70%_25%] lg:object-right-top opacity-35 filter contrast-110 brightness-90 transition-all duration-1000"
        />
        {/* Soft Radial & Linear Gradients for Seamless Navy/Gold Integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(197,168,128,0.14),transparent_70%)]" />
      </div>

      {/* Background Ambient Luxury Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A880]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] bg-[#9D7B50]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
                className="w-full sm:w-auto btn-secondary px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-base font-semibold cursor-pointer flex items-center justify-center gap-2 group"
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

          {/* Right Column: Interactive Clinical Procedure Showcase */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-3">
              
              {/* Header Bar: Clinical Badge + Procedure Selector Mini-Tabs (Clean, Zero Collision) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-[#111827]/90 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2 px-2.5 py-1 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-white tracking-wide">Live Clinical Suites</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80">
                  {(['morpheus', 'hydra', 'sculptra'] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveHighlight(key)}
                      className={`py-1 px-2.5 rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                        activeHighlight === key
                          ? 'bg-[#C5A880] text-[#0B0F19] shadow-sm font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {key === 'morpheus' ? 'Morpheus8' : key === 'hydra' ? 'HydraFacial' : 'Sculptra'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Luxury Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-[#C5A880]/35 shadow-2xl shadow-black/80 aspect-[16/11] bg-slate-950 group">
                <img
                  key={current.title}
                  src={current.image}
                  alt={current.title}
                  width={900}
                  height={620}
                  loading="eager"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105 animate-fade-in duration-500 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/30 to-transparent pointer-events-none" />
                
                {/* Embedded Top Left Glass Badge */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl glass-panel bg-[#0B0F19]/85 border border-[#C5A880]/30 shadow-lg flex items-center gap-2 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-semibold text-white tracking-wide">Board-Certified Facility</span>
                </div>

                {/* Bottom Card: Real-Time Procedure Telemetry */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 p-3.5 rounded-2xl glass-panel bg-[#0B0F19]/90 border border-[#C5A880]/30 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#C5A880] font-bold flex items-center gap-1.5 truncate">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" /> {current.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30 flex-shrink-0">
                      {current.duration}
                    </span>
                  </div>
                  
                  <div className="text-[11px] text-slate-300 flex items-center justify-between mt-1">
                    <span className="font-light text-slate-400">{current.tag}</span>
                    <span className="text-[10px] text-[#E2CFB6]">{current.downtime}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Next Slot: Today 3:30 PM</span>
                    </div>
                    <div className="font-semibold text-white truncate">
                      {current.provider}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Card Strip: Trust & Digital Intake (Cleanly Placed Below, Zero Collision) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-2xl glass-panel bg-[#111827]/80 border border-slate-800/80 flex items-center gap-2.5 backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white truncate">Beverly Hills & Manhattan</div>
                    <div className="text-[9px] text-slate-400 truncate">Dual Coastal Flagships</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl glass-panel bg-[#111827]/80 border border-slate-800/80 flex items-center gap-2.5 backdrop-blur-md">
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

