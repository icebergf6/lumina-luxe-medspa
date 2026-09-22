import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import { Calculator, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const InteractiveEstimator: React.FC = () => {
  const { setOpenBookingModal } = useAuth();
  const services = StorageService.getServices();

  const [selectedIds, setSelectedIds] = useState<string[]>([services[0]?.id || '', services[1]?.id || '']);
  const [sessions, setSessions] = useState<number>(3);

  const toggleService = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedServices = services.filter((s) => selectedIds.includes(s.id));
  const singleSessionSubtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalRawPrice = singleSessionSubtotal * sessions;
  const packageDiscountRate = sessions >= 4 ? 0.20 : sessions >= 3 ? 0.15 : 0.05;
  const discountAmount = Math.round(totalRawPrice * packageDiscountRate);
  const finalPrice = Math.round(totalRawPrice - discountAmount);
  const estimatedDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <section id="estimator" className="py-20 bg-[#0E1524] border-t border-b border-[#C5A880]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A263B] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>INTERACTIVE PRICING ESTIMATOR</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Design Your Bespoke Care Plan
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base font-light">
            Select treatments to calculate package savings, treatment timing, and bundled VIP rates.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Treatment Selection */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              1. Choose Treatments to Bundle:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => {
                const isSelected = selectedIds.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1E293B] border-[#C5A880] shadow-md shadow-[#C5A880]/15'
                        : 'bg-[#111827]/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-all ${
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
                          {service.durationMinutes} mins • {service.category}
                        </div>
                      </div>
                    </div>

                    <div className="font-serif-luxury font-bold text-sm text-[#E2CFB6] ml-2">
                      ${service.price}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sessions Selector */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                2. Number of Recommended Sessions:
              </div>
              <div className="flex items-center gap-1.5 sm:gap-3">
                {[1, 2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSessions(num)}
                    className={`flex-1 py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                      sessions === num
                        ? 'bg-[#C5A880] text-[#0B0F19] border-[#C5A880] shadow-lg shadow-[#C5A880]/20'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span>{num} </span>
                    <span className="sm:hidden">{num === 1 ? 'Sess' : 'Sess'}</span>
                    <span className="hidden sm:inline">{num === 1 ? 'Session' : 'Sessions'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary & Quote Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel bg-[#111827]/90 rounded-2xl p-6 border border-[#C5A880]/30 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-semibold text-white text-sm">Package Summary</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                  {Math.round(packageDiscountRate * 100)}% Bundle Discount
                </span>
              </div>

              {/* Selected List */}
              <div className="space-y-2 text-xs">
                {selectedServices.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-slate-300">
                    <span className="truncate max-w-[200px]">{s.name}</span>
                    <span className="text-white font-medium">${s.price} / visit</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Total Duration per Visit</span>
                  <span className="text-slate-200">{estimatedDuration} Minutes</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Regular Total ({sessions}x visits)</span>
                  <span className="text-slate-400 line-through">${totalRawPrice}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 font-medium">
                  <span>Package Savings</span>
                  <span>-${discountAmount}</span>
                </div>
              </div>

              {/* Final Calculated Rate */}
              <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Package Total
                  </div>
                  <div className="text-[11px] text-slate-400">Includes private suite & aftercare</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold font-serif-luxury text-white">
                    ${finalPrice}
                  </div>
                  <div className="text-[11px] text-[#C5A880]">or ${(finalPrice / sessions).toFixed(0)} / session</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => setOpenBookingModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-xl shadow-[#C5A880]/20 cursor-pointer"
              >
                <span>Book This Custom Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero obligation consultation • Flexible rescheduling</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
