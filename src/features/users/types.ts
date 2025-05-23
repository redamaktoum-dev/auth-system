import { User } from "./schema";
import { z } from "zod";
import { createUserSchema } from "./validation";

export type SafeUser = Omit<User, "password">;

export type CreateUserSchema = z.infer<typeof createUserSchema>;
