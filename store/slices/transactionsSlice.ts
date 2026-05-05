import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '@/lib/fakerData';

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
  filter: {
    category: string;
    status: string;
    minAmount: string;
    dateRange: string;
  };
  totalVolume: number;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
  filter: {
    category: 'All Categories',
    status: 'All',
    minAmount: '',
    dateRange: '',
  },
  totalVolume: 0,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/fake-transactions?_quantity=15');
      if (!res.ok) throw new Error('Failed to fetch transactions');
      return (await res.json()) as Transaction[];
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Omit<Transaction, 'id'>>) {
      const newTx: Transaction = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.items.unshift(newTx);
      state.totalVolume += Math.abs(newTx.amount);
    },
    setFilter(state, action: PayloadAction<Partial<TransactionsState['filter']>>) {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilters(state) {
      state.filter = {
        category: 'All Categories',
        status: 'All',
        minAmount: '',
        dateRange: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalVolume = action.payload.reduce((s, t) => s + Math.abs(t.amount), 0);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addTransaction, setFilter, resetFilters } = transactionsSlice.actions;
export default transactionsSlice.reducer;

// Base selectors
export const selectRawItems = (state: any) => state.transactions.items;
export const selectFilter = (state: any) => state.transactions.filter;
export const selectLoading = (state: any) => state.transactions.loading;
export const selectTotalVolume = (state: any) => state.transactions.totalVolume;
