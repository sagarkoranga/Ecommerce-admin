import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" replace/>;
}