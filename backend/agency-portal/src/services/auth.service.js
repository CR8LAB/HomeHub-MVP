import { apiRequest } from "./api.js";

export async function loginAgency(email, password) {
  const result = await apiRequest("/agency/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return result;
}

export async function getCurrentAgencyUser() {
  const token = localStorage.getItem("homehubAgencyToken");

  return apiRequest("/agency/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
