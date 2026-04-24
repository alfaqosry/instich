"use client";

interface TopbarProps {
  onBurgerClick: () => void;
  isOpen: boolean;
}

export default function Topbar({ onBurgerClick, isOpen }: TopbarProps) {
  return (
    <div className="content-topbar">
      <div className="topbar-left-group">

        {/* Burger button — dikontrol via props dari DashboardShell */}
        <button
          className={`burger-btn${isOpen ? " active" : ""}`}
          onClick={onBurgerClick}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
        >
          <span className="burger-bar" />
          <span className="burger-bar" />
          <span className="burger-bar" />
        </button>

        <div>
          <div className="page-title">Overview</div>
          <div className="page-sub">Selamat datang kembali, Admin Jurnal.</div>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="topbar-notif" title="Notifikasi">
          <i className="far fa-bell" />
        </div>
        <img
          src="https://ui-avatars.com/api/?name=Admin+TPI&background=1a56db&color=ffffff&size=72"
          className="topbar-avatar"
          alt="Admin Avatar"
        />
      </div>
    </div>
  );
}
