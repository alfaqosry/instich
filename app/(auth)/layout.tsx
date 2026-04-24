import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk — TPI Jurnal',
  description: 'Masuk ke panel admin TPI Jurnal',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <div className="auth-container">
      {children}
    </div>
  );
}