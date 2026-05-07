import { NextResponse } from 'next/server';

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY ?? '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids') || 'bitcoin,ethereum,solana,usd-coin';

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${ids}&x_cg_demo_api_key=${COINGECKO_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('CoinGecko API error');
    const data = await res.json();

    const prices: Record<string, number> = {};
    for (const [id, val] of Object.entries(data)) {
      prices[id] = (val as { usd: number }).usd;
    }
    return NextResponse.json(prices);
  } catch {
    return NextResponse.json({
      bitcoin: 64221.12,
      ethereum: 3421.12,
      solana: 142.12,
      'usd-coin': 1.0,
    });
  }
}
