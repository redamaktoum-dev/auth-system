import { z } from "zod";
import { loginSchema } from "./validation";

export type LoginSchema = z.infer<typeof loginSchema>;
