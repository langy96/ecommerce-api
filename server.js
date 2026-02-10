require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.use('/auth', require('./routes/auth'));

app.use('/users', require('./routes/users'));

app.use('/products', require('./routes/products'));

app.use('/cart', require('./routes/cart'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
