import express from "express";

import {
  getAllAgencies,
  updateAgencyPayment,
} from "../controllers/admin-agency.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

import { requireSuperAdmin } from "../middleware/super-admin.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, requireSuperAdmin, getAllAgencies);

router.patch(
  "/:id/payment",
  authenticateToken,
  requireSuperAdmin,
  updateAgencyPayment,
);

export default router;
