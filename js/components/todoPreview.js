import { getTasks } from "../pages/todoPage.js";
import { renderToDo } from "../pages/todoPage.js";

export function renderTodoPreview(){

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
      console.log("View All clicked");
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