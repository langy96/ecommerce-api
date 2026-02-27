const fs = require('fs');
const path = require('path');
const pool = require('../db');

async function createDB() {
  try {
    const schema = fs.readFileSync(path.join(__dirname, '../sql/schema.sql'), 'utf-8');
    
    console.log('Creating database tables...');
    await pool.query(schema);
    
    // Seed sample products
    console.log('Seeding sample products...');
    const sampleProducts = [
      { name: 'Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation', price: 79.99, stock: 50 },
      { name: 'USB-C Cable', description: 'Durable 6ft USB-C charging cable', price: 9.99, stock: 200 },
      { name: 'Laptop Stand', description: 'Adjustable aluminum laptop stand for better ergonomics', price: 24.99, stock: 75 },
      { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse with precision tracking', price: 19.99, stock: 120 },
      { name: 'Monitor Light Bar', description: 'AI-powered monitor light for reduced eye strain', price: 49.99, stock: 40 },
      { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with Cherry MX switches', price: 109.99, stock: 35 },
    ];

    for (const product of sampleProducts) {
      await pool.query(
        'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4)',
        [product.name, product.description, product.price, product.stock]
      );
    }

    console.log('✓ Database setup successful with sample products!');
    process.exit(0);
  } catch (err) {
    console.error('✗ Database setup failed:', err.message);
    process.exit(1);
  }
}

createDB();

