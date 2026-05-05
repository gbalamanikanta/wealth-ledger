---
name: Redux Selectors Implementation
description: Project refactored to use memoized Redux selectors with createSelector for better performance and centralized business logic
type: project
---

## Refactoring Complete: Redux Selectors Implementation

**Date**: 2026-05-05

**What changed**:
- Created 4 new selector files with memoized selectors using `createSelector`
- Updated 13+ components to use selector-based approach instead of inline filtering
- Removed 100+ lines of scattered business logic from components

**Why**:
- Performance optimization through memoization
- Centralized, reusable business logic
- Easier testing and maintenance
- Prevents unnecessary re-renders

**How to apply**:
When working with state data, always use the appropriate selector from `@/store/selectors/` instead of:
- Direct `useSelector((s) => s.slice.data)` with inline filtering
- Duplicated calculation logic across components
- Multiple array reduce/map operations in components

**Selector files**:
- `store/selectors/transactionsSelectors.ts` - transaction filtering, summaries, breakdowns
- `store/selectors/cryptoSelectors.ts` - asset allocation, returns, profitability
- `store/selectors/currencySelectors.ts` - conversion results, available currencies
- `store/selectors/settingsSelectors.ts` - settings access

See `SELECTORS_GUIDE.md` for complete API reference.
