import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { UserRole } from '../../../types';
import {
  BookOpen,
  Sparkles,
  Crown,
  Stethoscope,
  Users,
  CheckCircle2,
  ArrowRight,
  Calendar,
  CreditCard,
  PenTool,
  Download,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';

export const UserGuideView: React.FC = () => {
  const { role, setRole, setActiveTab, setOpenBookingModal } = useAuth();
  const [selectedGuideRole, setSelectedGuideRole] = useState<UserRole>(role);

  const guideSections: Record<
    UserRole,
    {
      title: string;
      subtitle: string;
      badge: string;
      color: string;
      steps: {
        number: string;
        title: string;
        summary: string;
        details: string[];
        actionBtn?: { label: string; action: () => void };
      }[];
      tips: string[];
    }
  > = {
    admin: {
      title: 'Executive Clinic Director SOP Manual',
      subtitle: 'Complete administrative procedures for practice financial oversight, staff orchestration, and revenue optimization.',
      badge: 'Admin Operations',
      color: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
      steps: [
        {
          number: '01',
          title: 'Reviewing Real-Time Clinic KPIs & Revenue Analytics',
          summary: 'Monitor high-level clinical metrics, gross margins, and patient retention rates updated in real-time.',
          details: [
            'Navigate to "Overview & KPIs" to inspect current monthly gross revenue ($128,450) and active booking volume.',
            'Observe the interactive custom SVG Revenue Chart comparing weekly treatment collections against clinic forecast targets.',
            'Check "Today\'s Schedule" on the right sidebar for instant visibility into currently occupied treatment suites.',
          ],
          actionBtn: {
            label: 'Open Overview Dashboard',
            action: () => setActiveTab('overview'),
          },
        },
        {
          number: '02',
          title: 'Master Provider Calendar & Treatment Queue Scheduling',
          summary: 'Orchestrate multi-doctor appointments, inspect room allocations, and manage appointment states.',
          details: [
            'Go to "Appointments Queue" to switch between the 6-Column Visual Time-Grid Calendar and the dense Table view.',
            'Filter by status (Confirmed, In-Progress, Completed) or search by patient and provider name.',
            'Verify patient check-ins: when a patient arrives, advance status from "Confirmed" to "In-Progress" with a single click.',
          ],
          actionBtn: {
            label: 'Inspect Visual Calendar',
            action: () => setActiveTab('appointments'),
          },
        },
        {
          number: '03',
          title: 'Adjusting Treatment Menu Pricing & Session Protocols',
          summary: 'Update bespoke procedure rates, recommended session packages, and medical descriptions.',
          details: [
            'Navigate to "Treatment Menu" tab to inspect current service offerings (HydraFacial, Sculptra, Morpheus8, etc.).',
            'Edit base treatment pricing, duration parameters, and popularity badges.',
            'All updates automatically synchronize with the interactive public package estimator and booking wizard.',
          ],
          actionBtn: {
            label: 'Manage Treatment Menu',
            action: () => setActiveTab('services'),
          },
        },
        {
          number: '04',
          title: 'Automated Stripe Billing Ledger & One-Click CSV Export',
          summary: 'Reconcile accounts receivable, process pending client balances, and export records for your accountant.',
          details: [
            'Open "Invoices & Billing" to monitor settled receipts versus pending balances.',
            'Click "Export CSV" to immediately download a formatted ledger for QuickBooks, Xero, or CPA review.',
            'Click "Print" on any settled invoice to generate a clean, official medical billing tax receipt.',
          ],
          actionBtn: {
            label: 'View Billing Ledger',
            action: () => setActiveTab('invoices'),
          },
        },
        {
          number: '05',
          title: 'HIPAA-Compliant Patient Electronic Records (CRM)',
          summary: 'Review lifetime client value (LTV), visit frequency, dermal histories, and practitioner chart notes.',
          details: [
            'Access "Patient CRM" to audit patient profiles, skin types (Fitzpatrick scale), and reported allergies.',
            'Click any patient record to launch their confidential Clinical Chart modal with comprehensive visit logs.',
            'Use "Export Roster (CSV)" to backup patient records or sync with external EHR systems.',
          ],
          actionBtn: {
            label: 'Access Patient CRM',
            action: () => setActiveTab('clients'),
          },
        },
      ],
      tips: [
        'Pro-Tip: Press Ctrl+K (or Cmd+K) anywhere on the keyboard to trigger the global Command Spotlight palette for rapid navigation.',
        'Use the Demo State Reset button in the bottom floating banner to restore initial seed data after live client demonstrations.',
        'All client bookings immediately generate an automated medical invoice and update financial metrics with zero latency.',
      ],
    },
    staff: {
      title: 'Aesthetic Practitioner Clinical Manual',
      subtitle: 'Standard clinical operating procedure for patient intake, digital e-consent signing, and treatment delivery.',
      badge: 'Staff Clinical SOP',
      color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
      steps: [
        {
          number: '01',
          title: 'Reviewing Today\'s Treatment Queue & Suite Preparation',
          summary: 'Check incoming patients, scheduled procedure durations, and attending provider assignments.',
          details: [
            'Open "Appointments Queue" to view patients scheduled for your clinical suite today.',
            'On mobile, use the quick Day Selector Pills ([Today] [Wed] [Thu]...) to view your personalized daily time blocks.',
            'Review notes added by front desk or concierge regarding patient preferences and skin sensitivities.',
          ],
          actionBtn: {
            label: 'View Daily Queue',
            action: () => setActiveTab('appointments'),
          },
        },
        {
          number: '02',
          title: 'Capturing Digital Medical Consent & Signatures on Canvas',
          summary: 'Obtain compliant patient e-signatures on HTML5 touch canvas prior to administering any injectable or laser protocol.',
          details: [
            'In the appointments view, click "Sign Consent" next to any patient scheduled for treatment.',
            'Review the medical waiver covering contraindications, expected redness, and post-care protocol.',
            'Have the patient sign using their finger or Apple Pencil directly on the interactive drawing pad.',
            'Click "Adopt & Sign Consent" to seal the legal signature. The appointment automatically receives a verified "✓ Signed" badge.',
          ],
          actionBtn: {
            label: 'Test E-Signature Pad',
            action: () => setActiveTab('appointments'),
          },
        },
        {
          number: '03',
          title: 'Patient Check-In & Procedure State Transitions',
          summary: 'Keep front desk, medical assistants, and executive billing synchronized with real-time state changes.',
          details: [
            'When the patient enters the consultation room, click "Check In" to advance status to "In-Progress".',
            'Perform the clinical procedure adhering to sterile protocols.',
            'Upon completing treatment, click "Mark Completed" to finalize the session.',
            'Completing a visit automatically flags the connected invoice for settlement and notifies reception.',
          ],
          actionBtn: {
            label: 'Go to Appointments',
            action: () => setActiveTab('appointments'),
          },
        },
        {
          number: '04',
          title: 'Reviewing Patient Dermal Charts & Allergy Histories',
          summary: 'Ensure clinical safety by cross-referencing allergies and previous treatment parameters.',
          details: [
            'Open "Patient CRM" and search the patient\'s name before preparing injectables.',
            'Check the "Dermal & Fitzpatrick Profile" for sensitivity to lidocaine, latex, or photosensitizing medications.',
            'Review historical chart notes written by previous attending aesthetic doctors.',
          ],
          actionBtn: {
            label: 'Open Patient Charts',
            action: () => setActiveTab('clients'),
          },
        },
      ],
      tips: [
        'Mobile Ready: The HTML5 signature canvas automatically measures phone screen width and disables page scrolling while drawing.',
        'Always verify the "✓ Signed" green pill before initiating RF microneedling or biostimulator injections.',
        'Front-desk staff will instantly receive completion alerts to prepare post-care serum packages for the client.',
      ],
    },
    client: {
      title: 'VIP Client Sanctuary & Portal Guide',
      subtitle: 'Personal concierge guide for scheduling aesthetic treatments, pre-visit e-consent, and 1-click billing.',
      badge: 'VIP Client Sanctuary',
      color: 'text-purple-300 border-purple-500/30 bg-purple-500/10',
      steps: [
        {
          number: '01',
          title: 'Booking Your Bespoke Aesthetic Experience (24/7 Wizard)',
          summary: 'Choose treatments, select your preferred board-certified doctor, and reserve convenient time slots.',
          details: [
            'Click "Book Appointment" at any time from the top bar or client portal.',
            'Step 1: Select your treatment (e.g. Sculptra, Morpheus8, HydraFacial Deluxe).',
            'Step 2: Choose your practitioner (Dr. Eleanor Vance, Chloe Rivera, or Dr. Marcus Hayes).',
            'Step 3: Select date and available time slot.',
            'Step 4: Confirm your contact details. Your reservation is immediately confirmed with an automated SMS confirmation.',
          ],
          actionBtn: {
            label: 'Launch Booking Wizard',
            action: () => setOpenBookingModal(true),
          },
        },
        {
          number: '02',
          title: 'Reviewing Your Upcoming Visit & Real-Time Countdown',
          summary: 'Keep track of your private suite reservation, pre-treatment instructions, and specialist notes.',
          details: [
            'Navigate to "VIP Client Sanctuary" to view your live appointment countdown timer.',
            'Review suite arrival instructions, private valet parking, and recommended pre-treatment skincare pause.',
            'View the attending specialist\'s direct contact extension and credential summary.',
          ],
          actionBtn: {
            label: 'Open VIP Sanctuary',
            action: () => setActiveTab('client-portal'),
          },
        },
        {
          number: '03',
          title: 'Completing Digital Consent Forms Prior to Arrival',
          summary: 'Save time in the clinic by electronically reviewing and signing your consent form on your phone.',
          details: [
            'Under your upcoming appointment card, click "Review & Sign Medical Consent".',
            'Read the treatment disclosure and guidelines for aftercare.',
            'Draw your digital signature on your screen using your fingertip or stylus.',
            'Submit signature to avoid waiting in the concierge reception upon arrival.',
          ],
          actionBtn: {
            label: 'Review Consent Forms',
            action: () => setActiveTab('client-portal'),
          },
        },
        {
          number: '04',
          title: '1-Click Stripe Billing & Instant Medical Receipts',
          summary: 'Settle invoices with simulated Stripe card checkout and print official PDF tax receipts.',
          details: [
            'Navigate to the "Billing & Invoice History" section of your portal.',
            'Click "Pay (Stripe)" on any pending invoice to launch the secure modal.',
            'Enter test card details (or use the pre-filled demo card) and click "Pay with Card".',
            'Enjoy the celebratory confetti! Your invoice immediately updates to "PAID".',
            'Click "Print Receipt" anytime to download a formatted invoice for flex-spending or personal records.',
          ],
          actionBtn: {
            label: 'View Invoices & Pay',
            action: () => setActiveTab('invoices'),
          },
        },
      ],
      tips: [
        'Platinum Perk: Lumina Noir VIP members receive complimentary priority valet and bespoke antioxidant infusions with every visit.',
        'You can re-schedule any confirmed appointment up to 24 hours in advance with zero penalty fees.',
        'All payment transactions are encrypted with PCI-DSS Level 1 compliance simulator.',
      ],
    },
  };

  const currentGuide = guideSections[selectedGuideRole];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#C5A880] font-semibold mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="uppercase tracking-wider">Interactive Operations & User Guide</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            {currentGuide.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {currentGuide.subtitle}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(['admin', 'staff', 'client'] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setSelectedGuideRole(r);
                setRole(r);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedGuideRole === r
                  ? 'bg-[#C5A880] text-[#0B0F19] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r === 'admin' ? '👑 Admin' : r === 'staff' ? '🩺 Staff' : '💎 Client'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Banner for Selected Role */}
      <div className="glass-panel bg-[#111827]/90 rounded-2xl p-6 border border-[#C5A880]/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${currentGuide.color}`}>
              {selectedGuideRole === 'admin' ? (
                <Crown className="w-5 h-5 text-amber-300" />
              ) : selectedGuideRole === 'staff' ? (
                <Stethoscope className="w-5 h-5 text-emerald-300" />
              ) : (
                <Sparkles className="w-5 h-5 text-purple-300" />
              )}
            </div>
            <div>
              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1 ${currentGuide.color}`}>
                {currentGuide.badge}
              </span>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                How to navigate Lumina Luxe MedSpa as a {selectedGuideRole.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-300 font-light mt-0.5">
                Follow this step-by-step walkthrough to master all features, test interactive buttons, and explore the app.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Currently active persona:</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#C5A880]/20 text-[#E2CFB6] text-xs font-bold capitalize border border-[#C5A880]/40">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Step by Step Operations Walkthrough */}
      <div className="space-y-4">
        {currentGuide.steps.map((step) => (
          <div
            key={step.number}
            className="glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center font-mono font-bold text-[#E2CFB6] text-xs flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#C5A880] mt-0.5">{step.summary}</p>
                </div>
              </div>

              {step.actionBtn && (
                <button
                  type="button"
                  onClick={step.actionBtn.action}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#C5A880] text-slate-200 hover:text-[#0B0F19] text-xs font-semibold border border-slate-700 hover:border-[#C5A880] transition-all cursor-pointer whitespace-nowrap"
                >
                  <Zap className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{step.actionBtn.label}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Step Sub-points */}
            <div className="space-y-2 text-xs">
              {step.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MedSpa Operations Lifecycle Flowchart */}
      <div className="glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C5A880]" />
              <span>Standard MedSpa Operations Workflow</span>
            </h4>
            <p className="text-xs text-slate-400">
              End-to-end patient lifecycle from initial booking to financial reconciliation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] text-[#C5A880] font-mono font-bold uppercase">Phase 1</div>
            <div className="font-bold text-xs text-white mt-1">Online Booking</div>
            <p className="text-[10px] text-slate-400 mt-1">Client reserves slot via 4-step wizard</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] text-[#C5A880] font-mono font-bold uppercase">Phase 2</div>
            <div className="font-bold text-xs text-white mt-1">E-Consent Waiver</div>
            <p className="text-[10px] text-slate-400 mt-1">Digital stylus signature captured</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] text-[#C5A880] font-mono font-bold uppercase">Phase 3</div>
            <div className="font-bold text-xs text-white mt-1">Clinical Intake</div>
            <p className="text-[10px] text-slate-400 mt-1">Staff marks "In-Progress" in suite</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] text-[#C5A880] font-mono font-bold uppercase">Phase 4</div>
            <div className="font-bold text-xs text-white mt-1">Treatment Hand-off</div>
            <p className="text-[10px] text-slate-400 mt-1">Marked "Completed" & notes saved</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[10px] text-[#C5A880] font-mono font-bold uppercase">Phase 5</div>
            <div className="font-bold text-xs text-white mt-1">Stripe Checkout</div>
            <p className="text-[10px] text-slate-400 mt-1">Paid & printable receipt issued</p>
          </div>
        </div>
      </div>

      {/* Best Practice Tips & FAQs */}
      <div className="glass-panel bg-[#162032] rounded-2xl p-6 border border-[#C5A880]/30 space-y-3">
        <div className="flex items-center gap-2 text-white font-serif-luxury font-bold text-base">
          <HelpCircle className="w-4 h-4 text-[#C5A880]" />
          <span>Operational Best Practices & Tips for this Role:</span>
        </div>
        <div className="space-y-2">
          {currentGuide.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-[#C5A880] font-bold">•</span>
              <p className="leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
