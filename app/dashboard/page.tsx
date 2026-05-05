'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchCryptoPrices } from '@/store/slices/cryptoSlice';
import {
  selectDashboardDisplayAssets,
  selectCryptoLoading,
  selectBitcoinCurrentPrice,
} from '@/store/selectors/cryptoSelectors';
import { selectRecentTransactions } from '@/store/selectors/transactionsSelectors';
import { AppLayout } from '@/components/AppLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { NetWorthCard } from '@/components/dashboard/NetWorthCard';
import { NetWorthChart } from '@/components/dashboard/NetWorthChart';
import { RecentTransactionsList } from '@/components/dashboard/RecentTransactionsList';
import { CryptoAssetsList } from '@/components/dashboard/CryptoAssetsList';
import { RecentAlertsPanel } from '@/components/dashboard/RecentAlertsPanel';
import { PortfolioAllocationCard } from '@/components/dashboard/PortfolioAllocationCard';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const recentTx = useSelector(selectRecentTransactions);
  const displayAssets = useSelector(selectDashboardDisplayAssets);
  const loading = useSelector(selectCryptoLoading);
  const bitcoinCurrentPrice = useSelector(selectBitcoinCurrentPrice);

  useEffect(() => {
    dispatch(fetchCryptoPrices());
  }, [dispatch]);

  return (
    <AppLayout searchPlaceholder="Search wealth data...">
      <div className="px-gutter py-margin">
        <div className="grid grid-cols-12 gap-gutter">

          {/* Left Content: 8 Columns */}
          <div className="col-span-12 lg:col-span-8 space-y-gutter">
            <DashboardHeader />

            {/* Net Worth Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <NetWorthCard />
              <NetWorthChart />
            </div>

            {/* Financial Summary */}
            <div
              className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
              style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
            >
              <div className="p-md border-b border-outline-variant">
                <h3 className="text-headline-md font-semibold text-on-surface">Financial Summary</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <RecentTransactionsList transactions={recentTx} />
                <CryptoAssetsList assets={displayAssets} loading={loading} />
              </div>
            </div>
          </div>

          {/* Right Panel: 4 Columns */}
          <aside className="col-span-12 lg:col-span-4 space-y-gutter">
            <RecentAlertsPanel btcCurrentPrice={bitcoinCurrentPrice} />
            <PortfolioAllocationCard />
          </aside>

        </div>
      </div>
    </AppLayout>
  );
}
