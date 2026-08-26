import { getAllAgenciesService } from "../services/admin-agency.service.js";

export async function getAllAgencies(req, res) {
  try {
    const result = await getAllAgenciesService();

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get all agencies error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load agencies.",
    });
  }
}
