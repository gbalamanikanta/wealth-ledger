export function RegisterBranding() {
  return (
    <div className="hidden lg:flex flex-col justify-center space-y-lg">
      <div className="space-y-sm">
        <span className="text-secondary font-semibold text-headline-md tracking-tight uppercase">
          Institutional Grade
        </span>
        <h1 className="text-display-lg font-bold text-primary leading-tight">
          Elevate your wealth management with{' '}
          <span className="text-secondary">WealthLedger</span>.
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-md">
          Precision analytics and institutional-grade transparency for the modern private investor.
        </p>
      </div>

      <div className="relative rounded-xl overflow-hidden aspect-video border border-outline-variant card-shadow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="WealthLedger Interface"
          className="object-cover w-full h-full"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7OeCQAamBLSFwZr-mW3gYkmU9B9aqa9t9IgSCMI-2uy44RWeNdmOVMtG7M4JDyVvKTGigIILre1Pg2qYk8-2DnAJ_yU1se7QZbNvmb2Bv3_FYVifT44_k0NLMjWywJpxsEhXp_k3lj37LhlqhO9Z1jplWVR-FHAThrzBHvFlZ3fvxyQSHnxydgFI6p4Vt7MStyy0coUqCDhXMUGqAE3XySZppR1rkmeasOC6-9jhcWliBV6bwa9zXRPdwEjQpCjtNhJljQnc_ys_v"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-md">
        <div className="p-md bg-surface-container-lowest rounded-lg border border-outline-variant card-shadow">
          <span className="material-symbols-outlined text-secondary mb-xs block">security</span>
          <h3 className="text-label-lg font-medium text-primary">Bank-Level Security</h3>
          <p className="text-label-sm font-semibold text-on-surface-variant">
            AES-256 encryption for all sensitive assets.
          </p>
        </div>
        <div className="p-md bg-surface-container-lowest rounded-lg border border-outline-variant card-shadow">
          <span className="material-symbols-outlined text-secondary mb-xs block">query_stats</span>
          <h3 className="text-label-lg font-medium text-primary">Real-time Insights</h3>
          <p className="text-label-sm font-semibold text-on-surface-variant">
            Instant updates across your entire portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}
