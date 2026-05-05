'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/transactions', icon: 'receipt_long', label: 'Transactions' },
  { href: '/crypto', icon: 'currency_bitcoin', label: 'Crypto Portfolio' },
  { href: '/settings', icon: 'settings', label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-slate-200 bg-slate-50 flex flex-col z-50">
      <div className="flex flex-col gap-y-5 px-6 py-8 h-full">
        {/* Brand */}
        <div className="flex items-center gap-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">WealthLedger</h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-primary-container">
              Private Wealth
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group flex gap-x-3 p-2 text-sm leading-6 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200 font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="material-symbols-outlined shrink-0">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>

        {/* Market Status */}
        <div className="p-4 bg-surface-container-low rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Market Status
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-tertiary-container flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim inline-block"></span> Open
            </span>
            <span className="text-xs font-semibold text-on-surface">NYSE: Live</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
