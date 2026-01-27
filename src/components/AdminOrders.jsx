import { useState } from "react";
import axios from "axios";
import { api } from "../services/api";
import { toast, ToastContainer } from "react-toastify";

export default function AdminOrders() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!email) {
      alert("Enter customer email");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/orders/user/${email}`);
      setOrders(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "User not found or no orders");
      setOrders([]);
    }
    setLoading(false);
  };

const updateStatus = async (orderId, status) => {
  if (!orderId) {
    alert("Order ID missing");
    return;
  }

  try {
    await api.patch(`/orders/${orderId}/status`, {
      status,
    });

    alert("Order status updated successfully");

    // Update UI immediately
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId ? { ...o, status } : o
      )
      
    );
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Failed to update status");
  }
  fetchOrders();
};

const deleteOrder = async (orderId) => {
  try {
    await api.delete(`/orders/${orderId}`);
    toast.success("deleted")

    setOrders(prev =>
      prev.filter(order => order.id !== orderId)
    );
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Failed to delete order");
  }
  fetchOrders();
};

  return (
    <div className="p-6">
      <ToastContainer/>
      <h1 className="text-2xl font-bold mb-4">Admin Order CMS</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="email"
          placeholder="Enter customer email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-80"
        />
        <button
          onClick={fetchOrders}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Search Orders
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {orders.length > 0 && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Items</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.orderId} className="border">
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">₹{order.totalAmount}</td>
                <td className="border p-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>

                <td className="border p-2">
                  <select
                    value={order.status || "PENDING"}
                    onChange={e =>
                      updateStatus(order.orderId, e.target.value)
                    }
                    className="border p-1"
                  >
                    <option value="PENDING">Not Delivered</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                </td>

                <td className="border p-2">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.title} × {item.quantity}
                    </div>
                  ))}
                </td>

                <td className="border p-2">
                  <button
                    onClick={() => deleteOrder(order.orderId)}
                    className="bg-red-600 text-white px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}