import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transactionsReducer from './slices/transactionsSlice';
import portfolioReducer from './slices/portfolioSlice';
import currencyReducer from './slices/currencySlice';
import settingsReducer from './slices/settingsSlice';
import notificationsReducer from './slices/notificationsSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  portfolio: portfolioReducer,
  currency: currencyReducer,
  notifications: notificationsReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
