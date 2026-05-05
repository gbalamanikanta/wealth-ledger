'use client';

import { CryptoAsset } from '@/store/slices/cryptoSlice';
import { useCurrencyFormat } from '@/lib/useCurrencyFormat';

interface CryptoAssetsListProps {
  assets: CryptoAsset[];
  loading: boolean;
}

export function CryptoAssetsList({ assets, loading }: CryptoAssetsListProps) {
  const { format } = useCurrencyFormat();

  return (
    <div className="p-md bg-slate-50/50">
      <div className="flex items-center justify-between mb-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-primary-container">currency_bitcoin</span>
          <h4 className="text-label-lg font-medium text-on-surface">Crypto Assets</h4>
        </div>
        <span className="text-[10px] text-on-tertiary-container font-bold">
          {assets.length > 0 && !loading ? '+12.4% YTD' : 'Loading...'}
        </span>
      </div>
      <div className="space-y-3">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="flex items-center justify-between p-2 hover:bg-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: asset.color + '20' }}
              >
                <span className="material-symbols-outlined text-sm" style={{ color: asset.color }}>
                  {asset.icon}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface">{asset.name}</p>
                <p className="text-[10px] text-on-primary-container">
                  {asset.balance.toFixed(2)} {asset.symbol}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-on-surface">{format(asset.value)}</p>
              <p className={`text-[10px] ${asset.returnPct >= 0 ? 'text-on-tertiary-container' : 'text-error'}`}>
                {asset.returnPct >= 0 ? '+' : ''}{asset.returnPct}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
