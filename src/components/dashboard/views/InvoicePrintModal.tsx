import React from 'react';
import { Invoice } from '../../../types';
import { X, Printer, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface InvoicePrintModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoicePrintModal: React.FC<InvoicePrintModalProps> = ({ invoice, isOpen, onClose }) => {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-2xl shadow-2xl p-8 my-8 print:p-0 print:m-0 print:shadow-none animate-scale-up">
        
        {/* Close & Print Buttons (hidden in print) */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print or Save PDF</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div className="pt-6 space-y-6">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#9D7B50]" />
                <span className="font-serif-luxury text-2xl font-bold tracking-wider text-slate-900">
                  LUMINA LUXE
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Medical Spa & Longevity Institute<br />
                450 N Rodeo Dr, Suite 400<br />
                Beverly Hills, CA 90210 • (310) 849-2000
              </p>
            </div>

            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 tracking-wide">
                INVOICE RECEIPT
              </div>
              <div className="font-mono text-xs text-slate-600 font-medium mt-0.5">
                {invoice.invoiceNumber}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Date: {invoice.date}
              </div>
              
              {/* Status Badge */}
              <div className="mt-2">
                {invoice.status === 'paid' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] uppercase tracking-wider border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    PAID IN FULL
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px] uppercase tracking-wider border border-amber-300">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    PAYMENT DUE
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Patient / Billed To:
            </div>
            <div className="font-bold text-slate-900 text-sm">{invoice.clientName}</div>
            <div className="text-slate-600">{invoice.clientEmail}</div>
            {invoice.paymentMethod && (
              <div className="text-slate-500 mt-1">
                Payment Method: <span className="font-medium text-slate-700">{invoice.paymentMethod}</span>
              </div>
            )}
          </div>

          {/* Line Items Table */}
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500 uppercase text-[10px] tracking-wider">
                <th className="py-2">Procedure / Clinical Service</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Rate</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-semibold text-slate-800">
                  {invoice.serviceName}
                  <div className="text-[11px] text-slate-500 font-normal">
                    Includes clinical assessment, sterile suite prep & post-procedure dermal treatment.
                  </div>
                </td>
                <td className="py-3 text-right text-slate-600">1</td>
                <td className="py-3 text-right text-slate-600">${invoice.amount.toFixed(2)}</td>
                <td className="py-3 text-right font-medium text-slate-900">${invoice.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals Calculation */}
          <div className="border-t border-slate-200 pt-4 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-800">${invoice.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>CA State Clinical Healthcare Tax (9.5%)</span>
              <span className="font-medium text-slate-800">${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-950 border-t border-slate-300 pt-2 font-serif-luxury">
              <span>Total Paid</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center pt-4 border-t border-slate-200 text-[10px] text-slate-400">
            Thank you for choosing Lumina Luxe MedSpa. For post-treatment emergency medical questions, contact our 24/7 on-call provider at (310) 849-2000.
          </div>

        </div>

      </div>
    </div>
  );
};
