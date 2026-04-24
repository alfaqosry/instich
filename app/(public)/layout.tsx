import '../../public/asset/asset/index.css';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
// 1. Gunakan generateMetadata untuk ambil data DB buat Title/Description
export async function generateMetadata(): Promise<Metadata> {
  const config = await prisma.siteConfig.findUnique({
    where: { id: 1 },
  });

  return {
    title: config ? `${config.heroTitle} - ${config.heroSubtitle}` : "Loading...",
    description: config?.deskripsi || "Default description",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Ambil data di dalam Layout tetap diperbolehkan
  const config = await prisma.siteConfig.findUnique({
    where: { id: 1 },
  });

  const kontak = await prisma.contactConfig.findUnique({
    where: { id: 1 },
  });

  

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-left">
            <span><i className="fas fa-map-marker-alt"></i> {kontak?.address}</span>
            <span><i className="fas fa-envelope"></i> {kontak?.email}</span>
             <span><i className="fas fa-phone"></i> {kontak?.phone}</span>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="navbar" id="navbar">
        <div className="wrap">
          <a href="#" className="nav-brand">
            <div className="nav-logo">T</div>
            <div className="nav-brand-text">
              {/* 🔥 pakai dari DB */}
              <strong>{config?.heroTitle}</strong>
              <small>{config?.heroSubtitle}</small>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#about">Tentang</a>
            <a href="#journals">Jurnal</a>
            <a href="#team">Editorial</a>
          </nav>

          <div className="nav-cta">
            <a href="#journals" className="btn btn-outline btn-sm">Jelajahi</a>
            <a href="/dashboard" className="btn btn-solid btn-sm">
              <i className="fas fa-gauge"></i> Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      {children}

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-name">{config?.heroTitle}</div>

              {/* 🔥 pakai deskripsi dari DB */}
              <p className="footer-brand-desc">
                {config?.deskripsi}
              </p>
            </div>

            <div>
              <div className="footer-col-title">Navigasi</div>
              <a href="#about" className="footer-lnk">Tentang Kami</a>
              <a href="#journals" className="footer-lnk">Jurnal</a>
              <a href="#team" className="footer-lnk">Editorial</a>
            </div>

            <div>
              <div className="footer-col-title">Bantuan</div>
              <a href="#" className="footer-lnk">Kebijakan Etik</a>
              <a href="#" className="footer-lnk">Panduan Penulis</a>
              <a href="#" className="footer-lnk">FAQ</a>
            </div>

            <div>
              <div className="footer-col-title">Sekretariat</div>
              <div className="footer-contact">
                <i className="fas fa-map-marker-alt"></i>
                <span>{kontak?.address}</span>
              </div>
              <div className="footer-contact">
                <i className="fas fa-envelope"></i>
                <span>{kontak?.email}</span>
              </div>
              <div className="footer-contact">
                <i className="fas fa-phone"></i>
                <span>{kontak?.phone}</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 {config?.heroTitle}</span>
          </div>
        </div>
      </footer>
    </>
  );
}