import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Calendar, Star, ShieldCheck, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { goToDashboard, setOpenBookingModal } = useAuth();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-28">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A880]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161F30] border border-[#C5A880]/30 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-xs font-medium text-[#E2CFB6] tracking-wide">
                Beverly Hills & Manhattan Flagship Simulation
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Elegance <span className="gold-gradient-text italic font-normal">Redefined</span>,<br />
              Clinical Science Perfected.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed prose-readable">
              A bespoke digital clinic operating system engineered for premier medical aesthetics. Seamless online scheduling, digital consent charting, client records CRM, and real-time revenue telemetry.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => goToDashboard()}
                className="w-full sm:w-auto btn-gold px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-base font-semibold shadow-xl shadow-[#C5A880]/20 cursor-pointer"
              >
                <span>Launch Interactive Portal</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={() => setOpenBookingModal(true)}
                className="w-full sm:w-auto btn-secondary px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-base cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>Book Consultation Online</span>
              </button>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="flex items-center gap-1 text-[#C5A880] font-bold text-lg sm:text-2xl font-serif-luxury">
                  <span>4.98</span>
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">350+ Sample Reviews</div>
              </div>

              <div>
                <div className="text-white font-bold text-lg sm:text-2xl font-serif-luxury">94.6%</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Client Retention</div>
              </div>

              <div>
                <div className="text-white font-bold text-lg sm:text-2xl font-serif-luxury">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">FDA-Cleared Tech</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Luxury Image with explicit dimensions (no CLS) */}
              <div className="relative rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-2xl shadow-black/80 aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
                  alt="Aesthetic medical clinician performing non-invasive dermal treatment in private luxury clinic suite"
                  width={800}
                  height={550}
                  loading="eager"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-85" />
                
                {/* Floating Bottom Card: Treatment Status */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel bg-[#0B0F19]/85 border border-[#C5A880]/30 shadow-lg">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#C5A880] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> HydraFacial Deluxe & RF
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium text-[11px] border border-emerald-500/30">
                      Confirmed Today
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Today • 11:00 AM</span>
                    </div>
                    <div className="font-semibold text-white">
                      Eleanor Vance, Clinical Director
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Top Left */}
              <div className="absolute -top-5 -left-5 p-3.5 rounded-2xl glass-panel bg-[#111827]/90 border border-[#C5A880]/30 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Clinical Aesthetics</div>
                  <div className="text-[11px] text-slate-400">Accredited Protocols</div>
                </div>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-6 -right-4 p-3.5 rounded-2xl glass-panel bg-[#111827]/90 border border-[#C5A880]/30 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C5A880]/20 flex items-center justify-center text-[#E2CFB6]">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Live Patient Portal</div>
                  <div className="text-[11px] text-slate-400">Instant Online Scheduling</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Vetted Technology & Equipment Trust Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80">
          <div className="text-center text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Engineered For Modern Aesthetics & MedSpa Equipment Integrations
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-400">
            <span className="flex items-center gap-2 hover:text-[#C5A880] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Morpheus8 RF
            </span>
            <span className="flex items-center gap-2 hover:text-[#C5A880] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> HydraFacial MD
            </span>
            <span className="flex items-center gap-2 hover:text-[#C5A880] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Candela Medical
            </span>
            <span className="flex items-center gap-2 hover:text-[#C5A880] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> LightStim LED
            </span>
            <span className="flex items-center gap-2 hover:text-[#C5A880] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Allergan Aesthetics
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
