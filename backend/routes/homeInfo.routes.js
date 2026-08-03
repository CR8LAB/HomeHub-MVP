import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
    getHomeInfo,
    updateHomeInfo
} from "../controllers/homeInfo.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getHomeInfo);

router.put(
    "/",
    authenticateToken,
    requireRole("OWNER"),
    updateHomeInfo
);

export default router;