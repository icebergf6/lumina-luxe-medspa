import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import { ServiceItem } from '../../types';
import { Clock, Sparkles, ArrowRight, Shield } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { triggerBookingWithService } = useAuth();
  const [services] = useState<ServiceItem[]>(() => StorageService.getServices());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Aesthetic', 'Anti-Aging', 'Body Contouring', 'Wellness'];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="treatments" className="py-20 bg-[#0C1220] border-t border-b border-[#C5A880]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182337] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>CURATED CLINICAL MENU</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Advanced Medical Aesthetics & Therapies
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-light">
            Every procedure is customized to your facial anatomy and cellular biomarkers using cutting-edge FDA-cleared modalities.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-lg shadow-[#C5A880]/20'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/80'
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
              className="group glass-card bg-[#111827]/80 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#C5A880]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Service Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-90" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B0F19]/80 backdrop-blur-md text-[11px] font-semibold text-[#E2CFB6] border border-[#C5A880]/30">
                    {service.category}
                  </span>

                  {service.popular && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#C5A880] text-[#0B0F19] text-[10px] font-bold tracking-wider uppercase">
                      Signature
                    </span>
                  )}

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-[#0B0F19]/90 backdrop-blur-md border border-[#C5A880]/30">
                    <span className="text-xs text-slate-400 font-light">From </span>
                    <span className="text-base font-bold text-white font-serif-luxury">${service.price}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white font-serif-luxury tracking-wide group-hover:text-[#E2CFB6] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{service.durationMinutes} Minutes</span>
                    </div>
                    {service.recommendedSessions && (
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{service.recommendedSessions} Sessions Rec.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-0">
                <button
                  type="button"
                  onClick={() => triggerBookingWithService(service.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/90 hover:bg-[#C5A880] text-slate-200 hover:text-[#0B0F19] font-semibold text-xs transition-all duration-300 border border-slate-700 hover:border-[#C5A880] cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
