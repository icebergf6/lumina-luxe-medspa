import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { DEMO_USERS } from '../../../data/seedData';
import { UserRole } from '../../../types';
import {
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  Key,
  Bell,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  UserCheck,
  Stethoscope,
  Crown,
  FileCheck,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { role, user, setRole, setActiveTab } = useAuth();
  const [notificationSms, setNotificationSms] = useState(true);
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Extended role profile data
  const roleProfiles: Record<
    UserRole,
    {
      badge: string;
      icon: any;
      credentials: string;
      licenseId: string;
      department: string;
      officeHours: string;
      location: string;
      bio: string;
      kpis: { label: string; value: string; detail: string }[];
      permissions: { capability: string; granted: boolean; description: string }[];
    }
  > = {
    admin: {
      badge: 'Executive Clinic Director',
      icon: Crown,
      credentials: 'MD, FACS • Harvard & Stanford Medical Alumni',
      licenseId: 'California Medical Board #A142894 (Active)',
      department: 'Clinical Executive & Surgical Oversight',
      officeHours: 'Mon - Fri • 8:00 AM - 6:00 PM PST',
      location: 'Flagship Suite A • Beverly Hills, CA',
      bio: 'Board-Certified Aesthetic Surgeon and Medical Director with over 16 years of clinical excellence in non-invasive subdermal remodeling, biostimulator protocols, and medical practice management.',
      kpis: [
        { label: 'Practice Revenue Oversight', value: '$128,450', detail: 'This month across all suites' },
        { label: 'Active Clinical Staff', value: '8 Practitioners', detail: 'Doctors, NPs & Aestheticians' },
        { label: 'Overall Patient Satisfaction', value: '4.98 / 5.0', detail: 'Based on 350+ audited reviews' },
        { label: 'Protocol Compliance', value: '100% HIPAA', detail: 'Zero regulatory discrepancies' },
      ],
      permissions: [
        { capability: 'Full Financial Ledger & P&L Analytics', granted: true, description: 'View gross collections, pending balances, and export CSV' },
        { capability: 'Treatment Catalog & Pricing Management', granted: true, description: 'Create and update service fees, duration, and protocols' },
        { capability: 'Master Schedule & Staff Assignment', granted: true, description: 'Approve, reassign, or cancel any provider calendar' },
        { capability: 'Patient Electronic Health Records (EHR)', granted: true, description: 'Access full dermal charts, allergy histories, and consent files' },
        { capability: 'Stripe Merchant & Tax Receipt Dispensation', granted: true, description: 'Configure payout accounts and dispense official tax invoices' },
      ],
    },
    staff: {
      badge: 'Lead Aesthetic Nurse Practitioner',
      icon: Stethoscope,
      credentials: 'MSN, APRN, FNP-C • UCLA School of Nursing',
      licenseId: 'California Board of Registered Nursing #NP952310',
      department: 'Non-Invasive Facial Sculpting & Laser Medicine',
      officeHours: 'Tue - Sat • 9:00 AM - 5:30 PM PST',
      location: 'Treatment Suite 3 • Beverly Hills, CA',
      bio: 'Master injector and laser specialist recognized for natural anatomical restorations, Morpheus8 RF protocols, and rigorous pre-procedure client safety assessments.',
      kpis: [
        { label: 'Procedures Administered', value: '42 Treatments', detail: 'This calendar month' },
        { label: 'Average Treatment Duration', value: '55 Mins', detail: 'Optimal precision pace' },
        { label: 'Patient Retention Score', value: '96.2%', detail: 'Repeat booking within 90 days' },
        { label: 'Digital Consents Verified', value: '100% Signed', detail: 'Compliant pre-treatment waivers' },
      ],
      permissions: [
        { capability: 'Patient Intake & Queue Management', granted: true, description: 'Check in waiting clients and change visit status' },
        { capability: 'Digital Consent & E-Signature Verification', granted: true, description: 'Capture legal electronic signatures via canvas' },
        { capability: 'Clinical Charting & Progress Notes', granted: true, description: 'Record Fitzpatrick skin reactions and protocol notes' },
        { capability: 'Treatment Status & Hand-off to Billing', granted: true, description: 'Mark procedures completed to trigger invoice settlement' },
        { capability: 'Alter Treatment Menu Base Pricing', granted: false, description: 'Restricted to Executive Clinic Director' },
      ],
    },
    client: {
      badge: 'VIP Lumina Noir Tier Member',
      icon: Sparkles,
      credentials: 'VIP Client #LUX-88219 • Platinum Concierge Tier',
      licenseId: 'Member Verified Since March 2024',
      department: 'Private Aesthetic Wellness Sanctuary',
      officeHours: 'Priority Concierge Access • 24/7 Portal',
      location: 'Private Residence • Los Angeles, CA',
      bio: 'Dedicated client receiving ongoing quarterly collagen stimulation, cellular hydrafacial care, and customized barrier maintenance with Dr. Vance and Nurse Chloe.',
      kpis: [
        { label: 'Lifetime Care Investment', value: '$8,450', detail: '6 Completed bespoke treatments' },
        { label: 'Upcoming Scheduled Visit', value: 'Oct 2, 2026', detail: 'Sculptra Collagen Stimulation' },
        { label: 'Active VIP Reward Balance', value: '$450 Credit', detail: 'Eligible towards next package' },
        { label: 'Pre-Visit Consents', value: 'Fully Completed', detail: 'Signed digital liability waiver' },
      ],
      permissions: [
        { capability: 'Self-Serve 24/7 Online Booking Wizard', granted: true, description: 'Select treatments, choose doctors, and pick slots' },
        { capability: 'Digital Consent & Medical Waiver Signing', granted: true, description: 'Sign consent forms directly from phone or desktop' },
        { capability: 'Instant Stripe Card Billing & PDF Receipts', granted: true, description: 'One-click settle invoices with real credit cards' },
        { capability: 'Personal Treatment History & Care Log', granted: true, description: 'Review past visit notes and countdown to upcoming session' },
        { capability: 'Clinic Revenue Ledger & Staff Schedule Editing', granted: false, description: 'Restricted to Authorized Medical Personnel' },
      ],
    },
  };

  const currentProfile = roleProfiles[role];
  const ProfileIcon = currentProfile.icon;

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#C5A880] font-semibold mb-1">
            <UserCheck className="w-4 h-4" />
            <span className="uppercase tracking-wider">Demo User Profile & Security</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            {user.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Active persona credentials, credentialing license, access matrix, and role settings.
          </p>
        </div>

        {/* Quick Link to User Guide */}
        <button
          type="button"
          onClick={() => setActiveTab('user-guide')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] text-[#0B0F19] text-xs font-bold hover:brightness-110 transition-all shadow-md cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>View {role.toUpperCase()} User Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Profile Showcase Card */}
      <div className="glass-panel bg-[#111827]/90 rounded-2xl p-6 sm:p-8 border border-[#C5A880]/30 shadow-2xl relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Avatar and Identity */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 border-[#C5A880] shadow-xl shadow-black/60"
              />
              <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-[#0B0F19] border border-[#C5A880] flex items-center justify-center text-[#C5A880] shadow-lg">
                <ProfileIcon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#E2CFB6] border border-[#C5A880]/40 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="capitalize">{currentProfile.badge}</span>
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                {user.name}
              </h3>
              <p className="text-xs text-[#C5A880] font-medium mt-0.5">
                {currentProfile.credentials}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                {currentProfile.licenseId}
              </p>
            </div>

            {/* Contact Details */}
            <div className="w-full pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>{user.phone || '+1 (310) 849-2040'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>{currentProfile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>{currentProfile.officeHours}</span>
              </div>
            </div>
          </div>

          {/* Bio, KPIs, and Role Switcher */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Bio Box */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                Professional Background & Scope of Practice:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {currentProfile.bio}
              </p>
            </div>

            {/* Performance KPIs Grid */}
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-3">
                {role === 'client' ? 'VIP Membership Metrics' : 'Clinical Practice Summary'}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentProfile.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] text-slate-400 truncate">{kpi.label}</div>
                    <div className="text-base sm:text-lg font-bold font-serif-luxury text-white mt-1">
                      {kpi.value}
                    </div>
                    <div className="text-[9px] text-[#C5A880] mt-0.5 line-clamp-1">{kpi.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Persona Switcher Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-[#162032] to-slate-900 border border-[#C5A880]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Switch Active Demo Persona</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Experience the platform through different stakeholder perspectives.
                </div>
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    role === 'admin'
                      ? 'bg-[#C5A880] text-[#0B0F19] shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  👑 Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRole('staff')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    role === 'staff'
                      ? 'bg-[#C5A880] text-[#0B0F19] shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  🩺 Staff
                </button>
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    role === 'client'
                      ? 'bg-[#C5A880] text-[#0B0F19] shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  💎 Client
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Permissions Matrix & Account Security */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Permissions Matrix */}
        <div className="lg:col-span-7 glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h4 className="font-serif-luxury text-lg font-bold text-white">
                Role Permissions & Capabilities
              </h4>
              <p className="text-xs text-slate-400">
                Audited access rights for <span className="capitalize text-[#C5A880] font-semibold">{role}</span>
              </p>
            </div>
            <FileCheck className="w-5 h-5 text-[#C5A880]" />
          </div>

          <div className="space-y-3">
            {currentProfile.permissions.map((perm, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3"
              >
                <div className="mt-0.5 flex-shrink-0">
                  {perm.granted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-500" />
                  )}
                </div>
                <div>
                  <div className={`text-xs font-semibold ${perm.granted ? 'text-white' : 'text-slate-500'}`}>
                    {perm.capability}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {perm.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & System Preferences */}
        <div className="lg:col-span-5 glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h4 className="font-serif-luxury text-lg font-bold text-white">
                Security & Communications
              </h4>
              <p className="text-xs text-slate-400">
                Simulated authentication & notification preferences
              </p>
            </div>
            <Key className="w-5 h-5 text-[#C5A880]" />
          </div>

          <div className="space-y-4">
            
            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Two-Factor Authentication (2FA)</div>
                  <div className="text-[10px] text-slate-400">Required for HIPAA compliance</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  twoFactorAuth ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* SMS Notifications Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#C5A880]" />
                <div>
                  <div className="text-xs font-semibold text-white">SMS Treatment Notifications</div>
                  <div className="text-[10px] text-slate-400">Instant Twilio simulated SMS dispatch</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotificationSms(!notificationSms)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  notificationSms ? 'bg-[#C5A880]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-[#0B0F19] transition-transform ${
                    notificationSms ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Automated Billing Receipts</div>
                  <div className="text-[10px] text-slate-400">Resend email dispatch with tax invoice</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotificationEmail(!notificationEmail)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  notificationEmail ? 'bg-purple-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notificationEmail ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Demo Reset Note */}
            <div className="p-3 rounded-xl bg-[#162032] border border-[#C5A880]/30 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-[#E2CFB6] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Simulated Environment Note</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                All profile parameters and settings are stored locally in your browser session. Switch personas at any time to demonstrate tailored client and clinical workflows.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
