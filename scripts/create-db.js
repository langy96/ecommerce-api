const fs = require('fs');
const path = require('path');
const pool = require('../db');

async function createDB() {
  try {
    const schema = fs.readFileSync(path.join(__dirname, '../sql/schema.sql'), 'utf-8');
    
    console.log('Creating database tables...');
    await pool.query(schema);
    
    console.log('✓ Database setup successful!');
    process.exit(0);
  } catch (err) {
    console.error('✗ Database setup failed:', err.message);
    process.exit(1);
  }
}

createDB();
