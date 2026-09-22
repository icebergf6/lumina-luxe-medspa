import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { useAuth } from '../../../context/AuthContext';
import { Appointment, Invoice } from '../../../types';
import { DollarSign, Calendar, Users, TrendingUp, Sparkles, Clock, CheckCircle, ArrowUpRight, Plus, Eye, CreditCard } from 'lucide-react';
import { StripeCheckoutModal } from './StripeCheckoutModal';
import { InvoicePrintModal } from './InvoicePrintModal';

export const OverviewView: React.FC = () => {
  const { role, user, setOpenBookingModal, setActiveTab } = useAuth();
  const [metrics, setMetrics] = useState(() => StorageService.getMetrics());
  const [appointments, setAppointments] = useState<Appointment[]>(() => StorageService.getAppointments());
  const [invoices, setInvoices] = useState<Invoice[]>(() => StorageService.getInvoices());

  // Modal states
  const [selectedInvoiceForPay, setSelectedInvoiceForPay] = useState<Invoice | null>(null);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToStorageChanges(() => {
      setMetrics(StorageService.getMetrics());
      setAppointments(StorageService.getAppointments());
      setInvoices(StorageService.getInvoices());
    });
    return unsubscribe;
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const pendingInvoices = invoices.filter((i) => i.status === 'pending');

  const handleUpdateStatus = (id: string, status: any) => {
    StorageService.updateAppointmentStatus(id, status);
  };

  // Monthly revenue trend mock data for SVG chart
  const revenueChartData = [
    { month: 'Apr', value: 28400, height: 45 },
    { month: 'May', value: 33100, height: 55 },
    { month: 'Jun', value: 39500, height: 68 },
    { month: 'Jul', value: 42000, height: 74 },
    { month: 'Aug', value: 45800, height: 85 },
    { month: 'Sep (Current)', value: metrics.totalRevenue, height: 95 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] rounded-2xl p-6 border border-[#C5A880]/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Clinic Operations Live Portal</span>
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            {role === 'admin'
              ? 'Real-time overview of clinical revenue, daily bookings, and patient intake.'
              : role === 'staff'
              ? 'Your assigned patient queue and clinical notes for today.'
              : 'Your scheduled treatments, care plans, and recent invoices.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
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

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800 hover:border-[#C5A880]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#C5A880]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-bold font-serif-luxury text-white">
              ${metrics.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{metrics.revenueGrowth}%</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Stripe & POS collections this period</div>
        </div>

        {/* Metric 2 */}
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800 hover:border-[#C5A880]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-bold font-serif-luxury text-white">
              {appointments.length}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{metrics.bookingsGrowth}%</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">{todayAppointments.length} procedures today</div>
        </div>

        {/* Metric 3 */}
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800 hover:border-[#C5A880]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Patient Retention</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-bold font-serif-luxury text-white">
              {metrics.retentionRate}%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-400">
              <span>VIP Tier</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">{metrics.activeClients} active VIP records</div>
        </div>

        {/* Metric 4 */}
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800 hover:border-[#C5A880]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Unsettled Invoices</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-bold font-serif-luxury text-white">
              {pendingInvoices.length} Pending
            </div>
            <div className="text-[11px] font-semibold text-amber-400">
              ${pendingInvoices.reduce((s, i) => s + i.total, 0).toFixed(0)}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting online card settlement</div>
        </div>

      </div>

      {/* Grid: Revenue Chart + Today's Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Interactive Revenue Performance Chart */}
        <div className="lg:col-span-7 glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  Financial Performance & Revenue Velocity
                </h3>
                <p className="text-xs text-slate-400">6-Month billing run-rate (Stripe + Concierge Wire)</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                +23.4% YoY
              </span>
            </div>

            {/* Custom SVG Bar & Trend Visualizer */}
            <div className="h-56 w-full pt-8 flex items-end justify-between gap-3 px-2">
              {revenueChartData.map((item, idx) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="text-[10px] text-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    ${(item.value / 1000).toFixed(1)}k
                  </div>
                  <div className="w-full max-w-[42px] bg-slate-800 rounded-t-lg relative overflow-hidden h-40 flex items-end">
                    <div
                      style={{ height: `${item.height}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        idx === revenueChartData.length - 1
                          ? 'bg-gradient-to-t from-[#9D7B50] via-[#C5A880] to-[#E2CFB6] shadow-lg shadow-[#C5A880]/30'
                          : 'bg-slate-700 group-hover:bg-[#C5A880]/70'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Average Order Value: <strong className="text-white">$745.00</strong></span>
            <span>Monthly Recurring Patients: <strong className="text-emerald-400">68%</strong></span>
          </div>
        </div>

        {/* Right: Today's Appointments Queue */}
        <div className="lg:col-span-5 glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C5A880]" />
                  <span>Today's Treatment Schedule</span>
                </h3>
                <p className="text-xs text-slate-400">{todayAppointments.length} clinical appointments queued</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('appointments')}
                className="text-xs text-[#C5A880] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-400">
                  No appointments scheduled for today.
                </div>
              ) : (
                todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-xs text-white">{apt.clientName}</div>
                        <div className="text-[11px] text-[#C5A880] font-medium">{apt.serviceName}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {apt.time} • {apt.staffName}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${
                          apt.status === 'confirmed'
                            ? 'bg-blue-500/20 text-blue-300'
                            : apt.status === 'in-progress'
                            ? 'bg-amber-500/20 text-amber-300'
                            : apt.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    {/* Quick Action buttons */}
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800/60">
                      {apt.status !== 'completed' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(apt.id, 'completed')}
                          className="text-[10px] font-semibold px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 flex items-center gap-1 transition-colors"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Mark Done</span>
                        </button>
                      )}
                      {apt.status === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(apt.id, 'in-progress')}
                          className="text-[10px] font-semibold px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-colors"
                        >
                          Check In
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => setOpenBookingModal(true)}
              className="text-xs text-slate-300 hover:text-[#C5A880] font-medium"
            >
              + Add Walk-In or Direct Booking
            </button>
          </div>
        </div>

      </div>

      {/* Recent Invoices & Billing Table */}
      <div className="glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              Recent Invoices & Transactions
            </h3>
            <p className="text-xs text-slate-400">Live transaction ledger with simulated Stripe settlements</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('invoices')}
            className="text-xs text-[#C5A880] hover:underline"
          >
            View All Invoices
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.slice(0, 5).map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-white">{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 font-semibold text-white">{inv.clientName}</td>
                  <td className="py-3 px-4 text-slate-300">{inv.serviceName}</td>
                  <td className="py-3 px-4 text-slate-400">{inv.date}</td>
                  <td className="py-3 px-4 font-bold text-white font-serif-luxury text-sm">
                    ${inv.total.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceForPay(inv)}
                          className="px-2.5 py-1 rounded bg-[#C5A880] hover:bg-[#D4BA94] text-[#0B0F19] font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <CreditCard className="w-3 h-3" />
                          <span>Pay (Stripe)</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceForPrint(inv)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        title="View & Print Receipt"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
