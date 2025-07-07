import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__logo">🛒 ShopCart</h1>
        <div className="navbar__links">
          <Link to="/">Products</Link>
          <Link to="/categories">Categories</Link>
        </div>
      </div>
    </nav>
  )
}
