import { agencyLoginService } from "../services/agency-auth.service.js";

export async function agencyLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const result = await agencyLoginService({
      email,
      password,
    });

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Agency login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}
