import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Products.css';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <div className="placeholder">Product Image</div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <div className="product-footer">
                <span className="price">£{parseFloat(product.price).toFixed(2)}</span>
                <Link to={`/product/${product.id}`} className="btn-view">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
