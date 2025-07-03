import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function CategoryPage() {
  const [categories, setCategories] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })

  const loadCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/categories')
      setCategories(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/categories', newCategory)
      setShowAddModal(false)
      setNewCategory({ name: '', description: '' })
      loadCategories()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return
    try {
      await axios.delete(`http://localhost:3000/api/v1/categories/${id}`)
      loadCategories()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <div className="category-page">
      <div className="header">
        <h2>All Categories</h2>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>Add Category</button>
      </div>

      <div className="category-list">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>

            <div className="actions">
              <Link to={`/categories/${cat.id}/products`}>View Products</Link>
            </div>

            <button onClick={() => handleDelete(cat.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Category</h3>
            <input type="text" placeholder="Name" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
            <input type="text" placeholder="Description" value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} />

            <div className="modal-actions">
              <button onClick={handleAddCategory}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
