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
  selectDistributionItems,
  selectBitcoinDistributionPct,
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
  const distributionItems = useSelector(selectDistributionItems);
  const btcPct = useSelector(selectBitcoinDistributionPct);

  useEffect(() => {
    dispatch(fetchCryptoPrices());
  }, [dispatch]);

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
