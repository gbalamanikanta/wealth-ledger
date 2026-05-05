'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface TopNavProps {
  placeholder?: string;
}

export function TopNav({ placeholder = 'Search wealth data...' }: TopNavProps) {
  const user = useSelector((s: RootState) => s.auth.user);

  return (
    <header className="fixed top-0 right-0 z-40 flex h-16 w-full items-center justify-between px-6 lg:pl-72 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex flex-1 items-center gap-x-4">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
          </span>
          <input
            className="block w-full rounded-lg border-0 py-1.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-slate-50 outline-none"
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button className="-m-2.5 p-2.5 text-slate-400 hover:text-blue-600 transition-colors" type="button">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="-m-2.5 p-2.5 text-slate-400 hover:text-blue-600 transition-colors" type="button">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200"></div>
        <div className="flex items-center gap-x-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="User profile avatar"
            className="h-8 w-8 rounded-full bg-slate-50 object-cover"
            src={
              user?.avatarUrl ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ete-6kxLmk20-5BXtzT7jsmIbmGn-o9JVTCzofaBTxGatB_MjqgczJWyxwFt4AJ9GUsvfL-jwfIgfGEuOWvvhUyNe0DFwa_vRbsQ2KhuAtJfYlKg8Ud4OjgnOhgOQ51qOasP6knKUNOdXQ1kyw1mqFQh-JBf1E82CuPBB5hpiMVKr3StgTHkfVY4uNC88eORgYGuY3ASxMs3L4FOLt9Wl7lY3Nnjn8WqebedAg1z1x8zV2erfObvlJ1lZPhb9O0kENmkgjoh5JDV'
            }
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.fullName || 'Alexander Sterling'}</p>
            <p className="text-[10px] font-medium text-slate-500 uppercase">{user?.role || 'Premium Member'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
