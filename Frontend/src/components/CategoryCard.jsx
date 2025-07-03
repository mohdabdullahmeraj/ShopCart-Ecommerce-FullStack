// src/components/CategoryCard.jsx
import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
  return (
    <div className="card">
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <Link to={`/categories/${category.id}/products`}>View Products</Link>
    </div>
  )
}
