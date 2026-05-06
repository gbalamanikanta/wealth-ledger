import { RegisterBranding } from '@/components/auth/RegisterBranding';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { TrustBadges } from '@/components/auth/TrustBadges';

export default function RegisterPage() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center p-md lg:p-xl">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        <RegisterBranding />
        <div className="flex flex-col">
          <RegisterForm />
          <TrustBadges />
        </div>
      </div>
    </div>
  );
}
