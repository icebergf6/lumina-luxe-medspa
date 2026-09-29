import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CurrencySwitcher } from '../common/CurrencySwitcher';
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
  Layers,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, goToDashboard, setOpenBookingModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for navbar blur enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const sectionIds = ['treatments', 'results', 'doctors', 'estimator', 'testimonials', 'faq'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Keyboard accessibility: ESC key to close drawer + focus trap
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'treatments', label: 'Treatments', icon: Sparkles, desc: 'Advanced aesthetics & RF' },
    { id: 'results', label: 'Outcomes (B&A)', icon: Layers, desc: 'Interactive clinical case studies' },
    { id: 'doctors', label: 'Specialists', icon: Stethoscope, desc: 'Physicians & clinicians' },
    { id: 'estimator', label: 'Estimator', icon: Calculator, desc: 'Calculate treatment packages' },
    { id: 'testimonials', label: 'Reviews', icon: MessageSquare, desc: '350+ verified client testimonials' },
    { id: 'faq', label: 'Concierge FAQ', icon: HelpCircle, desc: 'Pre & post-procedure care' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#C5A880]/30 shadow-xl shadow-black/40'
          : 'bg-[#0B0F19]/80 backdrop-blur-sm border-b border-[#C5A880]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with Monogram L */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          tabIndex={0}
          role="button"
          aria-label="Lumina Luxe MedSpa Home"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E2CFB6] via-[#C5A880] to-[#9D7B50] p-[1.5px] shadow-lg shadow-[#C5A880]/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#0B0F19] rounded-[9.5px] flex items-center justify-center">
              <span className="font-serif-luxury text-xl font-bold text-[#E2CFB6]">L</span>
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

        {/* Desktop Navigation Links with Active Indicator */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive ? 'text-[#E2CFB6] font-semibold' : 'text-slate-300 hover:text-[#C5A880]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons for Desktop */}
        <div className="hidden sm:flex items-center gap-2.5">
          <CurrencySwitcher />

          <button
            type="button"
            onClick={() => setOpenBookingModal(true)}
            className="btn-secondary px-3.5 py-2 text-xs sm:text-sm"
          >
            <Calendar className="w-4 h-4 text-[#C5A880]" />
            <span>Book Visit</span>
          </button>

          <button
            type="button"
            onClick={() => goToDashboard()}
            className="btn-gold px-4 py-2 text-xs sm:text-sm font-semibold"
          >
            <ShieldCheck className="w-4 h-4 text-[#0B0F19]" />
            <span>Operations Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Header Right Trigger */}
        <div className="flex sm:hidden items-center gap-1.5">
          <CurrencySwitcher />

          <button
            type="button"
            onClick={() => goToDashboard()}
            className="btn-gold px-2.5 py-1.5 text-xs font-bold"
          >
            <span>Portal</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Open Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-over Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Dark blurred overlay backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        {/* Slide-out Panel with Focus Trap */}
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
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
                  <span className="font-serif-luxury font-bold text-[#E2CFB6]">L</span>
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
                aria-label="Close mobile menu"
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
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                      isActive ? 'bg-[#C5A880]/15 border border-[#C5A880]/40' : 'hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-[#C5A880] flex-shrink-0 group-hover:bg-[#C5A880] group-hover:text-[#0B0F19] transition-colors mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-[#E2CFB6] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 font-light">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                goToDashboard();
              }}
              className="w-full btn-gold py-2.5 text-xs font-semibold"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Open Operations Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenBookingModal(true);
              }}
              className="w-full btn-secondary py-2 text-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Book Appointment</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
