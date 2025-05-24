import { Router } from "express";
import users from "@/features/users/route";
import auth from "@/features/auth/route";

const router = Router();

router.use("/users", users);
router.use("/auth", auth);

export default router;