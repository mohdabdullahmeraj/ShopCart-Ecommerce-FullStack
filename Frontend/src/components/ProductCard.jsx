import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p><strong>₹{product.price}</strong></p>
      
      <br />
      <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
  )
}
