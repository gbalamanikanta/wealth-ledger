'use client';

import { Transaction } from '@/lib/fakerData';
import { StatusBadge } from './StatusBadge';
import { useCurrencyFormat } from '@/lib/useCurrencyFormat';

const CATEGORY_COLORS: Record<string, string> = {
  'Equity Purchase': 'bg-blue-50 text-blue-700 border border-blue-100',
  'Crypto Transfer': 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  'Dividend': 'bg-purple-50 text-purple-700 border border-purple-100',
  'Institutional Fee': 'bg-amber-50 text-amber-700 border border-amber-100',
  'Fixed Income': 'bg-slate-100 text-slate-700 border border-slate-200',
};

const CATEGORY_ICONS: Record<string, string> = {
  'Equity Purchase': 'monitoring',
  'Crypto Transfer': 'currency_bitcoin',
  'Dividend': 'account_balance',
  'Institutional Fee': 'credit_card',
  'Fixed Income': 'savings',
};

interface TransactionTableProps {
  items: Transaction[];
}

export function TransactionTable({ items }: TransactionTableProps) {
  const { format } = useCurrencyFormat();

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-label-sm font-semibold text-on-surface-variant uppercase">Transaction</th>
            <th className="px-6 py-4 text-label-sm font-semibold text-on-surface-variant uppercase">Category</th>
            <th className="px-6 py-4 text-label-sm font-semibold text-on-surface-variant uppercase">Amount</th>
            <th className="px-6 py-4 text-label-sm font-semibold text-on-surface-variant uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((tx) => (
            <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">
                      {CATEGORY_ICONS[tx.category] || 'receipt'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{tx.name}</p>
                    <p className="text-xs text-slate-500">{tx.date} • {tx.time}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[tx.category]}`}>
                  {tx.category}
                </span>
              </td>
              <td className={`px-6 py-5 font-bold ${tx.amount >= 0 ? 'text-on-tertiary-container' : 'text-slate-900'}`}>
                {tx.amount >= 0 ? '+' : ''}{format(tx.amount)}
              </td>
              <td className="px-6 py-5">
                <StatusBadge status={tx.status} />
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-sm">
                No transactions match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
