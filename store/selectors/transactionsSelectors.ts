import { createSelector } from '@reduxjs/toolkit';
import { selectRawItems, selectFilter, selectLoading, selectTotalVolume } from '../slices/transactionsSlice';
import type { Transaction } from '@/lib/fakerData';

// Filtered transactions with category, status, and amount filtering
export const selectFilteredTransactions = createSelector(
  [selectRawItems, selectFilter],
  (items: Transaction[], filter) => {
    let filtered = [...items];

    if (filter.category !== 'All Categories') {
      filtered = filtered.filter((t: Transaction) => t.category === filter.category);
    }

    if (filter.status !== 'All') {
      filtered = filtered.filter((t: Transaction) => t.status === filter.status);
    }

    if (filter.minAmount) {
      const minAmount = parseFloat(filter.minAmount);
      filtered = filtered.filter((t: Transaction) => Math.abs(t.amount) >= minAmount);
    }

    return filtered;
  }
);

// Category breakdown for spending insights
export const selectCategoryBreakdown = createSelector(
  [selectRawItems],
  (items: Transaction[]) => {
    const breakdown: Record<string, number> = {};
    items.forEach((t: Transaction) => {
      if (t.amount < 0) {
        breakdown[t.category] = (breakdown[t.category] ?? 0) + Math.abs(t.amount);
      }
    });
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
    return Object.entries(breakdown).map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? ((amount / total) * 100).toFixed(1) : '0',
    }));
  }
);

// Top spending category
export const selectTopCategory = createSelector(
  [selectCategoryBreakdown],
  (breakdown) => {
    if (breakdown.length === 0) return null;
    return breakdown.reduce((prev, curr) =>
      curr.amount > prev.amount ? curr : prev
    );
  }
);

// Transaction summary
export const selectTransactionSummary = createSelector(
  [selectRawItems],
  (items: Transaction[]) => {
    const incoming = items
      .filter((t: Transaction) => t.amount > 0)
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    const outgoing = Math.abs(
      items
        .filter((t: Transaction) => t.amount < 0)
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
    );
    return { incoming, outgoing, net: incoming - outgoing };
  }
);

// Settled transactions
export const selectSettledTransactions = createSelector(
  [selectRawItems],
  (items: Transaction[]) => items.filter((t: Transaction) => t.status === 'Settled')
);

// Pending transactions
export const selectPendingTransactions = createSelector(
  [selectRawItems],
  (items: Transaction[]) => items.filter((t: Transaction) => t.status === 'Pending')
);

// Re-export base selectors
export { selectRawItems, selectFilter, selectLoading, selectTotalVolume };
