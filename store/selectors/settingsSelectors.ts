import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

// Base selectors
const selectSettingsState = (state: RootState) => state.settings;

export const selectPrimaryCurrency = createSelector(
  [selectSettingsState],
  (settings) => settings.primaryCurrency
);

export const selectLanguage = createSelector(
  [selectSettingsState],
  (settings) => settings.language
);

export const selectDarkMode = createSelector(
  [selectSettingsState],
  (settings) => settings.darkMode
);

export const selectMonthlySpendingLimit = createSelector(
  [selectSettingsState],
  (settings) => settings.monthlySpendingLimit
);

export const selectInvestmentThreshold = createSelector(
  [selectSettingsState],
  (settings) => settings.investmentThreshold
);

export const selectAlertThreshold = createSelector(
  [selectSettingsState],
  (settings) => settings.alertThreshold
);

export const selectTwoFactorEnabled = createSelector(
  [selectSettingsState],
  (settings) => settings.twoFactorEnabled
);
