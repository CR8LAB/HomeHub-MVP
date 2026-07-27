import { initWeather } from "../weather/weather.js";

const appContent = document.getElementById("app-content");


export function renderWeatherPage() {

    appContent.innerHTML = `
        <div class="page-header">

            <h2>☀️ Weather</h2>

            <p>Current weather and forecast</p>

        </div>

        <div id="weather-content"></div>
    `;

    initWeather();

}