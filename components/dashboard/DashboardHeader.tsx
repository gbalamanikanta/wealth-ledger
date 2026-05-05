'use client';

export function DashboardHeader() {
  return (
    <div className="flex justify-between items-end mb-lg">
      <div>
        <h2 className="text-headline-lg font-semibold text-on-surface">Institutional Dashboard</h2>
        <p className="text-body-md text-on-primary-container">
          Real-time valuation of your global estate and liquid assets.
        </p>
      </div>
      <div className="flex gap-3">
        <button className="px-md py-2 bg-secondary-container text-white rounded-lg text-label-lg font-medium transition-transform active:scale-95 shadow-sm">
          Export Report
        </button>
      </div>
    </div>
  );
}
