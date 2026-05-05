'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchCryptoPrices } from '@/store/slices/cryptoSlice';
import {
  selectAssets,
  selectTotalValue,
  selectChange24h,
  selectNetProfit,
  selectCryptoLoading,
  selectAssetAllocation,
} from '@/store/selectors/cryptoSelectors';
import { AppLayout } from '@/components/AppLayout';
import { CryptoPageHeader } from '@/components/crypto/CryptoPageHeader';
import { PortfolioValueCard } from '@/components/crypto/PortfolioValueCard';
import { EquityCurveChart } from '@/components/crypto/EquityCurveChart';
import { HoldingsTable } from '@/components/crypto/HoldingsTable';
import { AssetDistributionChart } from '@/components/crypto/AssetDistributionChart';
import { PortfolioInsightsCard } from '@/components/crypto/PortfolioInsightsCard';

export default function CryptoPortfolioPage() {
  const dispatch = useDispatch<AppDispatch>();
  const assets = useSelector(selectAssets);
  const totalValue = useSelector(selectTotalValue);
  const change24h = useSelector(selectChange24h);
  const netProfit = useSelector(selectNetProfit);
  const loading = useSelector(selectCryptoLoading);
  const allocations = useSelector(selectAssetAllocation);

  useEffect(() => {
    dispatch(fetchCryptoPrices());
  }, [dispatch]);

  // Calculate distribution percentages from asset allocation selector
  const btcAllocation = allocations.find((a: any) => a.id === 'bitcoin');
  const ethAllocation = allocations.find((a: any) => a.id === 'ethereum');
  const stableAllocation = allocations.find((a: any) => a.symbol === 'USDC');

  const btcPct = btcAllocation?.percentage ?? '0';
  const ethPct = ethAllocation?.percentage ?? '0';
  const stablePct = stableAllocation ? (parseFloat(stableAllocation.percentage)).toFixed(1) : '0';
  const otherPct = (100 - parseFloat(btcPct) - parseFloat(ethPct) - parseFloat(stablePct)).toFixed(1);

  const distributionItems = [
    { label: 'Bitcoin', pct: btcPct, color: '#F7931A' },
    { label: 'Ethereum', pct: ethPct, color: '#627EEA' },
    { label: 'Stablecoins', pct: stablePct, color: '#2775CA' },
    { label: 'Others', pct: otherPct, color: '#94a3b8' },
  ];

  return (
    <AppLayout searchPlaceholder="Search assets, transactions, or blocks...">
      <main className="px-6 md:px-gutter py-margin">
        <div className="max-w-7xl mx-auto">

          <CryptoPageHeader />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-gutter">
            <div className="md:col-span-4">
              <PortfolioValueCard
                totalValue={totalValue}
                change24h={change24h}
                netProfit={netProfit}
                assets={assets}
                loading={loading}
              />
            </div>
            <EquityCurveChart />
          </div>

          <HoldingsTable assets={assets} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <AssetDistributionChart
              items={distributionItems}
              centerLabel="BTC"
              centerValue={btcPct}
            />
            <PortfolioInsightsCard />
          </div>

        </div>
      </main>
    </AppLayout>
  );
}
