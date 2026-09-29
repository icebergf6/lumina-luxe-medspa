import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';

export const DemoInquiryBanner: React.FC = () => {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(true);

  const contactEmail = 'mailto:hello@leosyafiq.com?subject=Clinic%20MedSpa%20Portal%20Inquiry&body=Hi%20Leo%2C%20I%20saw%20your%20Lumina%20Luxe%20MedSpa%20demo%20and%20would%20like%20to%20discuss%20a%20similar%20custom%20platform%20for%20our%20clinic.';

  return (
    <>
      {/* Top Slim Interactive Demo Banner (In-flow above Navbar, no sticky collision) */}
      {!bannerDismissed && (
        <div className="bg-[#121A2A] border-b border-[#C5A880]/30 text-[#E2CFB6] text-xs py-2 px-4 transition-all relative z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="font-semibold text-white tracking-wide">Interactive Portfolio Demo</span>
              <span className="text-slate-400 hidden sm:inline">·</span>
              <span className="text-slate-300 hidden sm:inline text-[11px]">
                Simulated data for MedSpa & aesthetic clinic owners · Switch roles anytime via bottom banner
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={contactEmail}
                className="text-[11px] font-semibold text-[#C5A880] hover:text-[#E2CFB6] underline underline-offset-2 transition-colors flex items-center gap-1"
              >
                <span>Hire Developer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom-Right CTA "Want this for your clinic? Let's talk" (Landing only, desktop only to prevent mobile crowding) */}
      {ctaVisible && (
        <aside
          aria-label="Portfolio developer contact inquiry"
          className="fixed bottom-20 right-4 z-40 animate-fade-in hidden sm:block"
        >
          <div className="glass-panel bg-[#0B0F19]/95 border border-[#C5A880]/40 rounded-2xl p-3 shadow-2xl flex items-center gap-3 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E2CFB6] to-[#C5A880] flex items-center justify-center text-[#0B0F19] font-bold shadow-md shadow-[#C5A880]/20 flex-shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="pr-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Want this for your clinic?</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-[#C5A880]/20 text-[#E2CFB6] rounded border border-[#C5A880]/30 font-mono">Custom</span>
              </div>
              <a
                href={contactEmail}
                className="text-[11px] text-[#C5A880] hover:text-[#E2CFB6] font-medium flex items-center gap-1 mt-0.5 group"
              >
                <span className="group-hover:underline">Let's talk · Free consultation</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => setCtaVisible(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close contact prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
