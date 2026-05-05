import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  avgEntry: number;
  currentPrice: number;
  value: number;
  returnPct: number;
  color: string;
  icon: string;
}

interface CryptoState {
  assets: CryptoAsset[];
  prices: Record<string, number>;
  balances: Record<string, number>;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  totalValue: number;
  change24h: number;
  netProfit: number;
}

const INITIAL_HOLDINGS = [
  { id: 'bitcoin',  symbol: 'BTC',  name: 'Bitcoin',   balance: 12.45012, avgEntry: 28450,   color: '#F7931A', icon: 'currency_bitcoin' },
  { id: 'ethereum', symbol: 'ETH',  name: 'Ethereum',  balance: 158.324,  avgEntry: 1840.12, color: '#627EEA', icon: 'filter_vintage' },
  { id: 'solana',   symbol: 'SOL',  name: 'Solana',    balance: 450.0,    avgEntry: 102.5,   color: '#9945FF', icon: 'animation' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin',  balance: 17779.36, avgEntry: 1.0,     color: '#2775CA', icon: 'monetization_on' },
];

const initialBalances: Record<string, number> = Object.fromEntries(
  INITIAL_HOLDINGS.map((h) => [h.id, h.balance])
);

function buildAssets(
  prices: Record<string, number>,
  balances: Record<string, number>
): CryptoAsset[] {
  return INITIAL_HOLDINGS.map((h) => {
    const balance = balances[h.id] ?? h.balance;
    const currentPrice = prices[h.id] ?? h.avgEntry;
    const value = parseFloat((balance * currentPrice).toFixed(2));
    const cost = balance * h.avgEntry;
    const returnPct = parseFloat((((value - cost) / cost) * 100).toFixed(1));
    return { ...h, balance, currentPrice, value, returnPct };
  });
}

const defaultPrices = {
  bitcoin: 64221.12,
  ethereum: 3421.12,
  solana: 142.12,
  'usd-coin': 1.0,
};

const initialAssets = buildAssets(defaultPrices, initialBalances);
const initialTotal = initialAssets.reduce((s, a) => s + a.value, 0);

const initialState: CryptoState = {
  assets: initialAssets,
  prices: defaultPrices,
  balances: initialBalances,
  loading: false,
  error: null,
  lastUpdated: null,
  totalValue: initialTotal,
  change24h: 18204,
  netProfit: 412090,
};

export const fetchCryptoPrices = createAsyncThunk('crypto/fetchPrices', async (_, { rejectWithValue }) => {
  try {
    const ids = INITIAL_HOLDINGS.map((h) => h.id).join(',');
    const res = await fetch(`/api/crypto-prices?ids=${ids}`);
    if (!res.ok) throw new Error('Failed to fetch crypto prices');
    const data = await res.json();
    return data as Record<string, number>;
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message);
  }
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    adjustBalance(state, action: PayloadAction<{ assetId: string; qty: number }>) {
      const { assetId, qty } = action.payload;
      const current = state.balances[assetId] ?? 0;
      state.balances[assetId] = parseFloat((current + qty).toFixed(8));
      state.assets = buildAssets(state.prices, state.balances);
      state.totalValue = state.assets.reduce((s, a) => s + a.value, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
        state.assets = buildAssets(action.payload, state.balances);
        state.totalValue = state.assets.reduce((s, a) => s + a.value, 0);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCryptoPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { adjustBalance } = cryptoSlice.actions;
export default cryptoSlice.reducer;
