import { saveData } from "../services/storage.js";
import { renderHomePage } from "./dashboardPage.js";

const appContent = document.getElementById("app-content");

const setup = {
    step: 1,
    activationCode: "",
    familyName: "",
    city: ""
};

export function renderOnboardingPage() {
    setup.step = 1;
    renderStep();
}

function renderStep() {
    switch (setup.step) {
        case 1:
            renderWelcomeStep();
            break;

        case 2:
            renderActivationStep();
            break;

        case 3:
            renderFamilyStep();
            break;
    }
}

function progressBar() {

    const steps = [1,2,3];

    return `
        <div class="wizard-progress">

            ${steps.map(step => `
                <div class="wizard-step">

                    <div class="circle ${setup.step >= step ? "active" : ""}">
                        ${step}
                    </div>

                    ${step < 3
                        ? `<div class="line ${setup.step > step ? "active" : ""}"></div>`
                        : ""
                    }

                </div>
            `).join("")}

        </div>
    `;
}

function renderWelcomeStep() {

    appContent.innerHTML = `

        <section class="setup-container">

            <div class="setup-card">

                <h1>🏠 HomeHub</h1>

                <h2>Setup (1 of 3)</h2>

                ${progressBar()}

                <p class="setup-text">

                    Welcome to HomeHub.

                    This quick setup will prepare your household
                    so everyone can stay connected.

                </p>

                <button id="startBtn" class="primary-btn">
                    Get Started
                </button>

                <button id="skipBtn" class="secondary-btn">
                    Skip (Developer Mode)
                </button>

            </div>

        </section>

    `;

    document.getElementById("startBtn")
        .addEventListener("click", () => {

            setup.step = 2;

            renderStep();

        });

    document.getElementById("skipBtn")
        .addEventListener("click", skipSetup);

}

function renderActivationStep() {

    appContent.innerHTML = `

        <section class="setup-container">

            <div class="setup-card">

                <h1>🏠 HomeHub</h1>

                <h2>Setup (2 of 3)</h2>

                ${progressBar()}

                <label>

                    Activation Code

                </label>

                <input
                    id="activationCode"
                    placeholder="HH-XXXX-XXXX"
                    value="${setup.activationCode}"
                >

                <div class="wizard-buttons">

                    <button id="backBtn" class="secondary-btn">

                        Back

                    </button>

                    <button id="nextBtn" class="primary-btn">

                        Next

                    </button>

                </div>

            </div>

        </section>

    `;

    document.getElementById("backBtn")
        .addEventListener("click", () => {

            setup.step = 1;

            renderStep();

        });

    document.getElementById("nextBtn")
        .addEventListener("click", () => {

            const activationCode =
                document.getElementById("activationCode").value.trim();

            if (activationCode === "") {

                alert("Please enter your activation code.");

                return;

            }

            setup.activationCode = activationCode;

            setup.step = 3;

            renderStep();

        });

}

function renderFamilyStep() {

    appContent.innerHTML = `

        <section class="setup-container">

            <div class="setup-card">

               <img
    src="images/homehub-logo.png"
    class="setup-logo"
    alt="HomeHub Logo">

<h1>HomeHub</h1>

<p class="setup-tagline">

    Your Home.
    Connected.

</p>

                <h2>Setup (3 of 3)</h2>

                ${progressBar()}

                <label>

                    Family Name

                </label>

                <input
                    id="familyName"
                    placeholder="Smith Family"
                    value="${setup.familyName}"
                >

                <label>

                    City

                </label>

                <input
                    id="city"
                    placeholder="Bloemfontein"
                    value="${setup.city}"
                >

                <div class="wizard-buttons">

                    <button id="backBtn" class="secondary-btn">

                        Back

                    </button>

                    <button id="finishBtn" class="primary-btn">

                        Finish Setup

                    </button>

                </div>

            </div>

        </section>

    `;

    document.getElementById("backBtn")
        .addEventListener("click", () => {

            setup.step = 2;

            renderStep();

        });

    document.getElementById("finishBtn")
        .addEventListener("click", finishSetup);

}

function finishSetup() {

    const familyName =
        document.getElementById("familyName").value.trim();

    const city =
        document.getElementById("city").value.trim();

    if (familyName === "" || city === "") {

        alert("Please complete all fields.");

        return;

    }

    setup.familyName = familyName;

    setup.city = city;

    saveData("household", {

        activationCode: setup.activationCode,

        familyName: setup.familyName,

        city: setup.city,

        setupComplete: true

    });

    renderHomePage();

}

function skipSetup() {

    saveData("household", {

        activationCode: "DEV-0001",

        familyName: "Demo Family",

        city: "Bloemfontein",

        setupComplete: true

    });

    renderHomePage();

}