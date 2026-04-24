export default function AboutSection({ data }: { data: any }) {
  return (
    <section id="about">
        <div className="about-glass-panel">
            <div className="row align-items-center g-5">
                <div className="col-lg-6">
                    <span className="about-badge">About the House</span>
                    {/* DATA DARI DATABASE */}
                    <h2 className="about-title">{data.title}</h2>
                    <p className="lead opacity-75 mb-4">{data.description}</p>
                    <div className="mt-5"><a href="#journal" className="btn-journal">Eksplorasi Jurnal</a></div>
                </div>
                <div className="col-lg-6">
                    <div className="row g-4">
                        <div className="col-6"><div className="stat-box"><span className="stat-number">{data.journalCount}+</span><span className="stat-label">Journals</span></div></div>
                        <div className="col-6"><div className="stat-box" style={{marginTop:'30px'}}><span className="stat-number">{data.articleCount}+</span><span className="stat-label">Articles</span></div></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}