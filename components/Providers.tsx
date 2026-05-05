'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { fetchTransactions } from '@/store/slices/transactionsSlice';

function DataLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(fetchTransactions());
  }, []);
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DataLoader>{children}</DataLoader>
    </Provider>
  );
}
