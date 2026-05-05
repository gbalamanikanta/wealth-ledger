'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store';

export default function RegisterPage() {
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
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center p-md lg:p-xl">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">

        {/* Left Column: Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-lg">
          <div className="space-y-sm">
            <span className="text-secondary font-semibold text-headline-md tracking-tight uppercase">
              Institutional Grade
            </span>
            <h1 className="text-display-lg font-bold text-primary leading-tight">
              Elevate your wealth management with{' '}
              <span className="text-secondary">WealthLedger</span>.
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-md">
              Precision analytics and institutional-grade transparency for the modern private investor.
            </p>
          </div>

          <div
            className="relative rounded-xl overflow-hidden aspect-video border border-outline-variant"
            style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="WealthLedger Interface"
              className="object-cover w-full h-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7OeCQAamBLSFwZr-mW3gYkmU9B9aqa9t9IgSCMI-2uy44RWeNdmOVMtG7M4JDyVvKTGigIILre1Pg2qYk8-2DnAJ_yU1se7QZbNvmb2Bv3_FYVifT44_k0NLMjWywJpxsEhXp_k3lj37LhlqhO9Z1jplWVR-FHAThrzBHvFlZ3fvxyQSHnxydgFI6p4Vt7MStyy0coUqCDhXMUGqAE3XySZppR1rkmeasOC6-9jhcWliBV6bwa9zXRPdwEjQpCjtNhJljQnc_ys_v"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div
              className="p-md bg-surface-container-lowest rounded-lg border border-outline-variant"
              style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
            >
              <span className="material-symbols-outlined text-secondary mb-xs block">security</span>
              <h3 className="text-label-lg font-medium text-primary">Bank-Level Security</h3>
              <p className="text-label-sm font-semibold text-on-surface-variant">
                AES-256 encryption for all sensitive assets.
              </p>
            </div>
            <div
              className="p-md bg-surface-container-lowest rounded-lg border border-outline-variant"
              style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
            >
              <span className="material-symbols-outlined text-secondary mb-xs block">query_stats</span>
              <h3 className="text-label-lg font-medium text-primary">Real-time Insights</h3>
              <p className="text-label-sm font-semibold text-on-surface-variant">
                Instant updates across your entire portfolio.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Register Form */}
        <div className="flex flex-col items-center lg:items-start justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-lg flex items-center gap-xs">
            <span className="material-symbols-outlined text-secondary text-3xl">account_balance</span>
            <span className="text-display-md font-bold text-primary tracking-tighter">WealthLedger</span>
          </div>

          <div
            className="w-full max-w-md bg-surface-container-lowest p-md lg:p-lg rounded-xl border border-outline-variant"
            style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
          >
            <div className="mb-lg">
              <h2 className="text-headline-lg font-semibold text-primary mb-xs">Create Account</h2>
              <p className="text-body-md text-on-surface-variant">
                Join WealthLedger for private wealth tracking.
              </p>
            </div>

            <form className="space-y-md" onSubmit={handleSubmit}>
              {/* Full Name */}
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

              {/* Email */}
              <div className="space-y-xs">
                <label className="text-label-lg font-medium text-primary" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-body-md">
                    mail
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-body-md placeholder:text-outline/60"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-xs">
                <label className="text-label-lg font-medium text-primary" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-body-md">
                    lock
                  </span>
                  <input
                    id="password"
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

              {/* Confirm Password */}
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

              {/* Terms */}
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
                  <a className="text-secondary hover:underline" href="#">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a className="text-secondary hover:underline" href="#">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary-container text-on-secondary-container text-headline-md font-semibold py-4 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all mt-sm disabled:opacity-70"
                style={{ boxShadow: '0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -2px rgba(15,23,42,0.05)' }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Login redirect */}
            <div className="mt-lg text-center">
              <p className="text-body-md text-on-surface-variant">
                Already have an account?{' '}
                <Link className="text-secondary font-semibold hover:underline ml-xs" href="/login">
                  Log in instead
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-xl flex flex-wrap justify-center lg:justify-start gap-lg opacity-50">
            <div className="flex items-center gap-xs text-label-sm font-semibold uppercase tracking-widest text-on-surface">
              <span className="material-symbols-outlined text-lg">verified</span>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-xs text-label-sm font-semibold uppercase tracking-widest text-on-surface">
              <span className="material-symbols-outlined text-lg">encrypted</span>
              <span>256-bit AES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
