import { apiRequest } from "./api.js";

export async function getAllAgencies() {
  const token = localStorage.getItem("homehubAdminToken");

  if (!token) {
    throw new Error("Super admin authentication token is missing.");
  }

  return apiRequest("/admin/agencies", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
