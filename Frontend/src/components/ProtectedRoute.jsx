import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = document.cookie.includes("token=");

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}