'use client';

interface DistributionItem {
  label: string;
  pct: string;
  color: string;
}

interface AssetDistributionChartProps {
  items: DistributionItem[];
  centerLabel: string;
  centerValue: string;
}

const CIRCLE_PATH = 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831';

export function AssetDistributionChart({ items, centerLabel, centerValue }: AssetDistributionChartProps) {
  let offset = 0;

  return (
    <div className="bg-white p-md border border-slate-200 rounded-xl card-shadow">
      <h3 className="text-label-lg font-medium text-on-surface mb-6">Asset Distribution</h3>
      <div className="flex items-center gap-8">
        {/* Donut chart */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            {/* Track */}
            <path
              className="text-slate-100"
              d={CIRCLE_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            {/* Segments */}
            {items.map((item) => {
              const pct = parseFloat(item.pct);
              const segment = (
                <path
                  key={item.label}
                  stroke={item.color}
                  d={CIRCLE_PATH}
                  fill="none"
                  strokeDasharray={`${pct}, 100`}
                  strokeDashoffset={`-${offset}`}
                  strokeWidth="4"
                />
              );
              offset += pct;
              return segment;
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase">{centerLabel}</span>
            <span className="text-sm font-black text-slate-900">{centerValue}%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-slate-600">{item.label}</span>
              </div>
              <span className="text-xs font-bold">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
