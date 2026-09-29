import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import { StaffMember } from '../../types';
import { Star, Award, CheckCircle, ArrowRight, ShieldCheck, Sparkles, X, Calendar, GraduationCap } from 'lucide-react';

export const DoctorsSection: React.FC = () => {
  const { setOpenBookingModal } = useAuth();
  const [staff] = useState<StaffMember[]>(() => StorageService.getStaff());
  const [selectedClinician, setSelectedClinician] = useState<StaffMember | null>(null);

  return (
    <section id="doctors" className="py-24 bg-[#0B0F19] relative border-t border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182337] border border-[#C5A880]/35 text-xs font-semibold text-[#E2CFB6] mb-3.5 shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="tracking-widest uppercase text-[11px]">Faculty of Distinction</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            Medical Directors & Master Clinicians
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Board-certified dermatologists, plastic surgery fellows, and master nurse specialists dedicated to natural, anatomically sound aesthetic longevity.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {staff.map((member) => (
            <div
              key={member.id}
              className="group glass-card bg-[#111827]/85 rounded-3xl p-5 border border-slate-800 hover:border-[#C5A880]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Photo with explicit dimensions to avoid CLS */}
                <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[4/5] bg-slate-950">
                  <img
                    src={member.avatar}
                    alt={`${member.name}, ${member.title}`}
                    width={300}
                    height={375}
                    loading="lazy"
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-70" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0F19]/90 text-[11px] text-[#E2CFB6] border border-[#C5A880]/35 backdrop-blur-md font-semibold">
                    <Star className="w-3 h-3 fill-[#C5A880] text-[#C5A880]" />
                    <span>{member.rating}</span>
                    <span className="text-slate-400 font-normal">({member.reviewsCount})</span>
                  </div>

                  {/* Certified Status */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-[10px] text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Board Certified</span>
                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="font-serif-luxury text-xl font-bold text-white tracking-wide group-hover:text-[#E2CFB6] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-[#C5A880] font-semibold mt-1">
                  {member.title}
                </p>

                <p className="text-xs text-slate-300 mt-3 font-light leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Specialties & Actions */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] px-2.5 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 flex items-center gap-1 font-mono"
                    >
                      <CheckCircle className="w-2.5 h-2.5 text-[#C5A880]" />
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedClinician(member)}
                    className="w-full py-1.5 rounded-xl text-xs font-semibold text-[#E2CFB6] hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-colors cursor-pointer"
                  >
                    View Credentials & Philosophy
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpenBookingModal(true)}
                    className="w-full btn-gold py-2 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md group-hover:scale-[1.02] transition-transform"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {member.name.split(' ')[member.name.split(' ').length - 1]}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Clinician Bio & Credentials Modal */}
      {selectedClinician && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedClinician(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div className="max-w-lg w-full bg-[#0F172A] border border-[#C5A880]/40 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl relative animate-scale-up">
            <button
              type="button"
              onClick={() => setSelectedClinician(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close clinician bio"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <img
                src={selectedClinician.avatar}
                alt={selectedClinician.name}
                className="w-16 h-16 rounded-2xl object-cover border border-[#C5A880]/50"
              />
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  {selectedClinician.name}
                </h3>
                <p className="text-xs text-[#C5A880] font-semibold">{selectedClinician.title}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  <span className="text-white font-semibold">{selectedClinician.rating}</span>
                  <span>({selectedClinician.reviewsCount} verified patient reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-[#C5A880] font-mono flex items-center gap-1.5 mb-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Fellowships & Accreditations</span>
                </div>
                <p className="leading-relaxed">
                  Fellow of American Academy of Dermatology (FAAD) · Advanced Facial Anatomy & Suture Rejuvenation Training · 14+ Years Private Practice.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-[#C5A880] font-mono flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clinical Philosophy</span>
                </div>
                <p className="leading-relaxed font-light italic">
                  "{selectedClinician.bio}"
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Private Suite Consultation</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedClinician(null);
                  setOpenBookingModal(true);
                }}
                className="btn-gold px-6 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-lg"
              >
                <span>Select Provider & Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

