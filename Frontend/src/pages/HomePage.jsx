import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    images: [{ imgUrl: '', isMain: true }] 
  })


  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const limit = parseInt(searchParams.get('limit')) || 10
  const offset = parseInt(searchParams.get('offset')) || 0

  const loadProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/products', {
        params: { limit, offset }
      })
      setProducts(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const fetchLeafCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/categories/leaf')
      setCategoryOptions(res.data.data || [])
    } catch (err) {
      console.error('Failed to load categories', err)
    }
  }

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/products/with-images', newProduct)
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
      <div className="homepagebox">
        <div className="header">
          <h2>All Products</h2>
          <button
            className="add-btn"
            onClick={() => {
              fetchLeafCategories()
              setShowAddModal(true)
            }}
          >
            Add Product
          </button>
        </div>

        <div className="product-list">
          {products.map((prod) => (
            <div key={prod.id} className="product-card">
              <h3>{prod.title}</h3>
              <p>{prod.description}</p>
              <p><strong>₹{prod.price}</strong></p>
              <img
                src={prod.images?.find(img => img.isMain)?.imgUrl || 'https://via.placeholder.com/150'}
                alt={prod.title}
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />

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
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <label>Images:</label>
              {newProduct.images.map((img, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={img.imgUrl}
                    onChange={e => {
                      const updated = [...newProduct.images]
                      updated[index].imgUrl = e.target.value
                      setNewProduct({ ...newProduct, images: updated })
                    }}
                  />
                  <label>
                    <input
                      type="radio"
                      name="mainImage"
                      checked={img.isMain}
                      onChange={() => {
                        const updated = newProduct.images.map((img, idx) => ({
                          ...img,
                          isMain: idx === index
                        }))
                        setNewProduct({ ...newProduct, images: updated })
                      }}
                    />
                    Main
                  </label>
                  {newProduct.images.length > 1 && (
                    <button
                      onClick={() => {
                        const updated = newProduct.images.filter((_, idx) => idx !== index)
                        setNewProduct({ ...newProduct, images: updated })
                      }}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  setNewProduct({
                    ...newProduct,
                    images: [...newProduct.images, { imgUrl: '', isMain: false }]
                  })
                }
              >
                + Add Image
              </button>

            <select
              value={newProduct.categoryId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
            >
              <option value="">Select a category</option>
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

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
