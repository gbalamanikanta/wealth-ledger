'use client';

import { useSelector } from 'react-redux';
import { selectTotalValue } from '@/store/selectors/cryptoSelectors';
import { selectRawItems, selectTransactionSummary } from '@/store/selectors/transactionsSelectors';
import { useCurrencyFormat } from '@/lib/useCurrencyFormat';

const BASE_ASSETS = 10_000_000;

export function NetWorthCard() {
  const { format, formatCompact } = useCurrencyFormat();
  const cryptoTotal = useSelector(selectTotalValue);
  const transactions = useSelector(selectRawItems);
  const { incoming: liquidCapital, net: transactionNet } = useSelector(selectTransactionSummary);

  const netWorth = BASE_ASSETS + cryptoTotal + transactionNet;
  const liquidPct = netWorth > 0 ? Math.min(100, (liquidCapital / netWorth) * 100) : 0;

  return (
    <div
      className="md:col-span-1 bg-surface-container-lowest p-md border border-outline-variant rounded-xl"
      style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
    >
      <div className="flex justify-between items-start mb-sm">
        <span className="text-on-primary-container text-label-lg font-medium uppercase tracking-tight">
          Total Net Worth
        </span>
        <span className="material-symbols-outlined text-on-tertiary-container">trending_up</span>
      </div>
      <div className="space-y-xs">
        <p className="text-display-md font-bold text-primary">{format(netWorth, 0)}</p>
        <p className="text-on-tertiary-container text-label-sm font-semibold flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">
            {transactionNet >= 0 ? 'arrow_upward' : 'arrow_downward'}
          </span>
          {transactionNet >= 0 ? '+' : ''}{format(transactionNet, 0)} net transactions
        </p>
      </div>
      <div className="mt-lg pt-md border-t border-surface-variant">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-on-surface-variant font-medium">Liquid Capital</span>
          <span className="text-on-surface font-semibold">{formatCompact(liquidCapital)}</span>
        </div>
        <div className="w-full bg-surface-container rounded-full h-1.5">
          <div
            className="bg-secondary-container h-1.5 rounded-full transition-all"
            style={{ width: `${liquidPct.toFixed(1)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
