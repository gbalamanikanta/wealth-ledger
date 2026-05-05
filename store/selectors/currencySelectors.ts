import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

// Base selectors
const selectCurrencyState = (state: RootState) => state.currency;

export const selectRates = createSelector(
  [selectCurrencyState],
  (currency) => currency.rates
);

export const selectCurrencyNames = createSelector(
  [selectCurrencyState],
  (currency) => currency.currencyNames
);

export const selectBaseCurrency = createSelector(
  [selectCurrencyState],
  (currency) => currency.baseCurrency
);

export const selectFromCurrency = createSelector(
  [selectCurrencyState],
  (currency) => currency.fromCurrency
);

export const selectToCurrency = createSelector(
  [selectCurrencyState],
  (currency) => currency.toCurrency
);

export const selectConversionAmount = createSelector(
  [selectCurrencyState],
  (currency) => currency.amount
);

export const selectConvertedAmount = createSelector(
  [selectCurrencyState],
  (currency) => currency.convertedAmount
);

export const selectCurrencyLoading = createSelector(
  [selectCurrencyState],
  (currency) => currency.loading
);

// Conversion result
export const selectConversionResult = createSelector(
  [selectFromCurrency, selectToCurrency, selectConversionAmount, selectConvertedAmount],
  (from, to, amount, converted) => ({
    from,
    to,
    amount: parseFloat(amount) || 0,
    converted: converted || 0,
  })
);

// Available currencies
export const selectAvailableCurrencies = createSelector(
  [selectCurrencyNames],
  (names) => Object.keys(names)
);
