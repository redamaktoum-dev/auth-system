import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string({ required_error: "Username or Email is required." })
    .trim()
    .min(3, { message: "Username or Email must be at least 3 characters long." })
    .max(50, { message: "Username or Email must be no more than 50 characters long." }),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(128, { message: "Password must be no more than 128 characters long." }),
});
