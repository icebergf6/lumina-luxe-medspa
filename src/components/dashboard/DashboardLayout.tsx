import React, { useState } from 'react';
import { useAuth, DashboardTab } from '../../context/AuthContext';
import {
  Sparkles,
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  FileText,
  Settings,
  ArrowLeft,
  Plus,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  RefreshCw,
  Menu,
  X,
  BookOpen,
} from 'lucide-react';
import { OverviewView } from './views/OverviewView';
import { AppointmentsView } from './views/AppointmentsView';
import { ClientsCRMView } from './views/ClientsCRMView';
import { InvoicesView } from './views/InvoicesView';
import { ServicesView } from './views/ServicesView';
import { ClientPortalView } from './views/ClientPortalView';
import { ProfileView } from './views/ProfileView';
import { UserGuideView } from './views/UserGuideView';
import { BookingModal } from './views/BookingModal';
import { StorageService } from '../../services/storage';

export const DashboardLayout: React.FC = () => {
  const {
    role,
    user,
    setRole,
    activeTab,
    setActiveTab,
    openBookingModal,
    setOpenBookingModal,
    goToLanding,
  } = useAuth();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: { id: DashboardTab; label: string; icon: any; roles: string[] }[] = [
    { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard, roles: ['admin', 'staff'] },
    { id: 'appointments', label: 'Appointments Queue', icon: Calendar, roles: ['admin', 'staff', 'client'] },
    { id: 'clients', label: 'Patient CRM', icon: Users, roles: ['admin', 'staff'] },
    { id: 'invoices', label: 'Invoices & Billing', icon: CreditCard, roles: ['admin', 'staff', 'client'] },
    { id: 'services', label: 'Treatment Menu', icon: FileText, roles: ['admin'] },
    { id: 'client-portal', label: 'VIP Client Sanctuary', icon: Sparkles, roles: ['client', 'admin'] },
    { id: 'profile', label: 'Demo Profile & Access', icon: UserCheck, roles: ['admin', 'staff', 'client'] },
    { id: 'user-guide', label: 'Role SOP & App Guide', icon: BookOpen, roles: ['admin', 'staff', 'client'] },
  ];

  const filteredNav = navItems.filter((item) => item.roles.includes(role));

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'clients':
        return <ClientsCRMView />;
      case 'invoices':
        return <InvoicesView />;
      case 'services':
        return <ServicesView />;
      case 'client-portal':
        return <ClientPortalView />;
      case 'profile':
        return <ProfileView />;
      case 'user-guide':
        return <UserGuideView />;
      default:
        return <OverviewView />;
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo appointments and billing records back to initial state?')) {
      StorageService.resetToDefaults();
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0B0F19] border-r border-slate-800/80 p-5 justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Logo & Back to Website */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 flex items-center justify-center border border-[#C5A880]/40">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <span className="font-serif-luxury text-lg font-bold tracking-wider text-white">
                  LUMINA LUXE
                </span>
                <span className="block text-[9px] text-[#C5A880] tracking-widest uppercase font-mono font-semibold">
                  CLINIC OS • PORTAL
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={goToLanding}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 text-xs transition-colors border border-slate-700/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Public Website</span>
            </button>
          </div>

          {/* Quick Persona Switcher in Sidebar */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
              <span>Simulated Persona:</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-1 text-[11px] rounded font-semibold transition-all ${
                  role === 'admin' ? 'bg-[#C5A880] text-[#0B0F19]' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Admin View"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('staff')}
                className={`py-1 text-[11px] rounded font-semibold transition-all ${
                  role === 'staff' ? 'bg-[#C5A880] text-[#0B0F19]' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Staff View"
              >
                Staff
              </button>
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`py-1 text-[11px] rounded font-semibold transition-all ${
                  role === 'client' ? 'bg-[#C5A880] text-[#0B0F19]' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Client View"
              >
                Client
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            <div className="text-[10px] uppercase font-semibold text-slate-400 px-3 py-1 tracking-wider">
              Management Modules
            </div>
            {filteredNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C5A880] text-[#0B0F19] font-bold shadow-md shadow-[#C5A880]/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B0F19]' : 'text-[#C5A880]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: User Card & Reset */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-[#C5A880]/50"
            />
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-[#C5A880] truncate">{user.title}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[11px] border border-slate-800 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Open Navigation Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={goToLanding}
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit to Website</span>
            </button>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Link to App Guide */}
            <button
              type="button"
              onClick={() => setActiveTab('user-guide')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Open App & Role Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="hidden sm:inline">Role Guide</span>
              <span className="sm:hidden">Guide</span>
            </button>

            {/* Active Role Pill */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/15 text-[#E2CFB6] border border-[#C5A880]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="capitalize">{role} Mode</span>
            </span>

            {/* Book appointment trigger */}
            <button
              type="button"
              onClick={() => setOpenBookingModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl font-bold text-xs text-[#0B0F19] bg-[#C5A880] hover:bg-[#D4BA94] transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book <span className="hidden xs:inline">Visit</span></span>
            </button>

            {/* Profile Avatar Trigger */}
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-[#C5A880]/60 transition-all cursor-pointer"
              title="View Demo Profile & Settings"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-[#C5A880]/60"
              />
            </button>
          </div>
        </header>

        {/* Mobile Slide-Over Sidebar Drawer */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            mobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop Overlay */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Slide Drawer Content */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-[290px] max-w-[85vw] bg-[#0B0F19] border-r border-[#C5A880]/30 shadow-2xl p-5 flex flex-col justify-between transition-transform duration-300 ease-out z-10 ${
              mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="space-y-5 overflow-y-auto">
              
              {/* Drawer Header & Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#C5A880]/20 flex items-center justify-center border border-[#C5A880]/40">
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <div className="font-serif-luxury text-base font-bold text-white tracking-wider">
                      LUMINA LUXE
                    </div>
                    <div className="text-[9px] text-[#C5A880] tracking-widest uppercase font-mono">
                      CLINIC OS • PORTAL
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Persona Switcher in Mobile Drawer */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
                  <span>Switch Role:</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {(['admin', 'staff', 'client'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setRole(r);
                      }}
                      className={`py-1.5 text-xs rounded-lg font-semibold capitalize transition-all ${
                        role === r ? 'bg-[#C5A880] text-[#0B0F19]' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                <div className="text-[10px] uppercase font-semibold text-slate-400 px-3 py-1 tracking-wider">
                  Menu Navigation
                </div>
                {filteredNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                        isActive
                          ? 'bg-[#C5A880] text-[#0B0F19] shadow-md shadow-[#C5A880]/20'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B0F19]' : 'text-[#C5A880]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileSidebarOpen(false);
                  goToLanding();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Exit to Public Website</span>
              </button>
            </div>

          </div>
        </div>

        {/* Dashboard Dynamic View Body with smooth animated tab transitions */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-24">
          <div key={activeTab} className="animate-fade-in-up">
            {renderContent()}
          </div>
        </main>

      </div>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={openBookingModal}
        onClose={() => setOpenBookingModal(false)}
      />

    </div>
  );
};
