import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { useAuth } from '../../../context/AuthContext';
import { Appointment, Invoice } from '../../../types';
import { Sparkles, Calendar, Clock, MapPin, CreditCard, Printer, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import { StripeCheckoutModal } from './StripeCheckoutModal';
import { InvoicePrintModal } from './InvoicePrintModal';

export const ClientPortalView: React.FC = () => {
  const { user, setOpenBookingModal } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>(() => StorageService.getAppointments());
  const [invoices, setInvoices] = useState<Invoice[]>(() => StorageService.getInvoices());

  // Modals
  const [selectedInvoiceForPay, setSelectedInvoiceForPay] = useState<Invoice | null>(null);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);

  useEffect(() => {
    const unsub = subscribeToStorageChanges(() => {
      setAppointments(StorageService.getAppointments());
      setInvoices(StorageService.getInvoices());
    });
    return unsub;
  }, []);

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
                    ${inv.total.toFixed(2)}
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
