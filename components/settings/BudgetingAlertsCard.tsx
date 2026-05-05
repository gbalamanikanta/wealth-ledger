'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setMonthlySpendingLimit,
  setInvestmentThreshold,
  setAlertThreshold,
} from '@/store/slices/settingsSlice';

export function BudgetingAlertsCard() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((s: RootState) => s.settings);

  return (
    <div
      className="col-span-12 md:col-span-8 bg-white p-md border border-slate-200 rounded-xl"
      style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
    >
      <div className="flex items-center gap-3 mb-md">
        <span className="material-symbols-outlined text-secondary">notifications_active</span>
        <h3 className="text-headline-md font-semibold">Budgeting &amp; Alerts</h3>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-md">
          <div className="space-y-2">
            <label className="text-label-sm font-semibold text-slate-500">Monthly Spending Limit</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={settings.monthlySpendingLimit}
                onChange={(e) => dispatch(setMonthlySpendingLimit(Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-label-sm font-semibold text-slate-500">Investment Threshold</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={settings.investmentThreshold}
                onChange={(e) => dispatch(setInvestmentThreshold(Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-label-lg font-medium text-on-surface">Alert Threshold</label>
            <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-label-sm font-semibold">
              {settings.alertThreshold}% of limit
            </span>
          </div>
          <div className="relative pt-1">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${settings.alertThreshold}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.alertThreshold}
              onChange={(e) => dispatch(setAlertThreshold(Number(e.target.value)))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Aggressive</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-surface-container-low rounded-lg border border-slate-100">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-on-tertiary-container">info</span>
            <p className="text-sm text-slate-600">
              You will receive push notifications and an email summary when your spending reaches the selected threshold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
