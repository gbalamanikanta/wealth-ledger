'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchExchangeRates, fetchCurrencyNames } from '@/store/slices/currencySlice';

export function CurrencyRateFetcher() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchExchangeRates('USD'));
    dispatch(fetchCurrencyNames());
  }, [dispatch]);
  return null;
}
