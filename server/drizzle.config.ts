import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.DATABASE_CA_CERT,
    },
  },
});
