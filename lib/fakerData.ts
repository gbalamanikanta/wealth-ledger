import { faker } from '@faker-js/faker';

faker.seed(42);

export interface Transaction {
  id: string;
  name: string;
  date: string;
  time: string;
  category: 'Equity Purchase' | 'Crypto Transfer' | 'Dividend' | 'Institutional Fee' | 'Fixed Income';
  amount: number;
  status: 'Settled' | 'Pending' | 'Processing';
  description: string;
  cryptoAssetId?: string;
  cryptoSymbol?: string;
  cryptoQty?: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: string;
}

const CATEGORIES: Transaction['category'][] = [
  'Equity Purchase',
  'Crypto Transfer',
  'Dividend',
  'Institutional Fee',
  'Fixed Income',
];

const STATUSES: Transaction['status'][] = ['Settled', 'Pending', 'Processing'];

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

const REF_DATE = new Date('2026-05-04T12:00:00Z');

export function generateTransactions(count = 15): Transaction[] {
  return Array.from({ length: count }, (_, i) => {
    const isExpense = faker.datatype.boolean({ probability: 0.6 });
    const category = faker.helpers.arrayElement(CATEGORIES);
    const amount = parseFloat(
      (faker.number.float({ min: 500, max: 150000, fractionDigits: 2 }) * (isExpense ? -1 : 1)).toFixed(2)
    );
    const date = faker.date.recent({ days: 60, refDate: REF_DATE });
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = String(hours % 12 || 12).padStart(2, '0');
    return {
      id: faker.string.uuid(),
      name: TRANSACTION_NAMES[i % TRANSACTION_NAMES.length],
      date: `${month} ${day}, ${year}`,
      time: `${hour12}:${minutes} ${ampm}`,
      category,
      amount,
      status: faker.helpers.arrayElement(STATUSES),
      description: faker.finance.transactionDescription(),
    };
  });
}

export function generateUserProfile(): UserProfile {
  return {
    id: faker.string.uuid(),
    fullName: 'Alexander Sterling',
    email: 'alex.sterling@wealthledger.com',
    phone: '+1 (555) 0123-4567',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ete-6kxLmk20-5BXtzT7jsmIbmGn-o9JVTCzofaBTxGatB_MjqgczJWyxwFt4AJ9GUsvfL-jwfIgfGEuOWvvhUyNe0DFwa_vRbsQ2KhuAtJfYlKg8Ud4OjgnOhgOQ51qOasP6knKUNOdXQ1kyw1mqFQh-JBf1E82CuPBB5hpiMVKr3StgTHkfVY4uNC88eORgYGuY3ASxMs3L4FOLt9Wl7lY3Nnjn8WqebedAg1z1x8zV2erfObvlJ1lZPhb9O0kENmkgjoh5JDV',
    role: 'Premium Member',
  };
}
