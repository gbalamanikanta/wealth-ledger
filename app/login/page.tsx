import { AuthBackground } from '@/components/auth/AuthBackground';
import { LoginBrand } from '@/components/auth/LoginBrand';
import { LoginForm } from '@/components/auth/LoginForm';
import { LoginFooter } from '@/components/auth/LoginFooter';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-md text-on-surface relative overflow-hidden">
      <AuthBackground />
      <div className="w-full max-w-[440px]">
        <LoginBrand />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  );
}
