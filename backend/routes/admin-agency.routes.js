import express from "express";

import { getAllAgencies } from "../controllers/admin-agency.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

import { requireSuperAdmin } from "../middleware/super-admin.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, requireSuperAdmin, getAllAgencies);

export default router;
