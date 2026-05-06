'use client';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { usePricePoll } from '@/lib/usePricePoll';
import { AppLayout } from '@/components/AppLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { NetWorthCard } from '@/components/dashboard/NetWorthCard';
import { NetWorthChart } from '@/components/dashboard/NetWorthChart';
import { RecentTransactionsList } from '@/components/dashboard/RecentTransactionsList';
import { CryptoAssetsList } from '@/components/dashboard/CryptoAssetsList';
import { RecentAlertsPanel } from '@/components/dashboard/RecentAlertsPanel';
import { PortfolioAllocationCard } from '@/components/dashboard/PortfolioAllocationCard';

export default function DashboardPage() {
  usePricePoll();

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
              className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden card-shadow"
            >
              <div className="p-md border-b border-outline-variant">
                <h3 className="text-headline-md font-semibold text-on-surface">Financial Summary</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <RecentTransactionsList />
                <CryptoAssetsList />
              </div>
            </div>
          </div>

          {/* Right Panel: 4 Columns */}
          <aside className="col-span-12 lg:col-span-4 space-y-gutter">
            <RecentAlertsPanel />
            <PortfolioAllocationCard />
          </aside>

        </div>
      </div>
    </AppLayout>
  );
}
