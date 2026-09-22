import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Stethoscope,
  Calculator,
  MessageSquare,
  HelpCircle,
  Phone,
  MapPin,
  Clock,
  Layers,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, goToDashboard, setOpenBookingModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'treatments', label: 'Treatments & Services', icon: Sparkles, desc: 'Advanced aesthetics & RF' },
    { id: 'results', label: 'Clinical Outcomes (B&A)', icon: Layers, desc: 'Interactive patient case studies' },
    { id: 'doctors', label: 'Board-Certified Specialists', icon: Stethoscope, desc: 'Stanford & Harvard alumni' },
    { id: 'estimator', label: 'Custom Price Estimator', icon: Calculator, desc: 'Calculate bundle savings' },
    { id: 'testimonials', label: 'Client Reviews & Proof', icon: MessageSquare, desc: '350+ 5-star verified reviews' },
    { id: 'faq', label: 'Concierge FAQ', icon: HelpCircle, desc: 'Pre & post-treatment guides' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F19]/80 backdrop-blur-md border-b border-[#C5A880]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E2CFB6] via-[#C5A880] to-[#9D7B50] p-[1px] shadow-lg shadow-[#C5A880]/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C5A880]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-widest text-white uppercase">
                LUMINA
              </span>
              <span className="text-[10px] tracking-widest text-[#C5A880] uppercase border border-[#C5A880]/40 px-1.5 py-0.5 rounded font-mono font-semibold">
                LUXE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
              Medical Spa & Longevity
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => scrollToSection('treatments')}
            className="hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            Treatments
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('results')}
            className="hover:text-[#C5A880] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Results</span>
            <span className="text-[10px] text-[#C5A880] font-mono font-bold">B&A</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('doctors')}
            className="hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            Medical Team
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('estimator')}
            className="hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            Estimator
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('testimonials')}
            className="hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* CTA Buttons for Desktop / Tablet */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpenBookingModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#C5A880]" />
            <span>Book Visit</span>
          </button>

          {/* Prominent Go to Dashboard CTA */}
          <button
            type="button"
            onClick={() => goToDashboard()}
            className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShieldCheck className="w-4 h-4 text-[#0B0F19]" />
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Header Right Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => goToDashboard()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#C5A880] text-[#0B0F19] font-bold text-xs"
          >
            <span>Dashboard</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Smooth Mobile Slide-over Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark blurred overlay backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        {/* Slide-out Panel from Right */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[310px] max-w-[85vw] bg-[#0B0F19] border-l border-[#C5A880]/30 shadow-2xl p-5 flex flex-col justify-between transition-transform duration-300 ease-out z-10 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top of drawer */}
          <div className="space-y-5 overflow-y-auto">
            
            {/* Header & Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 flex items-center justify-center border border-[#C5A880]/40">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div>
                  <div className="font-serif-luxury text-base font-bold text-white tracking-wider">
                    LUMINA LUXE
                  </div>
                  <div className="text-[9px] text-[#C5A880] tracking-widest uppercase font-mono">
                    BEVERLY HILLS CLINIC
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Demo Persona Switcher */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
                <span>Demo Perspective:</span>
                <span className="text-[10px] text-[#C5A880] font-semibold capitalize">{role}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(['admin', 'staff', 'client'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-1 text-xs rounded-lg font-semibold capitalize transition-all ${
                      role === r
                        ? 'bg-[#C5A880] text-[#0B0F19]'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation links with rich icons */}
            <nav className="space-y-1">
              <div className="text-[10px] uppercase font-semibold text-slate-400 px-2 py-1 tracking-wider">
                Explore Website
              </div>
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-800/90 group-hover:bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880] flex-shrink-0 mt-0.5 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Bottom Action CTAs in Drawer */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                goToDashboard();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] text-[#0B0F19] font-bold text-xs shadow-lg shadow-[#C5A880]/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Enter Management Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenBookingModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Book Appointment Online</span>
            </button>

            {/* Location & Hours note */}
            <div className="pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#C5A880]" />
              <span>9600 Wilshire Blvd, Beverly Hills</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
