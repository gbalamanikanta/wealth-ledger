'use client';

import { useSelector } from 'react-redux';
import { selectFilteredTransactions, selectLoading } from '@/store/selectors/transactionsSelectors';
import { AppLayout } from '@/components/AppLayout';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { CreateTransactionForm } from '@/components/transactions/CreateTransactionForm';
import { TransactionSummaryWidgets } from '@/components/transactions/TransactionSummaryWidgets';

function TransactionTableSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 grid grid-cols-4 gap-4">
        {['Transaction', 'Category', 'Amount', 'Status'].map((h) => (
          <div key={h} className="h-3 bg-slate-200 rounded w-20" />
        ))}
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="px-6 py-5 border-b border-slate-100 grid grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="space-y-1.5">
              <div className="h-3 bg-slate-200 rounded w-32" />
              <div className="h-2 bg-slate-100 rounded w-20" />
            </div>
          </div>
          <div className="h-5 bg-slate-200 rounded-full w-28" />
          <div className="h-3 bg-slate-200 rounded w-20" />
          <div className="h-3 bg-slate-200 rounded w-16" />
        </div>
      ))}
    </div>
  );
}

export default function TransactionsPage() {
  const filteredItems = useSelector(selectFilteredTransactions);
  const loading = useSelector(selectLoading);

  return (
    <AppLayout searchPlaceholder="Search transactions...">
      <div className="p-8 max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-display-md font-bold text-on-surface mb-2">Transactions</h2>
            <p className="text-on-primary-container text-body-md">
              Real-time overview of your institutional wealth movements and asset allocations.
            </p>
          </div>
        </div>

        <TransactionFilters />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            {loading ? <TransactionTableSkeleton /> : <TransactionTable items={filteredItems} />}
          </div>
          <div className="xl:col-span-1">
            <CreateTransactionForm />
          </div>
        </div>

        <TransactionSummaryWidgets />
      </div>
    </AppLayout>
  );
}
