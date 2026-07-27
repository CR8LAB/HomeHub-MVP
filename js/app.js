import { initTodo, loadTasks } from "./pages/todoPage.js";
import { getTasks } from "./pages/todoPage.js";
import { saveData, loadData } from "./services/storage.js";
import {initHomeInfo} from "./pages/homeInfoPage.js";
import { initEmergency } from "./pages/emergencyPage.js";
import { renderWeatherCard, initWeather } from "./weather/weather.js";
import { setActiveNav } from "./components/navigation.js";
import { renderQuickAccess } from "./components/quickAccess.js";
import { renderTodoPreview } from "./components/todoPreview.js";
import { renderToDo } from "./pages/todoPage.js";
import { renderWeatherPage } from "./pages/weatherPage.js";
import { renderHomeInfoPage } from "./pages/homeInfoPage.js";
import { renderEmergencyInfo } from "./pages/emergencyPage.js";


const appContent = document.getElementById("app-content");


/* nav-btns */

const toDoBtn = document.getElementById("todo-btn");
const homeBtn = document.getElementById("home-btn");
const emergencyBtn = document.getElementById("emergency-btn");
const homeInfoBtn = document.getElementById("homeinfo-btn");




/* Functions */ 

function renderHomePage() {
    appContent.innerHTML = `
        <section class="dashboard">

           <div class="card weather-card">

    <div id="weatherCard"></div>

</div>

            <div class="card summary-card">

                <div class="card-header">

                    <h3>Today's Tasks</h3>

                </div>

                <div id="todo-preview">

                </div>

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


/*event-listeners*/
toDoBtn.addEventListener("click",renderToDo);

homeBtn.addEventListener("click",renderHomePage);

homeInfoBtn.addEventListener("click",renderHomeInfoPage);

emergencyBtn.addEventListener("click",renderEmergencyInfo);




//displays homepage

loadTasks();

renderHomePage();

