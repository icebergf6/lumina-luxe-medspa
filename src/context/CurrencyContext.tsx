import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'IDR' | 'EUR' | 'GBP' | 'SGD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number;
  label: string;
  flag: string;
  decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rateFromUSD: 1.0,
    label: 'USD ($)',
    flag: '🇺🇸',
    decimals: 0,
  },
  IDR: {
    code: 'IDR',
    symbol: 'Rp',
    rateFromUSD: 16000,
    label: 'IDR (Rp)',
    flag: '🇮🇩',
    decimals: 0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateFromUSD: 0.92,
    label: 'EUR (€)',
    flag: '🇪🇺',
    decimals: 0,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateFromUSD: 0.78,
    label: 'GBP (£)',
    flag: '🇬🇧',
    decimals: 0,
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    rateFromUSD: 1.35,
    label: 'SGD (S$)',
    flag: '🇸🇬',
    decimals: 0,
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number, showDecimals?: boolean) => string;
  convertPrice: (amountInUSD: number) => number;
  currencyConfig: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'lumina_active_currency';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode;
    return saved && CURRENCIES[saved] ? saved : 'USD';
  });

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem(CURRENCY_STORAGE_KEY, code);
  };

  const currencyConfig = CURRENCIES[currency];

  const convertPrice = (amountInUSD: number): number => {
    return Math.round(amountInUSD * currencyConfig.rateFromUSD);
  };

  const formatPrice = (amountInUSD: number, showDecimals: boolean = false): string => {
    const converted = amountInUSD * currencyConfig.rateFromUSD;
    if (currency === 'IDR') {
      return `Rp ${Math.round(converted).toLocaleString('id-ID')}`;
    }
    if (currency === 'USD') {
      return showDecimals
        ? `$${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : `$${Math.round(converted).toLocaleString('en-US')}`;
    }
    if (currency === 'EUR') {
      return `€${Math.round(converted).toLocaleString('de-DE')}`;
    }
    if (currency === 'GBP') {
      return `£${Math.round(converted).toLocaleString('en-GB')}`;
    }
    if (currency === 'SGD') {
      return `S$${Math.round(converted).toLocaleString('en-SG')}`;
    }
    return `${currencyConfig.symbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currencyConfig,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
