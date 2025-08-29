require("dotenv").config();

const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DATABASE_CA_CERT,
  },
});
