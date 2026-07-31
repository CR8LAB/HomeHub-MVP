import express from "express";

import {
    validateActivationCode,
    createHousehold,
    createOwner
} from "../controllers/onboarding.controller.js";

const router = express.Router();

router.post("/validate", validateActivationCode);
router.post("/create-household", createHousehold);
router.post("/create-owner", createOwner);

export default router;