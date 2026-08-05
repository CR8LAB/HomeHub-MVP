import {
    apiRequest,
    saveToken
} from "../services/api.js";

import { renderHomePage } from "./dashboardPage.js";
import { renderOnboardingPage } from "./onBoardingPage.js";
import { initHeader } from "../components/header.js";

const appContent =
    document.getElementById("app-content");

export function renderLoginPage() {
    
document.querySelector("header")?.classList.add("hidden");
document.querySelector("nav")?.classList.add("hidden");

    appContent.innerHTML = `
        <section class="setup-container">

            <div class="setup-card">

                <img
                    src="images/homehub-logo.png"
                    class="setup-logo"
                    alt="HomeHub Logo"
                >

                <h1>Welcome Back</h1>

                <p class="setup-tagline">
                    Log in to your household.
                </p>

                <div
                    id="loginMessage"
                    class="setup-message"
                ></div>

                <label for="loginEmail">
                    Email Address
                </label>

                <input
                    id="loginEmail"
                    type="email"
                    placeholder="daniel@example.com"
                    autocomplete="email"
                >

                <label for="loginPassword">
                    Password
                </label>

                <input
                    id="loginPassword"
                    type="password"
                    placeholder="Enter your password"
                    autocomplete="current-password"
                >

                <button
                    id="loginBtn"
                    class="primary-btn"
                    type="button"
                >
                    Login
                </button>

                <button
                    id="activateBtn"
                    class="secondary-btn"
                    type="button"
                >
                    Activate a New HomeHub
                </button>

            </div>

        </section>
    `;

    document
        .getElementById("loginBtn")
        .addEventListener("click", loginUser);

    document
        .getElementById("activateBtn")
        .addEventListener(
            "click",
            renderOnboardingPage
        );
}

async function loginUser() {
    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("loginPassword")
            .value;

    const loginBtn =
        document.getElementById("loginBtn");

    const messageBox =
        document.getElementById("loginMessage");

    messageBox.textContent = "";

    if (!email || !password) {
        messageBox.textContent =
            "Email and password are required.";

        messageBox.className =
            "setup-message error";

        return;
    }

    try {
        loginBtn.disabled = true;
        loginBtn.textContent = "Logging in...";

        const result = await apiRequest(
            "/auth/login",
            {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        if (!result.token) {
            throw new Error(
                "No authentication token was returned."
            );
        }

        saveToken(result.token);

        await initHeader();
        await renderHomePage();

    } catch (error) {
        messageBox.textContent =
            error.message;

        messageBox.className =
            "setup-message error";

        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
    }
}