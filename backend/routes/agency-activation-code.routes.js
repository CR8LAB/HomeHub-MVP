import express from "express";

import { getAgencyActivationCodes } from "../controllers/agency-activation-code.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

import { createAgencyActivationCode } from "../controllers/agency-activation-code.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getAgencyActivationCodes);

router.post("/", authenticateToken, createAgencyActivationCode);

export default router;
