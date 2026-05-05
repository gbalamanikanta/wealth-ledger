import { createSelector } from '@reduxjs/toolkit';
import { selectAssets, selectPrices, selectTotalValue, selectChange24h, selectNetProfit, selectCryptoLoading, CryptoAsset } from '../slices/cryptoSlice';

export interface AssetAllocation extends CryptoAsset {
  percentage: string;
}

export interface DistributionItem {
  label: string;
  pct: string;
  color: string;
}

// Asset allocation breakdown with percentages
export const selectAssetAllocation = createSelector([selectAssets], (assets: CryptoAsset[]): AssetAllocation[] => {
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

export const selectDistributionItems = createSelector(
  [selectAssetAllocation],
  (allocations: AssetAllocation[]): DistributionItem[] => {
    const btcPct = allocations.find((asset) => asset.id === 'bitcoin')?.percentage ?? '0';
    const ethPct = allocations.find((asset) => asset.id === 'ethereum')?.percentage ?? '0';
    const stablePct = allocations.find((asset) => asset.symbol === 'USDC')?.percentage ?? '0';
    const otherPct = Math.max(0, 100 - Number(btcPct) - Number(ethPct) - Number(stablePct)).toFixed(1);

    return [
      { label: 'Bitcoin', pct: btcPct, color: '#F7931A' },
      { label: 'Ethereum', pct: ethPct, color: '#627EEA' },
      { label: 'Stablecoins', pct: stablePct, color: '#2775CA' },
      { label: 'Others', pct: otherPct, color: '#94a3b8' },
    ];
  }
);

export const selectBitcoinDistributionPct = createSelector(
  [selectDistributionItems],
  (items: DistributionItem[]) => items[0]?.pct ?? '0'
);

export const selectDashboardDisplayAssets = createSelector([selectAssets], (assets: CryptoAsset[]) =>
  assets.filter((asset) => ['bitcoin', 'ethereum', 'usd-coin'].includes(asset.id))
);

export const selectBitcoinCurrentPrice = createSelector(
  [selectAssets],
  (assets: CryptoAsset[]) => assets.find((asset) => asset.id === 'bitcoin')?.currentPrice
);

export const selectPrimaryHoldingBalances = createSelector([selectAssets], (assets: CryptoAsset[]) => ({
  bitcoinBalance: assets.find((asset) => asset.id === 'bitcoin')?.balance ?? 0,
  ethereumBalance: assets.find((asset) => asset.id === 'ethereum')?.balance ?? 0,
}));

// Re-export base selectors
export {
  selectAssets,
  selectPrices,
  selectTotalValue,
  selectChange24h,
  selectNetProfit,
  selectCryptoLoading,
};
