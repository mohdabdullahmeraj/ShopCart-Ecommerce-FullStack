import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';
import { User, Mail, Lock, Eye, EyeOff, CheckSquare } from 'lucide-react';

export default function Signup() {
  const { role } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post(`/${role}/signup`, formData);
      const token = res?.data?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      } else {
        setError('Signup successful but no token received.');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">
            Create {role === 'admin' ? 'an Admin' : 'a User'} Account
          </h1>
          <p className="auth-subtitle">Get started with ShopCart today!</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="auth-error-message">{error}</p>}
          
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
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
            <CheckSquare size={20} />
            <span>Sign Up</span>
          </button>
          
          <p className="auth-switch-text">
            Already have an account?{' '}
            <Link to={`/auth/${role}/login`}>Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}