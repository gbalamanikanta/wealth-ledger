'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchExchangeRates, fetchCurrencyNames } from '@/store/slices/currencySlice';
import { AppLayout } from '@/components/AppLayout';
import { ProfileSettingsCard } from '@/components/settings/ProfileSettingsCard';
import { AccountVerifiedCard } from '@/components/settings/AccountVerifiedCard';
import { PreferencesCard } from '@/components/settings/PreferencesCard';
import { BudgetingAlertsCard } from '@/components/settings/BudgetingAlertsCard';
import { CurrencyConverterCard } from '@/components/settings/CurrencyConverterCard';
import { SecurityCard } from '@/components/settings/SecurityCard';

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExchangeRates('USD'));
    dispatch(fetchCurrencyNames());
  }, [dispatch]);

  return (
    <AppLayout searchPlaceholder="Search markets, assets...">
      <main className="ml-0 p-margin">
        <div className="max-w-5xl mx-auto space-y-lg">

          {/* Page Header */}
          <div className="flex items-end justify-between mb-lg">
            <div>
              <h2 className="text-headline-lg font-semibold text-on-surface">Account Settings</h2>
              <p className="text-body-md text-slate-500 mt-2">
                Manage your personal information, preferences, and financial safety nets.
              </p>
            </div>
            <button className="px-6 py-3 bg-secondary text-white rounded-xl text-label-lg font-medium shadow-sm hover:opacity-90 transition-all">
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-12 gap-gutter">
            <ProfileSettingsCard />
            <AccountVerifiedCard />
            <PreferencesCard />
            <BudgetingAlertsCard />
            <CurrencyConverterCard />
            <SecurityCard />
          </div>

        </div>
      </main>
    </AppLayout>
  );
}
