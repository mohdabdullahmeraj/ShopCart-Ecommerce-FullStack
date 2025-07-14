import {jwtDecode} from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);    
    return decoded.role || decoded.user?.role || null;

  } catch (err) {
    return null;
  }
}
