import { apiRequest } from "../services/api.js";
import {
    renderSettingsPage
} from "../pages/settingsPage.js";


let clockInterval = null;

export async function initHeader() {
    updateDateAndTime();

    if (clockInterval) {
        clearInterval(clockInterval);
    }

    clockInterval = setInterval(
        updateDateAndTime,
        1000
    );

    await Promise.all([
        loadHeaderUser(),
        loadHeaderWeather()
    ]);

    setupHeaderButtons();
}

function updateDateAndTime() {
    const now = new Date();

    const greetingElement =
        document.getElementById("headerGreeting");

    const dateElement =
        document.getElementById("headerDate");

    const timeElement =
        document.getElementById("headerTime");

    const hour = now.getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    }

    if (greetingElement) {
        greetingElement.dataset.baseGreeting =
            greeting;
    }

    if (dateElement) {
        dateElement.textContent =
            now.toLocaleDateString(
                "en-ZA",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );
    }

    if (timeElement) {
       timeElement.textContent =
    now.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    }
}

async function loadHeaderUser() {
    const greetingElement =
        document.getElementById("headerGreeting");

    try {
        const result =
            await apiRequest("/auth/me");

        const user =
            result.user ?? result.data ?? null;

        const greeting =
            greetingElement?.dataset.baseGreeting ||
            "Hello";

        if (greetingElement) {
            greetingElement.textContent =
                user?.firstName
                    ? `${greeting}, ${user.firstName}`
                    : greeting;
        }

    } catch (error) {
        console.error(
            "Header user load failed:",
            error.message
        );
    }
}

async function loadHeaderWeather() {
    const weatherText =
        document.getElementById("headerWeatherText");

    const weatherIcon =
        document.getElementById("headerWeatherIcon");

    try {
        const result =
            await apiRequest("/weather");

        const weather =
            result.weather;

        if (weatherText) {
            weatherText.textContent =
                `${weather.temperature}°C · ${weather.city}`;
        }

        if (weatherIcon) {
            weatherIcon.className =
                `bi ${getWeatherIcon(weather.main)}`;
        }

    } catch (error) {
        console.error(
            "Header weather load failed:",
            error.message
        );

        if (weatherText) {
            weatherText.textContent =
                "Weather unavailable";
        }
    }
}

function getWeatherIcon(main = "") {
    switch (main) {
        case "Clear":
            return "bi-sun-fill";

        case "Clouds":
            return "bi-cloud-fill";

        case "Rain":
        case "Drizzle":
            return "bi-cloud-rain-fill";

        case "Thunderstorm":
            return "bi-cloud-lightning-rain-fill";

        case "Snow":
            return "bi-snow";

        case "Mist":
        case "Fog":
        case "Haze":
            return "bi-cloud-fog2-fill";

        default:
            return "bi-cloud-sun-fill";
    }
}

function setupHeaderButtons() {
    const notificationBtn =
        document.getElementById("notificationBtn");

    const userBtn =
        document.getElementById("userBtn");

    const settingsBtn =
        document.getElementById("settingsBtn");

    notificationBtn?.addEventListener(
        "click",
        () => {
            console.log(
                "Notifications coming soon."
            );
        }
    );

    userBtn?.addEventListener(
    "click",
    renderSettingsPage
);

settingsBtn?.addEventListener(
    "click",
    renderSettingsPage
);

notificationBtn?.addEventListener(
    "click",
    () => {
        console.log(
            "Notifications coming soon."
        );
    }
);

}