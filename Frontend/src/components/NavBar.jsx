import { useNavigate, Link  } from 'react-router-dom'
import api from '../services/api' 

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('/admin/logout')
      navigate('/admin/login')  
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <nav className="navbar">
      <h1>ShopCart</h1>
      <div className="nav-links">
        <Link to="/home">Products</Link>
        <Link to="/categories">Categories</Link>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar