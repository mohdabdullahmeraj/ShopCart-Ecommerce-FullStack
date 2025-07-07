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
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {product.images?.map((img, idx) => (
          <img
            key={idx}
            src={img.imgUrl}
            alt={`Image ${idx}`}
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        ))}
      </div>

      <p>{product.description}</p>
      <p><strong>Price: ₹{product.price}</strong></p>
      <p>Category ID: {product.categoryId}</p>
    </div>
  )
}
