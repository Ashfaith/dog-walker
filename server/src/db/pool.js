require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

console.log("CA cert loaded?", !!process.env.DATABASE_CA_CERT);

const poolConfig = isProduction
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.DATABASE_CA_CERT?.replace(/\\n/g, "\n"),
      },
    }
  : {
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    };

console.log("Connection config:", poolConfig);

const pool = new Pool(poolConfig);

module.exports = pool;
