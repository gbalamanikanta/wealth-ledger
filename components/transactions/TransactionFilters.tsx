'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setFilter, resetFilters } from '@/store/slices/transactionsSlice';

const CATEGORIES = ['All Categories', 'Equity Purchase', 'Crypto Transfer', 'Dividend', 'Institutional Fee', 'Fixed Income'];
const STATUSES = ['All', 'Settled', 'Pending', 'Processing'];

export function TransactionFilters() {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((s: RootState) => s.transactions.filter);

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
        <span className="material-symbols-outlined text-secondary">filter_list</span>
        <h3 className="text-sm uppercase tracking-widest text-on-surface-variant font-semibold">
          Advanced Filtering
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="block text-label-sm font-semibold text-on-surface-variant px-1">Category</label>
          <select
            value={filter.category}
            onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-label-sm font-semibold text-on-surface-variant px-1">Status</label>
          <select
            value={filter.status}
            onChange={(e) => dispatch(setFilter({ status: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-label-sm font-semibold text-on-surface-variant px-1">Min. Amount</label>
          <input
            type="number"
            value={filter.minAmount}
            onChange={(e) => dispatch(setFilter({ minAmount: e.target.value }))}
            placeholder="$0.00"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => dispatch(resetFilters())}
            className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </section>
  );
}
