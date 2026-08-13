import express from "express";

import {
  agencyLogin,
  getCurrentAgencyUser,
} from "../controllers/agency-auth.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", agencyLogin);

router.get("/me", authenticateToken, getCurrentAgencyUser);

export default router;
