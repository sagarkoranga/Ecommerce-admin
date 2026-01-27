import { useEffect, useState } from "react";
import {api} from "../services/api";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  // ---------------- FETCH ----------------
  const loadContacts = async () => {
    const res = await api.get("/contact");
    setContacts(res.data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // ---------------- FORM ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      phone: "",
      email: "",
      address: "",
      latitude: "",
      longitude: "",
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    if (editing) {
      await api.put(`/contact/${editing.id}`, payload);
    } else {
      await api.post("/contact", payload);
    }

    resetForm();
    loadContacts();
  };

  const editContact = (c) => {
    setEditing(c);
    setForm({
      phone: c.phone || "",
      email: c.email || "",
      address: c.address || "",
      latitude: c.latitude || "",
      longitude: c.longitude || "",
    });
  };

  // ---------------- ACTIONS ----------------
  const toggleStatus = async (id, status) => {
    await api.patch(`/contact/${id}/status`, { status });
    loadContacts();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await api.delete(`/contact/${id}`);
    loadContacts();
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact CMS</h1>

      {/* FORM */}
      <form
        onSubmit={submit}
        className="bg-white shadow-lg rounded-xl p-5 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Update Contact" : "Add New Contact"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="latitude"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="longitude"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
          rows="3"
        />

        <div className="mt-4 flex gap-3">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            {editing ? "Update" : "Save"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="border px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Lat</th>
              <th className="p-3">Lng</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.address}</td>
                <td className="p-3">{c.latitude}</td>
                <td className="p-3">{c.longitude}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      c.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => editContact(c)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => toggleStatus(c.id, !c.status)}
                    className="text-green-600 hover:underline"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() => remove(c.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!contacts.length && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-400">
                  No contacts added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}