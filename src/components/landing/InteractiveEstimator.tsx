import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Calculator, Check, ArrowRight, Sparkles, ShieldCheck, CreditCard, ChevronRight, Layers } from 'lucide-react';

export const InteractiveEstimator: React.FC = () => {
  const { setOpenBookingModal, triggerBookingWithService } = useAuth();
  const { formatPrice } = useCurrency();
  const services = StorageService.getServices();

  const [activeTab, setActiveTab] = useState<'custom' | 'signature' | 'executive'>('signature');
  const [selectedIds, setSelectedIds] = useState<string[]>([services[0]?.id || '', services[1]?.id || '']);
  const [sessions, setSessions] = useState<number>(3);

  // Pre-configured curated luxury tiers
  const signatureIds = [services[1]?.id || '', services[2]?.id || '']; // Sculptra + Morpheus8
  const executiveIds = [services[0]?.id || '', services[1]?.id || '', services[2]?.id || '', services[4]?.id || '']; // HydraFacial + Sculptra + Morpheus8 + NAD+

  const currentSelectedIds = activeTab === 'signature'
    ? signatureIds
    : activeTab === 'executive'
    ? executiveIds
    : selectedIds;

  const currentSessions = activeTab === 'signature' ? 3 : activeTab === 'executive' ? 4 : sessions;

  const toggleService = (id: string) => {
    setActiveTab('custom');
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedServices = services.filter((s) => currentSelectedIds.includes(s.id));
  const singleSessionSubtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalRawPrice = singleSessionSubtotal * currentSessions;
  const packageDiscountRate = activeTab === 'executive' ? 0.25 : activeTab === 'signature' ? 0.20 : currentSessions >= 4 ? 0.20 : currentSessions >= 3 ? 0.15 : 0.05;
  const discountAmount = Math.round(totalRawPrice * packageDiscountRate);
  const finalPrice = Math.round(totalRawPrice - discountAmount);
  const estimatedDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <section id="estimator" className="py-24 bg-[#0E1524] border-t border-b border-[#C5A880]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A263B] border border-[#C5A880]/35 text-xs font-semibold text-[#E2CFB6] mb-3.5 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="tracking-widest uppercase text-[11px]">Aesthetic Investment Architecture</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            Design Your Bespoke Care Plan
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Transparent clinical investment modeling. Select an established longevity protocol or build a custom multi-modality regimen with VIP bundled savings.
          </p>

          {/* Tier Mode Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('signature')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'signature'
                  ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-lg shadow-[#C5A880]/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              ★ Signature Rejuvenation (3 Sessions)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('executive')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'executive'
                  ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-lg shadow-[#C5A880]/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              👑 Executive Longevity Sanctuary (4 Sessions)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-lg shadow-[#C5A880]/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Custom Tailored Plan
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Treatment Selection */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              <span>Included Clinical Modalities</span>
              <span className="text-[#C5A880]">{selectedServices.length} Selected</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {services.map((service) => {
                const isSelected = currentSelectedIds.includes(service.id);
                return (
                  <div
                    key={service.id}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={isSelected}
                    aria-label={`Select treatment ${service.name}`}
                    onClick={() => toggleService(service.id)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleService(service.id);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between focus-gold ${
                      isSelected
                        ? 'bg-[#1E293B]/90 border-[#C5A880] shadow-md shadow-[#C5A880]/15'
                        : 'bg-[#111827]/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-all flex-shrink-0 ${
                          isSelected
                            ? 'bg-[#C5A880] border-[#C5A880] text-[#0B0F19]'
                            : 'border-slate-600 bg-slate-800'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-white line-clamp-1">
                          {service.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {service.durationMinutes} mins · {service.category}
                        </div>
                      </div>
                    </div>

                    <div className="font-serif-luxury font-bold text-sm text-[#E2CFB6] ml-2 tabular-nums flex-shrink-0">
                      {formatPrice(service.price)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sessions Selector (available in custom mode) */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 font-mono">
                <span>Prescribed Clinical Sequence</span>
                <span className="text-[#E2CFB6]">{currentSessions} In-Clinic Sessions</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-3">
                {[1, 2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setActiveTab('custom');
                      setSessions(num);
                    }}
                    className={`flex-1 py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                      currentSessions === num
                        ? 'bg-[#C5A880] text-[#0B0F19] border-[#C5A880] shadow-lg shadow-[#C5A880]/20 font-bold'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span>{num} </span>
                    <span className="hidden sm:inline">{num === 1 ? 'Session' : 'Sessions'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary & Quote Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel bg-[#111827]/95 rounded-3xl p-6 sm:p-7 border border-[#C5A880]/35 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-semibold text-white text-sm">Treatment Architecture</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {Math.round(packageDiscountRate * 100)}% VIP Advantage
                </span>
              </div>

              {/* Selected List */}
              <div className="space-y-2 text-xs">
                {selectedServices.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-slate-300">
                    <span className="truncate max-w-[210px] font-medium">{s.name}</span>
                    <span className="text-white font-medium tabular-nums">{formatPrice(s.price)} / visit</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Appointment Duration</span>
                  <span className="text-slate-200">{estimatedDuration} Minutes / Visit</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Standard Non-Bundled Total</span>
                  <span className="text-slate-400 line-through tabular-nums">{formatPrice(totalRawPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 font-semibold">
                  <span>Bespoke Package Savings</span>
                  <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              </div>

              {/* Final Calculated Rate */}
              <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold">
                    Package Total ({currentSessions}x Visits)
                  </div>
                  <div className="text-[11px] text-slate-400">Includes 3D mapping & post-care kit</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold font-serif-luxury text-white tabular-nums">
                    {formatPrice(finalPrice)}
                  </div>
                  <div className="text-[11px] text-[#C5A880] tabular-nums font-medium">
                    {formatPrice(Math.round(finalPrice / currentSessions))} / session
                  </div>
                </div>
              </div>

              {/* Patient Financing Telemetry */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#C5A880]" />
                  <span>Patient Concierge Financing</span>
                </div>
                <span className="font-semibold text-white">
                  From {formatPrice(Math.round(finalPrice / 12))}/mo (0% APR)
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedServices[0]) {
                      triggerBookingWithService(selectedServices[0].id);
                    } else {
                      setOpenBookingModal(true);
                    }
                  }}
                  className="w-full btn-gold py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-[1.01] transition-transform"
                >
                  <span>Reserve This Bespoke Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Custom tailored quote preserved for your private consultation</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

