'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import {
  setFromCurrency,
  setToCurrency,
  setAmount,
  swapCurrencies,
  calculateConversion,
} from '@/store/slices/currencySlice';
import {
  selectRates,
  selectCurrencyNames,
  selectConversionAmount,
  selectFromCurrency,
  selectToCurrency,
  selectConvertedAmount,
  selectCurrencyLoading,
} from '@/store/selectors/currencySelectors';

export function CurrencyConverterCard() {
  const dispatch = useDispatch<AppDispatch>();
  const rates = useSelector(selectRates);
  const currencyNames = useSelector(selectCurrencyNames);
  const amount = useSelector(selectConversionAmount);
  const fromCurrency = useSelector(selectFromCurrency);
  const toCurrency = useSelector(selectToCurrency);
  const convertedAmount = useSelector(selectConvertedAmount);
  const loading = useSelector(selectCurrencyLoading);

  const currencyCodes =
    Object.keys(rates).length > 0
      ? Object.keys(rates)
      : ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

  const getCurrencyLabel = (code: string) =>
    currencyNames[code] ? `${code} - ${currencyNames[code]}` : code;

  const handleSwap = () => {
    dispatch(swapCurrencies());
    dispatch(calculateConversion());
  };

  return (
    <div
      className="col-span-12 bg-white p-md border border-slate-200 rounded-xl card-shadow"
    >
      <div className="flex items-center gap-3 mb-md">
        <span className="material-symbols-outlined text-secondary">currency_exchange</span>
        <h3 className="text-headline-md font-semibold">Currency Converter</h3>
        {loading && (
          <span className="text-xs text-slate-400 ml-2">Fetching live rates...</span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2 space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => dispatch(setAmount(e.target.value))}
            placeholder="1.00"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">From</label>
          <select
            value={fromCurrency}
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
            value={toCurrency}
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
        {convertedAmount !== null && (
          <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant">
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Result</p>
              <p className="text-stat-lg font-bold text-on-surface">
                {convertedAmount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}
                <span className="text-label-lg font-medium text-on-primary-container ml-2">
                  {toCurrency}
                </span>
              </p>
              <p className="text-xs text-on-primary-container">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
