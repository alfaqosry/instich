'use client';

import { useEffect, useState } from 'react';

export default function ContactConfigPage() {
  const [form, setForm] = useState({
    address: '',
    phone: '',
    email: '',
    website: '',
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/kontak')
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

    await fetch('/api/kontak', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setSaved(true);
  };

  return (
    <div className="comp-section" id="forms">
      <div className="comp-section-heading">Pengaturan Kontak</div>
      <div className="comp-section-sub">
        Pengaturan informasi kontak website
      </div>
      <div className="comp-divider"></div>

      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div className="card-title">Pengaturan Kontak</div>
            <div className="card-subtitle">
              Edit Informasi Kontak
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
                Alamat <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fas fa-map-marker-alt input-icon"></i>
                <input
                  type="text"
                  name="address"
                  className="field-input"
                  placeholder="Contoh: Scientific Portals"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* PHONE */}
            <div className="field form-full">
              <label className="field-label">
                No Telepon/WA <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fas fa-phone input-icon"></i>
                <input
                  type="text"
                  name="phone"
                  className="field-input"
                  placeholder="No Telepon/WA"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* email */}
            <div className="field form-full">
              <label className="field-label">
                Email <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  name="email"
                  className="field-input"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
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