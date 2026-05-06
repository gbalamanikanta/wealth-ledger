'use client';

export function AccountVerifiedCard() {
  return (
    <div
      className="col-span-12 md:col-span-4 bg-primary-container p-md border border-slate-200 rounded-xl overflow-hidden relative group card-shadow"
    >
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Cyber Security"
          className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXkHnRKi6RIfeWpthWz0Sw1OjkXYk2XoaP4y1BJZlzNJX3lMR0Ht2m0PSaFu-TUdGQtbYDn5lLTfgNTOaSZA_bGBYLhCIeiWChdH7fceLjCpWC-uLjylzAsQzf6A4FgwzZh8m2XgMF76_VNrCUPiIzrmhieM23GaQaISBkBDFVdD5qJB2x7guwNGs8SjxkjlajPpmQ2F4Me9ZNVfju-fbhekj9YalnYOmquF9Gv45qh3ighz9ZNBj1woomPG6Yi4-OV2FAgsNvBeQl"
        />
      </div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <span
          className="material-symbols-outlined text-white text-4xl icon-filled"
        >
          verified_user
        </span>
        <div>
          <h4 className="text-white text-headline-md font-semibold mb-2">Account Verified</h4>
          <p className="text-slate-400 text-label-lg font-medium">
            Your identity has been fully verified for high-value transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
