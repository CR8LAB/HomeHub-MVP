import { validateActivationCodeService } from "../services/onboarding.service.js";

export async function validateActivationCode(req, res) {
    try {
        // 1. Receive activation code from the frontend
        const { activationCode } = req.body;

        // 2. Ask the service to validate it
        const result = await validateActivationCodeService(activationCode);

        // 3. Send the result back to the frontend
        res.json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}