import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface CaseStudy {
  id: string;
  title: string;
  procedure: string;
  timeline: string;
  notes: string;
  beforeImg: string;
  afterImg: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case_1',
    title: 'Subdermal Jawline & Neck Architecture',
    procedure: 'Morpheus8 RF Microneedling (3 Sessions)',
    timeline: '6 Weeks Post-Treatment',
    notes: 'Significant tightening of lower face laxity, refined jawline contour, and stimulated collagen remodeling with zero knife incision.',
    beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'case_2',
    title: 'Cellular Glass Skin & Barrier Renewal',
    procedure: 'HydraFacial Deluxe & Medical LED LightStim',
    timeline: 'Immediate Post-Procedure',
    notes: 'Elimination of follicular congestion, deep antioxidant infusion, and restoration of radiant light reflection across the mid-face.',
    beforeImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'case_3',
    title: 'Natural Mid-Face Volume Restoration',
    procedure: 'Sculptra Poly-L-Lactic Acid Biostimulator',
    timeline: '12 Weeks Post-Treatment',
    notes: 'Gradual, harmonious collagen synthesis restoring youthful cheek apex volume without an artificial or overfilled appearance.',
    beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
  },
];

export const BeforeAfterSlider: React.FC = () => {
  const { setOpenBookingModal } = useAuth();
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASE_STUDIES[activeCaseIndex];

  // Keep track of container width for pixel-perfect clipping on mobile and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="results" className="py-24 bg-[#0A0E17] border-t border-b border-[#C5A880]/15 relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162032] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>DOCUMENTED CLINICAL EVIDENCE</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Interactive Clinical Outcomes
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-light">
            Slide the interactive divider to observe real patient anatomical changes, skin barrier density, and contour lifting.
          </p>

          {/* Case study tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CASE_STUDIES.map((cs, idx) => (
              <button
                key={cs.id}
                type="button"
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCaseIndex === idx
                    ? 'bg-[#C5A880] text-[#0B0F19] shadow-lg shadow-[#C5A880]/20 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                Case 0{idx + 1}: {cs.title.split(' ')[0]} {cs.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left: The Interactive Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              style={{ touchAction: 'none' }}
              className="relative w-full h-[360px] sm:h-[460px] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-[#C5A880]/40 shadow-2xl shadow-black/80"
            >
              {/* After Image (Base layer) */}
              <img
                src={activeCase.afterImg}
                alt="After treatment result"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-95 contrast-105"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/40">
                AFTER ({activeCase.timeline})
              </div>

              {/* Before Image (Clipped layer) */}
              <div
                style={{ width: `${sliderPosition}%` }}
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-[#C5A880] pointer-events-none"
              >
                <img
                  src={activeCase.beforeImg}
                  alt="Before treatment"
                  className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-90 contrast-95"
                  style={{
                    width: containerWidth || '100%',
                    height: '100%',
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-bold border border-slate-700">
                  BEFORE TREATMENT
                </div>
              </div>

              {/* Slider Handle Knob */}
              <div
                style={{ left: `${sliderPosition}%` }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E2CFB6] text-[#0B0F19] shadow-2xl flex items-center justify-center pointer-events-none border-2 border-white"
              >
                <div className="flex items-center text-[10px] font-bold tracking-tighter">
                  ◀▶
                </div>
              </div>

              {/* Bottom Instructions Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#0B0F19]/80 backdrop-blur-md border border-slate-700 text-[11px] text-slate-300">
                Drag slider left / right to compare results
              </div>
            </div>
          </div>

          {/* Right: Clinical Assessment & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel bg-[#111827]/85 rounded-2xl p-6 border border-[#C5A880]/30 shadow-xl space-y-4">
              
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
                  Clinical Case Study #{activeCaseIndex + 1}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                  {activeCase.title}
                </h3>
                <div className="text-xs text-[#E2CFB6] font-medium mt-1">
                  Protocol: {activeCase.procedure}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Timeline: <strong>{activeCase.timeline}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>Supervised by: <strong>Dr. Eleanor Vance, MD</strong></span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed pt-2 border-t border-slate-800">
                {activeCase.notes}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setOpenBookingModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/20 cursor-pointer"
                >
                  <span>Book Consultation For This Result</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
