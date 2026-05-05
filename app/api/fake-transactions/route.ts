import { NextResponse } from 'next/server';

const TRANSACTION_NAMES = [
  'Vanguard Total Stock Market',
  'BTC Portfolio Rebalance',
  'Quarterly Dividend Payout',
  'BlackRock Fixed Income',
  'Ethereum Yield Strategy',
  'REIT Dividend Income',
  'Goldman Sachs Bond Fund',
  'Apple Inc. Equity Buy',
  'Solana Staking Reward',
  'JP Morgan Asset Trade',
  'US Treasury Bills',
  'Berkshire Hathaway B',
  'Luxury Concierge Services',
  'Global Equities Trade',
  'USDC Stable Yield',
];

const CATEGORIES = [
  'Equity Purchase',
  'Crypto Transfer',
  'Dividend',
  'Institutional Fee',
  'Fixed Income',
] as const;

const STATUSES = ['Settled', 'Pending', 'Processing'] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quantity = Math.min(parseInt(searchParams.get('_quantity') || '15'), 50);

  try {
    const apiUrl =
      `https://fakerapi.it/api/v2/custom` +
      `?_quantity=${quantity}` +
      `&_seed=42` +
      `&uuid=uuid` +
      `&rawAmount=float` +
      `&note=text` +
      `&date=date`;

    const res = await fetch(apiUrl, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error('fakerapi.it unavailable');

    const json = await res.json();

    const transactions = json.data.map(
      (item: { uuid: string; rawAmount: number; note: string; date: string }, i: number) => {
        const isExpense = i % 3 !== 0;
        const rawAmt = (Math.abs(item.rawAmount) % 149_500) + 500;
        const amount = parseFloat((rawAmt * (isExpense ? -1 : 1)).toFixed(2));

        const date = new Date(item.date);
        const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
        const day = String(date.getUTCDate()).padStart(2, '0');
        const year = date.getUTCFullYear();

        const hour = (i * 3 + 9) % 12 || 12;
        const minute = String((i * 7) % 60).padStart(2, '0');
        const ampm = (i * 3 + 9) < 12 ? 'AM' : 'PM';

        return {
          id: item.uuid,
          name: TRANSACTION_NAMES[i % TRANSACTION_NAMES.length],
          date: `${month} ${day}, ${year}`,
          time: `${String(hour).padStart(2, '0')}:${minute} ${ampm}`,
          category: CATEGORIES[i % CATEGORIES.length],
          amount,
          status: STATUSES[i % STATUSES.length],
          description: item.note?.slice(0, 80) ?? '',
        };
      }
    );

    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch from fakerapi.it' }, { status: 502 });
  }
}
