import React, { useState, useEffect } from 'react';
import { useAuth, DashboardTab } from '../../context/AuthContext';
import { StorageService } from '../../services/storage';
import { Search, Command, ArrowRight, User, Calendar, CreditCard, LayoutDashboard, Globe, Sparkles, X } from 'lucide-react';
import { UserRole } from '../../types';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { setRole, goToDashboard, goToLanding, setOpenBookingModal, setActiveTab } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'book',
      title: 'Book New Appointment',
      category: 'Quick Action',
      icon: Calendar,
      run: () => {
        setOpenBookingModal(true);
        setIsOpen(false);
      },
    },
    {
      id: 'nav-overview',
      title: 'Go to Financial Overview & KPIs',
      category: 'Navigation',
      icon: LayoutDashboard,
      run: () => {
        goToDashboard('overview');
        setIsOpen(false);
      },
    },
    {
      id: 'nav-appointments',
      title: 'Go to Appointments Schedule',
      category: 'Navigation',
      icon: Calendar,
      run: () => {
        goToDashboard('appointments');
        setIsOpen(false);
      },
    },
    {
      id: 'nav-clients',
      title: 'Go to Patient CRM Database',
      category: 'Navigation',
      icon: User,
      run: () => {
        goToDashboard('clients');
        setIsOpen(false);
      },
    },
    {
      id: 'nav-invoices',
      title: 'Go to Invoices & Stripe Billing',
      category: 'Navigation',
      icon: CreditCard,
      run: () => {
        goToDashboard('invoices');
        setIsOpen(false);
      },
    },
    {
      id: 'role-admin',
      title: 'Switch Persona: Clinic Director (Admin)',
      category: 'Demo Persona',
      icon: Sparkles,
      run: () => {
        setRole('admin');
        goToDashboard('overview');
        setIsOpen(false);
      },
    },
    {
      id: 'role-staff',
      title: 'Switch Persona: Staff Specialist (Nurse/Doctor)',
      category: 'Demo Persona',
      icon: Sparkles,
      run: () => {
        setRole('staff');
        goToDashboard('appointments');
        setIsOpen(false);
      },
    },
    {
      id: 'role-client',
      title: 'Switch Persona: VIP Patient (Sophia Laurent)',
      category: 'Demo Persona',
      icon: Sparkles,
      run: () => {
        setRole('client');
        goToDashboard('client-portal');
        setIsOpen(false);
      },
    },
    {
      id: 'nav-landing',
      title: 'Return to Public Landing Page',
      category: 'Navigation',
      icon: Globe,
      run: () => {
        goToLanding();
        setIsOpen(false);
      },
    },
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#0F172A] border border-[#C5A880]/40 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-[#C5A880] mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or jump to module... (e.g. Invoices, Admin, Book)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={action.run}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#0B0F19] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-[#E2CFB6]">
                        {action.title}
                      </div>
                      <div className="text-[10px] text-slate-500">{action.category}</div>
                    </div>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Ctrl+K</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">ESC</kbd>
          </div>
          <span className="text-[#C5A880]">Lumina Luxe Command Palette</span>
        </div>

      </div>
    </div>
  );
};
