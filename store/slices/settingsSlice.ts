import { createSlice, PayloadAction } from '@reduxjs/toolkit';

function loadStoredCurrency(): string {
  if (typeof window === 'undefined') return 'USD';
  return localStorage.getItem('wealth-ledger:currency') ?? 'USD';
}

interface SettingsState {
  primaryCurrency: string;
  language: string;
  darkMode: boolean;
  monthlySpendingLimit: number;
  investmentThreshold: number;
  alertThreshold: number;
  twoFactorEnabled: boolean;
}

const initialState: SettingsState = {
  primaryCurrency: loadStoredCurrency(),
  language: 'EN',
  darkMode: false,
  monthlySpendingLimit: 12500,
  investmentThreshold: 5000,
  alertThreshold: 80,
  twoFactorEnabled: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPrimaryCurrency(state, action: PayloadAction<string>) {
      state.primaryCurrency = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setMonthlySpendingLimit(state, action: PayloadAction<number>) {
      state.monthlySpendingLimit = action.payload;
    },
    setInvestmentThreshold(state, action: PayloadAction<number>) {
      state.investmentThreshold = action.payload;
    },
    setAlertThreshold(state, action: PayloadAction<number>) {
      state.alertThreshold = action.payload;
    },
    toggleTwoFactor(state) {
      state.twoFactorEnabled = !state.twoFactorEnabled;
    },
  },
});

export const {
  setPrimaryCurrency,
  setLanguage,
  toggleDarkMode,
  setMonthlySpendingLimit,
  setInvestmentThreshold,
  setAlertThreshold,
  toggleTwoFactor,
} = settingsSlice.actions;
export default settingsSlice.reducer;
