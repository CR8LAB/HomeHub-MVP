import { renderTodoPreview } from "../components/todoPreview.js";
import { renderQuickAccess } from "../components/quickAccess.js";
import { renderWeatherCard } from "../weather/weather.js";
import { renderWeatherPage } from "./weatherPage.js";
import { setActiveNav } from "../components/navigation.js";

const appContent = document.getElementById("app-content");

export function renderHomePage() {
    appContent.innerHTML = `
        <section class="dashboard">

            <div class="card weather-card">
                <div id="weatherCard"></div>
            </div>

            <div class="card summary-card">
                <div class="card-header">
                    <h3>Today's Tasks</h3>
                </div>

                <div id="todo-preview"></div>
            </div>

            <div class="card quick-card">
                <h3>🚨 Quick Access</h3>
                <div id="quick-access-list"></div>
            </div>

        </section>
    `;

    renderTodoPreview();
    renderQuickAccess();
    renderWeatherCard(renderWeatherPage);
    setActiveNav("home-btn");
}