"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Tutup sidebar saat resize ke desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Kunci scroll body saat sidebar terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose  = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Overlay — tap untuk tutup sidebar */}
      {isOpen && (
        <div
          className="sidebar-overlay active"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <div className="dashboard-layout">
        {/* Sidebar terima state dari sini */}
        <Sidebar isOpen={isOpen} onClose={handleClose} />

        <div className="content-area">
          {/* Topbar terima fungsi toggle dari sini */}
          <Topbar onBurgerClick={handleToggle} isOpen={isOpen} />

          <main className="content-inner">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
