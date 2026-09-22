import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Digital Operations & Scheduling',
    question: 'How does the online client portal and real-time scheduling work?',
    answer:
      'Our integrated digital portal allows VIP clients to browse real-time availability across attending physicians, choose procedure suites, and receive instant confirmation. You can review scheduled dates, clinical preparation instructions, and past treatment notes directly from your personal dashboard.',
  },
  {
    category: 'Safety & Clinical Standards',
    question: 'Are all procedures, modalities, and injectables FDA-cleared?',
    answer:
      'Yes. Every technology utilized at Lumina Luxe—including our Morpheus8 RF microneedling platforms, CoolSculpting Elite cryolipolysis applicators, and biostimulator compounds (Sculptra / PLLA)—is 100% FDA-cleared and administered under strict board-certified medical supervision.',
  },
  {
    category: 'Appointments & Rescheduling',
    question: 'What is your rescheduling policy, and can I make adjustments online?',
    answer:
      'We understand executive schedules shift. You can reschedule your appointment up to 24 hours prior to your scheduled suite time directly through your VIP Client Sanctuary without incurring any consultation forfeiture or administrative fees.',
  },
  {
    category: 'Treatment Packages & Savings',
    question: 'How do the custom treatment packages and bundle savings calculate?',
    answer:
      'When bundling 3 or more sessions via our Interactive Treatment Estimator, an automated 15% to 20% concierge package discount is automatically applied to your itemized invoice. Multi-session packages also include complimentary medical-grade LED phototherapy conditioning.',
  },
  {
    category: 'Invoicing & Payments',
    question: 'What payment methods are supported, and can I receive itemized tax invoices?',
    answer:
      'We process Visa, Mastercard, American Express, Apple Pay, and Wire Transfers via our encrypted Stripe healthcare merchant gateway. All invoices include full clinical procedure itemization, tax breakdowns, and printable PDF receipts suitable for HSA/FSA records where eligible.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { setOpenBookingModal } = useAuth();

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#090D16] border-t border-[#C5A880]/15 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162032] border border-[#C5A880]/30 text-xs font-semibold text-[#E2CFB6] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>PATIENT CONCIERGE & FAQS</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-light">
            Everything you need to know about our clinical standards, bespoke care plans, and digital client portal.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#111827]/90 border-[#C5A880]/50 shadow-xl shadow-black/40'
                    : 'bg-[#0F172A]/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-serif-luxury">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#C5A880] text-[#0B0F19]' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth Expandable Answer */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-slate-800/60 animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl glass-card bg-[#111827]/70 border border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A880]/20 text-[#E2CFB6] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Have a specific anatomical question?</div>
              <div className="text-xs text-slate-400">Our concierge medical team is available for private intake evaluations.</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenBookingModal(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0B0F19] bg-[#C5A880] hover:bg-[#D4BA94] transition-all cursor-pointer whitespace-nowrap"
          >
            Schedule Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
