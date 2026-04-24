"use client";
import React from 'react';

export default function DashboardPage() {
  // Data Statis (Nanti ini yang bakal kita hubungkan ke Database/Prisma)
  const stats = [
    { id: 1, label: "Total Artikel", value: "1,284", icon: "fa-newspaper", trend: "+12% bulan ini", trendClass: "up" },
    { id: 2, label: "Pending Reviews", value: "42", icon: "fa-clock", trend: "Butuh tindakan", trendClass: "warn" },
    { id: 3, label: "Total Unduhan", value: "8.5k", icon: "fa-download", trend: "+5% dari kemarin", trendClass: "up" },
    { id: 4, label: "System Status", value: "Active", icon: "fa-circle-check", trend: "Optimized", trendClass: "highlight" },
  ];

  const recentSubmissions = [
    { id: 1, title: "Penerapan AI dalam Pendidikan Indonesia", author: "Budi Santoso", journal: "ANTHOR Journal", status: "In Review", statusClass: "review" },
    { id: 2, title: "Analisis Ekonomi Digital Pasca Pandemi", author: "Siti Aminah", journal: "Pesona Indonesia", status: "Published", statusClass: "published" },
    { id: 3, title: "Studi Kasus Green Energy di Riau", author: "Andi Wijaya", journal: "Indo Green Journal", status: "Pending", statusClass: "pending" },
    { id: 4, title: "Transformasi Digital UMKM Sumatera", author: "Rina Kurniawati", journal: "Jurnal Dedikasi", status: "In Review", statusClass: "review" },
  ];

  return (
    <>
      {/* 1. STAT CARDS GRID */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.id} className={`stat-card ${s.trendClass === 'highlight' ? 'highlight' : ''}`}>
            <div className="stat-card-icon">
              <i className={`fas ${s.icon}`}></i>
            </div>
            <div className="stat-card-label">{s.label}</div>
            <div className="stat-card-value">{s.value}</div>
            <div className={`stat-card-trend ${s.trendClass}`}>
              {s.trendClass === 'warn' ? (
                <i className="fas fa-triangle-exclamation" style={{ fontSize: '0.65rem', marginRight: '4px' }}></i>
              ) : (
                <i className="fas fa-arrow-up" style={{ fontSize: '0.65rem', marginRight: '4px' }}></i>
              )}
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* 2. RECENT SUBMISSIONS TABLE */}
      <div className="table-card">
        <div className="table-card-header">
          <div className="table-card-title">Recent Submissions</div>
          <button className="btn-ghost-tpi">Lihat Semua</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table-tpi">
            <thead>
              <tr>
                <th>Judul Artikel</th>
                <th>Penulis</th>
                <th>Jurnal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="td-article-title">{item.title}</div>
                  </td>
                  <td className="td-author">{item.author}</td>
                  <td className="td-journal">{item.journal}</td>
                  <td>
                    <span className={`badge-tpi ${item.statusClass}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-ghost-tpi">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}