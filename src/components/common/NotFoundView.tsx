import React from 'react';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full glass-panel bg-[#111827]/90 rounded-2xl p-8 border border-[#C5A880]/30 text-center relative z-10 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center mx-auto text-[#C5A880]">
          <Sparkles className="w-8 h-8" />
        </div>

        <div>
          <div className="text-sm font-mono uppercase tracking-widest text-[#C5A880]">
            Error 404
          </div>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Treatment Suite Not Found
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            The requested clinical portal page or treatment protocol does not exist or has been relocated within our private network.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onReturnHome}
            className="w-full sm:w-auto btn-gold px-6 py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Concierge Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
