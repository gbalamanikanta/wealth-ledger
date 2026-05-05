import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { fetchTransactions } from './transactionsSlice';
import { fetchExchangeRates } from './currencySlice';

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

interface PortfolioState {
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
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 12.45012,
    avgEntry: 28450,
    color: '#F7931A',
    icon: 'currency_bitcoin',
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 158.324,
    avgEntry: 1840.12,
    color: '#627EEA',
    icon: 'filter_vintage',
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    balance: 450.0,
    avgEntry: 102.5,
    color: '#9945FF',
    icon: 'animation',
  },
  {
    id: 'usd-coin',
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 17779.36,
    avgEntry: 1.0,
    color: '#2775CA',
    icon: 'monetization_on',
  },
];

const initialBalances: Record<string, number> = Object.fromEntries(
  INITIAL_HOLDINGS.map((holding) => [holding.id, holding.balance])
);

function buildAssets(prices: Record<string, number>, balances: Record<string, number>): CryptoAsset[] {
  return INITIAL_HOLDINGS.map((holding) => {
    const balance = balances[holding.id] ?? holding.balance;
    const currentPrice = prices[holding.id] ?? holding.avgEntry;
    const value = parseFloat((balance * currentPrice).toFixed(2));
    const cost = balance * holding.avgEntry;
    const returnPct = parseFloat((((value - cost) / cost) * 100).toFixed(1));
    return { ...holding, balance, currentPrice, value, returnPct };
  });
}

const defaultPrices: Record<string, number> = {
  bitcoin: 64221.12,
  ethereum: 3421.12,
  solana: 142.12,
  'usd-coin': 1.0,
};

const initialAssets = buildAssets(defaultPrices, initialBalances);
const initialTotal = initialAssets.reduce((sum, asset) => sum + asset.value, 0);
const initialNetProfit = parseFloat(
  initialAssets.reduce((sum, asset) => sum + (asset.value - asset.balance * asset.avgEntry), 0).toFixed(2)
);

const initialState: PortfolioState = {
  assets: initialAssets,
  prices: defaultPrices,
  balances: initialBalances,
  loading: false,
  error: null,
  lastUpdated: null,
  totalValue: initialTotal,
  change24h: 0,
  netProfit: initialNetProfit,
};

export const fetchCryptoPrices = createAsyncThunk<Record<string, number>, void, { rejectValue: string }>(
  'portfolio/fetchPrices',
  async (_, { rejectWithValue }) => {
    try {
      const ids = INITIAL_HOLDINGS.map((holding) => holding.id).join(',');
      const response = await fetch(`/api/crypto-prices?ids=${ids}`);
      if (!response.ok) {
        throw new Error('Failed to fetch crypto prices');
      }
      const data = (await response.json()) as Record<string, number>;
      return data;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    adjustBalance(state, action: PayloadAction<{ assetId: string; qty: number }>) {
      const { assetId, qty } = action.payload;
      const current = state.balances[assetId] ?? 0;
      state.balances[assetId] = parseFloat((current + qty).toFixed(8));
      state.assets = buildAssets(state.prices, state.balances);
      state.totalValue = state.assets.reduce((sum, asset) => sum + asset.value, 0);
      state.netProfit = parseFloat(
        state.assets.reduce((sum, asset) => sum + (asset.value - asset.balance * asset.avgEntry), 0).toFixed(2)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoPrices.fulfilled, (state, action) => {
        const previousTotal = state.totalValue;
        state.loading = false;
        state.prices = action.payload;
        state.assets = buildAssets(action.payload, state.balances);
        state.totalValue = state.assets.reduce((sum, asset) => sum + asset.value, 0);
        state.change24h = parseFloat((state.totalValue - previousTotal).toFixed(2));
        state.netProfit = parseFloat(
          state.assets.reduce((sum, asset) => sum + (asset.value - asset.balance * asset.avgEntry), 0).toFixed(2)
        );
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCryptoPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch crypto prices';
      })
      .addCase(fetchExchangeRates.fulfilled, (state) => {
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchTransactions.fulfilled, (state) => {
        state.lastUpdated = new Date().toISOString();
      });
  },
});

export const { adjustBalance } = portfolioSlice.actions;
export default portfolioSlice.reducer;

export const selectAssets = (state: RootState) => state.portfolio.assets;
export const selectPrices = (state: RootState) => state.portfolio.prices;
export const selectBalances = (state: RootState) => state.portfolio.balances;
export const selectTotalValue = (state: RootState) => state.portfolio.totalValue;
export const selectChange24h = (state: RootState) => state.portfolio.change24h;
export const selectNetProfit = (state: RootState) => state.portfolio.netProfit;
export const selectCryptoLoading = (state: RootState) => state.portfolio.loading;
export const selectCryptoError = (state: RootState) => state.portfolio.error;
