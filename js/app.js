import { initTodo } from "./todo.js";


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

                <h3>Weather</h3>

                <i class="bi bi-cloud-sun-fill"></i>

                <p>22°C</p>

                <p>Partly Cloudy</p>

            </div>

            <div class="card summary-card">

                <div class="card-header">

                    <h3>Today's Tasks</h3>

                    <button class="view-all-btn">
                        View All
                    </button>

                </div>

                <div id="todo-preview">

                </div>

            </div>

            <div class="card quick-card">

                <h3>Quick Access</h3>

                <div class="quick-item">

                    <i class="bi bi-shield-fill-exclamation"></i>

                    <span>Emergency</span>

                </div>

                <div class="quick-item">

                    <i class="bi bi-house-heart-fill"></i>

                    <span>Home Info</span>

                </div>

                <div class="quick-item">

                    <i class="bi bi-card-checklist"></i>

                    <span>To-Do</span>

                </div>

            </div>

        </section>
    `;
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
}



function renderHomeInfoPage(){
    
};

function renderEmergencyPage(){
    
};


/*event-listeners*/
toDoBtn.addEventListener("click",renderToDo);

homeBtn.addEventListener("click",renderHomePage);

homeInfoBtn.addEventListener("click",renderHomeInfoPage);

emergencyBtn.addEventListener("click",renderEmergencyPage);




//displays homepage

renderHomePage();