import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { getUserRole } from '../utils/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDropdown from './CategoryDropdown';

function Navbar() {
  const navigate = useNavigate();
  const role = getUserRole();
  const [categoryTree, setCategoryTree] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/categories/tree');
        setCategoryTree(res.data.data || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/admin/logout');
      navigate('/');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar">
      <h1>ShopCart</h1>
      <div className="nav-links">
        <Link to="/home">Products</Link>

        <div className="category-dropdown-wrapper">
          <div className="dropdown-trigger"><Link to="/categories">Categories</Link></div>
          <div className="dropdown-menu-wrapper">
            <CategoryDropdown categories={categoryTree} />
          </div>
        </div>

        {role === 'user' && <Link to="/cart">🛒 Cart</Link>}
        {role === 'user' && <Link to="/orders/me">📦 My Orders</Link>}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
