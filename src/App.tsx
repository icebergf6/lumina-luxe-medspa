import React, { Suspense, useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ToastProvider } from './context/ToastContext';
import { DemoRoleBanner } from './components/common/DemoRoleBanner';
import { DemoInquiryBanner } from './components/common/DemoInquiryBanner';
import { NotFoundView } from './components/common/NotFoundView';
import { CommandPalette } from './components/common/CommandPalette';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { Navbar } from './components/landing/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { ServicesSection } from './components/landing/ServicesSection';
import { BeforeAfterSlider } from './components/landing/BeforeAfterSlider';
import { DoctorsSection } from './components/landing/DoctorsSection';
import { InteractiveEstimator } from './components/landing/InteractiveEstimator';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { FaqSection } from './components/landing/FaqSection';
import { Footer } from './components/landing/Footer';
import { BookingModal } from './components/dashboard/views/BookingModal';
import { Sparkles } from 'lucide-react';

const DashboardLayout = React.lazy(() =>
  import('./components/dashboard/DashboardLayout').then((m) => ({ default: m.DashboardLayout }))
);

const DashboardLoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-6 text-slate-100">
    <div className="flex flex-col items-center gap-4 text-center animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center shadow-lg shadow-[#C5A880]/20">
        <Sparkles className="w-7 h-7 text-[#C5A880] animate-spin" />
      </div>
      <div>
        <div className="font-serif-luxury text-xl font-bold tracking-wider text-white">LUMINA LUXE</div>
        <div className="text-[10px] text-[#C5A880] tracking-widest uppercase font-mono mt-1">Initializing Clinic OS...</div>
      </div>
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const { activeView, openBookingModal, setOpenBookingModal, goToLanding } = useAuth();
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Check if path is non-root and not handled
    const path = window.location.pathname;
    if (path !== '/' && path !== '' && path !== '/index.html') {
      setIs404(true);
    }
  }, []);

  if (is404) {
    return (
      <NotFoundView
        onReturnHome={() => {
          window.history.pushState({}, '', '/');
          setIs404(false);
          goToLanding();
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-[#C5A880]/30 selection:text-[#E2CFB6]">
      {/* Top Demo Notice & Floating Clinic Inquiry CTA */}
      <DemoInquiryBanner />

      {activeView === 'landing' ? (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <ServicesSection />
            <BeforeAfterSlider />
            <DoctorsSection />
            <InteractiveEstimator />
            <TestimonialsSection />
            <FaqSection />
          </main>
          <Footer />
        </div>
      ) : (
        <Suspense fallback={<DashboardLoadingSkeleton />}>
          <DashboardLayout />
        </Suspense>
      )}

      {/* Global Booking Modal available in Landing mode */}
      {activeView === 'landing' && (
        <BookingModal
          isOpen={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
        />
      )}

      {/* Global Command Palette (Ctrl+K or Cmd+K) */}
      <CommandPalette />

      {/* Automated Dispatched SMS/Email Notifications Drawer */}
      <NotificationDrawer />

      {/* Floating Demo Persona & Role Switcher Banner */}
      <DemoRoleBanner />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <ToastProvider>
          <MainContent />
        </ToastProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
};

export default App;
