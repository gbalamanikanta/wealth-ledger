'use client';

import { useState } from 'react';

const TIME_RANGES = ['1M', '6M', '1Y'];
const BAR_HEIGHTS = [24, 32, 28, 40, 36, 44];

export function NetWorthChart() {
  const [activeRange, setActiveRange] = useState('6M');

  return (
    <div
      className="md:col-span-2 bg-surface-container-lowest p-md border border-outline-variant rounded-xl relative overflow-hidden card-shadow"
    >
      <div className="flex justify-between items-center mb-md">
        <h3 className="text-label-lg font-medium text-on-surface">Net Worth Over Time</h3>
        <div className="flex gap-2">
          {TIME_RANGES.map((range) => (
            <span
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                activeRange === range
                  ? 'bg-secondary-container text-white'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              {range}
            </span>
          ))}
        </div>
      </div>
      <div className="h-48 w-full flex items-end justify-between gap-1 mt-4">
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="w-full rounded-t-sm [height:var(--bar-h)] [background:var(--bar-bg)]"
            style={{
              '--bar-h': `${h * 4}px`,
              '--bar-bg': `linear-gradient(to top, #e5eeff, rgba(49,107,243,${(0.2 + i * 0.15).toFixed(2)}))`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
