import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StorageService } from '../../services/storage';
import { UserRole } from '../../types';
import { Sparkles, RefreshCw, LayoutDashboard, Globe, ChevronDown, Check } from 'lucide-react';

export const DemoRoleBanner: React.FC = () => {
  const { role, setRole, activeView, goToDashboard, goToLanding } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all appointments, invoices, and client data back to initial demo state?')) {
      StorageService.resetToDefaults();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

  const roleInfo: Record<UserRole, { label: string; icon: string; desc: string; badge: string }> = {
    admin: {
      label: 'Clinic Director (Admin)',
      icon: '👑',
      desc: 'Full financial KPIs, appointment approvals, staff management & invoicing',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    staff: {
      label: 'Staff Specialist (Nurse/Doctor)',
      icon: '🩺',
      desc: 'Treatment queue, patient intake notes & appointment check-in status',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    client: {
      label: 'VIP Patient (Client)',
      icon: '👤',
      desc: 'Personal appointments, re-booking wizard, invoice history & Stripe pay',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
  };

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-4xl pb-[env(safe-area-inset-bottom,0px)]">
      <div className="glass-panel bg-[#0F172A]/95 backdrop-blur-xl border border-[#C5A880]/35 rounded-2xl shadow-2xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 text-xs md:text-sm text-slate-200">
        
        {/* Left: Demo Info & Current Role */}
        <div className="flex items-center gap-2">
          <div className="hidden xs:flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#C5A880]/20 text-[#E2CFB6] flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-white tracking-wide hidden sm:inline text-xs">Portfolio Demo:</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] sm:text-xs font-semibold cursor-pointer transition-all hover:scale-105 ${roleInfo[role].badge}`}
              >
                <span>{roleInfo[role].icon}</span>
                <span>{roleInfo[role].label.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {/* Dropdown Role Selector */}
              {showDropdown && (
                <div className="absolute bottom-full left-0 mb-2 w-64 max-w-[85vw] bg-[#0B0F19] border border-[#C5A880]/30 rounded-xl p-2 shadow-2xl z-50 animate-scale-up">
                  <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Switch Simulated Persona:
                  </div>
                  {(['admin', 'staff', 'client'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setRole(r);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-all flex items-start gap-2 ${
                        role === r ? 'bg-[#C5A880]/15 text-white' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <span className="text-sm mt-0.5">{roleInfo[r].icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs">{roleInfo[r].label.split(' ')[0]}</span>
                          {role === r && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">{roleInfo[r].desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quick Navigation & Reset */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {activeView === 'landing' ? (
            <button
              type="button"
              onClick={() => goToDashboard()}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#C5A880] hover:bg-[#D4BA94] text-[#0B0F19] font-bold text-[11px] sm:text-xs transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={goToLanding}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-[11px] sm:text-xs border border-slate-700 transition-all whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Website</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            title="Reset data back to initial seed state"
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resetSuccess ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="hidden sm:inline">{resetSuccess ? 'Reset!' : 'Reset'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
