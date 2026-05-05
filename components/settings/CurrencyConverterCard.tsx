'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setFromCurrency,
  setToCurrency,
  setAmount,
  swapCurrencies,
  calculateConversion,
} from '@/store/slices/currencySlice';

export function CurrencyConverterCard() {
  const dispatch = useDispatch<AppDispatch>();
  const currency = useSelector((s: RootState) => s.currency);

  const currencyCodes =
    Object.keys(currency.rates).length > 0
      ? Object.keys(currency.rates)
      : ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

  const getCurrencyLabel = (code: string) =>
    currency.currencyNames[code] ? `${code} - ${currency.currencyNames[code]}` : code;

  const handleSwap = () => {
    dispatch(swapCurrencies());
    dispatch(calculateConversion());
  };

  return (
    <div
      className="col-span-12 bg-white p-md border border-slate-200 rounded-xl"
      style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
    >
      <div className="flex items-center gap-3 mb-md">
        <span className="material-symbols-outlined text-secondary">currency_exchange</span>
        <h3 className="text-headline-md font-semibold">Currency Converter</h3>
        {currency.loading && (
          <span className="text-xs text-slate-400 ml-2">Fetching live rates...</span>
        )}
        {currency.lastUpdated && (
          <span className="text-xs text-slate-400 ml-2">
            Updated: {new Date(currency.lastUpdated).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2 space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">Amount</label>
          <input
            type="number"
            value={currency.amount}
            onChange={(e) => dispatch(setAmount(e.target.value))}
            placeholder="1.00"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">From</label>
          <select
            value={currency.fromCurrency}
            onChange={(e) => dispatch(setFromCurrency(e.target.value))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all appearance-none"
          >
            {currencyCodes.map((code) => (
              <option key={code} value={code}>{getCurrencyLabel(code)}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-end pb-2">
          <button
            onClick={handleSwap}
            className="p-3 bg-surface-container rounded-full hover:bg-surface-container-high transition-colors"
            title="Swap currencies"
          >
            <span className="material-symbols-outlined text-secondary">swap_horiz</span>
          </button>
        </div>
        <div className="space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">To</label>
          <select
            value={currency.toCurrency}
            onChange={(e) => dispatch(setToCurrency(e.target.value))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all appearance-none"
          >
            {currencyCodes.map((code) => (
              <option key={code} value={code}>{getCurrencyLabel(code)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          onClick={() => dispatch(calculateConversion())}
          className="px-8 py-3 bg-secondary text-white rounded-lg text-label-lg font-medium hover:bg-secondary/90 transition-all shadow-sm"
        >
          Convert
        </button>
        {currency.convertedAmount !== null && (
          <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant">
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Result</p>
              <p className="text-stat-lg font-bold text-on-surface">
                {currency.convertedAmount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}
                <span className="text-label-lg font-medium text-on-primary-container ml-2">
                  {currency.toCurrency}
                </span>
              </p>
              <p className="text-xs text-on-primary-container">
                {currency.amount} {currency.fromCurrency} = {currency.convertedAmount} {currency.toCurrency}
              </p>
            </div>
          </div>
        )}
      </div>
      {currency.error && <p className="mt-3 text-sm text-error">{currency.error}</p>}
    </div>
  );
}
