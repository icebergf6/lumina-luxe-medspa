import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { useAuth } from '../../../context/AuthContext';
import { useCurrency } from '../../../context/CurrencyContext';
import { Appointment, Invoice } from '../../../types';
import { DollarSign, Calendar, Users, TrendingUp, Sparkles, Clock, CheckCircle2, ArrowUpRight, Plus, Eye, CreditCard, AlertCircle } from 'lucide-react';
import { StripeCheckoutModal } from './StripeCheckoutModal';
import { InvoicePrintModal } from './InvoicePrintModal';

export const OverviewView: React.FC = () => {
  const { role, user, setOpenBookingModal, setActiveTab } = useAuth();
  const { formatPrice } = useCurrency();
  const [metrics, setMetrics] = useState(() => StorageService.getMetrics());
  const [appointments, setAppointments] = useState<Appointment[]>(() => StorageService.getAppointments());
  const [invoices, setInvoices] = useState<Invoice[]>(() => StorageService.getInvoices());
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

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
    { month: 'Apr', value: 28400, sessions: 38, height: 45 },
    { month: 'May', value: 33100, sessions: 44, height: 55 },
    { month: 'Jun', value: 39500, sessions: 52, height: 68 },
    { month: 'Jul', value: 42000, sessions: 57, height: 74 },
    { month: 'Aug', value: 45800, sessions: 63, height: 85 },
    { month: 'Sep (Current)', value: metrics.totalRevenue, sessions: 71, height: 95 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
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
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 prose-readable">
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
            className="btn-gold px-4 py-2.5 text-xs font-semibold"
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
            <div className="text-2xl font-bold font-serif-luxury text-white tabular-nums">
              {formatPrice(metrics.totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="tabular-nums">+{metrics.revenueGrowth}%</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Stripe & Concierge Collections</div>
        </div>

        {/* Metric 2 */}
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800 hover:border-[#C5A880]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Appointments</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-bold font-serif-luxury text-white tabular-nums">
              {appointments.length}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="tabular-nums">+{metrics.bookingsGrowth}%</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">{todayAppointments.length} procedures scheduled today</div>
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
            <div className="text-2xl font-bold font-serif-luxury text-white tabular-nums">
              {metrics.retentionRate}%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-400">
              <span>VIP Tier</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">{metrics.activeClients} active patient records</div>
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
            <div className="text-2xl font-bold font-serif-luxury text-white tabular-nums">
              {pendingInvoices.length} Pending
            </div>
            <div className="text-[11px] font-semibold text-amber-400 tabular-nums">
              {formatPrice(pendingInvoices.reduce((s, i) => s + i.total, 0))}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting digital card payment</div>
        </div>

      </div>

      {/* Grid: Revenue Chart + Today's Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Interactive Revenue Performance Chart with Y-axis & Tooltip */}
        <div className="lg:col-span-7 glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  Financial Performance & Revenue Velocity
                </h3>
                <p className="text-xs text-slate-400">6-Month billing run-rate (Stripe + Concierge Wire)</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                +23.4% YoY
              </span>
            </div>

            {/* Chart Area with Y-axis labels & Tooltip */}
            <div className="relative pt-6">
              {/* Tooltip display */}
              {hoveredBarIndex !== null && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#0B0F19] border border-[#C5A880]/40 text-xs shadow-xl text-center z-20 pointer-events-none animate-fade-in">
                  <span className="text-slate-400 font-medium">
                    {revenueChartData[hoveredBarIndex].month}:{' '}
                  </span>
                  <strong className="text-[#E2CFB6] tabular-nums">
                    {formatPrice(revenueChartData[hoveredBarIndex].value)}
                  </strong>
                  <span className="text-[10px] text-slate-400 ml-1.5">
                    ({revenueChartData[hoveredBarIndex].sessions} procedures)
                  </span>
                </div>
              )}

              <div className="flex items-stretch h-56 pt-6">
                {/* Y-Axis scale */}
                <div className="flex flex-col justify-between text-[10px] text-slate-400 font-mono pr-3 border-r border-slate-800 select-none pb-6">
                  <span>$60k</span>
                  <span>$45k</span>
                  <span>$30k</span>
                  <span>$15k</span>
                  <span>$0k</span>
                </div>

                {/* Bars */}
                <div className="flex-1 flex items-end justify-between gap-2 sm:gap-3 pl-3 sm:pl-4">
                  {revenueChartData.map((item, idx) => (
                    <div
                      key={item.month}
                      onMouseEnter={() => setHoveredBarIndex(idx)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                      onFocus={() => setHoveredBarIndex(idx)}
                      onBlur={() => setHoveredBarIndex(null)}
                      tabIndex={0}
                      role="img"
                      aria-label={`${item.month}: ${formatPrice(item.value)}, ${item.sessions} procedures`}
                      className="flex-1 flex flex-col items-center gap-2 group cursor-pointer focus-gold rounded-t-lg"
                    >
                      <div className="w-full max-w-[42px] bg-slate-800/80 rounded-t-lg relative overflow-hidden h-36 flex items-end">
                        <div
                          style={{ height: `${item.height}%` }}
                          className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                            idx === revenueChartData.length - 1
                              ? 'bg-gradient-to-t from-[#9D7B50] via-[#C5A880] to-[#E2CFB6] shadow-lg shadow-[#C5A880]/30'
                              : 'bg-slate-700 group-hover:bg-[#C5A880]/80 group-focus:bg-[#C5A880]/80'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                        {item.month.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Average Order Value: <strong className="text-white tabular-nums">$745.00</strong></span>
            <span>Monthly Recurring Patients: <strong className="text-emerald-400 tabular-nums">68%</strong></span>
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
                className="text-xs text-[#C5A880] hover:text-[#E2CFB6] hover:underline cursor-pointer"
              >
                View Full Queue
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
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-semibold text-xs text-white">
                        {apt.clientName}
                      </div>
                      <div className="text-[11px] text-[#C5A880] font-medium mt-0.5">
                        {apt.serviceName}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                        <span>{apt.time}</span>
                        <span>•</span>
                        <span>Room 2</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {/* Status Badges with Icon + Text */}
                      {apt.status === 'confirmed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Confirmed</span>
                        </span>
                      )}
                      {apt.status === 'completed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      )}
                      {apt.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                      {apt.status === 'cancelled' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          <span>Cancelled</span>
                        </span>
                      )}

                      <span className="text-xs font-bold text-slate-200 tabular-nums font-mono">
                        {formatPrice(apt.price)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Clinical Lead: Dr. Eleanor Vance</span>
            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className="text-[#C5A880] hover:underline cursor-pointer"
            >
              Open Schedule →
            </button>
          </div>
        </div>

      </div>

      {/* Quick Invoicing Settlement Section */}
      <div className="glass-panel bg-[#111827]/80 rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif-luxury text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#C5A880]" />
              <span>Pending Billing Transactions</span>
            </h3>
            <p className="text-xs text-slate-400">Unsettled invoices ready for client checkout</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('invoices')}
            className="text-xs text-[#C5A880] hover:underline cursor-pointer"
          >
            All Invoices
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingInvoices.slice(0, 3).map((inv) => (
            <div
              key={inv.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
            >
              <div>
                <div className="font-semibold text-xs text-white">{inv.clientName}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Invoice #{inv.id}</div>
                <div className="text-base font-bold text-[#E2CFB6] font-serif-luxury mt-1 tabular-nums">
                  {formatPrice(inv.total)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInvoiceForPay(inv)}
                className="btn-gold px-3 py-1.5 text-xs font-semibold cursor-pointer"
              >
                <span>Settle Now</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stripe Checkout Modal */}
      {selectedInvoiceForPay && (
        <StripeCheckoutModal
          invoice={selectedInvoiceForPay}
          isOpen={!!selectedInvoiceForPay}
          onClose={() => setSelectedInvoiceForPay(null)}
          onPaymentSuccess={() => setSelectedInvoiceForPay(null)}
        />
      )}

      {/* Invoice Print Modal */}
      {selectedInvoiceForPrint && (
        <InvoicePrintModal
          invoice={selectedInvoiceForPrint}
          isOpen={!!selectedInvoiceForPrint}
          onClose={() => setSelectedInvoiceForPrint(null)}
        />
      )}

    </div>
  );
};
