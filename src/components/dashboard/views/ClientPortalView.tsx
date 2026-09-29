import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { useAuth } from '../../../context/AuthContext';
import { useCurrency } from '../../../context/CurrencyContext';
import { Appointment, Invoice, PersonalProgressMilestone } from '../../../types';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Printer,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Sliders,
  ChevronsLeftRight,
} from 'lucide-react';
import { StripeCheckoutModal } from './StripeCheckoutModal';
import { InvoicePrintModal } from './InvoicePrintModal';

export const ClientPortalView: React.FC = () => {
  const { user, setOpenBookingModal } = useAuth();
  const { formatPrice } = useCurrency();
  const [appointments, setAppointments] = useState<Appointment[]>(() => StorageService.getAppointments());
  const [invoices, setInvoices] = useState<Invoice[]>(() => StorageService.getInvoices());
  const [milestones, setMilestones] = useState<PersonalProgressMilestone[]>(() =>
    StorageService.getProgressMilestones(user.email)
  );
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Modals
  const [selectedInvoiceForPay, setSelectedInvoiceForPay] = useState<Invoice | null>(null);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);

  useEffect(() => {
    const unsub = subscribeToStorageChanges(() => {
      setAppointments(StorageService.getAppointments());
      setInvoices(StorageService.getInvoices());
      setMilestones(StorageService.getProgressMilestones(user.email));
    });
    return unsub;
  }, [user.email]);

  // Filter client's specific records
  const myAppointments = appointments.filter(
    (a) => a.clientEmail.toLowerCase() === user.email.toLowerCase() || a.clientName.toLowerCase().includes('sophia')
  );

  const myInvoices = invoices.filter(
    (i) => i.clientEmail.toLowerCase() === user.email.toLowerCase() || i.clientName.toLowerCase().includes('sophia')
  );

  const upcomingApt = myAppointments.find(
    (a) => a.status === 'confirmed' || a.status === 'in-progress' || a.status === 'pending'
  );

  const pastApts = myAppointments.filter((a) => a.status === 'completed');

  return (
    <div className="space-y-8">
      
      {/* VIP Welcome Header */}
      <div className="glass-panel bg-gradient-to-r from-[#111827] via-[#1A2438] to-[#111827] rounded-3xl p-6 sm:p-8 border border-[#C5A880]/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A880] shadow-lg shadow-[#C5A880]/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                VIP Lumina Noir Member
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-0.5">
              {user.name}
            </h1>
            <p className="text-xs text-slate-300 font-light mt-1">
              Beverly Hills Flagship • Personal Attending Physician: Dr. Eleanor Vance, MD
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpenBookingModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-xl shadow-[#C5A880]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Book Next Treatment</span>
        </button>
      </div>

      {/* Upcoming Treatment Featured Card */}
      {upcomingApt ? (
        <div className="glass-panel bg-[#111827]/90 rounded-2xl p-6 border border-[#C5A880]/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E2CFB6] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Next Upcoming Clinical Visit</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/30">
              Confirmed Schedule
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <h2 className="font-serif-luxury text-2xl font-bold text-white">
                {upcomingApt.serviceName}
              </h2>
              <div className="text-xs text-slate-300 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" /> {upcomingApt.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> {upcomingApt.time} ({upcomingApt.durationMinutes} mins)
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Private Suite 4B • 450 N Rodeo Dr, Beverly Hills</span>
              </div>
              {upcomingApt.notes && (
                <div className="text-xs text-amber-200/80 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 mt-2">
                  Special Instructions: {upcomingApt.notes}
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                Specialist Provider
              </div>
              <div className="font-bold text-white text-sm">{upcomingApt.staffName}</div>
              <div className="text-slate-400 text-[11px]">Direct Line: +1 (310) 849-2045</div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px]">
                <span className="text-slate-400">Payment:</span>
                <span className="text-emerald-400 font-semibold uppercase">{upcomingApt.paymentStatus}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel bg-[#111827]/70 rounded-2xl p-8 border border-slate-800 text-center space-y-3">
          <Calendar className="w-10 h-10 text-[#C5A880] mx-auto opacity-60" />
          <h3 className="font-serif-luxury text-xl font-bold text-white">No Upcoming Appointments</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Maintain your skin collagen remodeling cycle by scheduling your next appointment.
          </p>
          <button
            type="button"
            onClick={() => setOpenBookingModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#C5A880] text-[#0B0F19] font-bold text-xs"
          >
            Schedule Clinical Session
          </button>
        </div>
      )}

      {/* VIP Patient Personal Progress Journey */}
      {milestones.length > 0 && (
        <div className="glass-panel bg-[#111827]/90 rounded-2xl p-6 sm:p-7 border border-[#C5A880]/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>My Clinical Journey & Tissue Remodeling</span>
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">
                {milestones[0].treatmentName}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/30">
              {milestones[0].skinImprovementScore}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Interactive Before & After Slider */}
            <div className="md:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-700 select-none shadow-2xl">
              {/* After Image */}
              <img
                src={milestones[0].afterImage}
                alt="Post-Treatment Result"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider z-10 border border-white/10">
                Current (Day 30)
              </span>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={milestones[0].beforeImage}
                  alt="Baseline Pre-Treatment"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
                <span className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#E2CFB6] uppercase tracking-wider z-10 border border-[#C5A880]/30">
                  Baseline (Day 1)
                </span>
              </div>

              {/* Slider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#C5A880] shadow-lg pointer-events-none z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#C5A880] text-[#0B0F19] shadow-xl flex items-center justify-center border-2 border-white">
                  <ChevronsLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hidden Range Input for full touch & drag support */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Drag to compare before and after"
              />
            </div>

            {/* Doctor's Observation Notes */}
            <div className="md:col-span-6 space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                  Attending Physician Clinical Notes
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{milestones[0].clinicalNote}"
                </p>
                <div className="text-[11px] text-[#C5A880] font-semibold pt-1">
                  — Dr. Eleanor Vance, MD • Certified Stanford Aesthetic Faculty
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Treatment Protocol</div>
                  <div className="font-bold text-white mt-0.5">Session 3 of 4</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Next Maintenance Due</div>
                  <div className="font-bold text-emerald-400 mt-0.5">In 60 Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid: My Treatment History & My Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Past Treatments */}
        <div className="lg:col-span-6 glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              Treatment History & Records
            </h3>
            <span className="text-xs text-slate-400">{pastApts.length} Completed</span>
          </div>

          <div className="space-y-3">
            {pastApts.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No past treatment history recorded yet.
              </div>
            ) : (
              pastApts.map((a) => (
                <div
                  key={a.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{a.serviceName}</span>
                    <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold uppercase">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Date: {a.date} • Attended by {a.staffName}
                  </div>
                  {a.notes && (
                    <div className="text-slate-400 text-[11px] italic bg-slate-800/40 p-2 rounded">
                      Doctor's Note: {a.notes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Invoices & Receipts */}
        <div className="lg:col-span-6 glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              My Invoices & Receipts
            </h3>
            <span className="text-xs text-slate-400">{myInvoices.length} Invoices</span>
          </div>

          <div className="space-y-3">
            {myInvoices.map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-semibold text-white">{inv.serviceName}</div>
                  <div className="text-[10px] text-slate-400">
                    {inv.invoiceNumber} • {inv.date}
                  </div>
                  <div className="text-[11px] font-serif-luxury font-bold text-[#E2CFB6] mt-0.5">
                    {formatPrice(inv.total, true)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {inv.status === 'pending' ? (
                    <button
                      type="button"
                      onClick={() => setSelectedInvoiceForPay(inv)}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] text-[#0B0F19] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>Pay Now</span>
                    </button>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[10px] uppercase">
                      Paid
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedInvoiceForPrint(inv)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="View Receipt"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modals */}
      <StripeCheckoutModal
        invoice={selectedInvoiceForPay}
        isOpen={!!selectedInvoiceForPay}
        onClose={() => setSelectedInvoiceForPay(null)}
      />

      <InvoicePrintModal
        invoice={selectedInvoiceForPrint}
        isOpen={!!selectedInvoiceForPrint}
        onClose={() => setSelectedInvoiceForPrint(null)}
      />

    </div>
  );
};
