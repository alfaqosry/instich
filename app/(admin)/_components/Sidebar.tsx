"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `sidebar-link${pathname === href ? " active" : ""}`;

  return (
    <aside className={`sidebar${isOpen ? " open" : ""}`}>

      {/* Tombol X — hanya tampil di mobile via CSS */}
      <button
        className="sidebar-close"
        onClick={onClose}
        aria-label="Tutup menu"
      >
        <i className="fas fa-xmark" />
      </button>

      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">I</div>
        <div>
          <div className="sidebar-brand-name">Instich Panel</div>
          <div className="sidebar-brand-sub">Admin Console</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Menu</div>

        <Link href="/dashboard" className={linkClass("/dashboard")} onClick={onClose}>
          <i className="fas fa-gauge" />
          <span>Dashboard</span>
        </Link>

        <Link href="/daftarjurnal" className={linkClass("/daftarjurnal")} onClick={onClose}>
          <i className="fas fa-file-invoice" />
          <span>Daftar Jurnal</span>
        </Link>

        <Link href="/tim" className={linkClass("/tim")} onClick={onClose}>
          <i className="fas fa-users" />
          <span>Tim</span>
        </Link>

        <div className="sidebar-nav-label" style={{ marginTop: "8px" }}>
          Sistem
        </div>

        <Link href="/tentang" className={linkClass("/tentang")} onClick={onClose}>
          <i className="fas fa-circle-info" />
          <span>Tentang</span>
        </Link>

        <Link href="/kontak" className={linkClass("/kontak")} onClick={onClose}>
          <i className="fas fa-map-marker-alt" />
          <span>Kontak &amp; Alamat</span>
        </Link>

        <Link href="/setting" className={linkClass("/setting")} onClick={onClose}>
          <i className="fas fa-gear" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <Link href="/" className="sidebar-back" onClick={onClose}>
          <i className="fas fa-arrow-left" />
          <span>Kembali ke Situs</span>
        </Link>
      </div>
    </aside>
  );
}
