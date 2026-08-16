import { getAgencyDashboardService } from "../services/agency-dashboard.service.js";

export async function getAgencyDashboard(req, res) {
  try {
    const result = await getAgencyDashboardService(req.user.agencyId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Agency dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load agency dashboard.",
    });
  }
}
