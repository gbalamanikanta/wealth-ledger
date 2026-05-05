import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { CurrencyRateFetcher } from './CurrencyRateFetcher';

interface AppLayoutProps {
  children: React.ReactNode;
  searchPlaceholder?: string;
}

export function AppLayout({ children, searchPlaceholder }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <CurrencyRateFetcher />
      <Sidebar />
      <TopNav placeholder={searchPlaceholder} />
      <main className="lg:pl-64 pt-16 min-h-screen">
        {children}
      </main>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        <a href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold">DASHBOARD</span>
        </a>
        <a href="/transactions" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[10px] font-bold">TRANSACTIONS</span>
        </a>
        <a href="/crypto" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">currency_bitcoin</span>
          <span className="text-[10px] font-bold">CRYPTO</span>
        </a>
        <a href="/settings" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold">SETTINGS</span>
        </a>
      </nav>
    </div>
  );
}
