'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { selectBudgetStatus } from '@/store/selectors/dashboardSelectors';
import { clearNotifications } from '@/store/slices/notificationsSlice';
import { selectRecentNotifications } from '@/store/selectors/notificationsSelectors';
const ALERT_THEME = {
  info: {
    icon: 'info',
    iconClass: 'text-secondary-container',
  },
  success: {
    icon: 'check_circle',
    iconClass: 'text-on-tertiary-container',
  },
  warning: {
    icon: 'warning',
    iconClass: 'text-error',
  },
  error: {
    icon: 'error',
    iconClass: 'text-error',
  },
} as const;

export function RecentAlertsPanel({ btcCurrentPrice }: { btcCurrentPrice?: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const { monthlySpendingLimit, spentPct, isOverThreshold } = useSelector(selectBudgetStatus);
  const recentNotifications = useSelector(selectRecentNotifications);

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
        <button
          type="button"
          onClick={() => dispatch(clearNotifications())}
          className="text-[10px] font-bold text-on-primary-container cursor-pointer hover:text-secondary"
        >
          Clear All
        </button>
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

        {recentNotifications.length === 0 ? (
          <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary-container text-lg">notifications</span>
              <div>
                <p className="text-xs font-bold text-on-surface">No New System Alerts</p>
                <p className="text-[10px] text-on-surface-variant mt-1">
                  Pull fresh prices or transactions to generate notifications.
                </p>
              </div>
            </div>
          </div>
        ) : (
          recentNotifications.map((notification) => {
            const theme = ALERT_THEME[notification.type];
            return (
              <div key={notification.id} className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
                <div className="flex items-start gap-3">
                  <span className={`material-symbols-outlined text-lg ${theme.iconClass}`}>{theme.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{notification.title}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Portfolio Rebalance */}
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
      </div>

      <button className="w-full mt-4 py-2 text-[11px] font-bold text-secondary-container border border-secondary-container/20 rounded-lg hover:bg-secondary-container/5 transition-colors">
        View All Notifications
      </button>
    </div>
  );
}
