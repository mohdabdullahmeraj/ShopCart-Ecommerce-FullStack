import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import Loader from '../components/Loader'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data.data))
      .catch(err => console.error(err))
  }, [id])

  if (!product) return <Loader />

  return (
    <div className="container">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ width: '150px' }} />
      <p>{product.description}</p>
      <p><strong>Price: ₹{product.price}</strong></p>
      <p>Category ID: {product.categoryId}</p>
    </div>
  )
}
