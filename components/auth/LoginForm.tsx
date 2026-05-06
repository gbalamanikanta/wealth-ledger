'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch(login({ email, password }));
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg card-shadow">
      <div className="mb-md">
        <h2 className="text-headline-md font-semibold text-on-surface">Sign In</h2>
        <p className="text-body-md text-on-surface-variant">
          Enter your credentials to access your portal
        </p>
      </div>

      <form className="space-y-md" onSubmit={handleSubmit}>
        <div className="space-y-xs">
          <label className="block text-label-lg font-medium text-on-surface" htmlFor="email">
            Username or Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-xl">mail</span>
            </div>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@wealthledger.com"
              className="block w-full pl-xl pr-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface placeholder-on-primary-container focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-xs">
          <div className="flex justify-between items-center">
            <label className="block text-label-lg font-medium text-on-surface" htmlFor="password">
              Password
            </label>
            <a className="text-label-sm font-semibold text-secondary hover:underline transition-all" href="#">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-xl">lock</span>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full pl-xl pr-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface placeholder-on-primary-container focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary"
          />
          <label htmlFor="remember-me" className="ml-sm block text-label-sm font-semibold text-on-surface-variant">
            Remember this device for 30 days
          </label>
        </div>

        <div className="pt-sm">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[48px] bg-secondary text-on-secondary rounded-lg text-label-lg font-medium hover:bg-secondary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-70"
          >
            {loading ? 'Signing In...' : 'Sign In'}
            {!loading && (
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
