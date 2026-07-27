import { initTodo, loadTasks } from "./pages/todo.js";
import { getTasks } from "./pages/todo.js";
import { saveData, loadData } from "./services/storage.js";
import {initHomeInfo} from "./pages/homeinfo.js";
import { initEmergency } from "./pages/emergency.js";
import { renderWeatherCard, initWeather } from "./weather/weather.js";
import { setActiveNav } from "./components/navigation.js";

/* DOM references*/
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



function renderToDo() {
    appContent.innerHTML = `
        <section class="todo-page">
            <div class="card">
                <h2>To Do List</h2>

                <input id="taskName" placeholder="Enter a task">

                <button id="saveBtn">
                    Add Task
                </button>

                <ul id="taskList"></ul>
            </div>
        </section>
    `;

    initTodo();
    setActiveNav("todo-btn");
}

function renderWeatherPage() {

    appContent.innerHTML = `
        <div class="page-header">

            <h2>☀️ Weather</h2>

            <p>Current weather and forecast</p>

        </div>

        <div id="weather-content"></div>
    `;

    initWeather();

}

function renderHomeInfo() {

    appContent.innerHTML = `

    <div class="page-header">
        <h2>🏠 Home Information</h2>
        <p>Store important information about your property.</p>
    </div>

    <!-- ================= PROPERTY ================= -->

    <div class="section active">

        <button class="section-header">
            <span class="arrow">▼</span>
            Property
        </button>

        <div class="section-content">

            <div class="form-group">
                <label for="nickname">Household Nickname</label>
                <input type="text" id="nickname" placeholder="e.g. Home">
            </div>

            <div class="form-group">
                <label for="address">Street Address</label>
                <input type="text" id="address" placeholder="Street Address">
            </div>

            <div class="form-group">
                <label for="municipalityAccount">Municipality Account Number</label>
                <input type="text" id="municipalityAccount" placeholder="Account Number">
            </div>

        </div>

    </div>

    <!-- ================= UTILITIES ================= -->

    <div class="section">

        <button class="section-header">
            <span class="arrow">▶</span>
            Utilities
        </button>

        <div class="section-content">

            <div class="form-group">
                <label for="electricityMeter">Electricity Meter Number</label>
                <input type="text" id="electricityMeter">
            </div>

            <div class="form-group">
                <label for="waterMeter">Water Meter Number</label>
                <input type="text" id="waterMeter">
            </div>

            <div class="form-group">
                <label for="electricityBox">Electricity Box Number</label>
                <input type="text" id="electricityBox">
            </div>

        </div>

    </div>

    <!-- ================= MUNICIPAL SERVICES ================= -->

    <div class="section">

        <button class="section-header">
            <span class="arrow">▶</span>
            Municipal Services
        </button>

        <div class="section-content">

            <div class="form-group">
                <label for="municipalityPhone">Municipality Contact Number</label>
                <input type="text" id="municipalityPhone">
            </div>

            <div class="form-group">
                <label for="electricityFaults">Electricity Fault Number</label>
                <input type="text" id="electricityFaults">
            </div>

            <div class="form-group">
                <label for="waterFaults">Water Fault Number</label>
                <input type="text" id="waterFaults">
            </div>

            <div class="form-group">
                <label for="refuseDay">Refuse Collection Day</label>

                <select id="refuseDay">

                    <option value="">Select Day</option>

                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>

                </select>

            </div>

        </div>

    </div>

    <!-- ================= SECURITY ================= -->

    <div class="section">

        <button class="section-header">
            <span class="arrow">▶</span>
            Security
        </button>

        <div class="section-content">

            <div class="form-group">
                <label for="securityCompany">Security Company</label>
                <input type="text" id="securityCompany">
            </div>

            <div class="form-group">
                <label for="securityPhone">Security Contact Number</label>
                <input type="text" id="securityPhone">
            </div>

            <div class="form-group">
                <label for="alarmCompany">Alarm Company</label>
                <input type="text" id="alarmCompany">
            </div>

            <div class="form-group">
                <label for="alarmPhone">Alarm Contact Number</label>
                <input type="text" id="alarmPhone">
            </div>

        </div>

    </div>

    <!-- ================= ACCESS ================= -->

    <div class="section">

        <button class="section-header">
            <span class="arrow">▶</span>
            Access
        </button>

        <div class="section-content">

            <div class="form-group">
                <label for="gateCode">Gate Code</label>
                <input type="text" id="gateCode">
            </div>

            <div class="form-group">
                <label for="wifiName">Wi-Fi Name</label>
                <input type="text" id="wifiName">
            </div>

            <div class="form-group">

                <label for="wifiPassword">Wi-Fi Password</label>

                <div class="password-group">

                    <input
                        type="password"
                        id="wifiPassword"
                    >

                    <button
                        type="button"
                        id="toggleWifiPassword"
                    >
                        👁
                    </button>

                </div>

            </div>

        </div>

    </div>

    <!-- ================= ACTION BUTTONS ================= -->

    <div class="homeinfo-actions">

        <button id="saveHomeInfoBtn">
            Save Information
        </button>

        

    </div>

    `;

    initHomeInfo();
setActiveNav("homeinfo-btn");
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


function renderQuickAccess() {

    const container = document.getElementById("quick-access-list");

    const emergency = loadData("emergencyInfo") || {};

    const contacts = [
        {
            icon: "🚓",
            name: "Police",
            phone: emergency.policePhone
        },
        {
            icon: "🚑",
            name: "Ambulance",
            phone: emergency.ambulancePhone
        },
        {
            icon: "🚒",
            name: "Fire",
            phone: emergency.firePhone
        },
        {
            icon: "🛡",
            name: "Security",
            phone: emergency.securityPhone
        }
    ];

    container.innerHTML = "";

    contacts.forEach(contact => {

        const item = document.createElement("div");
        item.className = "quick-item";

        if (contact.phone) {

            item.innerHTML = `
                <span>${contact.icon} ${contact.name}</span>
               <button class="call-btn">
    <i class="bi bi-telephone-fill"></i>
</button>
            `;

            item.querySelector(".call-btn").addEventListener("click", () => {
                window.location.href = `tel:${contact.phone}`;
            });

        } else {

            item.innerHTML = `
                <span>${contact.icon} ${contact.name}</span>
                <small>Not set</small>
            `;

        }

        container.appendChild(item);

    });

}



//Preview card  
function renderTodoPreview(){

const todoPreview = document.getElementById("todo-preview")

const tasks = getTasks();

const totalTasks = tasks.length;

const remaining = remainingTasks(totalTasks)



//build the entire element everytime

todoPreview.innerHTML = `
    <p>${remaining} of ${totalTasks} Remaining</p>
    <p>${completedTasks()} completed</p>
    <p>${Math.round(getProgress())}% Complete</p>

    <div class="todo-progress">
        <div class="todo-progress-fill"></div>
    </div>

    <button id="view-all-btn" class="view-all-btn">
        View All
    </button>
`;


const viewAllBtn = document.getElementById("view-all-btn");

viewAllBtn.addEventListener("click", () => {
    renderToDo();
});

function completedTasks(){

    let completed = 0 ;

    tasks.forEach(task => {
        if(task.completed === true){
            completed++;
        }
    });
    return completed;
}

function remainingTasks(totalTasks){

   return  totalTasks - completedTasks()
     
}


function getProgress() {

    const totalTasks = getTasks().length;
    const completed = completedTasks();

    if (totalTasks === 0) {
        return 0;
    }

    return(completed / totalTasks) * 100;
    
}



const progressFill = document.querySelector(".todo-progress-fill");

if (progressFill) {
    progressFill.style.width = getProgress() + "%";
}
console.log("Progress:", getProgress());
console.log("Width:", progressFill.style.width);
console.log(progressFill);
};



/*event-listeners*/
toDoBtn.addEventListener("click",renderToDo);

homeBtn.addEventListener("click",renderHomePage);

homeInfoBtn.addEventListener("click",renderHomeInfo);

emergencyBtn.addEventListener("click",renderEmergencyInfo);




//displays homepage

loadTasks();

renderHomePage();

