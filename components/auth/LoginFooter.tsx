import Link from 'next/link';

export function LoginFooter() {
  return (
    <div className="mt-lg text-center">
      <p className="text-body-md text-on-surface-variant">
        Confidential system access.{' '}
        <a className="text-secondary text-label-lg font-medium ml-xs hover:underline" href="#">
          Support Center
        </a>
      </p>
      <p className="mt-sm text-body-md text-on-surface-variant">
        New to WealthLedger?{' '}
        <Link className="text-secondary font-semibold ml-xs hover:underline" href="/register">
          Create Account
        </Link>
      </p>
    </div>
  );
}
