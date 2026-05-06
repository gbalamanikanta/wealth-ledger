'use client';

import { useSelector } from 'react-redux';
import {
  selectTotalValue,
  selectChange24h,
  selectNetProfit,
  selectCryptoLoading,
  selectPrimaryHoldingBalances,
} from '@/store/selectors/cryptoSelectors';
import { useCurrencyFormat } from '@/lib/useCurrencyFormat';

export function PortfolioValueCard() {
  const { format } = useCurrencyFormat();
  const totalValue = useSelector(selectTotalValue);
  const change24h = useSelector(selectChange24h);
  const netProfit = useSelector(selectNetProfit);
  const loading = useSelector(selectCryptoLoading);
  const { bitcoinBalance, ethereumBalance } = useSelector(selectPrimaryHoldingBalances);

  return (
    <div className="md:col-span-4 bg-white p-md border border-slate-200 rounded-xl card-shadow">
      <div className="flex justify-between items-start mb-4">
        <p className="text-label-lg font-medium text-on-primary-container">Total Portfolio Value</p>
        <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">trending_up</span>
          {loading ? '...' : '+12.4%'}
        </div>
      </div>

      <p className="text-stat-lg font-bold text-on-surface">{format(totalValue)}</p>
      <p className="text-xs text-slate-400 mt-1">
        ~ {bitcoinBalance.toFixed(2)} BTC / {ethereumBalance.toFixed(1)} ETH
      </p>

      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">24h Change</p>
          <p className="text-headline-md font-semibold text-on-tertiary-container">
            +{format(change24h)}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Net Profit</p>
          <p className="text-headline-md font-semibold text-on-surface">
            +{format(netProfit)}
          </p>
        </div>
      </div>
    </div>
  );
}
