const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Error: DATABASE_URL is not set in environment (.env).');
  process.exit(1);
}

const pool = new Pool({
  connectionString
});

module.exports = pool;

