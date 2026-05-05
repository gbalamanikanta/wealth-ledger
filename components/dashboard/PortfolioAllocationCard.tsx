'use client';

import { useSelector } from 'react-redux';
import { selectTotalValue } from '@/store/selectors/cryptoSelectors';

const REAL_ESTATE = 5_625_000;
const EQUITIES = 4_375_000;

const ALLOCATIONS = [
  { label: 'Real Estate', value: REAL_ESTATE, colorClass: 'bg-tertiary-fixed-dim' },
  { label: 'Equities',    value: EQUITIES,    colorClass: 'bg-secondary-fixed-dim' },
];

function diversificationLabel(cryptoPct: number): string {
  if (cryptoPct > 50) return 'Crypto Heavy';
  if (cryptoPct > 35) return 'Aggressive';
  if (cryptoPct > 20) return 'Balanced';
  return 'Diversified';
}

export function PortfolioAllocationCard() {
  const cryptoTotal = useSelector(selectTotalValue);

  const total = REAL_ESTATE + EQUITIES + cryptoTotal;

  const allocations = [
    ...ALLOCATIONS.map((a) => ({ ...a, pct: (a.value / total) * 100 })),
    { label: 'Crypto', value: cryptoTotal, pct: (cryptoTotal / total) * 100, colorClass: 'bg-tertiary-fixed' },
  ];

  return (
    <div className="bg-primary-container p-md border border-slate-800 rounded-xl shadow-lg relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className="text-white/80 text-label-lg font-medium uppercase tracking-widest text-[10px] mb-2">
          Portfolio Allocation
        </h3>
        <p className="text-white text-stat-lg font-bold mb-4">
          {diversificationLabel((cryptoTotal / total) * 100)}
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
                  className={`${colorClass} h-1 rounded-full transition-all duration-500`}
                  style={{ width: `${pct.toFixed(1)}%` }}
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
