'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setPrimaryCurrency, setLanguage, toggleDarkMode } from '@/store/slices/settingsSlice';

export function PreferencesCard() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((s: RootState) => s.settings);

  return (
    <div
      className="col-span-12 md:col-span-4 bg-white p-md border border-slate-200 rounded-xl"
      style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
    >
      <div className="flex items-center gap-3 mb-md">
        <span className="material-symbols-outlined text-secondary">tune</span>
        <h3 className="text-headline-md font-semibold">Preferences</h3>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">Primary Currency</label>
          <select
            value={settings.primaryCurrency}
            onChange={(e) => dispatch(setPrimaryCurrency(e.target.value))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all appearance-none"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="INR">INR - Indian Rupee</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">Language</label>
          <select
            value={settings.language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all appearance-none"
          >
            <option value="EN">English (US)</option>
            <option value="FR">French</option>
            <option value="DE">German</option>
          </select>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-label-lg font-medium text-on-surface">Dark Mode</span>
          <div
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
              settings.darkMode ? 'bg-secondary' : 'bg-slate-200'
            }`}
            onClick={() => dispatch(toggleDarkMode())}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                settings.darkMode ? 'left-7' : 'left-1'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
