import {
    apiRequest,
    saveToken
} from "../services/api.js";

import { renderHomePage } from "./dashboardPage.js";

const appContent =
    document.getElementById("app-content");

const setup = {
    step: 1,

    activationCode: "",

    familyName: "",
    city: "",

    householdId: null,

    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

/* =========================================================
   START ONBOARDING
========================================================= */

export function renderOnboardingPage() {

    document.querySelector("header")?.classList.add("hidden");
document.querySelector("nav")?.classList.add("hidden");

    resetSetup();
    renderStep();
}

function resetSetup() {
    setup.step = 1;

    setup.activationCode = "";

    setup.familyName = "";
    setup.city = "";

    setup.householdId = null;

    setup.firstName = "";
    setup.lastName = "";
    setup.email = "";
    setup.password = "";
}

/* =========================================================
   RENDER CURRENT STEP
========================================================= */

function renderStep() {
    switch (setup.step) {
        case 1:
            renderWelcomeStep();
            break;

        case 2:
            renderActivationStep();
            break;

        case 3:
            renderHouseholdStep();
            break;

        case 4:
            renderOwnerStep();
            break;

        default:
            renderWelcomeStep();
    }
}

/* =========================================================
   PROGRESS BAR
========================================================= */

function progressBar() {
    const steps = [1, 2, 3, 4];

    return `
        <div class="wizard-progress">

            ${steps.map(step => `
                <div class="wizard-step">

                    <div
                        class="circle
                        ${setup.step >= step ? "active" : ""}"
                    >
                        ${step}
                    </div>

                    ${
                        step < 4
                            ? `
                                <div
                                    class="line
                                    ${setup.step > step ? "active" : ""}"
                                ></div>
                            `
                            : ""
                    }

                </div>
            `).join("")}

        </div>
    `;
}

/* =========================================================
   MESSAGE HELPER
========================================================= */

function showMessage(
    message,
    type = "error"
) {
    const messageBox =
        document.getElementById("setupMessage");

    if (!messageBox) {
        return;
    }

    messageBox.textContent = message;
    messageBox.className =
        `setup-message ${type}`;
}

function clearMessage() {
    const messageBox =
        document.getElementById("setupMessage");

    if (!messageBox) {
        return;
    }

    messageBox.textContent = "";
    messageBox.className = "setup-message";
}

/* =========================================================
   STEP 1 — WELCOME
========================================================= */

function renderWelcomeStep() {
    appContent.innerHTML = `
        <section class="setup-container">

            <div class="setup-card">

                <img
                    src="images/homehub-logo.png"
                    class="setup-logo"
                    alt="HomeHub Logo"
                >

                <h1>HomeHub</h1>

                <p class="setup-tagline">
                    Your Home. Connected.
                </p>

                <h2>Setup (1 of 4)</h2>

                ${progressBar()}

                <p class="setup-text">
                    Welcome to HomeHub.
                    This quick setup will activate your
                    household and create the first owner account.
                </p>

                <button
                    id="startBtn"
                    class="primary-btn"
                    type="button"
                >
                    Get Started
                </button>

            </div>

        </section>
    `;

    document
        .getElementById("startBtn")
        .addEventListener("click", () => {
            setup.step = 2;
            renderStep();
        });
}

/* =========================================================
   STEP 2 — ACTIVATION CODE
========================================================= */

function renderActivationStep() {
    appContent.innerHTML = `
        <section class="setup-container">

            <div class="setup-card">

                <img
                    src="images/homehub-logo.png"
                    class="setup-logo"
                    alt="HomeHub Logo"
                >

                <h1>HomeHub</h1>

                <h2>Setup (2 of 4)</h2>

                ${progressBar()}

                <div
                    id="setupMessage"
                    class="setup-message"
                ></div>

                <label for="activationCode">
                    Activation Code
                </label>

                <input
                    id="activationCode"
                    type="text"
                    placeholder="HH-000001"
                    value="${setup.activationCode}"
                    autocomplete="off"
                >

                <div class="wizard-buttons">

                    <button
                        id="backBtn"
                        class="secondary-btn"
                        type="button"
                    >
                        Back
                    </button>

                    <button
                        id="nextBtn"
                        class="primary-btn"
                        type="button"
                    >
                        Validate Code
                    </button>

                </div>

            </div>

        </section>
    `;

    document
        .getElementById("backBtn")
        .addEventListener("click", () => {
            setup.step = 1;
            renderStep();
        });

    document
        .getElementById("nextBtn")
        .addEventListener(
            "click",
            validateActivationCode
        );
}

/* =========================================================
   VALIDATE ACTIVATION CODE
========================================================= */

async function validateActivationCode() {
    const activationInput =
        document.getElementById("activationCode");

    const nextBtn =
        document.getElementById("nextBtn");

    const activationCode =
        activationInput.value.trim();

    clearMessage();

    if (!activationCode) {
        showMessage(
            "Please enter your activation code."
        );

        return;
    }

    try {
        nextBtn.disabled = true;
        nextBtn.textContent = "Checking...";

        const result = await apiRequest(
            "/onboarding/validate",
            {
                method: "POST",

                body: JSON.stringify({
                    activationCode
                })
            }
        );

        setup.activationCode = activationCode;

        showMessage(
            result.message ||
            "Activation code is valid.",
            "success"
        );

        setTimeout(() => {
            setup.step = 3;
            renderStep();
        }, 500);

    } catch (error) {
        showMessage(error.message);

        nextBtn.disabled = false;
        nextBtn.textContent = "Validate Code";
    }
}

/* =========================================================
   STEP 3 — HOUSEHOLD
========================================================= */

function renderHouseholdStep() {
    appContent.innerHTML = `
        <section class="setup-container">

            <div class="setup-card">

                <img
                    src="images/homehub-logo.png"
                    class="setup-logo"
                    alt="HomeHub Logo"
                >

                <h1>HomeHub</h1>

                <p class="setup-tagline">
                    Your Home. Connected.
                </p>

                <h2>Setup (3 of 4)</h2>

                ${progressBar()}

                <div
                    id="setupMessage"
                    class="setup-message"
                ></div>

                <label for="familyName">
                    Family Name
                </label>

                <input
                    id="familyName"
                    type="text"
                    placeholder="Kleynhans"
                    value="${setup.familyName}"
                >

                <label for="city">
                    City
                </label>

                <input
                    id="city"
                    type="text"
                    placeholder="Bloemfontein"
                    value="${setup.city}"
                >

                <div class="wizard-buttons">

                    <button
                        id="backBtn"
                        class="secondary-btn"
                        type="button"
                    >
                        Back
                    </button>

                    <button
                        id="nextBtn"
                        class="primary-btn"
                        type="button"
                    >
                        Create Household
                    </button>

                </div>

            </div>

        </section>
    `;

    document
        .getElementById("backBtn")
        .addEventListener("click", () => {
            setup.step = 2;
            renderStep();
        });

    document
        .getElementById("nextBtn")
        .addEventListener(
            "click",
            createHousehold
        );
}

/* =========================================================
   CREATE HOUSEHOLD
========================================================= */

async function createHousehold() {
    const familyName =
        document
            .getElementById("familyName")
            .value
            .trim();

    const city =
        document
            .getElementById("city")
            .value
            .trim();

    const nextBtn =
        document.getElementById("nextBtn");

    clearMessage();

    if (!familyName || !city) {
        showMessage(
            "Family name and city are required."
        );

        return;
    }

    try {
        nextBtn.disabled = true;
        nextBtn.textContent =
            "Creating Household...";

        const result = await apiRequest(
            "/onboarding/create-household",
            {
                method: "POST",

                body: JSON.stringify({
                    activationCode:
                        setup.activationCode,

                    familyName,
                    city
                })
            }
        );

        setup.familyName = familyName;
        setup.city = city;

        setup.householdId =
            result.household.id;

        showMessage(
            result.message ||
            "Household created successfully.",
            "success"
        );

        setTimeout(() => {
            setup.step = 4;
            renderStep();
        }, 500);

    } catch (error) {
        showMessage(error.message);

        nextBtn.disabled = false;
        nextBtn.textContent =
            "Create Household";
    }
}

/* =========================================================
   STEP 4 — OWNER ACCOUNT
========================================================= */

function renderOwnerStep() {
    appContent.innerHTML = `
        <section class="setup-container">

            <div class="setup-card">

                <img
                    src="images/homehub-logo.png"
                    class="setup-logo"
                    alt="HomeHub Logo"
                >

                <h1>HomeHub</h1>

                <h2>Setup (4 of 4)</h2>

                ${progressBar()}

                <div
                    id="setupMessage"
                    class="setup-message"
                ></div>

                <p class="setup-text">
                    Create the first owner account for
                    the ${setup.familyName} household.
                </p>

                <label for="firstName">
                    First Name
                </label>

                <input
                    id="firstName"
                    type="text"
                    placeholder="Daniel"
                    value="${setup.firstName}"
                    autocomplete="given-name"
                >

                <label for="lastName">
                    Last Name
                </label>

                <input
                    id="lastName"
                    type="text"
                    placeholder="Kleynhans"
                    value="${setup.lastName}"
                    autocomplete="family-name"
                >

                <label for="email">
                    Email Address
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="daniel@example.com"
                    value="${setup.email}"
                    autocomplete="email"
                >

                <label for="password">
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    autocomplete="new-password"
                >

                <label for="confirmPassword">
                    Confirm Password
                </label>

                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    autocomplete="new-password"
                >

                <div class="wizard-buttons">

                    <button
                        id="backBtn"
                        class="secondary-btn"
                        type="button"
                    >
                        Back
                    </button>

                    <button
                        id="finishBtn"
                        class="primary-btn"
                        type="button"
                    >
                        Finish Setup
                    </button>

                </div>

            </div>

        </section>
    `;

    document
        .getElementById("backBtn")
        .addEventListener("click", () => {
            setup.step = 3;
            renderStep();
        });

    document
        .getElementById("finishBtn")
        .addEventListener(
            "click",
            finishSetup
        );
}

/* =========================================================
   CREATE OWNER → LOGIN → SAVE JWT
========================================================= */

async function finishSetup() {
    const firstName =
        document
            .getElementById("firstName")
            .value
            .trim();

    const lastName =
        document
            .getElementById("lastName")
            .value
            .trim();

    const email =
        document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("password")
            .value;

    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;

    const finishBtn =
        document.getElementById("finishBtn");

    clearMessage();

    if (
        !firstName ||
        !lastName ||
        !email ||
        !password
    ) {
        showMessage(
            "Please complete all owner account fields."
        );

        return;
    }

    if (password.length < 8) {
        showMessage(
            "Password must contain at least 8 characters."
        );

        return;
    }

    if (password !== confirmPassword) {
        showMessage(
            "The passwords do not match."
        );

        return;
    }

    if (!setup.householdId) {
        showMessage(
            "Household information is missing. Please go back and try again."
        );

        return;
    }

    try {
        finishBtn.disabled = true;
        finishBtn.textContent =
            "Creating Account...";

        setup.firstName = firstName;
        setup.lastName = lastName;
        setup.email = email;
        setup.password = password;

        await apiRequest(
            "/onboarding/create-owner",
            {
                method: "POST",

                body: JSON.stringify({
                    householdId:
                        setup.householdId,

                    firstName,
                    lastName,
                    email,
                    password
                })
            }
        );

        finishBtn.textContent =
            "Signing In...";

        const loginResult = await apiRequest(
            "/auth/login",
            {
                method: "POST",

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        if (!loginResult.token) {
            throw new Error(
                "Login succeeded but no token was returned."
            );
        }

        saveToken(loginResult.token);

        showMessage(
            "Setup completed successfully.",
            "success"
        );

        setTimeout(() => {
            renderHomePage();
        }, 500);

    } catch (error) {
        showMessage(error.message);

        finishBtn.disabled = false;
        finishBtn.textContent =
            "Finish Setup";
    }
}