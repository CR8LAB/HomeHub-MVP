import { apiRequest } from "../services/api.js";
import { renderTodoPreview } from "../components/todoPreview.js";
import { renderQuickAccess } from "../components/quickAccess.js";
import { renderWeatherCard } from "../weather/weather.js";
import { renderWeatherPage } from "./weatherPage.js";
import { setActiveNav } from "../components/navigation.js";

const appContent = document.getElementById("app-content");

export async function renderHomePage() {
     document
        .querySelector("header")
        ?.classList.remove("hidden");

    document
        .querySelector("footer")
        ?.classList.remove("hidden");

    document
        .querySelector("nav")
        ?.classList.remove("hidden");
    try {
        const result = await apiRequest("/dashboard");
        const dashboardData = result.dashboard;

        appContent.innerHTML = `
            <section class="dashboard dashboard-page">

                <!-- WEATHER -->

                <div class="card weather-card">
                    <div id="weatherCard"></div>
                </div>

                <!-- TODO -->

                <article class="app-card summary-card">

                    <div class="app-card__header">

                        <div class="app-card__heading">
                            <i
                                class="bi bi-card-checklist app-card__icon"
                                aria-hidden="true"
                            ></i>

                            <h3 class="app-card__title">
                                Today's Tasks
                            </h3>
                        </div>

                    </div>

                    <div
                        id="todo-preview"
                        class="app-card__body"
                    ></div>

                </article>

                <!-- QUICK ACCESS -->

                <article class="app-card quick-card">

                    <div class="app-card__header">

                        <div class="app-card__heading">
                            <i
                                class="bi bi-telephone-fill app-card__icon"
                                aria-hidden="true"
                            ></i>

                            <h3 class="app-card__title">
                                Quick Access
                            </h3>
                        </div>

                    </div>

                    <div
                        id="quick-access-list"
                        class="app-card__body"
                    ></div>

                </article>

                <!-- NEARBY PLACES -->

                <article class="app-card nearby-card">

                    <div class="app-card__header">

                        <div class="app-card__heading">
                            <i
                                class="bi bi-geo-alt-fill app-card__icon"
                                aria-hidden="true"
                            ></i>

                            <h3 class="app-card__title">
                                Nearby Places
                            </h3>
                        </div>

                        <span class="card-badge">
                            Coming Soon
                        </span>

                    </div>

                    <div class="app-card__body">

                        <ul class="app-card__list">

                            <li class="app-card__list-item">
                                <span class="app-card__list-label">
                                    💊 Pharmacy
                                </span>
                            </li>

                            <li class="app-card__list-item">
                                <span class="app-card__list-label">
                                    🏥 Hospital
                                </span>
                            </li>

                            <li class="app-card__list-item">
                                <span class="app-card__list-label">
                                    🛒 Shopping
                                </span>
                            </li>

                            <li class="app-card__list-item">
                                <span class="app-card__list-label">
                                    ⛽ Fuel Station
                                </span>
                            </li>

                        </ul>

                    </div>

                </article>

                <!-- SERVICES -->

                <article class="app-card services-card">

                    <div class="app-card__header">

                        <div class="app-card__heading">
                            <i
                                class="bi bi-tools app-card__icon"
                                aria-hidden="true"
                            ></i>

                            <h3 class="app-card__title">
                                Home Services
                            </h3>
                        </div>

                        <span class="card-badge">
                            Coming Soon
                        </span>

                    </div>

                    <div class="app-card__body">

                        <ul class="app-card__list">

                            <li class="app-card__list-item">
                                <span class="app-card__list-label">
                                    🔧 Plumber
                                </span>
                            </li>

                            <li class="app-card__list-item">
                                <span class="app-card__list-label">
                                    ⚡ Electrician
                                </span>
                            </li>

                            <li class="app-card__list-item">
                                <span class="app-card__list-label">
                                    🌿 Gardener
                                </span>
                            </li>

                            <li class="app-card__list-item">
                                <span class="app-card__list-label">
                                    🛡️ Security
                                </span>
                            </li>

                        </ul>

                    </div>

                </article>

            </section>
        `;

        renderTodoPreview(
            dashboardData.todoSummary
        );

        renderQuickAccess(
            dashboardData.quickAccess
        );

        renderWeatherCard(
            renderWeatherPage
        );

        setActiveNav("home-btn");

    } catch (error) {
        console.error(
            "Dashboard load failed:",
            error
        );

        appContent.innerHTML = `
            <section class="dashboard-error">
                <p>Unable to load the dashboard.</p>
            </section>
        `;
    }
}