import { Navigate } from "react-router-dom";

export default function ResetPasswordGuard({ children }) {
  const otpToken = sessionStorage.getItem("otpToken");
  const username = sessionStorage.getItem("username");

  // return otpToken?children:<Navigate to="/forgotpassword" replace/> 

  if (!otpToken || !username) {
    return <Navigate to="/forgotpassword" replace />;
  }

  return children;
}