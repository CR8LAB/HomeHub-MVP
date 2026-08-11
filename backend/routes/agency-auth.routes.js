import express from "express";

import { agencyLogin } from "../controllers/agency-auth.controller.js";

const router = express.Router();

router.post("/login", agencyLogin);

export default router;
