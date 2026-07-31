import {
    validateActivationCodeService,
    createHouseholdService,createOwnerService
} from "../services/onboarding.service.js";

export async function validateActivationCode(req, res) {
    try {
        const { activationCode } = req.body;

        const result =
            await validateActivationCodeService(activationCode);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function createHousehold(req, res) {
    try {
        const {
            activationCode,
            familyName,
            city
        } = req.body;

        const result = await createHouseholdService({
            activationCode,
            familyName,
            city
        });

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function createOwner(req, res) {
    try {
        const {
            householdId,
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const result = await createOwnerService({
            householdId,
            firstName,
            lastName,
            email,
            password
        });

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (error) {
        console.error("Create owner error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}