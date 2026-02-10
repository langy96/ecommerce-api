// routes/orders.js
const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// GET all orders for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const ordersResult = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json(ordersResult.rows);
  } catch (err) {
    console.error('GET ORDERS ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single order with items
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    // 1. Check that the order belongs to the logged-in user
    const orderResult = await pool.query(
      `SELECT * FROM orders WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderResult.rows[0];

    // 2. Get items for that order
    const itemsResult = await pool.query(
      `SELECT oi.id, oi.product_id, p.name, oi.quantity, oi.price
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [order.id]
    );

    order.items = itemsResult.rows;

    res.json(order);
  } catch (err) {
    console.error('GET ORDER ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
