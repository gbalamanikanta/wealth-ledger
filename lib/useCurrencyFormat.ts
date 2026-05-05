'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function useCurrencyFormat() {
  const primaryCurrency = useSelector((s: RootState) => s.settings.primaryCurrency);
  const rates = useSelector((s: RootState) => s.currency.rates);

  const format = (usdAmount: number, fractionDigits = 2): string => {
    const rate = rates[primaryCurrency] ?? 1;
    const converted = usdAmount * rate;
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: primaryCurrency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }).format(converted);
    } catch {
      return `${primaryCurrency} ${converted.toLocaleString('en-US', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })}`;
    }
  };

  const formatCompact = (usdAmount: number): string => {
    const rate = rates[primaryCurrency] ?? 1;
    const converted = usdAmount * rate;
    if (Math.abs(converted) >= 1_000_000)
      return format(usdAmount, 0).replace(/(\D*)(\d[\d,.]*)/, (_, sym, num) => `${sym}${(converted / 1_000_000).toFixed(2)}M`);
    if (Math.abs(converted) >= 1_000)
      return format(usdAmount, 0).replace(/(\D*)(\d[\d,.]*)/, (_, sym, num) => `${sym}${(converted / 1_000).toFixed(1)}K`);
    return format(usdAmount);
  };

  return { format, formatCompact, primaryCurrency };
}
