import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { StaffMember } from '../../types';
import { Star, Award, CheckCircle } from 'lucide-react';

export const DoctorsSection: React.FC = () => {
  const [staff] = useState<StaffMember[]>(() => StorageService.getStaff());

  return (
    <section id="doctors" className="py-20 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182337] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3">
            <Award className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>CLINICAL EXCELLENCE</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            World-Class Physicians & Specialists
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-light">
            Trained at the nation’s top institutions with decades of specialized clinical artistry in facial anatomy and anti-aging medicine.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((member) => (
            <div
              key={member.id}
              className="glass-card bg-[#111827]/70 rounded-2xl p-5 border border-slate-800 hover:border-[#C5A880]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/5]">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top filter contrast-105"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0B0F19]/90 text-[11px] text-[#E2CFB6] border border-[#C5A880]/30 font-medium">
                    <Star className="w-3 h-3 fill-[#C5A880] text-[#C5A880]" />
                    <span>{member.rating}</span>
                    <span className="text-slate-400">({member.reviewsCount})</span>
                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="font-serif-luxury text-lg font-bold text-white tracking-wide">
                  {member.name}
                </h3>
                <p className="text-xs text-[#C5A880] font-medium mt-0.5">
                  {member.title}
                </p>

                <p className="text-xs text-slate-400 mt-3 font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Specialties */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Specialties
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center gap-1"
                    >
                      <CheckCircle className="w-2.5 h-2.5 text-[#C5A880]" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
