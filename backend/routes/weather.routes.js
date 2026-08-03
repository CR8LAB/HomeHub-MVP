import express from "express";
import {
    authenticateToken
} from "../middleware/auth.middleware.js";
import {
    getCurrentWeather
} from "../controllers/weather.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getCurrentWeather);

export default router;