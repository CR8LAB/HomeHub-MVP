import { getCurrentWeather } from "../services/weatherService.js";

/* ============================
   Load Weather Page Data
============================ */

export async function initWeather() {

    const weather = await getCurrentWeather();

    displayWeather(weather);

}

/* ============================
   Render Weather Page
============================ */

function displayWeather(weather) {

    const container = document.getElementById("weather-content");

    if (!container) return;

    container.innerHTML = `
        <div class="weather-card">

 <img
        src="https://openweathermap.org/img/wn/${weather.icon}@2x.png"
        alt="${weather.description}"
    >

            <h3>${weather.city}</h3>

            <h1>${weather.temperature}°C</h1>

            <p>${weather.description}</p>

        </div>
    `;

}

/* ============================
   Render Dashboard Card
============================ */

export async function renderWeatherCard(openWeatherPage) {

    const weather = await getCurrentWeather();

    const container = document.getElementById("weatherCard");

    if (!container) return;

    container.innerHTML = `

    <img
    src="https://openweathermap.org/img/wn/${weather.icon}.png"
    alt="${weather.description}"
>

        <h3>☀️ Weather</h3>

        <h2>${weather.temperature}°C</h2>

        <p>${weather.description}</p>

        <small>${weather.city}</small>

       <div id="forecastBtn" class="forecast-link">
    View 5-Day Forecast →
</div>
    `;

    document
        .getElementById("forecastBtn")
        .addEventListener("click", openWeatherPage);

}