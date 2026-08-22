import { getAgencyHouseholdsService } from "../services/agency-household.service.js";

export async function getAgencyHouseholds(req, res) {
  try {
    const result = await getAgencyHouseholdsService(req.user.agencyId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Agency households error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load agency households.",
    });
  }
}
