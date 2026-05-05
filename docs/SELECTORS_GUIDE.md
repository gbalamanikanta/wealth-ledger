# Redux Selectors Implementation Guide

## Overview
The project has been refactored to use memoized Redux selectors via `createSelector` from Redux Toolkit. This improves performance by preventing unnecessary re-renders and centralizes business logic.

## Selector Files

### 1. **transactionsSelectors.ts**
```typescript
import { selectFilteredTransactions, selectTransactionSummary, selectCategoryBreakdown } from '@/store/selectors/transactionsSelectors';

// Filtered transactions based on category, status, amount
useSelector(selectFilteredTransactions)

// Transaction summary (incoming, outgoing, net)
useSelector(selectTransactionSummary)

// Category breakdown with percentages
useSelector(selectCategoryBreakdown)

// Settled/Pending transactions
useSelector(selectSettledTransactions)
useSelector(selectPendingTransactions)

// Top spending category
useSelector(selectTopCategory)
```

### 2. **cryptoSelectors.ts**
```typescript
import { 
  selectAssetAllocation, 
  selectTopAsset, 
  selectProfitableAssets,
  selectTotalReturn 
} from '@/store/selectors/cryptoSelectors';

// Assets with percentage allocation
useSelector(selectAssetAllocation)

// Top holding by value
useSelector(selectTopAsset)

// Profitable/loss-making assets
useSelector(selectProfitableAssets)
useSelector(selectLossMakingAssets)

// Total invested vs current value
useSelector(selectTotalReturn)

// High volatility assets (>5% change)
useSelector(selectHighVolatilityAssets)
```

### 3. **currencySelectors.ts**
```typescript
import { 
  selectConversionResult, 
  selectAvailableCurrencies 
} from '@/store/selectors/currencySelectors';

// Full conversion with from/to/amount/converted
useSelector(selectConversionResult)

// List of available currencies
useSelector(selectAvailableCurrencies)
```

### 4. **settingsSelectors.ts**
```typescript
import { 
  selectPrimaryCurrency, 
  selectDarkMode, 
  selectMonthlySpendingLimit 
} from '@/store/selectors/settingsSelectors';
```

## Benefits

1. **Memoization** - Selectors only recompute when their inputs change
2. **Centralized Logic** - Business logic lives in one place
3. **Reusability** - Share calculations across multiple components
4. **Performance** - Prevents unnecessary re-renders and computations
5. **Testability** - Easier to test pure selector functions

## Updated Components

The following components have been refactored to use selectors:

**Pages:**
- `app/transactions/page.tsx`
- `app/dashboard/page.tsx`
- `app/crypto/page.tsx`

**Components:**
- `components/transactions/TransactionSummaryWidgets.tsx`
- `components/transactions/TransactionFilters.tsx`
- `components/transactions/CreateTransactionForm.tsx`
- `components/dashboard/PortfolioAllocationCard.tsx`
- `components/dashboard/RecentAlertsPanel.tsx`
- `components/dashboard/NetWorthCard.tsx`
- `components/settings/CurrencyConverterCard.tsx`
- `components/settings/PreferencesCard.tsx`
- `components/settings/BudgetingAlertsCard.tsx`
- `components/settings/SecurityCard.tsx`

## Example Usage

**Before (inline filtering):**
```typescript
const filteredItems = items.filter((tx) => {
  if (filter.category !== 'All Categories') return false;
  if (filter.status !== 'All') return false;
  return true;
});
```

**After (using selector):**
```typescript
const filteredItems = useSelector(selectFilteredTransactions);
```

## Creating New Selectors

To create a new selector:

```typescript
import { createSelector } from '@reduxjs/toolkit';

export const selectMyCustomData = createSelector(
  [selectBaseData1, selectBaseData2],
  (data1, data2) => {
    // Pure calculation
    return data1 + data2;
  }
);
```

Key principles:
- Input selectors are dependencies
- Output function is pure and deterministic
- Result is memoized automatically
- Only recomputes when inputs change
