import {
  getAgencyActivationCodesService,
  createAgencyActivationCodeService,
} from "../services/agency-activation-code.service.js";

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

export async function createAgencyActivationCode(req, res) {
  try {
    const result = await createAgencyActivationCodeService(req.user.agencyId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("Create agency activation code error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create activation code.",
    });
  }
}
