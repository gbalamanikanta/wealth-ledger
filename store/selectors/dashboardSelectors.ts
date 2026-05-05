import { createSelector } from '@reduxjs/toolkit';
import type { Transaction } from '@/lib/fakerData';
import { selectTotalValue } from './cryptoSelectors';
import { selectTransactionSummary, selectRawItems } from './transactionsSelectors';
import { selectMonthlySpendingLimit, selectAlertThreshold } from './settingsSelectors';

const BASE_ASSETS = 10_000_000;
const REAL_ESTATE = 5_625_000;
const EQUITIES = 4_375_000;
const REF_DATE = new Date('2026-05-04T12:00:00Z');

export interface PortfolioAllocationEntry {
  label: string;
  value: number;
  pct: number;
  colorClass: string;
}

const getDiversificationLabel = (cryptoPct: number): string => {
  if (cryptoPct > 50) return 'Crypto Heavy';
  if (cryptoPct > 35) return 'Aggressive';
  if (cryptoPct > 20) return 'Balanced';
  return 'Diversified';
};

export const selectNetWorthSummary = createSelector(
  [selectTotalValue, selectTransactionSummary],
  (cryptoTotal, transactionSummary) => {
    const liquidCapital = transactionSummary.incoming;
    const transactionNet = transactionSummary.net;
    const netWorth = BASE_ASSETS + cryptoTotal + transactionNet;
    const liquidPct = netWorth > 0 ? Math.min(100, (liquidCapital / netWorth) * 100) : 0;

    return {
      netWorth,
      liquidCapital,
      transactionNet,
      liquidPct,
    };
  }
);

export const selectPortfolioAllocationData = createSelector([selectTotalValue], (cryptoTotal) => {
  const total = REAL_ESTATE + EQUITIES + cryptoTotal;
  const realEstatePct = total > 0 ? (REAL_ESTATE / total) * 100 : 0;
  const equitiesPct = total > 0 ? (EQUITIES / total) * 100 : 0;
  const cryptoPct = total > 0 ? (cryptoTotal / total) * 100 : 0;

  const allocations: PortfolioAllocationEntry[] = [
    { label: 'Real Estate', value: REAL_ESTATE, pct: realEstatePct, colorClass: 'bg-tertiary-fixed-dim' },
    { label: 'Equities', value: EQUITIES, pct: equitiesPct, colorClass: 'bg-secondary-fixed-dim' },
    { label: 'Crypto', value: cryptoTotal, pct: cryptoPct, colorClass: 'bg-tertiary-fixed' },
  ];

  return {
    allocations,
    diversificationLabel: getDiversificationLabel(cryptoPct),
  };
});

export const selectBudgetStatus = createSelector(
  [selectRawItems, selectMonthlySpendingLimit, selectAlertThreshold],
  (transactions: Transaction[], monthlySpendingLimit, alertThreshold) => {
    const currentMonth = REF_DATE.getUTCMonth();
    const currentYear = REF_DATE.getUTCFullYear();

    const monthlySpent = transactions
      .filter((tx) => {
        const date = new Date(tx.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear && tx.amount < 0;
      })
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const spentPct = monthlySpendingLimit > 0 ? Math.min(100, (monthlySpent / monthlySpendingLimit) * 100) : 0;
    const isOverThreshold = spentPct >= alertThreshold;

    return {
      monthlySpent,
      monthlySpendingLimit,
      spentPct,
      isOverThreshold,
    };
  }
);
