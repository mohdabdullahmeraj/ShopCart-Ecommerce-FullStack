import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

export default function CategoryProductsPage() {
  const { id } = useParams()
  const [products, setProducts] = useState(null)

  useEffect(() => {
    api.get(`/categories/${id}/products`)
      .then(res => setProducts(res.data.data))
      .catch(err => console.error(err))
  }, [id])

  if (!products) return <Loader />

  return (
    <div className="container">
      <h1>Products in Category {id}</h1>
      <div className="product-grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
