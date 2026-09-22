import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { goToDashboard } = useAuth();

  return (
    <footer className="bg-[#080C14] border-t border-[#C5A880]/20 pt-16 pb-24 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C5A880]/20 flex items-center justify-center border border-[#C5A880]/40">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-widest text-white uppercase">
                LUMINA LUXE
              </span>
            </div>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
              Premier aesthetic medicine, facial rejuvenation architecture, and executive cellular longevity clinics serving Beverly Hills and Manhattan.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => goToDashboard()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-[#C5A880] text-slate-200 hover:text-[#0B0F19] border border-[#C5A880]/30 font-semibold text-xs transition-all"
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
              Flagship Locations
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-slate-200 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> Beverly Hills
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">450 N Rodeo Dr, Suite 400<br />Beverly Hills, CA 90210</div>
              </div>
              <div>
                <div className="text-slate-200 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> Manhattan
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">780 Madison Ave, 9th Floor<br />New York, NY 10065</div>
              </div>
            </div>
          </div>

          {/* Clinical Hours */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
              Concierge Hours
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Mon – Fri: 08:30 AM – 07:00 PM</span>
              </div>
              <div className="text-slate-400 pl-5.5">
                Saturday: 09:00 AM – 05:00 PM
              </div>
              <div className="text-slate-400 pl-5.5">
                Sunday: Private VIP Consultations Only
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
              Direct Inquiries
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
              <div className="text-[10px] text-[#C5A880] pt-2">
                HIPAA Compliant & Confidential
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Lumina Luxe MedSpa Systems. All clinical rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="text-[#C5A880]">Fullstack Client Portal Portfolio Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
