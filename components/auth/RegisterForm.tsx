'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';

export function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    setLoading(true);
    setTimeout(() => {
      dispatch(login({ email, password }));
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="flex flex-col items-center lg:items-start justify-center">
      <div className="lg:hidden mb-lg flex items-center gap-xs">
        <span className="material-symbols-outlined text-secondary text-3xl">account_balance</span>
        <span className="text-display-md font-bold text-primary tracking-tighter">WealthLedger</span>
      </div>

      <div className="w-full max-w-md bg-surface-container-lowest p-md lg:p-lg rounded-xl border border-outline-variant card-shadow">
        <div className="mb-lg">
          <h2 className="text-headline-lg font-semibold text-primary mb-xs">Create Account</h2>
          <p className="text-body-md text-on-surface-variant">
            Join WealthLedger for private wealth tracking.
          </p>
        </div>

        <form className="space-y-md" onSubmit={handleSubmit}>
          <div className="space-y-xs">
            <label className="text-label-lg font-medium text-primary" htmlFor="full_name">
              Full Name
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-body-md">
                person
              </span>
              <input
                id="full_name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-body-md placeholder:text-outline/60"
              />
            </div>
          </div>

          <div className="space-y-xs">
            <label className="text-label-lg font-medium text-primary" htmlFor="reg_email">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-body-md">
                mail
              </span>
              <input
                id="reg_email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-body-md placeholder:text-outline/60"
              />
            </div>
          </div>

          <div className="space-y-xs">
            <label className="text-label-lg font-medium text-primary" htmlFor="reg_password">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-body-md">
                lock
              </span>
              <input
                id="reg_password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-3 bg-surface rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-body-md placeholder:text-outline/60"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-secondary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-body-md">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-xs">
            <label className="text-label-lg font-medium text-primary" htmlFor="confirm_password">
              Confirm Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-body-md">
                verified_user
              </span>
              <input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-3 bg-surface rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-body-md placeholder:text-outline/60"
              />
            </div>
          </div>

          <div className="flex items-start gap-sm py-xs">
            <input
              id="terms"
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              required
              className="mt-1 w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary/20"
            />
            <label className="text-label-sm font-semibold text-on-surface-variant" htmlFor="terms">
              I agree to the{' '}
              <a className="text-secondary hover:underline" href="#">Terms of Service</a>{' '}
              and{' '}
              <a className="text-secondary hover:underline" href="#">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-container text-on-secondary-container text-headline-md font-semibold py-4 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all mt-sm disabled:opacity-70 card-shadow"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-lg text-center">
          <p className="text-body-md text-on-surface-variant">
            Already have an account?{' '}
            <Link className="text-secondary font-semibold hover:underline ml-xs" href="/login">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
