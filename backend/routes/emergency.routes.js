import express from "express";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
    getEmergencyContacts,
    createEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact
} from "../controllers/emergency.controller.js";

const router = express.Router();

router.get(
    "/",
    authenticateToken,
    getEmergencyContacts
);

router.post(
    "/",
    authenticateToken,
    requireRole("OWNER"),
    createEmergencyContact
);

router.put(
    "/:id",
    authenticateToken,
    requireRole("OWNER"),
    updateEmergencyContact
);

router.delete(
    "/:id",
    authenticateToken,
    requireRole("OWNER"),
    deleteEmergencyContact
);

export default router;