'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { toggleTwoFactor } from '@/store/slices/settingsSlice';

export function SecurityCard() {
  const dispatch = useDispatch<AppDispatch>();
  const twoFactorEnabled = useSelector((s: RootState) => s.settings.twoFactorEnabled);

  return (
    <div
      className="col-span-12 bg-white p-md border border-slate-200 rounded-xl"
      style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-on-error-container">lock</span>
          <div>
            <h3 className="text-label-lg font-medium text-on-surface">Two-Factor Authentication</h3>
            <p className="text-sm text-slate-500">
              Add an extra layer of security to your account by requiring more than just a password.
            </p>
          </div>
        </div>
        <button
          onClick={() => dispatch(toggleTwoFactor())}
          className={`px-4 py-2 rounded-lg text-label-sm font-semibold transition-colors ${
            twoFactorEnabled
              ? 'bg-on-tertiary-container/10 text-on-tertiary-container'
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
          }`}
        >
          {twoFactorEnabled ? '2FA Enabled ✓' : 'Enable 2FA'}
        </button>
      </div>
    </div>
  );
}
