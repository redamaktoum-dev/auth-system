// Necessary imports
import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables
dotenv.config();

export default defineConfig({
  schema: "./src/**/schema.ts", // Path to your schema files
  out: "./drizzle", // Path to the output directory
  dialect: "postgresql", // Database dialect
  dbCredentials: {
    host: String(process.env.PG_HOST),
    port: Number(process.env.PG_PORT),
    user: String(process.env.PG_USER),
    password: String(process.env.PG_PASSWORD),
    database: String(process.env.PG_DATABASE),
    ssl: String(process.env.NODE_ENV) === "production", // Enable SSL in production
  },
});
