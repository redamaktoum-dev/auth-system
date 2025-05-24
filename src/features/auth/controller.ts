import { Request, Response } from "express";
import { authService } from "./service";
import { loginSchema } from "./validation";
import { AppError } from "@/lib/error";

export const authController = {
  login: async (req: Request, res: Response) => {

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) throw new AppError("Please fill out all required fields correctly.", 400);

    const { identifier, password } = parsed.data;
    const normalized = identifier.toLowerCase();
    const user = await authService.login(normalized, password);

    req.session.regenerate((err) => {
      if (err) throw new AppError("Session regeneration failed.", 500);
      req.session.userId = user.id;
      res.status(200).json(user);
    });
  },

  logout: async (req: Request, res: Response) => {
    if (!req.session) throw new AppError("No session to destroy.", 400);
    req.session.destroy((err) => {
      if (err) throw new AppError("Logout failed.", 500);
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out." });
    });
  },
};