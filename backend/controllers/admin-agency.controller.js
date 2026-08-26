import {
  getAllAgenciesService,
  updateAgencyPaymentService,
} from "../services/admin-agency.service.js";

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

export async function updateAgencyPayment(req, res) {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({
        success: false,
        message: "Payment status is required.",
      });
    }

    const result = await updateAgencyPaymentService(id, paymentStatus);

    if (!result.success) {
      return res.status(result.statusCode).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Update agency payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update agency payment status.",
    });
  }
}
