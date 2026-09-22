import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DemoRoleBanner } from './components/common/DemoRoleBanner';
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
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { BookingModal } from './components/dashboard/views/BookingModal';

const MainContent: React.FC = () => {
  const { activeView, openBookingModal, setOpenBookingModal } = useAuth();

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-[#C5A880]/30 selection:text-[#E2CFB6]">
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
        <DashboardLayout />
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
      <MainContent />
    </AuthProvider>
  );
};

export default App;
