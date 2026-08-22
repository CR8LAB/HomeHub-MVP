import express from "express";

import { getAgencyHouseholds } from "../controllers/agency-household.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getAgencyHouseholds);

export default router;
