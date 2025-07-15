import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data.data.CartItems || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart([]);
    }
  };

  const handleRemove = async (itemId) => {
    await api.delete('/cart/remove', { data: { cartItemId: itemId } });
    fetchCart();
  };

  const handleUpdateQty = async (itemId, quantity) => {
    if (quantity < 1) return;
    await api.put('/cart/update', { cartItemId: itemId, quantity });
    fetchCart();
  };

  const handleClearCart = async () => {
    await api.delete('/cart/clear');
    fetchCart();
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.Product.price * item.quantity, 0);
  };

  const getMainImage = (images) => {
    return (
      images?.find((img) => img.isMain)?.imgUrl ||
      images?.[0]?.imgUrl ||
      'https://via.placeholder.com/120'
    );
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-text">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={getMainImage(item.Product.images)}
                alt={item.Product.title}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h4>{item.Product.title}</h4>
                <p>Price: ₹{item.Product.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.id)} className="remove-btn">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-footer">
            <h3>Total: ₹{getTotal()}</h3>
            <button onClick={handleClearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
