'use client';

import { usePricePoll } from '@/lib/usePricePoll';
import { AppLayout } from '@/components/AppLayout';
import { CryptoPageHeader } from '@/components/crypto/CryptoPageHeader';
import { PortfolioValueCard } from '@/components/crypto/PortfolioValueCard';
import { EquityCurveChart } from '@/components/crypto/EquityCurveChart';
import { HoldingsTable } from '@/components/crypto/HoldingsTable';
import { AssetDistributionChart } from '@/components/crypto/AssetDistributionChart';
import { PortfolioInsightsCard } from '@/components/crypto/PortfolioInsightsCard';

export default function CryptoPortfolioPage() {
  usePricePoll();

  return (
    <AppLayout searchPlaceholder="Search assets, transactions, or blocks...">
      <main className="px-6 md:px-gutter py-margin">
        <div className="max-w-7xl mx-auto">

          <CryptoPageHeader />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-gutter">
            <div className="md:col-span-4">
              <PortfolioValueCard />
            </div>
            <EquityCurveChart />
          </div>

          <HoldingsTable />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <AssetDistributionChart />
            <PortfolioInsightsCard />
          </div>

        </div>
      </main>
    </AppLayout>
  );
}
