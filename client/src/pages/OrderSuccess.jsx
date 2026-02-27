import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderSuccess.css';

export const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <div className="order-success-container">
      <div className="success-box">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase.</p>
        <div className="order-details">
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>You will receive a confirmation email shortly with your order details.</p>
        </div>
        <div className="success-actions">
          <Link to="/orders" className="btn-view-orders">
            View Your Orders
          </Link>
          <Link to="/" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
