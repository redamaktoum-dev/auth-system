import { Request, Response } from "express";
import { authService } from "./service";
import { loginSchema } from "./validation";

export const authController = {
  login: async (req: Request, res: Response) => {

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new Error("Please fill out all required fields correctly.");
    }

    const { identifier, password } = parsed.data;
    const normalized = identifier.toLowerCase();
    const user = await authService.login(normalized, password);

    req.session.regenerate((err) => {
      if (err) throw new Error("Session regeneration failed.");
      req.session.userId = user.id;
      res.status(200).json(user);
    });
  },

  logout: async (req: Request, res: Response) => {
    if (!req.session) {
      res.status(400).json({ message: "No session to destroy." });
      return;
    }
    req.session.destroy((err) => {
      if (err) throw new Error("Logout failed.");
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out." });
    });
  },
};