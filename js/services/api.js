const API_BASE_URL = "http://localhost:3000/api";

export function getToken() {
    return localStorage.getItem("homehubToken");
}

export function saveToken(token) {
    localStorage.setItem("homehubToken", token);
}

export function removeToken() {
    localStorage.removeItem("homehubToken");
}

export async function apiRequest(
    endpoint,
    options = {}
) {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    const data = await response.json();

   if (response.status === 401) {
    removeToken();

    window.dispatchEvent(
        new CustomEvent("auth:expired")
    );

    throw new Error(
        data.message || "Your session has expired."
    );
}

if (!response.ok) {
    throw new Error(
        data.message || "Request failed."
    );
}

    return data;
}