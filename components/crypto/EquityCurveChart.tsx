'use client';

import { useState } from 'react';

const TIME_RANGES = ['1W', '1M', '1Y', 'ALL'];

const BAR_HEIGHTS = [40, 45, 42, 55, 60, 58, 75, 80];

export function EquityCurveChart() {
  const [activeRange, setActiveRange] = useState('1M');

  return (
    <div className="md:col-span-8 bg-white p-md border border-slate-200 rounded-xl card-shadow overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <p className="text-label-lg font-medium text-on-surface">Equity Curve (30D)</p>
        <div className="flex gap-2">
          {TIME_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-colors ${
                activeRange === range
                  ? 'bg-secondary-container text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-48 w-full relative">
        <div className="absolute inset-0 flex items-end gap-1">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm [height:var(--bar-h)] [background:var(--bar-bg)]"
              style={{
                '--bar-h': `${h}%`,
                '--bar-bg': `linear-gradient(to top, #eff4ff, rgba(49,107,243,${(0.2 + i * 0.08).toFixed(2)}))`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,150 C100,140 200,160 300,100 S500,20 800,40"
            fill="transparent"
            stroke="#316bf3"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="mt-4 flex justify-between text-[10px] font-bold text-slate-400 tracking-wider">
        <span>MAY 01</span>
        <span>MAY 10</span>
        <span>MAY 20</span>
        <span>MAY 30</span>
      </div>
    </div>
  );
}
