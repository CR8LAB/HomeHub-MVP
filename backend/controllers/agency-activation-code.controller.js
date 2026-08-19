import { getAgencyActivationCodesService } from "../services/agency-activation-code.service.js";

export async function getAgencyActivationCodes(req, res) {
  try {
    const result = await getAgencyActivationCodesService(req.user.agencyId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Agency activation codes error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load activation codes.",
    });
  }
}
