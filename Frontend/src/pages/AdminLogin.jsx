import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../services/api'
import axios from 'axios'

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/login", formData);
      navigate("/home");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper" id="login-wrapper">
      <form className="auth-form" id="login-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Admin Login</h2>

        <input
          id="login-email"
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          id="login-password"
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button id="login-button" className="auth-button" type="submit">
          Log In
        </button>

        {error && <p className="auth-error">{error}</p>}
      <p className="auth-switch">
        Dont have an account? <Link to="/admin/signup">Sign up</Link>
      </p>
      </form>
    </div>
  );
}
