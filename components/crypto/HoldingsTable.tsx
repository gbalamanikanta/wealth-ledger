'use client';

import { CryptoAsset } from '@/store/slices/cryptoSlice';
import { useCurrencyFormat } from '@/lib/useCurrencyFormat';

interface HoldingsTableProps {
  assets: CryptoAsset[];
}

export function HoldingsTable({ assets }: HoldingsTableProps) {
  const { format } = useCurrencyFormat();

  return (
    <div className="bg-white border border-slate-200 rounded-xl card-shadow mb-gutter">
      <div className="px-md py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-label-lg font-medium text-on-surface">Current Holdings</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Sort by:</span>
          <select className="text-xs font-bold border-none bg-transparent focus:ring-0 text-slate-700 outline-none">
            <option>Balance (High to Low)</option>
            <option>Alphabetical</option>
            <option>24h Performance</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-md py-4 text-label-sm font-semibold text-slate-500 uppercase">Asset</th>
              <th className="px-md py-4 text-label-sm font-semibold text-slate-500 uppercase">Balance</th>
              <th className="px-md py-4 text-label-sm font-semibold text-slate-500 uppercase">Avg. Entry</th>
              <th className="px-md py-4 text-label-sm font-semibold text-slate-500 uppercase">Market Price</th>
              <th className="px-md py-4 text-label-sm font-semibold text-slate-500 uppercase text-right">Value</th>
              <th className="px-md py-4 text-label-sm font-semibold text-slate-500 uppercase text-right">Return</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-md py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: asset.color + '20' }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '20px', color: asset.color }}
                      >
                        {asset.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-label-lg font-medium text-on-surface">{asset.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">{asset.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="px-md py-4 text-label-lg font-medium text-on-surface">
                  {asset.balance.toLocaleString('en-US')}
                </td>
                <td className="px-md py-4 text-sm text-slate-500">{format(asset.avgEntry)}</td>
                <td className="px-md py-4 text-sm text-slate-500">{format(asset.currentPrice)}</td>
                <td className="px-md py-4 text-label-lg font-medium text-on-surface text-right">
                  {format(asset.value)}
                </td>
                <td className="px-md py-4 text-right">
                  <span
                    className={`font-bold text-xs ${
                      asset.returnPct >= 0 ? 'text-on-tertiary-container' : 'text-error'
                    }`}
                  >
                    {asset.returnPct >= 0 ? '+' : ''}{asset.returnPct}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-md py-4 bg-slate-50 border-t border-slate-100 text-center">
        <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
          View All Assets ({assets.length})
        </button>
      </div>
    </div>
  );
}
