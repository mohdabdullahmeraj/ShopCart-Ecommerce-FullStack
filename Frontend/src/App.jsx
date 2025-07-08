import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admin/login" || location.pathname === "/" || location.pathname === "/admin/signup";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/:id/products" element={<CategoryProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
