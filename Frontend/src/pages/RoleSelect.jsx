import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck } from 'lucide-react';

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-select-page">
      <div className="role-select-container">
        <h1 className="role-select-title">Welcome to ShopCart</h1>
        <p className="role-select-subtitle">Please select your role to continue</p>
        
        <div className="role-options">
          <div className="role-card" onClick={() => navigate('/auth/user/login')}>
            <User className="role-icon" size={48} strokeWidth={1.5} />
            <h2 className="role-card-title">I'm a Customer</h2>
            <p className="role-card-description">Browse and purchase products.</p>
          </div>
          
          <div className="role-card" onClick={() => navigate('/auth/admin/login')}>
            <ShieldCheck className="role-icon" size={48} strokeWidth={1.5} />
            <h2 className="role-card-title">I'm an Admin</h2>
            <p className="role-card-description">Manage products and categories.</p>
          </div>
        </div>
      </div>
    </div>
  );
}