import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export const Cart = () => {
  const { cart, removeFromCart, getTotalPrice, loading } = useCart();
  const navigate = useNavigate();

  if (loading) return <div className="loading">Loading cart...</div>;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>£{parseFloat(item.price).toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>£{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>£{getTotalPrice()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>£{getTotalPrice()}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="btn-checkout"
            >
              Proceed to Checkout
            </button>
            <Link to="/" className="btn-continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
