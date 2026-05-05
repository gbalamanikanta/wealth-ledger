'use client';

interface CryptoPageHeaderProps {
  onExport?: () => void;
}

export function CryptoPageHeader({ onExport }: CryptoPageHeaderProps) {
  return (
    <div className="mb-lg">
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-label-sm font-semibold text-on-primary-container">
          <li>WealthLedger</li>
          <li>
            <span className="material-symbols-outlined mx-1" style={{ fontSize: '14px' }}>
              chevron_right
            </span>
          </li>
          <li className="text-secondary font-semibold">Crypto Portfolio</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-headline-lg font-semibold text-on-surface">Digital Asset Portfolio</h2>
          <p className="text-body-md text-on-primary-container mt-1">
            Real-time valuation and distribution of your crypto holdings.
          </p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-label-lg font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
          Export Report
        </button>
      </div>
    </div>
  );
}
