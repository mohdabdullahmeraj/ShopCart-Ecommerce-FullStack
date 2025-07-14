import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-select">
      <h2>Select Role</h2>
      <button onClick={() => navigate('/auth/admin/login')}>I'm an Admin</button>
      <button onClick={() => navigate('/auth/user/login')}>I'm a User</button>
    </div>
  );
}
