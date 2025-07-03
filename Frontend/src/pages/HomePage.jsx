import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    categoryId: ''
  })

  const loadProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/products')
      setProducts(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/products', newProduct)
      setShowAddModal(false)
      setNewProduct({ title: '', description: '', price: '', image: '', categoryId: '' })
      loadProducts()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`)
      loadProducts()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="homepage">
      <div className='homepagebox'>
      <div className="header">
        <h2>All Products</h2>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>Add Product</button>
      </div>

      <div className="product-list">
        {products.map((prod) => (
          <div key={prod.id} className="product-card">
            <h3>{prod.title}</h3>
            <p>{prod.description}</p>
            <p><strong>₹{prod.price}</strong></p>
            <img src={prod.image} alt={prod.title} />
            
            <div className="actions">
              <Link to={`/products/${prod.id}`}>View Details</Link>
            </div>

            <button onClick={() => handleDelete(prod.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Product</h3>
            <input type="text" placeholder="Title" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} />
            <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
            <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
            <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
            <input type="text" placeholder="Category ID" value={newProduct.categoryId} onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })} />
            
            <div className="modal-actions">
              <button onClick={handleAddProduct}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
