import {
    apiRequest,
    removeToken
} from "../services/api.js";

import { renderLoginPage } from "./loginPage.js";
import { setActiveNav } from "../components/navigation.js";

const appContent =
    document.getElementById("app-content");

export async function renderSettingsPage() {
    try {
        const result =
            await apiRequest("/auth/me");

        const user = result.user;

        appContent.innerHTML = `
            <section class="settings-page">

                <div class="page-header">
                    <h2>⚙ Settings</h2>

                    <p>
                        Manage your HomeHub account
                        and household information.
                    </p>
                </div>

                <section class="settings-profile">

                    <div class="settings-avatar">
                        <i class="bi bi-person-fill"></i>
                    </div>

                    <div class="settings-profile-info">

                        <h3>
                            ${user.firstName}
                            ${user.lastName}
                        </h3>

                        <span class="settings-role">
                            ${formatRole(user.role)}
                        </span>

                    </div>

                </section>

                <section class="settings-section">

                    <h3>Account</h3>

                    <div class="settings-row">

                        <div class="settings-row-icon">
                            <i class="bi bi-envelope"></i>
                        </div>

                        <div>
                            <small>Email</small>

                            <p>
                                ${user.email || "Not set"}
                            </p>
                        </div>

                    </div>

                    <div class="settings-row">

                        <div class="settings-row-icon">
                            <i class="bi bi-telephone"></i>
                        </div>

                        <div>
                            <small>Phone</small>

                            <p>
                                ${user.phoneNumber || "Not set"}
                            </p>
                        </div>

                    </div>

                </section>

                <section class="settings-section">

                    <h3>Household</h3>

                    <div class="settings-row">

                        <div class="settings-row-icon">
                            <i class="bi bi-house-heart"></i>
                        </div>

                        <div>
                            <small>Household</small>

                            <p>
                                ${user.householdName}
                            </p>
                        </div>

                    </div>

                    <div class="settings-row">

                        <div class="settings-row-icon">
                            <i class="bi bi-geo-alt"></i>
                        </div>

                        <div>
                            <small>City</small>

                            <p>
                                ${user.city}
                            </p>
                        </div>

                    </div>

                </section>

                <section class="settings-section">

                    <button
                        class="settings-menu-btn"
                        type="button"
                        disabled
                    >
                        <span>
                            <i class="bi bi-bell"></i>
                            Notifications
                        </span>

                        <small>
                            Coming Soon
                        </small>
                    </button>

                    <button
                        class="settings-menu-btn"
                        type="button"
                        disabled
                    >
                        <span>
                            <i class="bi bi-lock"></i>
                            Change Password
                        </span>

                        <small>
                            Coming Soon
                        </small>
                    </button>

                </section>

                <button
                    id="logoutBtn"
                    class="logout-btn"
                    type="button"
                >
                    <i class="bi bi-box-arrow-right"></i>

                    Logout
                </button>

            </section>
        `;

        document
            .getElementById("logoutBtn")
            .addEventListener(
                "click",
                logoutUser
            );

        /*
         Settings isn't part of the bottom navigation,
         so remove the active state from the nav.
        */
        document
            .querySelectorAll(".nav-btn")
            .forEach(button => {
                button.classList.remove("active");
            });

    } catch (error) {
    console.error(
        "Settings load failed:",
        error
    );

    const token =
        localStorage.getItem("homehubToken");

    // Authentication failure has already
    // redirected the user to Login.
    if (!token) {
        return;
    }

    appContent.innerHTML = `
        <section class="dashboard-error">
            <p>
                Unable to load settings.
            </p>
        </section>
    `;
}
}

function formatRole(role) {
    if (!role) {
        return "Member";
    }

    return role
        .charAt(0)
        .toUpperCase() +
        role
            .slice(1)
            .toLowerCase();
}

function logoutUser() {
    removeToken();

    document
        .querySelector("header")
        ?.classList.add("hidden");

    document
        .querySelector("nav")
        ?.classList.add("hidden");

    renderLoginPage();
}