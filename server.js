const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Import routers
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders'); // <-- your orders router
const checkoutRouter = require('./routes/checkout');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter); // <-- make sure this is AFTER app is defined
app.use('/checkout', checkoutRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
