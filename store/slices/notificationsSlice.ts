import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { fetchCryptoPrices } from './portfolioSlice';
import { fetchExchangeRates, fetchCurrencyNames } from './currencySlice';
import { fetchTransactions } from './transactionsSlice';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface NotificationsState {
  items: NotificationItem[];
  loading: boolean;
  error: string | null;
  lastCryptoPrices: Record<string, number>;
}

const MAX_NOTIFICATIONS = 30;

const initialState: NotificationsState = {
  items: [],
  loading: false,
  error: null,
  lastCryptoPrices: {},
};

const ASSET_SYMBOLS: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  solana: 'SOL',
  'usd-coin': 'USDC',
};

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const pushNotification = (
  state: NotificationsState,
  notification: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>
) => {
  state.items.unshift({
    ...notification,
    id: createId(),
    createdAt: new Date().toISOString(),
    read: false,
  });
  if (state.items.length > MAX_NOTIFICATIONS) {
    state.items.length = MAX_NOTIFICATIONS;
  }
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(
      state,
      action: PayloadAction<{ type?: NotificationType; title: string; message: string }>
    ) {
      pushNotification(state, {
        type: action.payload.type ?? 'info',
        title: action.payload.title,
        message: action.payload.message,
      });
    },
    markNotificationRead(state, action: PayloadAction<string>) {
      const notification = state.items.find((item) => item.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    dismissNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearNotifications(state) {
      state.items = [];
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
        Object.entries(action.payload).forEach(([assetId, nextPrice]) => {
          const previousPrice = state.lastCryptoPrices[assetId];
          if (!previousPrice || previousPrice <= 0) {
            return;
          }

          const changePct = ((nextPrice - previousPrice) / previousPrice) * 100;
          if (Math.abs(changePct) >= 5) {
            const symbol = ASSET_SYMBOLS[assetId] ?? assetId.toUpperCase();
            pushNotification(state, {
              type: 'warning',
              title: 'Crypto Volatility Alert',
              message: `${symbol} moved ${changePct.toFixed(2)}% since the last refresh.`,
            });
          }
        });
        state.lastCryptoPrices = action.payload;
      })
      .addCase(fetchCryptoPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to refresh crypto prices';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        const baseCode =
          action.payload && typeof action.payload === 'object' && 'base_code' in action.payload
            ? String(action.payload.base_code)
            : 'USD';
        pushNotification(state, {
          type: 'info',
          title: 'FX Rates Updated',
          message: `Exchange rates were refreshed with base ${baseCode}.`,
        });
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        pushNotification(state, {
          type: 'success',
          title: 'Transactions Loaded',
          message: `${action.payload.length} transactions are now available in your feed.`,
        });
      })
      .addCase(fetchCurrencyNames.fulfilled, (state) => {
        pushNotification(state, {
          type: 'info',
          title: 'Currency Data Loaded',
          message: 'Currency list has been updated with latest data.',
        });
      });
  },
});

export const { addNotification, markNotificationRead, dismissNotification, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;

export const selectNotifications = (state: RootState) => state.notifications.items;
export const selectNotificationsLoading = (state: RootState) => state.notifications.loading;
export const selectNotificationsError = (state: RootState) => state.notifications.error;
