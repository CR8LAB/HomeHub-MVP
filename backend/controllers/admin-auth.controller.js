import {
  adminLoginService,
  getCurrentAdminService,
} from "../services/admin-auth.service.js";
export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const result = await adminLoginService({
      email,
      password,
    });

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Super admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}

export async function getCurrentAdmin(req, res) {
  try {
    const result = await getCurrentAdminService(req.user.userId);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get current super admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}
