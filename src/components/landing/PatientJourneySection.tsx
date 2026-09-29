import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  Smartphone,
  Coffee,
  Scan,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface JourneyStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: any;
  description: string;
  perks: string[];
  image: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'step_1',
    stepNumber: '01',
    title: 'Discrete Digital Intake & Pre-Care',
    subtitle: 'From Your Smartphone',
    icon: Smartphone,
    description: 'Complete your medical history, aesthetic objectives, and digital consent charting securely from your smartphone before you ever arrive.',
    perks: ['Paperless digital signature on mobile', 'Pre-procedure care instructions via SMS', 'Direct chat with clinical coordinator'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'step_2',
    stepNumber: '02',
    title: 'Private Valet & Sanctuary Lounge',
    subtitle: 'Uncompromising Discretion',
    icon: Coffee,
    description: 'Arrive via private discrete valet into our acoustic-calibrated wellness sanctuary. Enjoy artisanal antioxidant matcha or organic cellular hydration.',
    perks: ['Discrete private VIP entrance option', 'Soundproof private pre-treatment suites', 'Cellular antioxidant beverage service'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'step_3',
    stepNumber: '03',
    title: '3D Biomarker & Facial Mapping',
    subtitle: 'Sub-Surface Clinical Diagnostics',
    icon: Scan,
    description: 'Our clinicians conduct multispectral cross-polarized skin imaging to evaluate UV damage, vascular erythema, pore structure, and collagen elasticity.',
    perks: ['Micro-millimeter dermal depth scanning', 'Objective biomarker baseline recording', 'Customized energy protocol calibration'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'step_4',
    stepNumber: '04',
    title: 'Precision Clinical Delivery',
    subtitle: 'Master Clinician Execution',
    icon: ShieldCheck,
    description: 'Your procedure is conducted in an ultra-sterile, temperature-optimized medical suite using FDA-cleared energy modalities and maximum acoustic comfort.',
    perks: ['Pharmaceutical-grade topical analgesia', 'Vibration-assisted sensory distraction', 'Board-certified supervision'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'step_5',
    stepNumber: '05',
    title: 'Post-Care Concierge & Telehealth',
    subtitle: 'Continuous Longevity Care',
    icon: HeartHandshake,
    description: 'Depart with a bespoke take-home medical recovery kit. Receive automated SMS check-ins and direct 48-hour telehealth clinician support.',
    perks: ['Custom active peptide post-care kit', 'Automated 24/48h recovery check-ins', 'Direct VIP portal receipt & progress tracking'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
  },
];

export const PatientJourneySection: React.FC = () => {
  const { setOpenBookingModal } = useAuth();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = JOURNEY_STEPS[activeStepIndex];
  const Icon = activeStep.icon;

  return (
    <section id="experience" className="py-24 bg-[#090D16] border-t border-b border-[#C5A880]/15 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-950/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141C2B] border border-[#C5A880]/35 text-xs font-semibold text-[#E2CFB6] mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="tracking-widest uppercase text-[11px]">The Lumina Sanctuary Experience</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            A Five-Star Concierge Patient Journey
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            From seamless digital intake to private suite arrival and ongoing regenerative aftercare, every milestone is orchestrated with clinical rigor and bespoke luxury.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {JOURNEY_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C5A880] text-[#0B0F19] border-[#C5A880] shadow-xl shadow-[#C5A880]/20 scale-102'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold tracking-widest ${isActive ? 'text-[#0B0F19]' : 'text-[#C5A880]'}`}>
                    PHASE {step.stepNumber}
                  </span>
                  <StepIcon className={`w-4 h-4 ${isActive ? 'text-[#0B0F19]' : 'text-slate-400'}`} />
                </div>
                <div className={`text-xs font-bold truncate ${isActive ? 'text-[#0B0F19]' : 'text-white'}`}>
                  {step.title.split('&')[0].trim()}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#111827] via-[#131D2E] to-[#111827] rounded-3xl border border-[#C5A880]/30 p-6 sm:p-10 shadow-2xl">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#E2CFB6] border border-[#C5A880]/30 text-xs font-mono font-semibold mb-3">
                <span>Phase {activeStep.stepNumber} of 05</span>
                <span>·</span>
                <span>{activeStep.subtitle}</span>
              </div>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
                {activeStep.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-3 font-light leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Perks Checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C5A880] font-mono">
                Sanctuary Standard Standards
              </div>
              <div className="space-y-2.5">
                {activeStep.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setOpenBookingModal(true)}
                className="w-full sm:w-auto btn-gold px-7 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Reserve Private Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>100% Patient Privacy Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#C5A880]/40 shadow-2xl bg-slate-950">
              <img
                src={activeStep.image}
                alt={activeStep.title}
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover filter brightness-95 contrast-105 animate-fade-in duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-panel bg-[#0B0F19]/90 border border-[#C5A880]/30 text-xs text-slate-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880] flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="font-bold text-white truncate">{activeStep.title}</div>
                  <div className="text-[10px] text-[#C5A880]">{activeStep.subtitle}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
