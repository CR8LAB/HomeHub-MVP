import { getCurrentWeather } from "../services/weatherService.js";

/* ============================
   Load Full Weather Page
============================ */

export async function initWeather() {
    try {
        const weather = await getCurrentWeather();

        displayWeather(weather);
    } catch (error) {
        console.error(
            "Weather page failed:",
            error.message
        );
    }
}

/* ============================
   Choose Weather Theme
============================ */

function getWeatherTheme(main = "") {
    switch (main) {
        case "Clear":
            return "weather-clear";

        case "Clouds":
            return "weather-cloud";

        case "Rain":
        case "Drizzle":
            return "weather-rain";

        case "Thunderstorm":
            return "weather-storm";

        case "Snow":
            return "weather-snow";

        case "Mist":
        case "Fog":
        case "Haze":
        case "Smoke":
            return "weather-mist";

        default:
            return "weather-default";
    }
}

/* ============================
   Render Full Weather Page
============================ */

function displayWeather(weather) {
    const container =
        document.getElementById("weather-content");

    if (!container) {
        return;
    }

    const weatherTheme =
        getWeatherTheme(weather.main);

    const weatherIcon = weather.icon
        ? `
            <img
                src="https://openweathermap.org/img/wn/${weather.icon}@2x.png"
                alt="${weather.description}"
            >
        `
        : "";

    container.innerHTML = `
        <div class="weather-page-card ${weatherTheme}">
            ${weatherIcon}

            <h1>${weather.temperature}°C</h1>

            <p>${weather.description}</p>

            <small>${weather.city}</small>
        </div>
    `;
}

/* ============================
   Render Dashboard Weather Card
============================ */

export async function renderWeatherCard(
    openWeatherPage
) {
    const container =
        document.getElementById("weatherCard");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <p class="weather-loading">
            Loading weather...
        </p>
    `;

    try {
        const weather = await getCurrentWeather();

        const weatherTheme =
            getWeatherTheme(weather.main);

        /*
         Remove previous condition classes and apply
         the current weather theme.
        */
        container.classList.remove(
            "weather-clear",
            "weather-cloud",
            "weather-rain",
            "weather-storm",
            "weather-snow",
            "weather-mist",
            "weather-default"
        );

        container.classList.add(
            "weather-card",
            weatherTheme
        );

        const weatherIcon = weather.icon
            ? `
                <img
                    src="https://openweathermap.org/img/wn/${weather.icon}.png"
                    alt="${weather.description}"
                >
            `
            : "";

        container.innerHTML = `
            ${weatherIcon}

            <h2>${weather.temperature}°C</h2>

            <p>${weather.description}</p>

            <small>${weather.city}</small>

            <button
                id="forecastBtn"
                class="forecast-link"
                type="button"
            >
                 5-Day Forecast →
            </button>
        `;

        const forecastButton =
            document.getElementById("forecastBtn");

        forecastButton.addEventListener(
            "click",
            openWeatherPage
        );

    } catch (error) {
        console.error(
            "Dashboard weather failed:",
            error.message
        );

        container.className =
            "weather-card weather-default";

        container.innerHTML = `
            <h3>Weather</h3>

            <p>
                Weather information is unavailable.
            </p>
        `;
    }
}