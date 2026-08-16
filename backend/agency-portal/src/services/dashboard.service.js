import { apiRequest } from "./api.js";

export async function getAgencyDashboard() {
  const token = localStorage.getItem("homehubAgencyToken");

  return apiRequest("/agency/dashboard", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
