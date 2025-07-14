import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../services/api'
import axios from 'axios'

export default function AdminSignup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/signup", formData);
      const token = res?.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        setError("Signup successful but no token received");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };


  return (
    <div className="auth-wrapper" id="signup-wrapper">
      <form className="auth-form" id="signup-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Admin Signup</h2>

        <input
          id="signup-name"
          className="auth-input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          id="signup-email"
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          id="signup-password"
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button id="signup-button" className="auth-button" type="submit">
          Sign Up
        </button>

        {error && <p className="auth-error">{error}</p>}
      <p className="auth-switch">
        Already have an account? <Link to="/admin/login">Log in</Link>
      </p>
      </form>
    </div>
  );
}
