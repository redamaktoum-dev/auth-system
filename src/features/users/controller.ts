import { Request, Response } from "express";
import { createUserSchema } from "./validation";
import { userService } from "./service";
import { AppError } from "@/lib/error";

export const userController = {
  create: async (req: Request, res: Response) => {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) throw new AppError("Please fill out all required fields correctly.", 400);

    const user = await userService.createUser(result.data);
    res.status(201).json(user);
  },
};
