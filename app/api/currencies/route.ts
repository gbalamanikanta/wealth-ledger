import { NextResponse } from 'next/server';

const FALLBACK_NAMES: Record<string, string> = {
  USD: 'United States Dollar',
  EUR: 'Euro',
  GBP: 'British Pound Sterling',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  BRL: 'Brazilian Real',
  MXN: 'Mexican Peso',
  SGD: 'Singapore Dollar',
  HKD: 'Hong Kong Dollar',
  NZD: 'New Zealand Dollar',
  SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone',
  DKK: 'Danish Krone',
  AED: 'UAE Dirham',
  SAR: 'Saudi Riyal',
  ZAR: 'South African Rand',
};

export async function GET() {
  try {
    const res = await fetch('https://openexchangerates.org/api/currencies.json', {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error('Upstream error');
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(FALLBACK_NAMES);
  }
}
