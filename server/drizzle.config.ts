import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const isProduction = process.env.NODE_ENV === "production";

const caCert = process.env.DATABASE_CA_CERT?.replace(/\\n/g, "\n");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: isProduction
    ? {
        host: process.env.DATABASE_HOST!,
        port: Number(process.env.DATABASE_PORT || 5432),
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASS!,
        database: process.env.DATABASE_NAME!,
        ssl: {
          rejectUnauthorized: true,
          ca: caCert,
        },
      }
    : {
        url: process.env.DATABASE_URL!, // dev db connection string
        ssl: false, // don’t enforce SSL locally
      },
});
