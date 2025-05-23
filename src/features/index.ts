import { Router } from "express";
import users from "@/features/users/route";

const router = Router();

router.use("/users", users);

export default router;