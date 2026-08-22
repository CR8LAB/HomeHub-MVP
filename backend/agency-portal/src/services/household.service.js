import { apiRequest } from "./api.js";

export async function getAgencyHouseholds() {
  const token = localStorage.getItem("homehubAgencyToken");

  return apiRequest("/agency/households", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
