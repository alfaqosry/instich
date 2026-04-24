"use client";

import { useEffect } from "react";

type Journal = {
    id: number;
    name: string;
    description: string;
    icon: string;
    link: string;
};

type Team = {
    id: number;
    name: string;
    role: string;
    image: string;
    order: number;
};

type About = {
    id: number;
    content: string;
    history: string;
};

export default function LandingClient({
    journals,
    team,
    about,
}: {
    journals: Journal[];
    team: Team[];
    about: About | null;
}) {
    useEffect(() => {
        const revealEls = document.querySelectorAll(".jcard, .pillar, .tcard");

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    (e.target as HTMLElement).style.opacity = "1";
                    (e.target as HTMLElement).style.transform = "translateY(0)";
                    obs.unobserve(e.target);
                }
            });
        });

        revealEls.forEach((el) => {
            const node = el as HTMLElement;
            node.style.opacity = "0";
            node.style.transform = "translateY(20px)";
            node.style.transition = "0.5s ease";
            obs.observe(node);
        });
    }, []);

    return (
        <main>
            {/* TOPBAR & NAVBAR (Sesuai desain kamu) */}


            {/* HERO SECTION */}
            <section className="hero">

                <div className="wrap">
                    <div className="hero-inner">
                        <div className="hero-left">
                            <div className="hero-badge fade-up">
                                <span className="dot"><i className="fas fa-star"></i></span>
                                Platform Open Access
                            </div>
                            <h1 className="hero-title fade-up">Menjembatani Ilmu,<br /><em>Membangun Bangsa.</em></h1>
                            <p className="hero-desc">Rumah Jurnal ini adalah platform publikasi ilmiah terbuka...</p>
                            <div className="hero-actions">
                                <a href="#journals" className="btn btn-solid">Jelajahi Jurnal</a>
                            </div>
                        </div>
                        {/* Visual Stats */}
                        <div className="hero-visual fade-up fade-up-3">
                            <div className="hero-visual-tag">Live Stats</div>

                            <div className="hero-stat-grid">
                                <div className="hero-stat-box">
                                    <div className="hero-stat-num">12+</div>
                                    <div className="hero-stat-lbl">Jurnal Aktif</div>
                                </div>
                                <div className="hero-stat-box accent">
                                    <div className="hero-stat-num">500+</div>
                                    <div className="hero-stat-lbl">Artikel Terbit</div>
                                </div>
                                <div className="hero-stat-box">
                                    <div className="hero-stat-num">8.5k</div>
                                    <div className="hero-stat-lbl">Total Unduhan</div>
                                </div>
                                <div className="hero-stat-box">
                                    <div className="hero-stat-num">42</div>
                                    <div className="hero-stat-lbl">Reviewer Aktif</div>
                                </div>
                            </div>

                            <div className="hero-status-row">
                                <span className="hero-status-label">
                                    <i className="fas fa-circle" style={{ color: '#16a34a', fontSize: '0.55rem', marginRight: '6px' }}></i>
                                    Sistem Repositori Online
                                </span>
                                <span className="pill-green">Aktif</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about" id="about">
                <div className="wrap">
                    <div className="about-inner">
                        <div>
                            <div className="section-label">
                                <i className="fas fa-circle-info"></i> Tentang Kami
                            </div>
                            <h2 className="section-title">
                                Rigor Editorial,<br />
                                <em>Akses Terbuka.</em>
                            </h2>

                            {/* 2. Tampilkan CONTENT dari database */}
                            <div className="section-body" style={{ whiteSpace: 'pre-line' }}>
                                {about?.content || "Memuat informasi tentang kami..."}
                            </div>

                            {/* 3. Tampilkan HISTORY dari database */}
                            {about?.history && (
                                <>
                                    <div className="section-label" style={{ marginTop: '2rem' }}>
                                        <i className="fas fa-history"></i> Sejarah Kami
                                    </div>
                                    <div className="section-body" style={{ whiteSpace: 'pre-line' }}>
                                        {about.history}
                                    </div>
                                </>
                            )}

                            <div className="about-cta">
                                <a href="#journals" className="btn btn-solid">
                                    <i className="fas fa-arrow-right"></i> Lihat Semua Jurnal
                                </a>
                            </div>
                        </div>

                        <div className="about-pillars">
                            <div className="pillar">
                                <div className="pillar-icon"><i className="fas fa-shield-halved"></i></div>
                                <div>
                                    <div className="pillar-title">Standar Editorial Ketat</div>
                                    <div className="pillar-desc">Setiap manuskrip melalui proses double-blind peer-review oleh pakar bidang terkait.</div>
                                </div>
                            </div>
                            <div className="pillar">
                                <div className="pillar-icon"><i className="fas fa-globe"></i></div>
                                <div>
                                    <div className="pillar-title">Open Access Penuh</div>
                                    <div className="pillar-desc">Seluruh artikel dapat diakses secara bebas oleh peneliti di seluruh dunia tanpa biaya berlangganan.</div>
                                </div>
                            </div>
                            <div className="pillar">
                                <div className="pillar-icon"><i className="fas fa-bolt"></i></div>
                                <div>
                                    <div className="pillar-title">Repositori Digital Modern</div>
                                    <div className="pillar-desc">Infrastruktur penyimpanan dan indeksasi canggih untuk visibilitas karya ilmiah yang optimal.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* JOURNALS SECTION (Dinamis dari Array) */}
            <section className="journals" id="journals">
                <div className="wrap">
                    <div className="section-header">
                        <div className="section-label">
                            <i className="fas fa-book"></i> Portal Ilmiah
                        </div>
                        <h2 className="section-title">Pilih Jurnal Anda</h2>
                    </div>
                    {journals.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <i className="fas fa-book-open"></i>
                            </div>

                            <div className="empty-state-title">
                                Jurnal masih kosong
                            </div>

                            <div className="empty-state-desc">
                                Belum ada jurnal yang tersedia saat ini.
                            </div>
                        </div>
                    ) : (
                        <div className="journals-grid">
                            {journals.map((j) => (
                                <div key={j.id} className="jcard">

                                    <div className="jcard-icon">
                                        <i className={`fas ${j.icon}`}></i>
                                    </div>

                                    <div className="jcard-name">{j.name}</div>
                                    <p className="jcard-desc">{j.description}</p>

                                    {/* 🔥 BUTTON LINK */}

                                    <a href={j.link} className="btn btn-solid">
                                        <i className="fas fa-arrow-right"></i> Buka
                                    </a>


                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </section>

            {/* TEAM SECTION */}
            <section className="team" id="team">
                <div className="wrap">
                    <div className="section-header">
                        <div className="section-label">
                            <i className="fas fa-users"></i> Dewan Redaksi
                        </div>
                        <h2 className="section-title">Board of Editors</h2>
                    </div>
                    <div className="team-grid">
                        {team.map((t) => (
                            <div key={t.id} className="tcard">
                                <img src={t.image} className="tcard-img" alt={t.name} />
                                <div className="tcard-name">{t.name}</div>
                                <div className="tcard-role">{t.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </main>
    );
}