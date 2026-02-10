const express = require("express");
const pool = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get current user's cart
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT c.id, p.name, p.price, c.quantity
      FROM carts c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
      `,
      [req.user.userId]
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

    const result = await pool.query(
      `
      INSERT INTO carts (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [req.user.userId, product_id, quantity]
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
      "DELETE FROM carts WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.userId]
    );

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("DELETE CART ITEM ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
