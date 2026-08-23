import express from "express";

import {
  adminLogin,
  getCurrentAdmin,
} from "../controllers/admin-auth.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

import { requireSuperAdmin } from "../middleware/super-admin.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/me", authenticateToken, requireSuperAdmin, getCurrentAdmin);

export default router;
