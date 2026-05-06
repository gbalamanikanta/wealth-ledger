export function TrustBadges() {
  return (
    <div className="mt-xl flex flex-wrap justify-center lg:justify-start gap-lg opacity-50">
      <div className="flex items-center gap-xs text-label-sm font-semibold uppercase tracking-widest text-on-surface">
        <span className="material-symbols-outlined text-lg">verified</span>
        <span>GDPR Compliant</span>
      </div>
      <div className="flex items-center gap-xs text-label-sm font-semibold uppercase tracking-widest text-on-surface">
        <span className="material-symbols-outlined text-lg">encrypted</span>
        <span>256-bit AES</span>
      </div>
    </div>
  );
}
