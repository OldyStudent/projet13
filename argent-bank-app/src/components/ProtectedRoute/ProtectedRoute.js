import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ fallbackPath }) {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user && !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={fallbackPath} replace={true} />
  );
}
