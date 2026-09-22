import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { useAuth } from '../../../context/AuthContext';
import { Appointment, AppointmentStatus, Invoice } from '../../../types';
import {
  Search,
  Plus,
  Clock,
  User,
  CheckCircle,
  XCircle,
  CreditCard,
  Eye,
  Calendar as CalendarIcon,
  List,
  PenTool,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { StripeCheckoutModal } from './StripeCheckoutModal';
import { InvoicePrintModal } from './InvoicePrintModal';
import { ConsentSignatureModal } from './ConsentSignatureModal';

export const AppointmentsView: React.FC = () => {
  const { setOpenBookingModal } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>(() => StorageService.getAppointments());
  const [invoices, setInvoices] = useState<Invoice[]>(() => StorageService.getInvoices());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Modals
  const [selectedInvoiceForPay, setSelectedInvoiceForPay] = useState<Invoice | null>(null);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);
  const [selectedAptForConsent, setSelectedAptForConsent] = useState<Appointment | null>(null);
  
  // Track signed e-signatures locally
  const [signedAptIds, setSignedAptIds] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('lumina_signed_apts');
    return saved ? JSON.parse(saved) : { apt_101: true, apt_102: true };
  });

  useEffect(() => {
    const unsub = subscribeToStorageChanges(() => {
      setAppointments(StorageService.getAppointments());
      setInvoices(StorageService.getInvoices());
    });
    return unsub;
  }, []);

  const handleUpdateStatus = (id: string, status: AppointmentStatus) => {
    StorageService.updateAppointmentStatus(id, status);
  };

  const handleSignatureSuccess = (appointmentId: string) => {
    setSignedAptIds((prev) => {
      const updated = { ...prev, [appointmentId]: true };
      localStorage.setItem('lumina_signed_apts', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.staffName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'in-progress':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'cancelled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'pending':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  // Generate 5 days for calendar view: Today to +4 days
  const calendarDays = [0, 1, 2, 3, 4].map((offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      formattedDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isToday: offset === 0,
    };
  });

  const [timeSlots] = useState(['09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM']);
  const [selectedMobileDay, setSelectedMobileDay] = useState<string>(calendarDays[0].dateStr);

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Clinical Appointments & Scheduling
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage patient bookings, toggle visual grid calendar, and verify signed medical consent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table' ? 'bg-[#C5A880] text-[#0B0F19]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar' ? 'bg-[#C5A880] text-[#0B0F19]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Calendar Grid</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpenBookingModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="glass-panel bg-[#111827]/80 rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'confirmed', 'in-progress', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#C5A880] text-[#0B0F19] shadow'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search patient, service, doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
        </div>

      </div>

      {/* VIEW 1: Visual Time-Grid Calendar View */}
      {viewMode === 'calendar' ? (
        <div className="glass-panel bg-[#111827]/80 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl space-y-4">
          
          {/* Mobile Day Selector (Visible on small screens) */}
          <div className="sm:hidden space-y-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {calendarDays.map((day) => (
                <button
                  key={day.dateStr}
                  type="button"
                  onClick={() => setSelectedMobileDay(day.dateStr)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex flex-col items-center flex-1 ${
                    selectedMobileDay === day.dateStr
                      ? 'bg-[#C5A880] text-[#0B0F19] shadow-md'
                      : 'bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] uppercase">{day.dayName}</span>
                  <span className="text-xs font-bold">{day.formattedDate.split(' ')[1]}</span>
                  {day.isToday && <span className="text-[8px] uppercase tracking-wider">Today</span>}
                </button>
              ))}
            </div>

            {/* Mobile Schedule Timeline for selected day */}
            <div className="space-y-2.5 pt-2">
              {timeSlots.map((slot) => {
                const aptForSlot = appointments.find(
                  (a) => a.date === selectedMobileDay && (a.time.includes(slot.slice(0, 5)) || a.time === slot)
                );

                return (
                  <div key={slot} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <div className="font-mono text-xs text-[#C5A880] font-semibold w-16 pt-0.5 flex-shrink-0">
                      {slot}
                    </div>

                    <div className="flex-1">
                      {aptForSlot ? (
                        <div
                          onClick={() => setSelectedAptForConsent(aptForSlot)}
                          className={`p-2.5 rounded-lg border text-xs cursor-pointer ${
                            aptForSlot.status === 'confirmed'
                              ? 'bg-blue-900/30 border-blue-500/40 text-blue-200'
                              : aptForSlot.status === 'in-progress'
                              ? 'bg-amber-900/30 border-amber-500/40 text-amber-200'
                              : aptForSlot.status === 'completed'
                              ? 'bg-emerald-900/30 border-emerald-500/40 text-emerald-200'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs">{aptForSlot.clientName}</span>
                            <span className="text-[10px] font-semibold uppercase">{aptForSlot.status}</span>
                          </div>
                          <div className="text-[11px] text-[#E2CFB6] mt-0.5">{aptForSlot.serviceName}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                            <span>{aptForSlot.staffName}</span>
                            {signedAptIds[aptForSlot.id] && (
                              <span className="text-emerald-400 font-bold">✓ Signed</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 italic py-1">
                          No appointments scheduled
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop 6-Column Grid View (Hidden on mobile) */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Calendar Days Header */}
              <div className="grid grid-cols-6 border-b border-slate-800 pb-3 text-center">
                <div className="text-xs uppercase font-semibold text-slate-500 text-left pl-2">Time Slot</div>
                {calendarDays.map((day) => (
                  <div key={day.dateStr} className={`px-2 py-1 rounded-xl ${day.isToday ? 'bg-[#C5A880]/15 border border-[#C5A880]/30' : ''}`}>
                    <div className={`text-xs font-bold ${day.isToday ? 'text-[#E2CFB6]' : 'text-white'}`}>
                      {day.dayName} {day.formattedDate}
                    </div>
                    {day.isToday && <span className="text-[10px] text-emerald-400 font-semibold uppercase">Today</span>}
                  </div>
                ))}
              </div>

              {/* Calendar Time Rows */}
              <div className="divide-y divide-slate-800/60 pt-2">
                {timeSlots.map((slot) => (
                  <div key={slot} className="grid grid-cols-6 min-h-[90px] py-2 items-start">
                    
                    {/* Time column */}
                    <div className="text-xs font-mono text-slate-400 pt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C5A880]" />
                      <span>{slot}</span>
                    </div>

                    {/* 5 Day Columns */}
                    {calendarDays.map((day) => {
                      const aptForSlot = appointments.find(
                        (a) => a.date === day.dateStr && (a.time.includes(slot.slice(0, 5)) || a.time === slot)
                      );

                      return (
                        <div key={day.dateStr} className="p-1 min-h-[85px] border-l border-slate-800/40">
                          {aptForSlot && (
                            <div
                              onClick={() => setSelectedAptForConsent(aptForSlot)}
                              className={`p-2 rounded-xl border text-xs cursor-pointer hover:scale-[1.02] transition-transform ${
                                aptForSlot.status === 'confirmed'
                                  ? 'bg-blue-900/30 border-blue-500/40 text-blue-200'
                                  : aptForSlot.status === 'in-progress'
                                  ? 'bg-amber-900/30 border-amber-500/40 text-amber-200'
                                  : aptForSlot.status === 'completed'
                                  ? 'bg-emerald-900/30 border-emerald-500/40 text-emerald-200'
                                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
                              }`}
                            >
                              <div className="font-bold truncate text-white">{aptForSlot.clientName}</div>
                              <div className="text-[10px] text-[#E2CFB6] truncate mt-0.5">{aptForSlot.serviceName}</div>
                              <div className="text-[9px] text-slate-400 truncate mt-0.5">{aptForSlot.staffName.split(',')[0]}</div>
                              
                              <div className="mt-1 flex items-center justify-between text-[9px]">
                                <span className="font-semibold uppercase">{aptForSlot.status}</span>
                                {signedAptIds[aptForSlot.id] && (
                                  <span className="text-emerald-400 font-bold" title="Consent Signed">✓ Signed</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* VIEW 2: List View (Mobile Cards + Desktop Table) */
        <div>
          {/* Mobile Appointments Card List (< sm screens) */}
          <div className="block sm:hidden space-y-3 mb-6">
            {filteredAppointments.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs bg-slate-900/60 rounded-2xl border border-slate-800">
                No appointments found matching this filter.
              </div>
            ) : (
              filteredAppointments.map((apt) => {
                const invoice = invoices.find((i) => i.id === apt.invoiceId || i.appointmentId === apt.id);
                const isSigned = signedAptIds[apt.id];

                return (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-sm">{apt.clientName}</div>
                        <div className="text-[11px] text-slate-400">{apt.clientPhone}</div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${getStatusBadge(
                          apt.status
                        )}`}
                      >
                        {apt.status.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#E2CFB6]">{apt.serviceName}</span>
                        <span className="text-white font-bold font-serif-luxury">${apt.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Provider: {apt.staffName.split(',')[0]}</span>
                        <span className="flex items-center gap-1 text-[#C5A880]">
                          <Clock className="w-3 h-3" />
                          <span>{apt.date} • {apt.time}</span>
                        </span>
                      </div>
                    </div>

                    {apt.notes && (
                      <div className="p-2 rounded-lg bg-slate-800/60 text-[10px] text-amber-200/80 italic">
                        Note: {apt.notes}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      {/* Consent status */}
                      <div>
                        {isSigned ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>E-Signed</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedAptForConsent(apt)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-800 hover:bg-[#C5A880] text-slate-300 hover:text-[#0B0F19] border border-slate-700 transition-colors"
                          >
                            <PenTool className="w-3 h-3" />
                            <span>Sign Consent</span>
                          </button>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        {apt.status === 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(apt.id, 'in-progress')}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-semibold transition-colors"
                          >
                            Check In
                          </button>
                        )}
                        {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(apt.id, 'completed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-semibold transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {invoice && invoice.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => setSelectedInvoiceForPay(invoice)}
                            className="px-2.5 py-1 rounded-lg bg-[#C5A880] text-[#0B0F19] text-[10px] font-bold"
                          >
                            Pay
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Desktop Table View (>= sm screens) */}
          <div className="hidden sm:block glass-panel bg-[#111827]/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Patient</th>
                  <th className="py-3.5 px-4">Treatment</th>
                  <th className="py-3.5 px-4">Attending Doctor</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Medical Consent</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No appointments found matching this filter.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => {
                    const invoice = invoices.find((i) => i.id === apt.invoiceId || i.appointmentId === apt.id);
                    const isSigned = signedAptIds[apt.id];

                    return (
                      <tr key={apt.id} className="hover:bg-slate-800/40 transition-colors">
                        {/* Patient */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white text-xs">{apt.clientName}</div>
                          <div className="text-[11px] text-slate-400">{apt.clientPhone}</div>
                          {apt.notes && (
                            <div className="text-[10px] text-amber-200/70 italic mt-0.5 line-clamp-1">
                              Note: {apt.notes}
                            </div>
                          )}
                        </td>

                        {/* Treatment */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-white">{apt.serviceName}</div>
                          <div className="text-[11px] text-slate-400">{apt.durationMinutes} mins • ${apt.price}</div>
                        </td>

                        {/* Staff */}
                        <td className="py-3.5 px-4 text-slate-300">
                          {apt.staffName}
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-white">{apt.date}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#C5A880]" />
                            <span>{apt.time}</span>
                          </div>
                        </td>

                        {/* Medical Consent & E-Signature */}
                        <td className="py-3.5 px-4">
                          {isSigned ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>E-Signed</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedAptForConsent(apt)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-800 hover:bg-[#C5A880] text-slate-300 hover:text-[#0B0F19] border border-slate-700 transition-colors"
                            >
                              <PenTool className="w-3 h-3" />
                              <span>Sign Consent</span>
                            </button>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${getStatusBadge(
                              apt.status
                            )}`}
                          >
                            {apt.status.replace('-', ' ')}
                          </span>
                        </td>

                        {/* Payment */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              apt.paymentStatus === 'paid'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {apt.paymentStatus}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status === 'confirmed' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(apt.id, 'in-progress')}
                                className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-semibold transition-colors"
                                title="Patient Checked In"
                              >
                                Check In
                              </button>
                            )}

                            {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(apt.id, 'completed')}
                                className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-semibold transition-colors"
                                title="Mark Finished"
                              >
                                Complete
                              </button>
                            )}

                            {invoice && invoice.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => setSelectedInvoiceForPay(invoice)}
                                className="px-2 py-1 rounded bg-[#C5A880] text-[#0B0F19] text-[10px] font-bold flex items-center gap-1 transition-all"
                                title="Collect Payment"
                              >
                                <CreditCard className="w-3 h-3" />
                                <span>Pay</span>
                              </button>
                            )}

                            {invoice && (
                              <button
                                type="button"
                                onClick={() => setSelectedInvoiceForPrint(invoice)}
                                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                title="View & Print Invoice Receipt"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}

                            {apt.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                                className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                                title="Cancel Appointment"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}

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

      <ConsentSignatureModal
        appointment={selectedAptForConsent}
        isOpen={!!selectedAptForConsent}
        onClose={() => setSelectedAptForConsent(null)}
        onSignedSuccess={handleSignatureSuccess}
      />

    </div>
  );
};
