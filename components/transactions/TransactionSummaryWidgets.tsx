'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectTransactionSummary, selectTotalVolume } from '@/store/selectors/transactionsSelectors';
import { useCurrencyFormat } from '@/lib/useCurrencyFormat';

export function TransactionSummaryWidgets() {
  const { format, formatCompact } = useCurrencyFormat();
  const totalVolume = useSelector(selectTotalVolume);
  const { incoming: totalIn, outgoing: totalOut } = useSelector(selectTransactionSummary);

  return (
    <section className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
        <p className="text-label-sm font-semibold text-on-surface-variant mb-1">Monthly Volume</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-stat-lg font-bold">{formatCompact(totalVolume)}</h4>
          <span className="text-xs font-bold text-on-tertiary-container">+12.3%</span>
        </div>
        <div className="mt-4 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-secondary-container w-[72%]"></div>
        </div>
      </div>

      <div className="md:col-span-2 relative p-6 bg-primary-container text-white rounded-xl shadow-sm overflow-hidden group">
        <div className="relative z-10">
          <p className="text-on-primary-container text-label-sm font-semibold mb-1 uppercase tracking-widest">
            Global Cash Flow
          </p>
          <h4 className="text-stat-lg font-bold mb-4">{format(totalVolume, 0)}</h4>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-on-primary-container">
              <span className="material-symbols-outlined text-secondary-fixed">north_east</span>
              {format(totalIn, 0)} In
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-on-primary-container">
              <span className="material-symbols-outlined text-error">south_east</span>
              {format(totalOut, 0)} Out
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <span className="material-symbols-outlined text-[160px]">account_balance_wallet</span>
        </div>
      </div>

      <div className="md:col-span-1 p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <p className="text-label-sm font-semibold text-on-surface-variant mb-1">Audit Score</p>
          <h4 className="text-stat-lg font-bold text-on-tertiary-container">99.8%</h4>
        </div>
        <p className="text-xs text-on-surface-variant italic">Next verification in 4 days</p>
      </div>
    </section>
  );
}
