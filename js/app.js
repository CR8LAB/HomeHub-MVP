import { renderHomePage } from "./pages/dashboardPage.js";
import { renderToDo } from "./pages/todoPage.js";
import { renderHomeInfoPage } from "./pages/homeInfoPage.js";
import { renderEmergencyInfo } from "./pages/emergencyPage.js";
import { renderOnboardingPage } from "./pages/onBoardingPage.js";

const toDoBtn = document.getElementById("todo-btn");
const homeBtn = document.getElementById("home-btn");
const emergencyBtn = document.getElementById("emergency-btn");
const homeInfoBtn = document.getElementById("homeinfo-btn");

toDoBtn.addEventListener("click", renderToDo);
homeBtn.addEventListener("click", renderHomePage);
homeInfoBtn.addEventListener("click", renderHomeInfoPage);
emergencyBtn.addEventListener("click", renderEmergencyInfo);

const token = localStorage.getItem("homehubToken");

if (token) {
    renderHomePage();
} else {
    renderOnboardingPage();
}