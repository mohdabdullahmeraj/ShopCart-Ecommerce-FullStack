import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function CategoryPage() {
  const [categoryTree, setCategoryTree] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '', parentId: null })
  const [parentOptions, setParentOptions] = useState([])

  const loadTree = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/categories/tree')
      setCategoryTree(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/categories', newCategory)
      setShowAddModal(false)
      setNewCategory({ name: '', description: '', parentId: null })
      loadTree()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return
    try {
      await axios.delete(`http://localhost:3000/api/v1/categories/${id}`)
      loadTree()
    } catch (err) {
      console.error(err)
    }
  }

  const flattenCategoryTree = (tree, prefix = '') => {
    let flat = []
    for (let cat of tree) {
      flat.push({ id: cat.id, label: prefix + cat.name })
      if (cat.children && cat.children.length > 0) {
        flat = flat.concat(flattenCategoryTree(cat.children, prefix + '— '))
      }
    }
    return flat
  }

  const CategoryNode = ({ cat }) => {
    const [showChildren, setShowChildren] = useState(false)

    return (
      <div className="category-node" style={{ marginLeft: '1rem', borderLeft: '1px solid #ddd', paddingLeft: '1rem' }}>
        <div>
          <strong>{cat.name}</strong> - {cat.description}
        </div>

        {cat.children.length === 0 && (
          <Link to={`/categories/${cat.id}/products`} className="view-link">
            View Products
          </Link>
        )}

        <div className="btn-group">
  <button onClick={() => handleDelete(cat.id)} className="delete-btn">Delete</button>
  {cat.children.length > 0 && (
    <button
      onClick={() => setShowChildren(!showChildren)}
      className="toggle-btn"
    >
      {showChildren ? 'Hide Subcategories' : 'Show Subcategories'}
    </button>
  )}
</div>

        {showChildren && cat.children.map(child => (
          <CategoryNode key={child.id} cat={child} />
        ))}
      </div>
    )
  }

  useEffect(() => {
    loadTree()
  }, [])

  return (
    <div className="category-page">
      <div className="header">
        <h2>All Categories (Tree View)</h2>
        <button
          className="add-btn"
          onClick={async () => {
            const res = await axios.get('http://localhost:3000/api/v1/categories/tree')
            setParentOptions(res.data.data || [])
            setShowAddModal(true)
          }}
        >
          Add Category
        </button>
      </div>

      <div className="category-list">
        {categoryTree.map(cat => (
          <CategoryNode key={cat.id} cat={cat} />
        ))}
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Category</h3>
            <input
              type="text"
              placeholder="Name"
              value={newCategory.name}
              onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
            />

            <select
              value={newCategory.parentId || ''}
              onChange={e =>
                setNewCategory({
                  ...newCategory,
                  parentId: e.target.value === '' ? null : parseInt(e.target.value)
                })
              }
            >
              <option value="">No Parent (Root Category)</option>
              {flattenCategoryTree(parentOptions).map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button onClick={handleAddCategory}>Add</button>
              <button onClick={() => {
                setShowAddModal(false)
                setNewCategory({ name: '', description: '', parentId: null })
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
