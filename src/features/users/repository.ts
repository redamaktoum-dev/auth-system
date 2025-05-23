// Necessary Imports
import { postgres } from "@/config/postgres";
import { users, User, NewUser } from "./schema";
import { eq } from "drizzle-orm";

export const userRepository = {
  create: async (user: NewUser): Promise<User> => {
    const [createdUser] = await postgres.insert(users).values(user).returning();
    return createdUser;
  },

  getByEmail: async (email: string): Promise<User | null> => {  
    const [user] = await postgres.select().from(users).where(eq(users.email, email)).limit(1);
    return user ?? null;
  },
  

  getByUsername: async (username: string): Promise<User | null> => {
    const [user] = await postgres.select().from(users).where(eq(users.username, username)).limit(1);
    return user ?? null;
  },
}