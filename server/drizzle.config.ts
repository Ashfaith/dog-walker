import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const caCert = process.env.CA_CERT?.replace(/\\n/g, "\n");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: true,
      ca: caCert,
    },
  },
});
