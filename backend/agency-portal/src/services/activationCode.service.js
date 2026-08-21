import { apiRequest } from "./api.js";

export async function getAgencyActivationCodes() {
  const token = localStorage.getItem("homehubAgencyToken");

  return apiRequest("/agency/activation-codes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createAgencyActivationCode() {
  const token = localStorage.getItem("homehubAgencyToken");

  return apiRequest("/agency/activation-codes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
