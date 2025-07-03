// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import CategoryProductsPage from './pages/CategoryProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/:id/products" element={<CategoryProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
