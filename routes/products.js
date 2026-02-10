// routes/products.js
const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * GET /products
 * Public – list all products
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /products/:id
 * Public – get one product
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /products
 * Protected – create product
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const result = await pool.query(
      `INSERT INTO products (name, description, price, stock)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, description, price, stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
