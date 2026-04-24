'use client';

import { useEffect, useState } from 'react';

export default function AboutConfigPage() {
    const [form, setForm] = useState({
        content: '',
        history: '',

    });

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch('/api/tentang')
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

        await fetch('/api/tentang', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        setLoading(false);
        setSaved(true);
    };

    return (
        <div className="comp-section" id="forms">
            <div className="comp-section-heading">Mengenai Web</div>
            <div className="comp-section-sub">
                Masukan konten untuk halaman tentang web
            </div>
            <div className="comp-divider"></div>

            <div className="card mb-20">
                <div className="card-header">
                    <div>
                        <div className="card-title">Mengenai Web</div>
                        <div className="card-subtitle">
                            Edit konten halaman tentang web
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


                        {/* DESKRIPSI */}
                        <div className="field form-full">
                            <label className="field-label">
                                Content <span className="req">*</span>
                            </label>
                            <textarea
                                name="content"
                                className="field-textarea"
                                placeholder="Content website..."
                                value={form.content}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field form-full">
                            <label className="field-label">
                                History <span className="req">*</span>
                            </label>
                            <textarea
                                name="history"
                                className="field-textarea"
                                placeholder="Sejarah website..."
                                value={form.history}
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