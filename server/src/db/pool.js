require("dotenv").config();

const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DATABASE_CA_CERT,
  },
});
