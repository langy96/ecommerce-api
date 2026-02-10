const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',           // your PostgreSQL username
  host: 'localhost',
  database: 'ecommerce',      // your database name
  password: 'jamieogre',  // put your Postgres password here
  port: 5432,
});

module.exports = pool;

