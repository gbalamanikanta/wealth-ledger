import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  rates: Record<string, number>;
  currencyNames: Record<string, string>;
  baseCurrency: string;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  convertedAmount: number | null;
}

const initialState: CurrencyState = {
  rates: {},
  currencyNames: {},
  baseCurrency: 'USD',
  loading: false,
  error: null,
  lastUpdated: null,
  fromCurrency: 'USD',
  toCurrency: 'INR',
  amount: '1',
  convertedAmount: null,
};

export const fetchExchangeRates = createAsyncThunk(
  'currency/fetchRates',
  async (base: string = 'USD', { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/exchange-rates?base=${base}`);
      if (!res.ok) throw new Error('Failed to fetch exchange rates');
      return await res.json();
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchCurrencyNames = createAsyncThunk(
  'currency/fetchNames',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/currencies');
      if (!res.ok) throw new Error('Failed to fetch currency names');
      return await res.json();
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setFromCurrency(state, action: PayloadAction<string>) {
      state.fromCurrency = action.payload;
    },
    setToCurrency(state, action: PayloadAction<string>) {
      state.toCurrency = action.payload;
    },
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    swapCurrencies(state) {
      const tmp = state.fromCurrency;
      state.fromCurrency = state.toCurrency;
      state.toCurrency = tmp;
    },
    calculateConversion(state) {
      if (!state.rates || Object.keys(state.rates).length === 0) return;
      const amount = parseFloat(state.amount);
      if (isNaN(amount)) {
        state.convertedAmount = null;
        return;
      }
      const fromRate = state.rates[state.fromCurrency] ?? 1;
      const toRate = state.rates[state.toCurrency] ?? 1;
      state.convertedAmount = parseFloat(((amount / fromRate) * toRate).toFixed(4));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload.rates;
        state.baseCurrency = action.payload.base_code ?? 'USD';
        state.lastUpdated = action.payload.time_last_update_utc ?? new Date().toISOString();
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCurrencyNames.fulfilled, (state, action) => {
        state.currencyNames = action.payload;
      });
  },
});

export const { setFromCurrency, setToCurrency, setAmount, swapCurrencies, calculateConversion } =
  currencySlice.actions;
export default currencySlice.reducer;
