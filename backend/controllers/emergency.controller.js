import {
    getEmergencyContactsService,
    createEmergencyContactService,
    updateEmergencyContactService,
    deleteEmergencyContactService
} from "../services/emergency.service.js";

export async function getEmergencyContacts(req, res) {
    try {
        const result = await getEmergencyContactsService(
            req.user.householdId
        );

        return res.status(200).json(result);

    } catch (error) {
        console.error("Get emergency contacts error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function createEmergencyContact(req, res) {
    try {
        const result = await createEmergencyContactService(
            req.user.householdId,
            req.body
        );

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (error) {
        console.error("Create emergency contact error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function updateEmergencyContact(req, res) {
    try {
        const result = await updateEmergencyContactService(
            req.user.householdId,
            req.params.id,
            req.body
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Update emergency contact error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function deleteEmergencyContact(req, res) {
    try {
        const result = await deleteEmergencyContactService(
            req.user.householdId,
            req.params.id
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Delete emergency contact error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}