import { createSelector } from '@reduxjs/toolkit';
import { selectAssets, selectPrices, selectTotalValue, selectChange24h, selectNetProfit, selectCryptoLoading, CryptoAsset } from '../slices/cryptoSlice';

// Asset allocation breakdown with percentages
export const selectAssetAllocation = createSelector([selectAssets], (assets: CryptoAsset[]) => {
  const total = assets.reduce((sum: number, a: CryptoAsset) => sum + a.value, 0);
  return assets.map((a: CryptoAsset) => ({
    ...a,
    percentage: total > 0 ? ((a.value / total) * 100).toFixed(1) : '0',
  }));
});

// Top holding by value
export const selectTopAsset = createSelector([selectAssets], (assets: CryptoAsset[]) => {
  if (assets.length === 0) return null;
  return assets.reduce((prev: CryptoAsset, curr: CryptoAsset) => (curr.value > prev.value ? curr : prev));
});

// Profitable holdings
export const selectProfitableAssets = createSelector([selectAssets], (assets: CryptoAsset[]) =>
  assets.filter((a: CryptoAsset) => a.returnPct > 0)
);

// Loss-making holdings
export const selectLossMakingAssets = createSelector([selectAssets], (assets: CryptoAsset[]) =>
  assets.filter((a: CryptoAsset) => a.returnPct < 0)
);

// Total invested amount
export const selectTotalInvested = createSelector([selectAssets], (assets: CryptoAsset[]) =>
  assets.reduce((sum: number, a: CryptoAsset) => sum + a.balance * a.avgEntry, 0)
);

// Total realized return
export const selectTotalReturn = createSelector(
  [selectTotalValue, selectTotalInvested],
  (value: number, invested: number) => value - invested
);

// Assets by symbol
export const selectAssetBySymbol = createSelector([selectAssets], (assets: CryptoAsset[]) =>
  Object.fromEntries(assets.map((a: CryptoAsset) => [a.symbol, a]))
);

// High volatility assets (>5% change)
export const selectHighVolatilityAssets = createSelector(
  [selectAssets],
  (assets: CryptoAsset[]) => assets.filter((a: CryptoAsset) => Math.abs(a.returnPct) > 5)
);

// Re-export base selectors
export {
  selectAssets,
  selectPrices,
  selectTotalValue,
  selectChange24h,
  selectNetProfit,
  selectCryptoLoading,
};
