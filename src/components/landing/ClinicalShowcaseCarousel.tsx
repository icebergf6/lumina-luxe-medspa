import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Award,
  ChevronRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface ModalityItem {
  id: string;
  name: string;
  technology: string;
  manufacturer: string;
  tag: string;
  depth: string;
  downtime: string;
  image: string;
  fdaCleared: boolean;
  serviceTargetId?: string;
}

export const ClinicalShowcaseCarousel: React.FC = () => {
  const { setOpenBookingModal, triggerBookingWithService } = useAuth();

  const modalities: ModalityItem[] = [
    {
      id: 'mod_1',
      name: 'Morpheus8 Burst RF™',
      technology: 'Subdermal Adipose Remodeling Matrix',
      manufacturer: 'InMode Aesthetic Solutions',
      tag: 'Bipolar Radiofrequency',
      depth: '0.5mm – 7.0mm',
      downtime: '24–48 Hours',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
      fdaCleared: true,
      serviceTargetId: 'srv_morpheus',
    },
    {
      id: 'mod_2',
      name: 'HydraFacial Syndeo™ Elite',
      technology: 'Patented 4-in-1 Vortex Deposition',
      manufacturer: 'The BeautyHealth Company',
      tag: 'Medical Hydradermabrasion',
      depth: 'Epidermal Cleanse',
      downtime: 'Zero Downtime',
      image: 'https://images.unsplash.com/photo-1512290900672-1f4a9744cf2f?auto=format&fit=crop&q=80&w=800',
      fdaCleared: true,
      serviceTargetId: 'srv_hydra',
    },
    {
      id: 'mod_3',
      name: 'Sciton® BBL HERO™ Phototherapy',
      technology: 'High Energy Rapid Output Flashlamp',
      manufacturer: 'Sciton Medical Laser Systems',
      tag: 'Gene Expression Photofacial',
      depth: 'Dermal Vascular & Pigment',
      downtime: 'Minimal Social Recovery',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      fdaCleared: true,
      serviceTargetId: 'srv_sculptra',
    },
    {
      id: 'mod_4',
      name: 'Candela® GentleMax Pro Plus',
      technology: 'Dual Wavelength 755nm & 1064nm Laser',
      manufacturer: 'Candela Medical Global',
      tag: 'Clinical Laser Matrix',
      depth: 'Follicular & Vascular Target',
      downtime: '12–24 Hours',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      fdaCleared: true,
    },
    {
      id: 'mod_5',
      name: 'Sofwave™ SUPERB™ Ultrasound',
      technology: 'Synchronous Ultrasound Parallel Beam',
      manufacturer: 'Sofwave Medical Aesthetics',
      tag: 'Non-Invasive Dermal Lift',
      depth: 'Mid-Dermis (1.5mm)',
      downtime: 'Zero Downtime',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      fdaCleared: true,
    },
    {
      id: 'mod_6',
      name: 'SkinPen® Precision Microneedling',
      technology: 'Bio-Mechanical Micro-Channel Induction',
      manufacturer: 'Crown Aesthetics',
      tag: 'Collagen Remodeling',
      depth: '0.25mm – 2.5mm',
      downtime: '24 Hours',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
      fdaCleared: true,
    },
    {
      id: 'mod_7',
      name: 'Exosome Regenerative Therapy',
      technology: '15 Billion Lyophilized Stem Cell Vesicles',
      manufacturer: 'ExoCoBio Clinical Labs',
      tag: 'Cellular Biotherapy',
      depth: 'Transdermal Absorption',
      downtime: 'Zero Downtime',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      fdaCleared: true,
      serviceTargetId: 'srv_nad',
    },
    {
      id: 'mod_8',
      name: 'Hyperbaric Oxygen Longevity Chamber',
      technology: '2.0 ATA Hyper-Oxygenation Suite',
      manufacturer: 'OxyHealth Medical',
      tag: 'Systemic Longevity',
      depth: 'Full Cellular Saturation',
      downtime: 'Zero Downtime',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      fdaCleared: true,
    },
  ];

  // Duplicate for seamless 0 to -50% continuous marquee loop
  const carouselItems = [...modalities, ...modalities];

  return (
    <section className="py-20 bg-[#080C14] relative border-b border-[#C5A880]/15 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1E293B]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3 shadow-inner">
              <Zap className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="tracking-widest uppercase text-[11px] font-mono">
                Advanced Clinical Modalities
              </span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
              State-of-the-Art <span className="gold-gradient-text italic font-normal">Technology</span> Suites
            </h3>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
              Every procedure at Lumina Luxe is powered by gold-standard FDA-cleared equipment engineered for maximum biological response with minimal tissue disruption.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Continuous Clinical Telemetry Active</span>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Scrolling Conveyor */}
      <div className="relative w-full overflow-hidden select-none py-2">
        {/* Left & Right Elegant Edge Gradient Vignettes */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#080C14] via-[#080C14]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#080C14] via-[#080C14]/90 to-transparent z-20 pointer-events-none" />

        {/* The Animated Strip (Pause on Hover) */}
        <div className="animate-marquee-smooth flex items-center gap-6">
          {carouselItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[310px] sm:w-[350px] flex-shrink-0 group rounded-3xl bg-[#0E1524]/90 border border-slate-800/90 hover:border-[#C5A880]/60 p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#C5A880]/10 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image with Tag Overlays */}
                <div className="relative h-44 rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={260}
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1524] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Modality Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0B0F19]/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-semibold text-[#E2CFB6] tracking-wide">
                    {item.tag}
                  </div>

                  {/* Top Right FDA Badge */}
                  {item.fdaCleared && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[9px] font-bold text-emerald-300 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>FDA CLEARED</span>
                    </div>
                  )}

                  {/* Manufacturer watermark */}
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-slate-300 tracking-wider">
                    {item.manufacturer}
                  </div>
                </div>

                {/* Modality Details */}
                <div className="mt-4 space-y-2">
                  <h4 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#E2CFB6] transition-colors truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-light line-clamp-1">
                    {item.technology}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-mono">
                      Target Depth
                    </span>
                    <span className="font-semibold text-slate-200 mt-0.5 block truncate">
                      {item.depth}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-mono">
                      Recovery Time
                    </span>
                    <span className="font-semibold text-[#C5A880] mt-0.5 block truncate">
                      {item.downtime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  Rodeo Dr & Mayfair
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (item.serviceTargetId) {
                      triggerBookingWithService(item.serviceTargetId);
                    } else {
                      setOpenBookingModal(true);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#C5A880]/15 hover:bg-[#C5A880] text-[#E2CFB6] hover:text-[#0B0F19] border border-[#C5A880]/30 text-[11px] font-bold transition-all duration-300 flex items-center gap-1 cursor-pointer group-hover:border-[#C5A880]"
                >
                  <span>Book Protocol</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Accreditations Footer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-400 text-xs font-mono">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Bi-Annual Physics Calibration Certified</span>
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Class 4 Medical Laser Safety Officer On-Site</span>
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Zero Counterfeit Handpieces or Consumables</span>
        </span>
      </div>
    </section>
  );
};
