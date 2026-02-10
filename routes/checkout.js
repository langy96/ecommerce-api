const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Checkout endpoint
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Get the user's cart
    const cartResult = await pool.query(
      `SELECT c.product_id, c.quantity, p.price
       FROM carts c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [req.user.id]
    );

    const cartItems = cartResult.rows;
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Create a new order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, status)
       VALUES ($1, 'pending')
       RETURNING *`,
      [req.user.id]
    );
    const order = orderResult.rows[0];

    // Add order items
    for (let item of cartItems) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, item.price]
      );
    }

    // Clear the cart
    await pool.query('DELETE FROM carts WHERE user_id = $1', [req.user.id]);

    res.status(201).json({ message: 'Checkout successful', order_id: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
