'use client';

import { useSelector } from 'react-redux';
import { selectNetWorthSummary } from '@/store/selectors/dashboardSelectors';
import { useCurrencyFormat } from '@/lib/useCurrencyFormat';

export function NetWorthCard() {
  const { format, formatCompact } = useCurrencyFormat();
  const { netWorth, liquidCapital, transactionNet, liquidPct } = useSelector(selectNetWorthSummary);

  return (
    <div
      className="md:col-span-1 bg-surface-container-lowest p-md border border-outline-variant rounded-xl card-shadow"
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
            className="bg-secondary-container h-1.5 rounded-full transition-all [width:var(--w)]"
            style={{ '--w': `${liquidPct.toFixed(1)}%` } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}
