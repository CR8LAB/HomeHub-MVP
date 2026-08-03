import { apiRequest } from "./api.js";

export async function getCurrentWeather() {
    try {
        const result = await apiRequest("/weather");

        return result.weather;
    } catch (error) {
        console.error("Weather fetch failed:", error);

        return {
            city: "Unavailable",
            temperature: "--",
            main: "Unavailable",
            description: "Weather unavailable",
            icon: ""
        };
    }
}