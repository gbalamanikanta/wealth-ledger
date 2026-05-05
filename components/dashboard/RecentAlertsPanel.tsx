'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const REF_DATE = new Date('2026-05-04T12:00:00Z');

export function RecentAlertsPanel({ btcCurrentPrice }: { btcCurrentPrice?: number }) {
  const transactions = useSelector((s: RootState) => s.transactions.items);
  const { monthlySpendingLimit, alertThreshold } = useSelector((s: RootState) => s.settings);

  const currentMonth = REF_DATE.getUTCMonth();
  const currentYear = REF_DATE.getUTCFullYear();

  const monthlySpent = transactions
    .filter((tx) => {
      const d = new Date(tx.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear && tx.amount < 0;
    })
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const spentPct = monthlySpendingLimit > 0
    ? Math.min(100, (monthlySpent / monthlySpendingLimit) * 100)
    : 0;
  const isOverThreshold = spentPct >= alertThreshold;

  return (
    <div
      className="bg-surface-container-lowest p-md border border-outline-variant rounded-xl"
      style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
    >
      <div className="flex justify-between items-center mb-md">
        <h3 className="text-label-lg font-medium text-on-surface flex items-center gap-2">
          <span className={`material-symbols-outlined ${isOverThreshold ? 'text-error' : 'text-secondary-container'}`}>
            notifications_active
          </span>
          Recent Alerts
        </h3>
        <span className="text-[10px] font-bold text-on-primary-container cursor-pointer hover:text-secondary">
          Clear All
        </span>
      </div>

      <div className="space-y-4">
        {/* Budget Alert — dynamic */}
        <div
          className={`p-3 rounded-lg border ${
            isOverThreshold
              ? 'bg-error-container/20 border-error/10'
              : 'bg-secondary-container/10 border-secondary-container/20'
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`material-symbols-outlined text-lg ${
                isOverThreshold ? 'text-error' : 'text-secondary-container'
              }`}
            >
              {isOverThreshold ? 'warning' : 'check_circle'}
            </span>
            <div className="flex-1">
              <p className="text-xs font-bold text-on-surface">
                {isOverThreshold ? 'Budget Alert' : 'Budget on Track'}
              </p>
              <p className="text-[10px] text-on-surface-variant mt-1">
                {isOverThreshold
                  ? `You have reached ${spentPct.toFixed(0)}% of your $${monthlySpendingLimit.toLocaleString('en-US')} monthly limit.`
                  : `Spending at ${spentPct.toFixed(0)}% of your $${monthlySpendingLimit.toLocaleString('en-US')} monthly limit.`}
              </p>
              <div className="mt-2 w-full bg-surface-container rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all ${isOverThreshold ? 'bg-error' : 'bg-secondary-container'}`}
                  style={{ width: `${spentPct.toFixed(1)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Price Alert: Bitcoin */}
        <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-on-tertiary-container text-lg">trending_up</span>
            <div>
              <p className="text-xs font-bold text-on-surface">Price Alert: Bitcoin</p>
              <p className="text-[10px] text-on-surface-variant mt-1">
                BTC has surpassed your target price of $65,000.
              </p>
              <p className="text-[10px] font-bold text-on-tertiary-container mt-1">
                Current: ${btcCurrentPrice?.toLocaleString('en-US') ?? '64,221'}
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Rebalance */}
        <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary-container text-lg">notifications_paused</span>
            <div>
              <p className="text-xs font-bold text-on-surface">Portfolio Rebalance</p>
              <p className="text-[10px] text-on-surface-variant mt-1">
                Your equity exposure has deviated by 5% from your target allocation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 py-2 text-[11px] font-bold text-secondary-container border border-secondary-container/20 rounded-lg hover:bg-secondary-container/5 transition-colors">
        View All Notifications
      </button>
    </div>
  );
}
