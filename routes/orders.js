/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the current user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: integer
 */


const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// GET /orders — Get all orders for logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Get all orders for this user
    const ordersResult = await pool.query(
      `SELECT id, status, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    const orders = ordersResult.rows;

    // For each order, get its items
    for (let order of orders) {
      const itemsResult = await pool.query(
        `SELECT oi.id, p.name, oi.quantity, oi.price
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      order.items = itemsResult.rows;
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /orders/:id — Get a single order by ID for logged-in user
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if order exists and belongs to the user
    const orderResult = await pool.query(
      `SELECT id, status, created_at
       FROM orders
       WHERE id = $1 AND user_id = $2`,
      [orderId, req.user.id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderResult.rows[0];

    // Get items for this order
    const itemsResult = await pool.query(
      `SELECT oi.id, p.name, oi.quantity, oi.price
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [order.id]
    );

    order.items = itemsResult.rows;

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
