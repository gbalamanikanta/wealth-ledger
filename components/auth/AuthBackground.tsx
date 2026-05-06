export function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-surface-container blur-[120px] rounded-full opacity-50" />
      <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-secondary-fixed-dim blur-[120px] rounded-full opacity-30" />
    </div>
  );
}
