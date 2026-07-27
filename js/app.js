import { initTodo, loadTasks } from "./pages/todoPage.js";
import { getTasks } from "./pages/todoPage.js";
import { saveData, loadData } from "./services/storage.js";
import {initHomeInfo} from "./pages/homeInfoPage.js";
import { initEmergency } from "./pages/emergency.js";
import { renderWeatherCard, initWeather } from "./weather/weather.js";
import { setActiveNav } from "./components/navigation.js";
import { renderQuickAccess } from "./components/quickAccess.js";
import { renderTodoPreview } from "./components/todoPreview.js";
import { renderToDo } from "./pages/todoPage.js";
import { renderWeatherPage } from "./pages/weatherPage.js";
import { renderHomeInfoPage } from "./pages/homeInfoPage.js";

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




function renderEmergencyInfo() {

    appContent.innerHTML = `

    <div class="page-header">

        <h2>🚑 Emergency Contacts</h2>

        <p>
            Keep important emergency and household contacts in one place.
        </p>

    </div>

    <!-- ================= EMERGENCY SERVICES ================= -->

    <div class="section">

        <h3>🚨 Emergency Services</h3>

        <div class="form-group">

            <label for="policePhone">
                Police Number
            </label>

            <input
                type="tel"
                id="policePhone"
                placeholder="e.g. 10111"
            >

        </div>

        <div class="form-group">

            <label for="ambulancePhone">
                Ambulance Number
            </label>

            <input
                type="tel"
                id="ambulancePhone"
                placeholder="e.g. 10177"
            >

        </div>

        <div class="form-group">

            <label for="firePhone">
                Fire Department Number
            </label>

            <input
                type="tel"
                id="firePhone"
                placeholder="Fire Department Number"
            >

        </div>

    </div>

    <!-- ================= SECURITY ================= -->

    <div class="section">

        <h3>🛡 Security</h3>

        <div class="form-group">

            <label for="securityCompany">
                Security Company
            </label>

            <input
                type="text"
                id="securityCompany"
                placeholder="Company Name"
            >

        </div>

        <div class="form-group">

            <label for="securityPhone">
                Security Contact Number
            </label>

            <input
                type="tel"
                id="securityPhone"
                placeholder="Security Contact Number"
            >

        </div>

    </div>

    <!-- ================= FAMILY & MEDICAL ================= -->

    <div class="section">

        <h3>👨‍👩‍👧 Family & Medical</h3>

        <div class="form-group">

            <label for="familyName">
                Primary Family Contact
            </label>

            <input
                type="text"
                id="familyName"
                placeholder="Full Name"
            >

        </div>

        <div class="form-group">

            <label for="familyPhone">
                Primary Contact Number
            </label>

            <input
                type="tel"
                id="familyPhone"
                placeholder="Phone Number"
            >

        </div>

        <div class="form-group">

            <label for="doctorName">
                Family Doctor
            </label>

            <input
                type="text"
                id="doctorName"
                placeholder="Doctor Name"
            >

        </div>

        <div class="form-group">

            <label for="doctorPhone">
                Doctor Contact Number
            </label>

            <input
                type="tel"
                id="doctorPhone"
                placeholder="Doctor Contact Number"
            >

        </div>

    </div>

    <!-- ================= SAVE BUTTON ================= -->

    <div class="homeinfo-actions">

        <button id="saveEmergencyBtn">

            Save Information

        </button>

    </div>

    `;

    initEmergency();
setActiveNav("emergency-btn");
}



/*event-listeners*/
toDoBtn.addEventListener("click",renderToDo);

homeBtn.addEventListener("click",renderHomePage);

homeInfoBtn.addEventListener("click",renderHomeInfoPage);

emergencyBtn.addEventListener("click",renderEmergencyInfo);




//displays homepage

loadTasks();

renderHomePage();

