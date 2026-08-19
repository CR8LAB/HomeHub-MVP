import express from "express";

import { getAgencyActivationCodes } from "../controllers/agency-activation-code.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getAgencyActivationCodes);

export default router;
