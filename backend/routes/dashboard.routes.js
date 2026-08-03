import express from "express";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { getDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getDashboard);

export default router;