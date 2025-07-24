import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';
import { Mail, Lock, Eye, EyeOff, LogIn as LoginIcon } from 'lucide-react';

export default function Login() {
  const { role } = useParams(); 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const res = await api.post(`/${role}/login`, formData);
      const token = res?.data?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      } else {
        setError('Login successful but no token received.');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-back-link">
            &larr; Back to Role Selection
          </Link>
          <h1 className="auth-title">
            {role.charAt(0).toUpperCase() + role.slice(1)} Login
          </h1>
          <p className="auth-subtitle">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="auth-error-message">{error}</p>}
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button className="auth-button" type="submit">
            <LoginIcon size={20} />
            <span>Log In</span>
          </button>
          
          <p className="auth-switch-text">
            Don't have an account?{' '}
            <Link to={`/auth/${role}/signup`}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}