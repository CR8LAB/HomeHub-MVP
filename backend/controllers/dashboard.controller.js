import { getDashboardService } from "../services/dashboard.service.js";

export async function getDashboard(req, res) {
    try {
        const result = await getDashboardService(
            req.user.householdId
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Get dashboard error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}