// Necessary imports
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Load environment variables
dotenv.config();

const pool = new Pool({
  host: String(process.env.PG_HOST),
  port: Number(process.env.PG_PORT),
  user: String(process.env.PG_USER),
  password: String(process.env.PG_PASSWORD),
  database: String(process.env.PG_DATABASE),
  ssl: String(process.env.NODE_ENV) === "production", // Enable SSL in production
});

export const postgres = drizzle(pool);