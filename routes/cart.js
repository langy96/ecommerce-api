/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's cart
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


const express = require("express");
const pool = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get current user's cart
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT ci.id, p.name, p.price, ci.quantity
      FROM carts c
      JOIN cart_items ci ON c.id = ci.cart_id
      JOIN products p ON ci.product_id = p.id
      WHERE c.user_id = $1
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add item to cart
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    // First, ensure the user has a cart
    const cartResult = await pool.query(
      'SELECT id FROM carts WHERE user_id = $1',
      [req.user.id]
    );
    let cartId = cartResult.rows[0]?.id;
    
    if (!cartId) {
      const newCart = await pool.query(
        'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
        [req.user.id]
      );
      cartId = newCart.rows[0].id;
    }

    const result = await pool.query(
      `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [cartId, product_id, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Remove item from cart
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM cart_items ci
       USING carts c
       WHERE ci.id = $1 AND c.id = ci.cart_id AND c.user_id = $2`,
      [req.params.id, req.user.id]
    );

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("DELETE CART ITEM ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
