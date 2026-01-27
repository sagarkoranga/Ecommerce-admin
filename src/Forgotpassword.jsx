import { useState, useRef } from "react";
import { api } from "./services/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showOtp, setShowOtp] = useState(false);

  const inputsRef = useRef([]);
  const navigate = useNavigate();

  /* ---------------- SEND OTP ---------------- */
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/reset/forgot-password", { username });
      setOtpSent(true);
      startTimer();
      toast.success("OTP sent successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- TIMER ---------------- */
  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  /* ---------------- OTP INPUT HANDLING ---------------- */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/reset/verify-otp", {
        username,
        otp: otp.join(""),
      });

      sessionStorage.setItem("otpToken", res.data.otpToken);
      sessionStorage.setItem("username", username);
      navigate("/resetpassword");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />

      <form className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        {/* USERNAME */}
        <label className="block mb-2 font-medium">Username / Email</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {!otpSent && (
          <button
            onClick={sendOtp}
            disabled={loading || !username}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {/* OTP SECTION */}
        {otpSent && (
          <>
            <div className="flex justify-between my-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type={showOtp ? "text" : "password"}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleBackspace(e, i)}
                  className="w-10 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>

            {/* SHOW / HIDE OTP */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={showOtp}
                onChange={() => setShowOtp(!showOtp)}
              />
              <span className="text-sm">Show OTP</span>
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading || otp.join("").length < 6}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* RESEND OTP */}
            <div className="text-center mt-4 text-sm">
              {timer > 0 ? (
                <span className="text-gray-500">
                  Resend OTP in {timer}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-blue-600 hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}