import { useEffect, useState } from "react";
import { api } from "./services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const otpToken = sessionStorage.getItem("otpToken");
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    if (!otpToken || !username) {
      toast.error("Unauthorized access");
      navigate("/forgot-password");
    }
  }, [otpToken, username, navigate]);

  /* ---------------- RESET PASSWORD ---------------- */
  const resetPassword = async () => {
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirm) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      await api.post("/reset/reset-password", {
        username,
        otpToken,
        newPassword: password,
      });

      toast.success("Password reset successful");
      sessionStorage.clear();
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />

      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        {/* PASSWORD */}
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type={show ? "text" : "password"}
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRM PASSWORD */}
        <label className="block mb-1 font-medium">Confirm Password</label>
        <input
          type={show ? "text" : "password"}
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
          placeholder="Re-enter new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {/* SHOW PASSWORD */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={show}
            onChange={() => setShow(!show)}
          />
          <span className="text-sm text-gray-600">Show password</span>
        </div>

        {/* SUBMIT */}
        <button
          onClick={resetPassword}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}