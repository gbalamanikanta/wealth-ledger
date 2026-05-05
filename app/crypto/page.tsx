'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchCryptoPrices } from '@/store/slices/cryptoSlice';
import { AppLayout } from '@/components/AppLayout';
import { CryptoPageHeader } from '@/components/crypto/CryptoPageHeader';
import { PortfolioValueCard } from '@/components/crypto/PortfolioValueCard';
import { EquityCurveChart } from '@/components/crypto/EquityCurveChart';
import { HoldingsTable } from '@/components/crypto/HoldingsTable';
import { AssetDistributionChart } from '@/components/crypto/AssetDistributionChart';
import { PortfolioInsightsCard } from '@/components/crypto/PortfolioInsightsCard';

export default function CryptoPortfolioPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { assets, totalValue, change24h, netProfit, loading } = useSelector((s: RootState) => s.crypto);

  useEffect(() => {
    dispatch(fetchCryptoPrices());
  }, [dispatch]);

  const btcValue = assets.find((a) => a.id === 'bitcoin')?.value ?? 0;
  const ethValue = assets.find((a) => a.id === 'ethereum')?.value ?? 0;
  const stableValue = assets.filter((a) => a.symbol === 'USDC').reduce((s, a) => s + a.value, 0);
  const otherValue = totalValue - btcValue - ethValue - stableValue;

  const btcPct = totalValue ? ((btcValue / totalValue) * 100).toFixed(1) : '0';
  const ethPct = totalValue ? ((ethValue / totalValue) * 100).toFixed(1) : '0';
  const stablePct = totalValue ? ((stableValue / totalValue) * 100).toFixed(1) : '0';
  const otherPct = totalValue ? ((Math.max(0, otherValue) / totalValue) * 100).toFixed(1) : '0';

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
