import React, { useState } from 'react';
import { StorageService } from '../../../services/storage';
import { Invoice } from '../../../types';
import { X, CreditCard, Lock, Check, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StripeCheckoutModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({
  invoice,
  isOpen,
  onClose,
  onPaymentSuccess,
}) => {
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [zip, setZip] = useState('90210');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !invoice) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      StorageService.payInvoice(invoice.id, '4242', 'Visa');
      setIsProcessing(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#C5A880', '#10B981', '#6366F1'],
        });
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        if (onPaymentSuccess) onPaymentSuccess();
      }, 1600);
    }, 900);
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-[#0F172A] border border-[#C5A880]/40 rounded-2xl shadow-2xl p-6 text-slate-100 animate-scale-up">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold font-serif-luxury text-white">
              Payment Successful!
            </h3>
            <p className="text-xs text-slate-300">
              Receipt generated for <span className="font-semibold text-white">${invoice.total.toFixed(2)}</span>. 
              Invoice <span className="text-[#C5A880]">{invoice.invoiceNumber}</span> is now marked as Paid.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-5">
            {/* Header with Stripe Branding Style */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 text-[#C5A880] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Lumina Luxe MedSpa
                </span>
                <span className="flex items-center gap-1 text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                  <Lock className="w-3 h-3 text-emerald-400" /> 256-bit SSL
                </span>
              </div>
              <div className="text-2xl font-bold font-serif-luxury text-white">
                Pay ${invoice.total.toFixed(2)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {invoice.serviceName} • {invoice.clientName}
              </div>
            </div>

            {/* Test Card Notice */}
            <div className="p-2.5 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/20 text-[11px] text-[#E2CFB6] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
              <span>Simulated Stripe payment environment with test card pre-filled.</span>
            </div>

            {/* Card Information */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Card Details
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                  <CreditCard className="w-4 h-4 text-[#C5A880] absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Expires
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="CVC"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Billing Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-[#0B0F19] bg-gradient-to-r from-[#E2CFB6] via-[#C5A880] to-[#B89260] hover:brightness-110 transition-all shadow-lg shadow-[#C5A880]/20 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <span>Authorizing Charge...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize & Pay ${invoice.total.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-slate-400">
              Encrypted Stripe Terminal API Mock • Instant LocalStorage Sync
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
