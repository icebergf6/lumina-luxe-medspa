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
  altBefore: string;
  altAfter: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case_1',
    title: 'Subdermal Jawline & Neck Architecture',
    procedure: 'Morpheus8 RF Microneedling (3 Sessions)',
    timeline: '6 Weeks Post-Treatment',
    notes: 'Visible improvement of lower face contour, refined jawline architecture, and stimulated deep collagen remodeling with zero surgical downtime.',
    beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    altBefore: 'Patient profile showing lower face laxity prior to Morpheus8 RF microneedling treatment',
    altAfter: 'Patient profile showing refined jawline and contoured lower face 6 weeks post-treatment',
  },
  {
    id: 'case_2',
    title: 'Cellular Glass Skin & Barrier Renewal',
    procedure: 'HydraFacial Deluxe & Medical LED LightStim',
    timeline: 'Immediate Post-Procedure',
    notes: 'Gentle vacuum extraction of follicular congestion, deep peptide antioxidant infusion, and restoration of radiant light reflection across the mid-face.',
    beforeImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    altBefore: 'Facial skin showing textural congestion and dehydration before HydraFacial treatment',
    altAfter: 'Smooth radiant skin barrier immediately after HydraFacial Deluxe and LED therapy',
  },
  {
    id: 'case_3',
    title: 'Natural Mid-Face Volume Restoration',
    procedure: 'Sculptra Poly-L-Lactic Acid Biostimulator',
    timeline: '12 Weeks Post-Treatment',
    notes: 'Gradual, harmonious collagen synthesis restoring youthful cheek apex volume without an artificial or overfilled appearance.',
    beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
    altBefore: 'Patient showing mid-face hollows before Sculptra biostimulator treatment',
    altAfter: 'Patient showing natural volumetric cheek restoration 12 weeks post-procedure',
  },
];

export const BeforeAfterSlider: React.FC = () => {
  const { setOpenBookingModal } = useAuth();
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const activeCase = CASE_STUDIES[activeCaseIndex];

  // Keep track of container width for accurate clipping
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
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation for full WCAG accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - step));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <section id="results" className="py-20 bg-[#0A0E17] border-t border-b border-[#C5A880]/15 relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162032] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>INTERACTIVE CLINICAL OUTCOMES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Documented Patient Transformations
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-light">
            Compare before and after clinical outcomes. Use your mouse, touch, or keyboard arrow keys to slide across each patient case study.
          </p>
        </div>

        {/* Case Study Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CASE_STUDIES.map((study, idx) => (
            <button
              key={study.id}
              type="button"
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCaseIndex === idx
                  ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-lg shadow-[#C5A880]/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Case #{idx + 1}: {study.procedure.split('(')[0].trim()}
            </button>
          ))}
        </div>

        {/* Comparison Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: The Interactive Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#C5A880]/30 shadow-2xl shadow-black/80 select-none cursor-ew-resize touch-none"
            >
              {/* After Image (Background Layer) */}
              <img
                src={activeCase.afterImg}
                alt={activeCase.altAfter}
                width={800}
                height={600}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-95 contrast-105"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/40 pointer-events-none">
                AFTER ({activeCase.timeline})
              </div>

              {/* Before Image (Clipped layer) */}
              <div
                style={{ width: `${sliderPosition}%` }}
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-[#C5A880] pointer-events-none"
              >
                <img
                  src={activeCase.beforeImg}
                  alt={activeCase.altBefore}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-90 contrast-95"
                  style={{
                    width: containerWidth || '100%',
                    height: '100%',
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-bold border border-slate-700 pointer-events-none">
                  BEFORE TREATMENT
                </div>
              </div>

              {/* Slider Handle Knob with Keyboard Access */}
              <div
                ref={handleRef}
                tabIndex={0}
                role="slider"
                aria-label="Before and after clinical treatment comparison slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(sliderPosition)}
                aria-valuetext={`${Math.round(sliderPosition)}% before image visible`}
                onKeyDown={handleKeyDown}
                style={{ left: `${sliderPosition}%` }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#E2CFB6] text-[#0B0F19] shadow-2xl flex items-center justify-center border-2 border-white cursor-ew-resize focus-gold transition-shadow"
              >
                <div className="flex items-center text-xs font-bold tracking-tight select-none">
                  ◀▶
                </div>
              </div>

              {/* Bottom Instructions Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#0B0F19]/85 backdrop-blur-md border border-slate-700 text-[11px] text-slate-300 pointer-events-none flex items-center gap-1.5 whitespace-nowrap">
                <span>Drag or use ← → arrow keys to compare</span>
              </div>
            </div>
          </div>

          {/* Right: Clinical Assessment & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel bg-[#111827]/85 rounded-2xl p-6 border border-[#C5A880]/30 shadow-xl space-y-4">
              
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
                  Clinical Case #{activeCaseIndex + 1}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                  {activeCase.title}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Protocol: <span className="text-slate-200 font-semibold">{activeCase.procedure}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Clinical Observations & Outcomes</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {activeCase.notes}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Recovery Time</div>
                  <div className="text-white font-semibold mt-0.5">Minimal (24-48h)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Longevity Profile</div>
                  <div className="text-[#C5A880] font-semibold mt-0.5">18–24 Months</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setOpenBookingModal(true)}
                  className="w-full btn-gold py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Consultation For This Treatment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Sample Portfolio Content:</strong> Clinical imagery and patient case timelines shown are simulated demonstrations for medspa software evaluation.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
