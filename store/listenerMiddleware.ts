import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addTransaction, fetchTransactions } from './slices/transactionsSlice';
import { setPrimaryCurrency, setMonthlySpendingLimit, setAlertThreshold } from './slices/settingsSlice';
import { addNotification } from './slices/notificationsSlice';
import { selectBudgetStatus } from './selectors/dashboardSelectors';
import type { RootState } from './rootReducer';

export const listenerMiddleware = createListenerMiddleware();

const startListening = listenerMiddleware.startListening.withTypes<RootState>();

// Fire a warning notification the moment spending crosses the alert threshold
startListening({
  matcher: isAnyOf(
    addTransaction,
    fetchTransactions.fulfilled,
    setMonthlySpendingLimit,
    setAlertThreshold
  ),
  effect: (_action, api) => {
    const prev = selectBudgetStatus(api.getOriginalState());
    const next = selectBudgetStatus(api.getState());

    if (!prev.isOverThreshold && next.isOverThreshold) {
      api.dispatch(
        addNotification({
          type: 'warning',
          title: 'Budget Alert',
          message: `Spending reached ${next.spentPct.toFixed(0)}% of your $${next.monthlySpendingLimit.toLocaleString('en-US')} monthly limit.`,
        })
      );
    }
  },
});

// Persist preferred currency to localStorage whenever it changes
startListening({
  actionCreator: setPrimaryCurrency,
  effect: (action) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wealth-ledger:currency', action.payload);
    }
  },
});
