import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: null,
    status: true,
  });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await api.get("/banners");
    setBanners(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (id, status) => {
    await api.patch(`/banners/${id}/status`, { status });
    load();
  };

  const save = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("status", String(form.status));
    if (form.image) fd.append("image", form.image);

    if (editId) {
      await api.patch(`/banners/${editId}`, fd);
    } else {
      await api.post("/banners", fd);
    }

    setForm({ title: "", image: null, status: true });
    setEditId(null);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <h2 className="text-center text-3xl font-bold text-gray-800 py-8 mb-10 bg-amber-200 rounded">
        Banner Admin
      </h2>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow mb-10 space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="w-full border-dashed border-2 border-gray-400 rounded px-2 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.checked })}
            className="h-4 w-4"
          />
          <span className="text-gray-700 font-medium">Active</span>
        </div>

        <button
          onClick={save}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            editId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editId ? "Update Banner" : "Create Banner"}
        </button>
      </div>

      {/* BANNER LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {banners.map((b) => (
          <div key={b.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img
              src={`https://ecommerce-backend-alnr.onrender.com${b.image}`}
              alt={b.title}
              className="rounded mb-3 h-48 w-full object-cover transition-transform hover:scale-105"
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{b.title}</h3>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={b.status}
                onChange={(e) => toggleStatus(b.id, e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-gray-700 text-sm">Active</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setForm(b);
                  setEditId(b.id);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => api.delete(`/banners/${b.id}`).then(load)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}