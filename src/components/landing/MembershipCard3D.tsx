import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Crown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Star,
} from 'lucide-react';

export const MembershipCard3D: React.FC = () => {
  const { setOpenBookingModal } = useAuth();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-15 to 15 deg)
    const rotX = -((y - centerY) / centerY) * 14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const privileges = [
    { title: 'Dedicated Private Suite Valet', desc: 'Subterranean discrete arrival with zero public reception waiting.' },
    { title: '24/7 On-Call Medical Hotline', desc: 'Direct encrypted concierge line to attending physician & head nurse.' },
    { title: 'Complimentary Hyperbaric Recovery', desc: 'Post-procedure cellular oxygenation sessions included after all RF & biostimulator protocols.' },
    { title: 'Priority Peak Reserve Privileges', desc: 'Guaranteed suite availability within 4 hours notice in Beverly Hills & Manhattan.' },
  ];

  return (
    <div className="mt-20 pt-16 border-t border-slate-800/80">
      
      {/* Sub-header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182337] border border-[#C5A880]/35 text-xs font-semibold text-[#E2CFB6] mb-3 shadow-inner">
          <Crown className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="tracking-widest uppercase text-[11px] font-mono">
            Bespoke Patient Privileges
          </span>
        </div>
        <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
          The <span className="gold-gradient-text italic font-normal">Lumina Noir</span> Society
        </h3>
        <p className="text-slate-300 mt-3 text-xs sm:text-sm font-light leading-relaxed">
          An invitation-only tier designed for high-profile individuals requiring absolute discretion, instantaneous suite availability, and ongoing physician concierge care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
        
        {/* Left: 3D Interactive Card Showcase */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
          <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[420px] aspect-[1.586/1] rounded-3xl cursor-grab active:cursor-grabbing select-none transition-transform duration-200 ease-out"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* The Physical Card Body */}
            <div
              className="relative w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-200"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}`,
                boxShadow: isHovered
                  ? '0 30px 60px -12px rgba(197, 168, 128, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.9)'
                  : '0 20px 40px -15px rgba(0, 0, 0, 0.8)',
                background: 'linear-gradient(135deg, #070B14 0%, #0F172A 50%, #070B14 100%)',
                border: '1.5px solid rgba(197, 168, 128, 0.45)',
              }}
            >
              {/* Dynamic Holographic Rainbow Sheen */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 mix-blend-color-dodge"
                style={{
                  background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 235, 205, 0.6) 0%, rgba(197, 168, 128, 0.2) 35%, transparent 70%)`,
                }}
              />

              {/* Carbon-fiber subtle geometric mesh background */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Card Header: Monogram & Contactless Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E2CFB6] via-[#C5A880] to-[#7D5C2C] p-[1px] shadow">
                    <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center font-serif-luxury font-bold text-xs text-[#E2CFB6]">
                      L
                    </div>
                  </div>
                  <div>
                    <span className="font-serif-luxury font-bold text-sm text-white tracking-[0.2em] block">
                      LUMINA NOIR
                    </span>
                    <span className="text-[8px] tracking-[0.25em] text-[#C5A880] uppercase font-mono block">
                      PRIVÉ PASSPORT
                    </span>
                  </div>
                </div>

                {/* Contactless Wave Icon */}
                <div className="flex items-center gap-1.5 opacity-80">
                  <svg className="w-5 h-5 text-[#C5A880]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                    <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                    <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                  </svg>
                </div>
              </div>

              {/* Card Middle: EMV Smart Chip */}
              <div className="relative z-10 flex items-center gap-4 my-auto">
                <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-[#9D7B50] via-[#E2CFB6] to-[#C5A880] p-[1px] shadow-md">
                  <div className="w-full h-full bg-slate-900 rounded-[5px] grid grid-cols-2 p-1 gap-0.5 border border-[#C5A880]/40">
                    <div className="border border-[#C5A880]/30 rounded-xs" />
                    <div className="border border-[#C5A880]/30 rounded-xs" />
                    <div className="border border-[#C5A880]/30 rounded-xs" />
                    <div className="border border-[#C5A880]/30 rounded-xs" />
                  </div>
                </div>
                <div className="font-mono text-[11px] text-slate-400 tracking-widest uppercase">
                  VIP CLINICAL RECORD
                </div>
              </div>

              {/* Card Footer: VIP Patient Identity & Details */}
              <div className="relative z-10 space-y-1">
                <div className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#E2CFB6] font-semibold drop-shadow-sm">
                  4890 •••• •••• 9210
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-700/60 text-[10px]">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-mono">
                      MEMBER PRIVILEGE
                    </span>
                    <span className="font-bold text-white font-serif-luxury tracking-wider text-xs">
                      SOPHIA LAURENT
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-mono">
                      VALID THROUGH
                    </span>
                    <span className="font-mono text-slate-300 font-semibold">
                      12 / 28
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono mt-3 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>Interactive 3D Titanium Matrix • Hover or Drag to tilt</span>
          </div>
        </div>

        {/* Right: Privilege Dossier */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-3">
            {privileges.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-[#0F172A]/70 border border-slate-800 hover:border-[#C5A880]/40 transition-colors flex items-start gap-3.5 group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#E2CFB6] border border-[#C5A880]/30 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-white group-hover:text-[#E2CFB6] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setOpenBookingModal(true)}
              className="w-full sm:w-auto btn-gold px-8 py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#C5A880]/20"
            >
              <Crown className="w-4 h-4 text-[#0B0F19]" />
              <span>Inquire For Lumina Noir Induction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
