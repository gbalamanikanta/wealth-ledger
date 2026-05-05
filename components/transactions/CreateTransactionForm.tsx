'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { addTransaction } from '@/store/slices/transactionsSlice';
import { adjustBalance } from '@/store/slices/cryptoSlice';
import { selectPrices } from '@/store/selectors/cryptoSelectors';
import { Transaction } from '@/lib/fakerData';

const CATEGORIES = ['Equity Purchase', 'Crypto Transfer', 'Dividend', 'Institutional Fee', 'Fixed Income'];
const STATUSES = ['Settled', 'Pending', 'Processing'];

const CRYPTO_ASSETS = [
  { id: 'bitcoin',  symbol: 'BTC',  name: 'Bitcoin'  },
  { id: 'ethereum', symbol: 'ETH',  name: 'Ethereum' },
  { id: 'solana',   symbol: 'SOL',  name: 'Solana'   },
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
];

const defaultForm = () => ({
  date: new Date().toISOString().split('T')[0],
  category: 'Equity Purchase' as Transaction['category'],
  description: '',
  amount: '',
  status: 'Pending' as Transaction['status'],
  cryptoAssetId: 'bitcoin',
  cryptoQty: '',
  isBuy: true,
});

export function CreateTransactionForm() {
  const dispatch = useDispatch<AppDispatch>();
  const cryptoPrices = useSelector(selectPrices);
  const [form, setForm] = useState(defaultForm);

  const isCrypto = form.category === 'Crypto Transfer';
  const selectedAsset = CRYPTO_ASSETS.find((a) => a.id === form.cryptoAssetId)!;
  const currentPrice = cryptoPrices[form.cryptoAssetId] ?? 0;

  const usdAmount = isCrypto && form.cryptoQty
    ? parseFloat(form.cryptoQty) * currentPrice
    : parseFloat(form.amount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCrypto) {
      const qty = parseFloat(form.cryptoQty);
      if (isNaN(qty) || qty <= 0) return;
      const signedUsd = form.isBuy ? -usdAmount : usdAmount;
      const signedQty = form.isBuy ? qty : -qty;

      dispatch(
        addTransaction({
          name: `${form.isBuy ? 'Buy' : 'Sell'} ${selectedAsset.name}`,
          date: formatDate(form.date),
          time: formatTime(),
          category: 'Crypto Transfer',
          amount: parseFloat(signedUsd.toFixed(2)),
          status: form.status,
          description: form.description || `${form.isBuy ? 'Purchased' : 'Sold'} ${qty} ${selectedAsset.symbol}`,
          cryptoAssetId: form.cryptoAssetId,
          cryptoSymbol: selectedAsset.symbol,
          cryptoQty: signedQty,
        })
      );
      dispatch(adjustBalance({ assetId: form.cryptoAssetId, qty: signedQty }));
    } else {
      const amt = parseFloat(form.amount);
      if (isNaN(amt)) return;
      dispatch(
        addTransaction({
          name: form.description || `New ${form.category}`,
          date: formatDate(form.date),
          time: formatTime(),
          category: form.category,
          amount: amt,
          status: form.status,
          description: form.description,
        })
      );
    }

    setForm(defaultForm());
  };

  return (
    <div className="sticky top-24 bg-white border-2 border-secondary-container/20 rounded-xl shadow-xl overflow-hidden ring-4 ring-secondary-container/5">
      <div className="bg-secondary-container px-6 py-4 flex items-center justify-between">
        <h3 className="text-white font-semibold">New Transaction</h3>
        <span className="material-symbols-outlined text-white/60 text-sm">edit_note</span>
      </div>

      <form className="p-6 space-y-5" onSubmit={handleSubmit}>
        {/* Date */}
        <div className="space-y-2">
          <label className="block text-label-sm font-semibold text-on-surface-variant">Transaction Date</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              calendar_month
            </span>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-label-sm font-semibold text-on-surface-variant">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Transaction['category'] })}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Crypto-specific fields */}
        {isCrypto && (
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex gap-2 p-1 bg-slate-200 rounded-lg">
              <button
                type="button"
                onClick={() => setForm({ ...form, isBuy: true })}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-colors ${form.isBuy ? 'bg-on-tertiary-container text-white' : 'text-slate-600'}`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, isBuy: false })}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-colors ${!form.isBuy ? 'bg-error text-white' : 'text-slate-600'}`}
              >
                Sell
              </button>
            </div>
            <div className="space-y-2">
              <label className="block text-label-sm font-semibold text-on-surface-variant">Asset</label>
              <select
                value={form.cryptoAssetId}
                onChange={(e) => setForm({ ...form, cryptoAssetId: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
              >
                {CRYPTO_ASSETS.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} ({a.symbol})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-label-sm font-semibold text-on-surface-variant">
                Quantity ({selectedAsset.symbol})
              </label>
              <input
                type="number"
                step="any"
                value={form.cryptoQty}
                onChange={(e) => setForm({ ...form, cryptoQty: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
              />
            </div>
            {form.cryptoQty && parseFloat(form.cryptoQty) > 0 && (
              <div className="text-xs text-slate-500 flex justify-between">
                <span>≈ USD Value</span>
                <span className="font-bold text-on-surface">
                  {usdAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-label-sm font-semibold text-on-surface-variant">Description</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Enter asset details or notes..."
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all resize-none"
          />
        </div>

        {/* Amount + Status (non-crypto only shows amount input) */}
        <div className="grid grid-cols-2 gap-4">
          {!isCrypto && (
            <div className="space-y-2">
              <label className="block text-label-sm font-semibold text-on-surface-variant">Amount (USD)</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
              />
            </div>
          )}
          <div className={`space-y-2 ${isCrypto ? 'col-span-2' : ''}`}>
            <label className="block text-label-sm font-semibold text-on-surface-variant">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Transaction['status'] })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            className="flex-1 py-3 bg-secondary-container text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
          >
            Record Entry
          </button>
          <button
            type="button"
            onClick={() => setForm(defaultForm())}
            className="px-4 py-3 bg-slate-100 text-slate-600 rounded-lg font-semibold hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${month} ${day}, ${d.getUTCFullYear()}`;
}

function formatTime(): string {
  const d = new Date();
  const h = d.getHours() % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
}
