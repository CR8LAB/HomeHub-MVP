import { apiRequest } from "../services/api.js";
import { renderTodoPreview } from "../components/todoPreview.js";
import { renderQuickAccess } from "../components/quickAccess.js";
import { renderWeatherCard } from "../weather/weather.js";
import { renderWeatherPage } from "./weatherPage.js";
import { setActiveNav } from "../components/navigation.js";

const appContent = document.getElementById("app-content");

export async function renderHomePage() {
    try {
        const result = await apiRequest("/dashboard");
        const dashboardData = result.dashboard;

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

        renderTodoPreview(dashboardData.todoSummary);

        // Leave these as they are for now.
        renderQuickAccess();
        renderWeatherCard(renderWeatherPage);
        setActiveNav("home-btn");

    } catch (error) {
        console.error("Dashboard load failed:", error);

        appContent.innerHTML = `
            <section class="dashboard-error">
                <p>Unable to load the dashboard.</p>
            </section>
        `;
    }
}