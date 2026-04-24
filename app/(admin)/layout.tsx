// layout.tsx — Server Component (tidak perlu "use client")
 import DashboardShell from './_components/DashboardShell';
import '../../public/asset/asset/style.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // DashboardShell mengelola semua state burger di dalamnya
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
