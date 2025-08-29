require("dotenv").config();
const { Pool } = require("pg");

console.log("DB URL:", process.env.DATABASE_URL);

const isProduction = process.env.NODE_ENV === "production";

const poolConfig = isProduction
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.DATABASE_CA_CERT,
      },
    }
  : {
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    };

console.log("Connection config:", poolConfig);

const pool = new Pool(poolConfig);

module.exports = pool;
