import React, { useState, useEffect } from 'react';
import { StorageService, subscribeToStorageChanges } from '../../../services/storage';
import { Invoice } from '../../../types';
import { Search, CreditCard, Printer, Eye, CheckCircle2, Clock, DollarSign, Sparkles, Download } from 'lucide-react';
import { StripeCheckoutModal } from './StripeCheckoutModal';
import { InvoicePrintModal } from './InvoicePrintModal';

export const InvoicesView: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => StorageService.getInvoices());
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [search, setSearch] = useState('');

  // Modals
  const [selectedForPay, setSelectedForPay] = useState<Invoice | null>(null);
  const [selectedForPrint, setSelectedForPrint] = useState<Invoice | null>(null);

  useEffect(() => {
    const unsub = subscribeToStorageChanges(() => {
      setInvoices(StorageService.getInvoices());
    });
    return unsub;
  }, []);

  const handleExportCSV = () => {
    const headers = ['InvoiceNumber,ClientName,ClientEmail,Service,Date,DueDate,Amount,Tax,Total,Status,PaymentMethod,PaidAt'];
    const rows = invoices.map((inv) =>
      `"${inv.invoiceNumber}","${inv.clientName}","${inv.clientEmail}","${inv.serviceName}","${inv.date}","${inv.dueDate}",${inv.amount},${inv.tax},${inv.total},"${inv.status}","${inv.paymentMethod || 'N/A'}","${inv.paidAt || 'N/A'}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lumina_revenue_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesFilter = filter === 'all' || inv.status === filter;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.serviceName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const paidTotal = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const pendingTotal = invoices.filter((i) => i.status === 'pending').reduce((s, i) => s + i.total, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Invoices & Automated Billing Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time accounts receivable, Stripe merchant processing, and printable tax receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Download CSV for Accountant"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Export CSV</span>
          </button>

          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Search invoice or patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Financial Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-slate-400">Total Settled Collections</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-luxury text-white mt-2">
            ${paidTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Stripe Direct Deposit & Cards</div>
        </div>

        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-slate-400">Pending Receivables</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-luxury text-white mt-2">
            ${pendingTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-amber-400 mt-0.5">Awaiting 1-click patient payment</div>
        </div>

        <div className="glass-card bg-[#111827]/80 rounded-2xl p-5 border border-slate-800 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-slate-400">Processing Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 text-[#E2CFB6] flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-[#C5A880]" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-luxury text-white mt-2">
            2.9% + 30¢
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Stripe Connected Healthcare Merchant</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'paid', 'pending'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
              filter === tab
                ? 'bg-[#C5A880] text-[#0B0F19]'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            {tab} Invoices ({tab === 'all' ? invoices.length : invoices.filter((i) => i.status === tab).length})
          </button>
        ))}
      </div>

      {/* Mobile Invoices Card List (< sm screens) */}
      <div className="block sm:hidden space-y-3">
        {filteredInvoices.map((inv) => (
          <div
            key={inv.id}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-white">{inv.invoiceNumber}</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  inv.status === 'paid'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {inv.status}
              </span>
            </div>

            <div>
              <div className="font-bold text-white text-sm">{inv.clientName}</div>
              <div className="text-[11px] text-[#C5A880] mt-0.5">{inv.serviceName}</div>
              <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                <span>Issued: {inv.date}</span>
                <span>Due: {inv.dueDate}</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Billed:</span>
                <span className="text-base font-bold text-white font-serif-luxury">${inv.total.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2">
                {inv.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => setSelectedForPay(inv)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] text-[#0B0F19] font-bold text-xs flex items-center gap-1 shadow-md"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedForPrint(inv)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs flex items-center gap-1 border border-slate-700"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Invoices Table (>= sm screens) */}
      <div className="hidden sm:block glass-panel bg-[#111827]/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Invoice ID</th>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Service Description</th>
                <th className="py-3.5 px-4">Date Issued</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-white">{inv.invoiceNumber}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{inv.clientName}</div>
                    <div className="text-[10px] text-slate-400">{inv.clientEmail}</div>
                  </td>
                  <td className="py-3.5 px-4">{inv.serviceName}</td>
                  <td className="py-3.5 px-4 text-slate-400">{inv.date}</td>
                  <td className="py-3.5 px-4 text-slate-400">{inv.dueDate}</td>
                  <td className="py-3.5 px-4 font-bold text-white font-serif-luxury text-sm">
                    ${inv.total.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
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
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => setSelectedForPay(inv)}
                          className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] text-[#0B0F19] font-bold text-[11px] flex items-center gap-1 hover:brightness-110 shadow-sm cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay (Stripe)</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedForPrint(inv)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-[11px] flex items-center gap-1 transition-colors"
                        title="View / Print Tax Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print</span>
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
        invoice={selectedForPay}
        isOpen={!!selectedForPay}
        onClose={() => setSelectedForPay(null)}
      />

      <InvoicePrintModal
        invoice={selectedForPrint}
        isOpen={!!selectedForPrint}
        onClose={() => setSelectedForPrint(null)}
      />

    </div>
  );
};
