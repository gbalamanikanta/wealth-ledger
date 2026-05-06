'use client';

import { useSelector } from 'react-redux';
import { selectPortfolioAllocationData } from '@/store/selectors/dashboardSelectors';

export function PortfolioAllocationCard() {
  const { allocations, diversificationLabel } = useSelector(selectPortfolioAllocationData);

  return (
    <div className="bg-primary-container p-md border border-slate-800 rounded-xl shadow-lg relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className="text-white/80 text-label-lg font-medium uppercase tracking-widest text-[10px] mb-2">
          Portfolio Allocation
        </h3>
        <p className="text-white text-stat-lg font-bold mb-4">
          {diversificationLabel}
        </p>
        <div className="space-y-3">
          {allocations.map(({ label, pct, colorClass }) => (
            <div key={label}>
              <div className="flex justify-between text-[10px] text-white/60 mb-1">
                <span>{label}</span>
                <span>{pct.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1">
                <div
                  className={`${colorClass} h-1 rounded-full transition-all duration-500 [width:var(--w)]`}
                  style={{ '--w': `${pct.toFixed(1)}%` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary-container/20 rounded-full blur-3xl group-hover:bg-secondary-container/30 transition-colors" />
    </div>
  );
}
