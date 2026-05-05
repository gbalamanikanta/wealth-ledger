'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { updateProfile } from '@/store/slices/authSlice';

export function ProfileSettingsCard() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);

  const fullName = user?.fullName ?? 'Alexander Sterling';
  const email = user?.email ?? 'alex.sterling@wealthledger.com';
  const phone = user?.phone ?? '+1 (555) 0123-4567';

  return (
    <div
      className="col-span-12 md:col-span-8 bg-white p-md border border-slate-200 rounded-xl"
      style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
    >
      <div className="flex items-center gap-3 mb-md">
        <span className="material-symbols-outlined text-secondary">person</span>
        <h3 className="text-headline-md font-semibold">Personal Profile</h3>
      </div>
      <div className="grid grid-cols-2 gap-md">
        <div className="space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => dispatch(updateProfile({ fullName: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => dispatch(updateProfile({ email: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label className="text-label-sm font-semibold text-slate-500">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => dispatch(updateProfile({ phone: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
