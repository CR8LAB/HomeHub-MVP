import express from "express";

import { getAgencyDashboard } from "../controllers/agency-dashboard.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getAgencyDashboard);

export default router;
