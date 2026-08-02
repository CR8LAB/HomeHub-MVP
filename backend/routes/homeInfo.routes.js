import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

import {
    getHomeInfo,
    updateHomeInfo
} from "../controllers/homeInfo.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getHomeInfo);
router.put("/", authenticateToken, updateHomeInfo);

export default router;