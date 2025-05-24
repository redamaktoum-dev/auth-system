import { z } from "zod";

// Create User Schema
export const createUserSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must be no more than 20 characters long." }),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(128, { message: "Password must be no more than 128 characters long." }),
});
