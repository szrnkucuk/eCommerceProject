import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector((s) => s.client.user);
  const location = useLocation();
  const from = `${location.pathname}${location.search}${location.hash}`;
  if (!user) return <Navigate to="/login" replace state={{ from }} />;
  return children;
}
