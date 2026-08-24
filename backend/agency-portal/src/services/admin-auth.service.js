import { apiRequest } from "./api.js";

export async function loginAdmin(email, password) {
  return apiRequest("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function getCurrentAdmin() {
  const token = localStorage.getItem("homehubAdminToken");

  return apiRequest("/admin/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
