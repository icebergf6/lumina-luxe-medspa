import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Sparkles, Award } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const pressLogos = [
    { name: 'VOGUE', tag: 'Aesthetic Innovation Award' },
    { name: 'ELLE', tag: 'Top Facial Architecture 2026' },
    { name: "HARPER'S BAZAAR", tag: 'Best Non-Invasive Facelift' },
    { name: 'ROBB REPORT', tag: 'Ultra-Luxury Wellness Sanctuary' },
    { name: 'ARCHITECTURAL DIGEST', tag: 'Best Medical Suite Design' },
  ];

  const allReviews = [
    {
      id: 'rev_1',
      category: 'Morpheus8',
      name: 'Victoria Sterling',
      role: 'Private Equity Director',
      location: 'Beverly Hills, CA',
      treatment: 'Morpheus8 & Sculptra Protocol (3 Sessions)',
      stars: 5,
      date: 'September 2026',
      comment:
        'Dr. Vance and her team possess an unmatched clinical eye. The subtle lower face lifting looks completely natural—crisp jawline architecture with zero overfilled distortion. The digital portal also made booking around my international travel effortless.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'rev_2',
      category: 'NAD+ IV',
      name: 'Jameson Thorne',
      role: 'Tech Founder & Angel Investor',
      location: 'Manhattan, NY',
      treatment: 'NAD+ Longevity Infusion & Laser Genesis',
      stars: 5,
      date: 'August 2026',
      comment:
        'As an executive, mental clarity and cellular vitality are paramount. The private sanctuary suites, discrete valet, and the precision of Nurse Rivera’s protocols have become an indispensable part of my quarterly performance routine.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'rev_3',
      category: 'HydraFacial',
      name: 'Claire Beauchamp',
      role: 'Fashion Creative Director',
      location: 'Malibu, CA',
      treatment: 'HydraFacial Deluxe & Medical LED',
      stars: 5,
      date: 'September 2026',
      comment:
        'Lumina Luxe is in a league of its own. From the calming architectural acoustics to the bespoke take-home peptide recovery kit. Every invoice and treatment photo is organized cleanly in my VIP patient sanctuary portal.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'rev_4',
      category: 'Sculptra',
      name: 'Eleanor Davenport',
      role: 'Art Advisory Principal',
      location: 'London, Mayfair',
      treatment: 'Sculptra Biostimulation (2 Vials)',
      stars: 5,
      date: 'July 2026',
      comment:
        'What sets Dr. Vance apart is her conservative, European sensibility toward volume. Over 16 weeks, my cheek contour subtly lifted without anyone noticing I had work done—only that I looked rested and luminous.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
  ];

  const filteredReviews = selectedFilter === 'All'
    ? allReviews
    : allReviews.filter((r) => r.category === selectedFilter);

  return (
    <section id="testimonials" className="py-24 bg-[#0B0F19] relative border-t border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Press Bar */}
        <div className="mb-20 pb-12 border-b border-slate-800/80">
          <div className="text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-8 font-mono">
            Recognized In Luxury Aesthetics & Design Media
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 items-center justify-center text-center">
            {pressLogos.map((press) => (
              <div key={press.name} className="group p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-[#C5A880]/40 transition-colors">
                <div className="font-serif-luxury text-base sm:text-lg font-bold text-slate-300 tracking-wider group-hover:text-[#E2CFB6] transition-colors">
                  {press.name}
                </div>
                <div className="text-[9px] text-[#C5A880] tracking-tight mt-0.5 font-mono">
                  {press.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#182337] border border-[#C5A880]/35 text-xs font-semibold text-[#E2CFB6] mb-3.5 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
            <span className="tracking-widest uppercase text-[11px]">Verified Patient Experiences</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            Trusted by Discerning Leaders Across the Globe
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Our patients value rigorous physician confidentiality, surgical precision without the scalpels, and meticulous digital follow-up care.
          </p>

          {/* Treatment Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {['All', 'Morpheus8', 'Sculptra', 'HydraFacial', 'NAD+ IV'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-md shadow-[#C5A880]/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'All' ? 'All Reviews' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card bg-[#111827]/85 rounded-3xl p-7 sm:p-8 border border-slate-800 flex flex-col justify-between hover:border-[#C5A880]/45 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                    ))}
                    <span className="text-[11px] text-slate-400 font-mono ml-2">{rev.date}</span>
                  </div>
                  <Quote className="w-6 h-6 text-[#C5A880]/30" />
                </div>

                <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    width={48}
                    height={48}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border border-[#C5A880]/50"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white text-sm sm:text-base">{rev.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xs text-slate-400">{rev.role} · {rev.location}</div>
                  </div>
                </div>

                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#E2CFB6] border border-[#C5A880]/30 text-[11px] font-mono font-medium">
                  {rev.treatment.split('(')[0].trim()}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

