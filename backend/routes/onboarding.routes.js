import express from "express";
import { validateActivationCode } from "../controllers/onboarding.controller.js";

const router = express.Router();

router.post("/validate", validateActivationCode);

export default router;