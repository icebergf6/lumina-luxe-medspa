import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';
import { Sparkles, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Globe, Share2, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { goToDashboard } = useAuth();

  return (
    <footer className="bg-[#080C14] border-t border-[#C5A880]/20 pt-16 pb-24 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-slate-400 font-light leading-relaxed max-w-sm prose-readable">
              A high-end clinical operating system and client portal designed for aesthetic medicine, facial sculpting, and longevity practices in Beverly Hills and Manhattan.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => goToDashboard()}
                className="btn-secondary px-4 py-2 text-xs"
              >
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Open Operations & Client Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Locations */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
              Clinic Locations
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-slate-200 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> Beverly Hills
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  450 N Rodeo Dr, Suite 400<br />Beverly Hills, CA 90210
                </div>
              </div>
              <div>
                <div className="text-slate-200 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> Manhattan
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  780 Madison Ave, 9th Floor<br />New York, NY 10065
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Hours */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
              Operating Hours
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Mon – Fri: 8:30 AM – 7:00 PM</span>
              </div>
              <div className="text-slate-400 pl-5.5">
                Saturday: 9:00 AM – 5:00 PM
              </div>
              <div className="text-slate-400 pl-5.5">
                Sunday: Private VIP Consultations
              </div>
            </div>
          </div>

          {/* Contact & Socials */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
              Direct Contact
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>+1 (310) 849-2000</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>concierge@luminaluxe.com</span>
              </div>
              <div className="pt-2 flex items-center gap-3 text-slate-400">
                <a
                  href="mailto:hello@leosyafiq.com"
                  className="p-1.5 rounded-lg bg-slate-900 hover:text-[#C5A880] transition-colors"
                  aria-label="Direct Email Inquiry"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://leosyafiq.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 hover:text-[#C5A880] transition-colors"
                  aria-label="Portfolio Website"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: 'Lumina Luxe MedSpa Demo', url: window.location.href });
                    }
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 hover:text-[#C5A880] transition-colors cursor-pointer"
                  aria-label="Share Demo"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-[10px] text-amber-400/90 pt-1 font-mono">
                Interactive Demo · Simulated Data
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Creator Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Lumina Luxe MedSpa Systems. For demonstration and portfolio preview.
          </div>
          <div className="flex items-center gap-2">
            <span>Designed & built by</span>
            <a
              href="mailto:hello@leosyafiq.com"
              className="text-[#C5A880] hover:text-[#E2CFB6] font-semibold underline underline-offset-2 transition-colors"
            >
              Leo Syafiq
            </a>
            <span>• Senior Product Designer & Front-End Engineer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
