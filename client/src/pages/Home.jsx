import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our E-Commerce Store</h1>
          <p>Discover amazing products and shop with ease</p>
          <Link to="/products" className="btn-shop-now">
            Start Shopping
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <div className="feature">
            <div className="feature-icon">📦</div>
            <h3>Fast Shipping</h3>
            <p>Get your items delivered quickly to your doorstep</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Safe and secure payment processing</p>
          </div>
          <div className="feature">
            <div className="feature-icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>Hassle-free returns within 30 days</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>We are here to help you anytime</p>
          </div>
        </div>
      </section>
    </div>
  );
};
