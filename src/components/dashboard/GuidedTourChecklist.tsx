import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Check, ChevronDown, ChevronUp, Sparkles, X, ArrowRight, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TourProgress {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  dismissed: boolean;
}

export const GuidedTourChecklist: React.FC = () => {
  const { role, setRole, setActiveTab, setOpenBookingModal } = useAuth();
  const [collapsed, setCollapsed] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [progress, setProgress] = useState<TourProgress>(() => {
    try {
      const saved = localStorage.getItem('lumina_guided_tour');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return { step1: false, step2: false, step3: false, dismissed: false };
  });

  const saveProgress = (newProgress: TourProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem('lumina_guided_tour', JSON.stringify(newProgress));
    } catch (e) {
      // fallback
    }
  };

  // Auto-mark steps as user navigates
  useEffect(() => {
    if (role === 'client' && !progress.step1) {
      saveProgress({ ...progress, step1: true });
    } else if (role === 'staff' && !progress.step2) {
      saveProgress({ ...progress, step2: true });
    } else if (role === 'admin' && !progress.step3) {
      saveProgress({ ...progress, step3: true });
    }
  }, [role]);

  // When all steps are finished, celebrate with subtle confetti
  useEffect(() => {
    if (progress.step1 && progress.step2 && progress.step3) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8, x: 0.85 },
        colors: ['#C5A880', '#E2CFB6', '#10B981'],
      });
    }
  }, [progress.step1, progress.step2, progress.step3]);

  if (progress.dismissed) return null;

  const completedCount = [progress.step1, progress.step2, progress.step3].filter(Boolean).length;

  const handleStep1 = () => {
    setRole('client');
    setActiveTab('client-portal');
    setOpenBookingModal(true);
    saveProgress({ ...progress, step1: true });
  };

  const handleStep2 = () => {
    setRole('staff');
    setActiveTab('appointments');
    saveProgress({ ...progress, step2: true });
  };

  const handleStep3 = () => {
    setRole('admin');
    setActiveTab('overview');
    saveProgress({ ...progress, step3: true });
  };

  const handleDismiss = () => {
    saveProgress({ ...progress, dismissed: true });
  };

  return (
    <div className="fixed bottom-6 left-4 md:left-72 z-40 max-w-xs w-full animate-fade-in-up">
      <div className="glass-panel bg-[#0B0F19]/95 border border-[#C5A880]/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Header Bar */}
        <div className="p-3 bg-[#111827]/80 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Clinic Tour</span>
                <span className="text-[10px] text-[#C5A880] font-mono">
                  {completedCount}/3 Done
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              aria-label={collapsed ? 'Expand guided tour' : 'Collapse guided tour'}
            >
              {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss guided tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tour Steps */}
        {!collapsed && (
          <div className="p-3.5 space-y-2 text-xs">
            <p className="text-[11px] text-slate-300 mb-2">
              Recommended walkthrough for clinic & medspa decision makers:
            </p>

            {/* Step 1 */}
            <button
              type="button"
              onClick={handleStep1}
              className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                progress.step1
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-[#C5A880]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    progress.step1
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {progress.step1 ? <Check className="w-3 h-3 stroke-[3]" /> : '1'}
                </div>
                <div>
                  <div className="font-semibold">Book as Client</div>
                  <div className="text-[10px] text-slate-400">Test online scheduling & packages</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Step 2 */}
            <button
              type="button"
              onClick={handleStep2}
              className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                progress.step2
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-[#C5A880]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    progress.step2
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {progress.step2 ? <Check className="w-3 h-3 stroke-[3]" /> : '2'}
                </div>
                <div>
                  <div className="font-semibold">Check in as Staff</div>
                  <div className="text-[10px] text-slate-400">Manage queue & e-sign consent</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Step 3 */}
            <button
              type="button"
              onClick={handleStep3}
              className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                progress.step3
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-[#C5A880]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    progress.step3
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {progress.step3 ? <Check className="w-3 h-3 stroke-[3]" /> : '3'}
                </div>
                <div>
                  <div className="font-semibold">View revenue as Admin</div>
                  <div className="text-[10px] text-slate-400">P&L metrics & performance run-rate</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {completedCount === 3 && (
              <div className="pt-1 text-center text-[11px] text-[#C5A880] font-semibold flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>All 3 clinic workflows explored!</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
