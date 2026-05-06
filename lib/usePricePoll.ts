import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { fetchCryptoPrices } from '@/store/slices/portfolioSlice';

export function usePricePoll(intervalMs = 60_000) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCryptoPrices());
    const id = setInterval(() => { dispatch(fetchCryptoPrices()); }, intervalMs);
    return () => clearInterval(id);
  }, [dispatch, intervalMs]);
}
