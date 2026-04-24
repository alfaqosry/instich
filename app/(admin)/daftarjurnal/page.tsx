'use client';

import { useEffect, useState } from 'react';

type Journal = {
    id: number;
    name: string;
    description: string;
    icon: string;
    link: string;
    order: number;
};

export default function DaftarJurnalPage() {
    const [journals, setJournals] = useState<Journal[]>([]);

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [id, setEditId] = useState<number | null>(null);

    const [form, setForm] = useState({
        name: '',
        description: '',
        icon: '',
        link: '',
        order: 0,
    });

    // ================= FETCH =================
    const fetchData = async () => {
        const res = await fetch('/api/daftarjurnal');
        const data = await res.json();
        setJournals(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ================= RESET FORM =================
    const resetForm = () => {
        setForm({
            name: '',
            description: '',
            icon: '',
            link: '',
            order: 0,
        });
    };

    // ================= CREATE =================
    const handleCreate = async () => {
        await fetch('/api/daftarjurnal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        setOpenCreate(false);
        resetForm();
        fetchData();
    };

    // ================= OPEN EDIT =================
    const openEditModal = (item: Journal) => {
        setEditId(item.id);
        setForm(item);
        setOpenEdit(true);
    };

    // ================= UPDATE =================
    const handleUpdate = async () => {
        if (!id) return alert('ID tidak ditemukan');

        await fetch(`/api/daftarjurnal/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        setOpenEdit(false);
        resetForm();
        fetchData();
    };

    // ================= DELETE =================
    const handleDelete = async (id: number) => {
        const confirm = window.confirm('Yakin hapus jurnal ini?');
        if (!confirm) return;

        await fetch(`/api/daftarjurnal/${id}`, {
            method: 'DELETE',
        });

        fetchData();
    };

    return (
        <div style={{ padding: 20 }}>

            {/* ================= HEADER ================= */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Daftar Jurnal</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => setOpenCreate(true)}
                >
                    + Tambah Jurnal
                </button>
            </div>

            {/* ================= TABLE ================= */}
            <div className="card" style={{ marginTop: 20 }}>
                <div className="card-body">

                    <table width="100%">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Icon</th>
                                <th>Link</th>
                                <th>Order</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {journals.map(j => (
                                <tr key={j.id}>
                                    <td>{j.name}</td>
                                    <td><i className={`fas ${j.icon}`}></i></td>
                                    <td>{j.link}</td>
                                    <td>{j.order}</td>
                                    <td style={{ display: 'flex', gap: 8 }}>

                                        <button
                                            className="btn btn-ghost"
                                            onClick={() => openEditModal(j)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(j.id)}
                                        >
                                            Hapus
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>

            {/* ================= CREATE MODAL ================= */}
            {openCreate && (
                <div className="modal-backdrop">
                    <div className="modal">

                        <div className="card-header">
                            <div>
                                <div className="card-title">Tambah Journal</div>
                                <div className="card-subtitle">Buat jurnal baru</div>
                            </div>
                        </div>

                        <div className="card-body">

                            <div className="form-grid">

                                <div className="field">
                                    <label className="field-label">Nama</label>
                                    <input
                                        name="name"
                                        className="field-input"
                                        placeholder="Nama jurnal"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field">
                                    <label className="field-label">Icon</label>
                                    <input
                                        name="icon"
                                        className="field-input"
                                        placeholder="fas fa-book"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field form-full">
                                    <label className="field-label">Link</label>
                                    <input
                                        name="link"
                                        className="field-input"
                                        placeholder="https://..."
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field">
                                    <label className="field-label">Order</label>
                                    <input
                                        name="order"
                                        type="number"
                                        className="field-input"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field form-full">
                                    <label className="field-label">Deskripsi</label>
                                    <textarea
                                        name="description"
                                        className="field-textarea"
                                        placeholder="Deskripsi jurnal"
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="card-footer justify-between">

                            <button className="btn btn-ghost" onClick={() => setOpenCreate(false)}>
                                Batal
                            </button>

                            <button className="btn btn-primary" onClick={handleCreate}>
                                Simpan
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* ================= EDIT MODAL ================= */}
            {openEdit && (
                <div className="modal-backdrop">
                    <div className="modal">

                        <div className="card-header">
                            <div>
                                <div className="card-title">Edit Journal</div>
                                <div className="card-subtitle">Perbarui data jurnal</div>
                            </div>
                        </div>

                        <div className="card-body">

                            <div className="form-grid">

                                <div className="field">
                                    <label className="field-label">Nama</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        className="field-input"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field">
                                    <label className="field-label">Icon</label>
                                    <input
                                        name="icon"
                                        value={form.icon}
                                        className="field-input"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field form-full">
                                    <label className="field-label">Link</label>
                                    <input
                                        name="link"
                                        value={form.link}
                                        className="field-input"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field">
                                    <label className="field-label">Order</label>
                                    <input
                                        name="order"
                                        type="number"
                                        value={form.order}
                                        className="field-input"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field form-full">
                                    <label className="field-label">Deskripsi</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        className="field-textarea"
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="card-footer justify-between">

                            <button className="btn btn-ghost" onClick={() => setOpenEdit(false)}>
                                Batal
                            </button>

                            <button className="btn btn-primary" onClick={handleUpdate}>
                                Update
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}