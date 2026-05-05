'use client';

export function PortfolioInsightsCard() {
  return (
    <div className="bg-primary-container p-md border border-slate-800 rounded-xl card-shadow flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container opacity-5 rounded-full blur-3xl -mr-20 -mt-20" />
      <div>
        <h3 className="text-label-lg font-medium text-white mb-2">Portfolio Insights</h3>
        <p className="text-on-primary-container text-xs leading-relaxed max-w-xs">
          Your portfolio correlation with BTC has increased by 14% this week. Consider diversifying
          into stable yields to lower volatility.
        </p>
      </div>
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold text-on-primary-container uppercase tracking-widest mb-1">
            Weekly Volatility
          </p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">4.2%</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-on-tertiary-container text-white font-bold">
              LOW
            </span>
          </div>
        </div>
        <div className="flex -space-x-2">
          <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">shield</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-slate-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}
