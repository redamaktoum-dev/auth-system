import { Router } from "express";
import { authController } from "./controller";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
