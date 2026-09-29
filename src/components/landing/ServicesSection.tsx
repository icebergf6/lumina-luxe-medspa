import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { ServiceItem } from '../../types';
import { Clock, Sparkles, ArrowRight, Shield, Activity, Layers, CheckCircle2, X, ChevronRight, Info } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { triggerBookingWithService } = useAuth();
  const { formatPrice } = useCurrency();
  const [services] = useState<ServiceItem[]>(() => StorageService.getServices());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProtocolModal, setActiveProtocolModal] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Aesthetic', 'Anti-Aging', 'Body Contouring', 'Wellness'];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="treatments" className="py-24 bg-[#0A0E17] border-t border-b border-[#C5A880]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141C2B] border border-[#C5A880]/35 text-xs font-semibold text-[#E2CFB6] mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="tracking-widest uppercase text-[11px]">Curated Clinical Menu</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            Advanced Medical Aesthetics & Therapies
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Every procedure is customized to individual facial architecture and cellular biomarkers using FDA-cleared energy modalities and pharmaceutical-grade biostimulators.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-lg shadow-[#C5A880]/20 scale-105'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group glass-card bg-[#111827]/85 rounded-3xl overflow-hidden border border-slate-800 hover:border-[#C5A880]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Service Image with explicit aspect ratio */}
                <div className="relative h-60 overflow-hidden aspect-[16/10] bg-slate-950">
                  <img
                    src={service.image}
                    alt={service.name}
                    width={600}
                    height={380}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent opacity-95" />
                  
                  {/* Category & Signature Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-[#0B0F19]/90 backdrop-blur-md text-[10px] font-semibold text-[#E2CFB6] border border-[#C5A880]/30 tracking-wider uppercase">
                      {service.category}
                    </span>
                    {service.popular && (
                      <span className="px-2.5 py-1 rounded-full bg-[#C5A880] text-[#0B0F19] text-[10px] font-bold tracking-wider uppercase shadow">
                        Signature
                      </span>
                    )}
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3.5 right-3.5 px-3.5 py-1.5 rounded-xl bg-[#0B0F19]/90 backdrop-blur-md border border-[#C5A880]/35 shadow-lg">
                    <span className="text-[11px] text-slate-400 font-light">From </span>
                    <span className="text-base font-bold text-white font-serif-luxury">{formatPrice(service.price)}</span>
                  </div>
                </div>

                {/* Details & Telemetry */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white font-serif-luxury tracking-wide group-hover:text-[#E2CFB6] transition-colors line-clamp-1">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Clinical Specifications Pill Grid */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    {service.downtime && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-[#C5A880]" /> Downtime:
                        </span>
                        <span className="text-slate-200 font-medium">{service.downtime}</span>
                      </div>
                    )}
                    {service.targetLayer && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-[#C5A880]" /> Depth:
                        </span>
                        <span className="text-slate-200 font-medium truncate max-w-[190px] text-right">{service.targetLayer}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> Duration:
                      </span>
                      <span className="text-slate-200 font-medium">{service.durationMinutes} Minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions: Quick Details & Book */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveProtocolModal(service)}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-[#E2CFB6] hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>View Clinical Protocol</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerBookingWithService(service.id)}
                  className="w-full btn-gold py-2.5 text-xs font-bold flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <span>Select & Book Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Slide-Over Clinical Protocol Modal */}
      {activeProtocolModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProtocolModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div className="max-w-xl w-full bg-[#0F172A] border border-[#C5A880]/40 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl relative animate-scale-up max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveProtocolModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              aria-label="Close protocol details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Clinical Protocol Overview</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              {activeProtocolModal.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light leading-relaxed">
              {activeProtocolModal.description}
            </p>

            {/* Telemetry Matrix Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Modality</div>
                <div className="text-xs font-semibold text-[#E2CFB6] mt-0.5">{activeProtocolModal.modality || 'Clinical Energy Modality'}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Target Tissue</div>
                <div className="text-xs font-semibold text-white mt-0.5">{activeProtocolModal.targetLayer || 'Dermal Matrix'}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Recovery Profile</div>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">{activeProtocolModal.downtime || 'Zero Downtime'}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Recommended Cadence</div>
                <div className="text-xs font-semibold text-white mt-0.5">{activeProtocolModal.recommendedSessions || 3} Sessions Protocol</div>
              </div>
            </div>

            {/* Standard 4-Step Patient Experience */}
            <div className="mt-6 space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Standard Clinical Sequence
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span><strong>Clinical Facial Mapping:</strong> High-resolution biomarker imaging to calibrate exact energy depth and treatment boundaries.</span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span><strong>Topical Preparation:</strong> Pharmaceutical-grade numbing and antiseptic epidermal sterilization.</span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span><strong>Targeted Procedure Delivery:</strong> Precise clinician-guided execution calibrated to anatomical milestones.</span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <span><strong>Post-Procedure Soothing & Home Care:</strong> Calming peptide serum infusion and personalized aftercare instructions.</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-mono">Investment</div>
                <div className="text-xl font-bold font-serif-luxury text-white">{formatPrice(activeProtocolModal.price)}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const srvId = activeProtocolModal.id;
                  setActiveProtocolModal(null);
                  triggerBookingWithService(srvId);
                }}
                className="btn-gold px-6 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Reserve Consultation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

