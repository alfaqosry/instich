'use client';

import { useEffect, useState } from 'react';

export default function SiteConfigPage() {
  const [form, setForm] = useState({
    heroTitle: '',
    heroSubtitle: '',
    deskripsi: '',
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/site-config')
      .then(res => res.json())
      .then(data => {
        if (data) setForm(data);
      });
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSaved(false);
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await fetch('/api/site-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setSaved(true);
  };

  return (
    <div className="comp-section" id="forms">
      <div className="comp-section-heading">Pengatura Website</div>
      <div className="comp-section-sub">
        Pengaturan tampilan utama website
      </div>
      <div className="comp-divider"></div>

      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div className="card-title">Pengaturan Website</div>
            <div className="card-subtitle">
              Edit Hero Title, Subtitle, dan Deskripsi
            </div>
          </div>
        </div>

        <form className="card-body" onSubmit={handleSubmit}>

          {/* INFO ALERT */}
          <div className="form-alert alert-info mb-16">
            <i className="fas fa-circle-info"></i>
            <span>
              Perubahan akan langsung tampil di halaman utama website.
            </span>
          </div>

          <div className="form-grid">

            {/* HERO TITLE */}
            <div className="field form-full">
              <label className="field-label">
                Hero Title <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fas fa-heading input-icon"></i>
                <input
                  type="text"
                  name="heroTitle"
                  className="field-input"
                  placeholder="Contoh: Scientific Portals"
                  value={form.heroTitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* HERO SUBTITLE */}
            <div className="field form-full">
              <label className="field-label">
                Hero Subtitle <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fas fa-align-left input-icon"></i>
                <input
                  type="text"
                  name="heroSubtitle"
                  className="field-input"
                  placeholder="Subjudul website"
                  value={form.heroSubtitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* DESKRIPSI */}
            <div className="field form-full">
              <label className="field-label">
                Deskripsi <span className="req">*</span>
              </label>
              <textarea
                name="deskripsi"
                className="field-textarea"
                placeholder="Deskripsi singkat website..."
                value={form.deskripsi}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="divider-text">Konfirmasi</div>

          {/* ALERT STATUS */}
          {saved && (
            <div className="form-alert alert-success">
              <i className="fas fa-circle-check"></i>
              <span>Berhasil disimpan!</span>
            </div>
          )}

          {/* BUTTON */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-md" disabled={loading}>
              <i className="fas fa-save"></i>
              <div className="btn-spinner"></div>
              <span className="btn-label">
                {loading ? 'Menyimpan...' : 'Simpan'}
              </span>
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-md"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}