import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

export default function Login() {
  const { role } = useParams(); // gets 'admin' or 'user'
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/${role}/login`, formData);
      const token = res?.data?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      } else {
        setError('Login successful but no token received');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>

        <input className="auth-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="auth-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <button className="auth-button" type="submit">Log In</button>
        {error && <p className="auth-error">{error}</p>}

        <p className="auth-switch">
          Don't have an account? <Link to={`/auth/${role}/signup`}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}
