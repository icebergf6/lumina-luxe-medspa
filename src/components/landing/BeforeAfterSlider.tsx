import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface CaseStudy {
  id: string;
  category: 'Jawline' | 'Texture' | 'Volume' | 'Eyes';
  title: string;
  patientInfo: string;
  procedure: string;
  sessions: string;
  timeline: string;
  clinician: string;
  notes: string;
  beforeImg: string;
  afterImg: string;
  altBefore: string;
  altAfter: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case_1',
    category: 'Jawline',
    title: 'Subdermal Jawline & Submental Remodeling',
    patientInfo: 'Female, Age 44 · Beverly Hills, CA',
    procedure: 'Morpheus8 RF Microneedling',
    sessions: '3 Sessions (4-Week Intervals)',
    timeline: '12 Weeks Post-Procedure',
    clinician: 'Dr. Eleanor Vance, MD',
    notes: 'Subdermal adipose coagulation and deep collagen remodeling restoring crisp mandibular angle definition with significant platysmal band smoothing.',
    beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    altBefore: 'Patient profile showing lower face laxity prior to Morpheus8 RF microneedling treatment',
    altAfter: 'Patient profile showing refined jawline and contoured lower face 12 weeks post-treatment',
  },
  {
    id: 'case_2',
    category: 'Texture',
    title: 'Cellular Glass Skin & Barrier Renewal',
    patientInfo: 'Female, Age 36 · Manhattan, NY',
    procedure: 'HydraFacial Deluxe & Medical LED LightStim',
    sessions: 'Single Protocol + Monthly Maintenance',
    timeline: 'Immediate Post-Treatment',
    clinician: 'Chloe Rivera, NP',
    notes: 'Painless vortex extraction of sebum and follicular congestion, paired with multivitamin peptide saturation and 830nm red LED phototherapy.',
    beforeImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    altBefore: 'Facial skin showing textural congestion and dehydration before HydraFacial treatment',
    altAfter: 'Smooth radiant skin barrier immediately after HydraFacial Deluxe and LED therapy',
  },
  {
    id: 'case_3',
    category: 'Volume',
    title: 'Natural Mid-Face Volume Restoration',
    patientInfo: 'Female, Age 48 · London, Mayfair',
    procedure: 'Sculptra PLLA Collagen Biostimulator',
    sessions: '2 Vials across 2 Sessions',
    timeline: '16 Weeks Post-Procedure',
    clinician: 'Dr. Eleanor Vance, MD',
    notes: 'Progressive neocollagenesis restoring loss in the deep malar fat pad and pyriform aperture. Created soft, youthful light reflection without pillow-face distortion.',
    beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
    altBefore: 'Patient showing mid-face hollows before Sculptra biostimulator treatment',
    altAfter: 'Patient showing natural volumetric cheek restoration 16 weeks post-procedure',
  },
  {
    id: 'case_4',
    category: 'Eyes',
    title: 'Periorbital Rejuvenation & Smooth Contour',
    patientInfo: 'Female, Age 52 · Sydney, Double Bay',
    procedure: 'Laser Genesis + Micro-Botox Protocol',
    sessions: '4 Sessions Laser Genesis + Micro-Tox',
    timeline: '8 Weeks Post-Procedure',
    clinician: 'Chloe Rivera, NP',
    notes: 'Targeted smoothing of dynamic crow lines, fine periorbital crinkling, and reduction of diffuse redness with zero bruising or recovery downtime.',
    beforeImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    altBefore: 'Patient showing periorbital fine lines before treatment',
    altAfter: 'Patient showing refreshed periorbital contour 8 weeks post-treatment',
  },
];

export const BeforeAfterSlider: React.FC = () => {
  const { setOpenBookingModal } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'All', label: 'All Concerns' },
    { id: 'Jawline', label: 'Jawline & Submental' },
    { id: 'Texture', label: 'Cellular Texture & Glow' },
    { id: 'Volume', label: 'Volume & Architecture' },
    { id: 'Eyes', label: 'Periorbital Contour' },
  ];

  const filteredCases = selectedCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category === selectedCategory);

  const activeCase = filteredCases[activeCaseIndex] || CASE_STUDIES[0];

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
    <section id="results" className="py-24 bg-[#0A0E17] border-t border-b border-[#C5A880]/15 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#162032] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="tracking-widest uppercase text-[11px]">Interactive Clinical Outcomes</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            Documented Patient Transformations
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Explore unretouched standardized clinical photographic records. Drag the slider or use keyboard arrow keys (← / →) to examine anatomical changes.
          </p>
        </div>

        {/* Concern Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveCaseIndex(0);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-md shadow-[#C5A880]/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Study Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filteredCases.map((study, idx) => (
            <button
              key={study.id}
              type="button"
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCaseIndex === idx
                  ? 'bg-slate-800 text-[#E2CFB6] border border-[#C5A880]/50 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              Case #{idx + 1}: {study.procedure}
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
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#C5A880]/35 shadow-2xl shadow-black/80 select-none cursor-ew-resize touch-none bg-slate-950"
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
                <span>Drag slider or press ← → arrow keys to compare</span>
              </div>
            </div>
          </div>

          {/* Right: Clinical Assessment & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel bg-[#111827]/85 rounded-3xl p-6 sm:p-7 border border-[#C5A880]/30 shadow-xl space-y-5">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] font-mono">
                    Clinical Case Analysis
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {activeCase.patientInfo}
                  </span>
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                  {activeCase.title}
                </h3>
                <div className="text-xs text-slate-300 mt-1">
                  Treating Clinician: <span className="text-[#E2CFB6] font-semibold">{activeCase.clinician}</span>
                </div>
              </div>

              {/* Protocol Specs Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Prescribed Protocol</div>
                  <div className="text-white font-semibold mt-0.5 truncate">{activeCase.procedure}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Treatment Cadence</div>
                  <div className="text-white font-semibold mt-0.5 truncate">{activeCase.sessions}</div>
                </div>
              </div>

              {/* Clinical Observations */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Physician Observations & Outcomes</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {activeCase.notes}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setOpenBookingModal(true)}
                  className="w-full btn-gold py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01] transition-transform"
                >
                  <span>Reserve Consultation For This Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Standardized Clinical Lighting:</strong> Pre and post photographic records adhere to polarized cross-polarization lighting standards. Individual outcomes vary by physiological baseline.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
