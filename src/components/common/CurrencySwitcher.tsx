import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, CURRENCIES, CurrencyCode } from '../../context/CurrencyContext';
import { Globe, ChevronDown } from 'lucide-react';

interface CurrencySwitcherProps {
  compact?: boolean;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ compact = false }) => {
  const { currency, setCurrency, currencyConfig } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors shadow-sm cursor-pointer"
        title="Select Display Currency"
      >
        <span className="text-sm">{currencyConfig.flag}</span>
        <span className="font-mono text-[#E2CFB6]">{currency}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-[#0F172A] border border-[#C5A880]/30 shadow-2xl py-1 z-50 animate-scale-up">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 tracking-wider flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#C5A880]" />
            <span>Select Currency</span>
          </div>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
            const item = CURRENCIES[code];
            const isSelected = currency === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setCurrency(code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#C5A880]/20 text-[#E2CFB6] font-bold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.flag}</span>
                  <span>{item.label}</span>
                </div>
                {isSelected && <span className="text-[10px] text-[#C5A880]">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
