import { useEffect, useState } from "react";
import { api } from "./services/api";
import { useNavigate } from "react-router-dom";

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const loadAdmins = async () => {
    const res = await api.get("/admin");
    setAdmins(res.data);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const createAdmin = async () => {
    await api.post("/admin/create", form);
    setForm({ username: "", password: "" });
    loadAdmins();
  };

  const removeAdmin = async (id) => {
    if (!window.confirm("Delete admin?")) return;
    await api.delete(`/admin/${id}`);
    loadAdmins();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-amber-200 flex items-center  justify-between px-6 py-4 shadow">
        <h2 className="text-3xl font-bold ml-150 font-serif">Manage Admins</h2>
        <button
          onClick={logout}
          className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {/* CREATE ADMIN FORM */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-8">
        <h3 className="text-lg font-semibold mb-4">Create New Admin</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button
          onClick={createAdmin}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Admin
        </button>
      </div>

      {/* ADMIN LIST */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-300">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((a) => (
              <tr
                key={a.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{a.id}</td>
                <td className="p-3">{a.username}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeAdmin(a.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {admins.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-500"
                >
                  No admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}