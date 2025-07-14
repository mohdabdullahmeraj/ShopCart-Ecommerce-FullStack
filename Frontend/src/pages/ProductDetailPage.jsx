import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import Loader from '../components/Loader'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImg, setSelectedImg] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState('')

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data.data))
      .catch(err => console.error(err))
  }, [id])

  const handleAddReview = () => {

    if (newReview.trim() === '') return

    const reviewData = { user: 'Anonymous', comment: newReview }

    api.post(`/products/${id}/reviews`, reviewData)
      .then(() => {
        return api.get(`/products/${id}`)
      })
      .then(res => {
        setProduct(res.data.data)
        setNewReview('')
        setShowReviewForm(false)
      })
      .catch(err => console.error(err))

    }

  if (!product) return <Loader />

  return (
  <div className="product-detail container">
    <h1 className="product-title">{product.title}</h1>

    <div className="image-gallery">
      <div className="main-image-wrapper">
        <img
          src={product.images?.[selectedImg]?.imgUrl}
          alt="Main"
          className="main-product-image"
        />
      </div>
      <div className="thumbnail-wrapper">
        {product.images?.map((img, idx) => (
          <img
            key={idx}
            src={img.imgUrl}
            alt={`Thumbnail ${idx}`}
            className={`thumbnail ${selectedImg === idx ? 'selected' : ''}`}
            onClick={() => setSelectedImg(idx)}
          />
        ))}
      </div>
    </div>

    <div className="product-info">
      <p className="product-desc">{product.description}</p>
      <p className="product-price"><strong>Price:</strong> ₹{product.price}</p>
      <p className="product-category"><strong>Category ID:</strong> {product.categoryId}</p>
    </div>

    <div className="reviews-section">
      <h3>Customer Reviews</h3>
      {product.reviews?.length ? (
        product.reviews.map((rev, idx) => (
          <div key={idx} className="review-box">
            <strong>{rev.user}</strong>
            <p>{rev.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      <button className="primary-btn" onClick={() => setShowReviewForm(true)}>Add Review</button>
    </div>

    {showReviewForm && (
      <div className="modal-overlay">
        <div className="modal-box">
          <div className="modal-header">
            <h4>Add Your Review</h4>
            <button onClick={() => setShowReviewForm(false)} className="close-btn">&times;</button>
          </div>
          <div className="modal-body">
            <textarea
              rows="4"
              placeholder="Write your review..."
              className="review-input"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <div className="modal-actions">
              <button className="primary-btn" onClick={handleAddReview}>Submit</button>
              <button className="cancel-btn" onClick={() => setShowReviewForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)
}
