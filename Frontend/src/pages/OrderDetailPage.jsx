// src/pages/OrderDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data.data);
    } catch (err) {
      console.error('Failed to fetch order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="order-detail-page">
      <h2>Order #{order.id}</h2>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Payment:</strong> {order.paymentStatus}</p>
      <p><strong>Delivery:</strong> {order.deliveryStatus}</p>
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>

      <h3>Items:</h3>
      <ul className="order-items-list">
        {order.OrderItems.map((item) => (
          <li key={item.id} className="order-item">
            <img
              src={
                item.Product.images?.find((img) => img.isMain)?.imgUrl ||
                item.Product.images?.[0]?.imgUrl ||
                'https://via.placeholder.com/100'
              }
              alt={item.Product.title}
              className="order-item-img"
            />
            <div>
              <p>{item.Product.title}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.Product.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/orders/me" className="back-btn">← Back to Orders</Link>
    </div>
  );
}
