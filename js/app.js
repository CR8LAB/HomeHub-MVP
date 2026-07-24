import { initTodo, loadTasks } from "./todo.js";
import { getTasks } from "./todo.js";

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
    renderTodoPreview();
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

homeInfoBtn.addEventListener("click",renderHomeInfoPage);

emergencyBtn.addEventListener("click",renderEmergencyPage);




//displays homepage

loadTasks();

renderHomePage();

