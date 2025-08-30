require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const poolConfig = isProduction
  ? {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.DATABASE_CA_CERT?.replace(/\\n/g, "\n"),
      },
    }
  : {
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    };

const pool = new Pool(poolConfig);

module.exports = pool;
