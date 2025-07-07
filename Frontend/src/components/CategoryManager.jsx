import { useEffect, useState } from 'react'
import api from '../services/api'
import '../components/CategoryManager.css'

function CategoryManager() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [message, setMessage] = useState('')

  const fetchCategories = async () => {
    const res = await api.get('/categories')
    setCategories(res.data.data) 
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await api.post('/categories', { name, description })
      setName('')
      setDescription('')
      setMessage('✅ Category created successfully.')
      fetchCategories()
    } catch (err) {
      setMessage('❌ Error creating category.')
    }
  }

  const handleDelete = async (id) => {
    await api.delete(`/categories/${id}`)
    fetchCategories()
  }

const handleView = async (id) => {
  const res = await api.get(`/categories/${id}`)
  setSelectedCategory(res.data.data) 
}


  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="wrapper">
            <div className="container">
      <h2>Category Manager</h2>

      
      <form onSubmit={handleAdd} className="form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>
      {message && <p className="message">{message}</p>}

      
      <h3>All Categories</h3>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.id} className="category-item">
            <strong>{cat.name}</strong>: {cat.description}
            <div className="btn-group">
              <button onClick={() => handleView(cat.id)}>View</button>
              <button onClick={() => handleDelete(cat.id)} className="delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      
      {selectedCategory && (
        <div className="selected-category">
          <h4>Selected Category</h4>
          <p><strong>ID:</strong> {selectedCategory.id}</p>
          <p><strong>Name:</strong> {selectedCategory.name}</p>
          <p><strong>Description:</strong> {selectedCategory.description}</p>
        </div>
      )}
    </div>
    </div>
  )
}

export default CategoryManager
