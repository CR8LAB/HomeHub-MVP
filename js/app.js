import { initHeader } from "./components/header.js";

import { renderHomePage } from "./pages/dashboardPage.js";
import { renderToDo } from "./pages/todoPage.js";
import { renderHomeInfoPage } from "./pages/homeInfoPage.js";
import { renderEmergencyInfo } from "./pages/emergencyPage.js";
import { renderOnboardingPage } from "./pages/onBoardingPage.js";
import { renderLoginPage } from "./pages/loginPage.js";



const toDoBtn = document.getElementById("todo-btn");
const homeBtn = document.getElementById("home-btn");
const emergencyBtn = document.getElementById("emergency-btn");
const homeInfoBtn = document.getElementById("homeinfo-btn");

toDoBtn.addEventListener("click", renderToDo);
homeBtn.addEventListener("click", renderHomePage);
homeInfoBtn.addEventListener("click", renderHomeInfoPage);
emergencyBtn.addEventListener("click", renderEmergencyInfo);

async function startApp() {
    const token =
        localStorage.getItem("homehubToken");

    if (token) {
        await initHeader();
        await renderHomePage();
    } else {
        renderLoginPage();
    }
}

window.addEventListener(
    "auth:expired",
    () => {
        document
            .querySelector("header")
            ?.classList.add("hidden");

        document
            .querySelector("footer")
            ?.classList.add("hidden");

        renderLoginPage();
    }
);

startApp();