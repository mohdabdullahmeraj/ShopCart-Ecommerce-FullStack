import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import RoleSelect from './pages/RoleSelect';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ['/auth/user/login', '/auth/user/signup', '/auth/admin/login', '/auth/admin/signup', '/'];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/auth" element={<RoleSelect />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/auth/:role/signup" element={<Signup />} />
        <Route path="/auth/:role/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute> <CategoryPage /> </ProtectedRoute>} />
        <Route path="/categories/:id/products" element={<ProtectedRoute> <CategoryProductsPage /> </ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute> <ProductDetailPage /> </ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/orders/me" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
