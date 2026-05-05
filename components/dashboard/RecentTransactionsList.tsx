'use client';

import { Transaction } from '@/lib/fakerData';
import { useCurrencyFormat } from '@/lib/useCurrencyFormat';

interface RecentTransactionsListProps {
  transactions: Transaction[];
}

export function RecentTransactionsList({ transactions }: RecentTransactionsListProps) {
  const { format } = useCurrencyFormat();

  return (
    <div className="p-md border-r border-outline-variant">
      <div className="flex items-center justify-between mb-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-primary-container">history</span>
          <h4 className="text-label-lg font-medium text-on-surface">Recent Transactions</h4>
        </div>
        <span className="text-[10px] text-on-primary-container uppercase font-bold">Last 48 Hours</span>
      </div>
      <div className="space-y-3">
        {transactions.map((tx) => {
          const isPositive = tx.amount > 0;
          const icon =
            tx.category === 'Crypto Transfer'
              ? 'currency_bitcoin'
              : tx.category === 'Dividend'
              ? 'account_balance'
              : 'shopping_cart';
          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-2 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isPositive ? 'bg-on-tertiary-container/10' : 'bg-error-container/20'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-sm ${
                      isPositive ? 'text-on-tertiary-container' : 'text-on-error-container'
                    }`}
                  >
                    {icon}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-on-surface">{tx.name}</p>
                  <p className="text-[10px] text-on-primary-container">{tx.category}</p>
                </div>
              </div>
              <p className={`text-xs font-bold ${isPositive ? 'text-on-tertiary-container' : 'text-on-surface'}`}>
                {isPositive ? '+' : ''}{format(tx.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
