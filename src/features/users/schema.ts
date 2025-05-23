// Necessary imports
import {
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  index
} from "drizzle-orm/pg-core";

// Necessary enums for { status, role }
export const userStatus = pgEnum("user_status", ["active", "inactive"]);
export const userRole = pgEnum("user_role", ["user", "admin"]);

// Table schema for users
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    status: userStatus("status").notNull().default("active"),
    role: userRole("role").notNull().default("user"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_users_status").on(table.status),
    index("idx_users_role").on(table.role),
    index("idx_users_created_at").on(table.createdAt),
  ]
);

// Type for users
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
