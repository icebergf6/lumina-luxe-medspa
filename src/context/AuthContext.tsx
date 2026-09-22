import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEMO_USERS } from '../data/seedData';
import { UserProfile, UserRole } from '../types';

export type DashboardTab =
  | 'overview'
  | 'appointments'
  | 'clients'
  | 'invoices'
  | 'services'
  | 'client-portal'
  | 'profile'
  | 'user-guide';

interface AuthContextType {
  role: UserRole;
  user: UserProfile;
  setRole: (role: UserRole) => void;
  activeView: 'landing' | 'dashboard';
  setActiveView: (view: 'landing' | 'dashboard') => void;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  openBookingModal: boolean;
  setOpenBookingModal: (open: boolean) => void;
  bookingServiceId?: string;
  triggerBookingWithService: (serviceId?: string) => void;
  goToDashboard: (tab?: DashboardTab) => void;
  goToLanding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = 'lumina_active_role';
const VIEW_STORAGE_KEY = 'lumina_active_view';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(ROLE_STORAGE_KEY);
    return (saved as UserRole) || 'admin';
  });

  const [activeView, setActiveViewState] = useState<'landing' | 'dashboard'>(() => {
    // If the URL has #dashboard, go to dashboard, otherwise default to landing page
    if (window.location.hash.includes('dashboard')) {
      return 'dashboard';
    }
    const saved = localStorage.getItem(VIEW_STORAGE_KEY);
    return (saved as 'landing' | 'dashboard') || 'landing';
  });

  const [activeTab, setActiveTab] = useState<DashboardTab>(() => {
    return role === 'client' ? 'client-portal' : 'overview';
  });

  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);

  const triggerBookingWithService = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setOpenBookingModal(true);
  };

  const user = DEMO_USERS[role] || DEMO_USERS.admin;

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem(ROLE_STORAGE_KEY, newRole);

    // Switch default tab appropriately
    if (newRole === 'client') {
      setActiveTab('client-portal');
    } else if (activeTab === 'client-portal') {
      setActiveTab('overview');
    }
  };

  const setActiveView = (view: 'landing' | 'dashboard') => {
    setActiveViewState(view);
    localStorage.setItem(VIEW_STORAGE_KEY, view);
    if (view === 'dashboard') {
      window.location.hash = 'dashboard';
    } else {
      window.location.hash = '';
    }
  };

  const goToDashboard = (tab?: DashboardTab) => {
    if (tab) setActiveTab(tab);
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLanding = () => {
    setActiveView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync hash changes if user uses browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('dashboard')) {
        setActiveViewState('dashboard');
      } else {
        setActiveViewState('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        setRole,
        activeView,
        setActiveView,
        activeTab,
        setActiveTab,
        openBookingModal,
        setOpenBookingModal,
        bookingServiceId,
        triggerBookingWithService,
        goToDashboard,
        goToLanding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
