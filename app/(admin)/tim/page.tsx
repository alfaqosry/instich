'use client';

import { useEffect, useState } from 'react';

type Team = {
  id: number;
  name: string;
  role: string;
  image: string;
  order: number;
};

export default function TeamPage() {
  const [data, setData] = useState<Team[]>([]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: '',
    role: '',
    order: 0,
    image: null as File | null,
  });

  // ================= FETCH =================
  const fetchData = async () => {
    const res = await fetch('/api/tim');
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= INPUT TEXT =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= FILE =================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      name: '',
      role: '',
      order: 0,
      image: null,
    });
  };

  // ================= CREATE =================
  const handleCreate = async () => {
    const fd = new FormData();

    fd.append('name', form.name);
    fd.append('role', form.role);
    fd.append('order', String(form.order));

    if (form.image) {
      fd.append('image', form.image);
    }

    await fetch('/api/tim', {
      method: 'POST',
      body: fd,
    });

    setOpenCreate(false);
    resetForm();
    fetchData();
  };

  // ================= OPEN EDIT =================
  const openEditModal = (item: Team) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      role: item.role,
      order: item.order,
      image: null,
    });
    setOpenEdit(true);
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    const fd = new FormData();

    fd.append('name', form.name);
    fd.append('role', form.role);
    fd.append('order', String(form.order));

    if (form.image) {
      fd.append('image', form.image);
    }

    await fetch(`/api/tim/${editId}`, {
      method: 'PUT',
      body: fd,
    });

    setOpenEdit(false);
    resetForm();
    fetchData();
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Hapus member ini?');
    if (!confirm) return;

    await fetch(`/api/tim/${id}`, {
      method: 'DELETE',
    });

    fetchData();
  };

  return (
    <div className="content-inner">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-20">
        <div>
          <h2 className="page-title">Team Management</h2>
          <p className="page-sub">Kelola anggota tim jurnal</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setOpenCreate(true)}
        >
          + Add Team
        </button>
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="card-body">

          <table width="100%" className="table-tpi">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Role</th>
                <th>Order</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((t) => (
                <tr key={t.id}>
                  <td>
                    <img
                      src={t.image}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        objectFit: 'cover',
                      }}
                    />
                  </td>

                  <td>{t.name}</td>
                  <td>{t.role}</td>
                  <td>{t.order}</td>

                  <td style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-ghost"
                      onClick={() => openEditModal(t)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(t.id)}
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
                <div className="card-title">Add Team</div>
                <div className="card-subtitle">Tambah anggota baru</div>
              </div>
            </div>

            <div className="card-body form-grid">

              <input
                name="name"
                className="field-input"
                placeholder="Name"
                onChange={handleChange}
              />

              <input
                name="role"
                className="field-input"
                placeholder="Role"
                onChange={handleChange}
              />

              <input
                name="order"
                type="number"
                className="field-input"
                placeholder="Order"
                onChange={handleChange}
              />

              <input
                type="file"
                className="field-input"
                onChange={handleFileChange}
              />

            </div>

            <div className="card-footer justify-between">
              <button
                className="btn btn-ghost"
                onClick={() => setOpenCreate(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleCreate}
              >
                Save
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
                <div className="card-title">Edit Team</div>
                <div className="card-subtitle">Update data anggota</div>
              </div>
            </div>

            <div className="card-body form-grid">

              <input
                name="name"
                value={form.name}
                className="field-input"
                onChange={handleChange}
              />

              <input
                name="role"
                value={form.role}
                className="field-input"
                onChange={handleChange}
              />

              <input
                name="order"
                type="number"
                value={form.order}
                className="field-input"
                onChange={handleChange}
              />

              <input
                type="file"
                className="field-input"
                onChange={handleFileChange}
              />

            </div>

            <div className="card-footer justify-between">
              <button
                className="btn btn-ghost"
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}