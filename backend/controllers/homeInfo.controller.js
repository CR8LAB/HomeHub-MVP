
import {
    getHomeInfoService,
    updateHomeInfoService
} from "../services/homeInfo.service.js";

export async function getHomeInfo(req, res) {
    try {
        const result = await getHomeInfoService(
            req.user.householdId
        );

        return res.status(200).json(result);

    } catch (error) {
        console.error("Get Home Info error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function updateHomeInfo(req, res) {
    try {
        const result = await updateHomeInfoService(
            req.user.householdId,
            req.body
        );

        return res.status(200).json(result);

    } catch (error) {
        console.error("Update Home Info error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}