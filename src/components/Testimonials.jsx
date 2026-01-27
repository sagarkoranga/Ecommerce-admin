import axios from "axios";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: null,
    message: "",
    status: true,
  });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await axios.get("https://ecommerce-backend.onrender.com/testimonials");
    setTestimonials(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (id, status) => {
    await axios.patch(`https://ecommerce-backend.onrender.com/testimonials/${id}/status`, { status });
    load();
  };

  const save = async () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("message", form.message);
    fd.append("status", String(form.status));
    if (form.image) fd.append("image", form.image);

    if (editId) {
      await axios.patch(`https://ecommerce-backend.onrender.com/testimonials/${editId}`, fd);
    } else {
      await axios.post("https://ecommerce-backend.onrender.com/testimonials", fd);
    }

    setForm({ name: "", message: "", image: null, status: true });
    setEditId(null);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-center bg-amber-200 py-6 rounded mb-10">
        Testimonials Management
      </h2>

      {/* FORM */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mb-12">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? "Edit Testimonial" : "Add New Testimonial"}
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Customer Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border p-2 rounded h-24"
          />

          <input
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="w-full border border-dashed p-2 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.checked })}
            />
            Active
          </label>

          <button
            onClick={save}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {editId ? "Update Testimonial" : "Create Testimonial"}
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="max-w-7xl mx-auto grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-4  rounded-lg shadow hover:shadow-lg transition"
          >
            <img
            
              src={`https://ecommerce-backend.onrender.com${t.image}`}
              alt={t.name}
              className="h-120 w-full object-cover rounded mb-3"
            />

            <h4 className="font-semibold text-lg">{t.name}</h4>
            <p className="text-gray-600 text-sm mb-3">{t.message}</p>

            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={t.status}
                onChange={(e) => toggleStatus(t.id, e.target.checked)}
              />
              Active
            </label>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setForm(t);
                  setEditId(t.id);
                }}
                className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  axios
                    .delete(`http://localhost:3000/testimonials/${t.id}`)
                    .then(load)
                }
                className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700"
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
