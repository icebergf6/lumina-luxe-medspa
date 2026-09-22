import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Victoria Sterling',
      role: 'Private Equity Director',
      location: 'Beverly Hills, CA',
      treatment: 'Morpheus8 & Sculptra Protocol',
      stars: 5,
      comment:
        'Dr. Vance and her team possess an unmatched clinical eye. The subtle facial lifting looks completely natural—no overfilled aesthetics. The digital portal also made booking around my travel schedule completely effortless.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Jameson Thorne',
      role: 'Tech Founder & Angel Investor',
      location: 'Manhattan, NY',
      treatment: 'NAD+ Longevity Infusion & Laser Genesis',
      stars: 5,
      comment:
        'As an executive, mental clarity and cellular vitality are paramount. The private wellness suite and the precision of Nurse Rivera’s protocols have become essential to my quarterly routine.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Claire Beauchamp',
      role: 'Fashion Creative Director',
      location: 'Malibu, CA',
      treatment: 'HydraFacial Deluxe & LED Glow',
      stars: 5,
      comment:
        'Lumina is in a tier of its own. From the calming architectural suites to the post-treatment skincare formulation. Every invoice and treatment photo is organized cleanly in my client portal.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182337] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3">
            <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
            <span>PATIENT EXPERIENCES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Trusted by Leaders in Film, Tech & Business
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-light">
            Our patients value confidentiality, surgical precision without the knife, and meticulous follow-up care.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="glass-card bg-[#111827]/70 rounded-2xl p-7 border border-slate-800 flex flex-col justify-between hover:border-[#C5A880]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#C5A880]/40" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#C5A880]/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white text-sm">{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">{rev.role} • {rev.location}</div>
                  <div className="text-[10px] text-[#C5A880] font-medium mt-0.5">{rev.treatment}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
