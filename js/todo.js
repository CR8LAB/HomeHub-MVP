

const tasks = [];


//input elements
export function initTodo() {

    const taskInput = document.getElementById("taskName");
    const saveBtn = document.getElementById("saveBtn");

    loadTasks();

    renderTasks();   // <-- render ONLY on the Todo page

    saveBtn.addEventListener("click", () => {

        if (taskInput.value.trim() === "") {
            return;
        }

        addTask(taskInput.value);

        taskInput.value = "";

    });

}


//only creates the object
function createTask(taskName){
return{
task:taskName,
completed:false

};

}

//adds only the object to array
function addTask(taskName){
tasks.push(createTask(taskName));

 saveTasks();

renderTasks()


}


function createTaskElement(task, index) {

    // Create list item
    const li = document.createElement("li");

    // Create checkbox
    const completeCheck = document.createElement("input");
    completeCheck.type = "checkbox";
    completeCheck.checked = task.completed;
    completeCheck.classList.add("completeCheck");

    completeCheck.addEventListener("change", () => {
        task.completed = completeCheck.checked;

        saveTasks();
        renderTasks();
    });

    // Create task name
    const taskName = document.createElement("span");
    taskName.textContent = task.task;
    taskName.classList.add("task-name");

    // Create Clear button
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear";
    clearBtn.classList.add("clear-btn");

    clearBtn.addEventListener("click", () => {
        clearTask(index);
    });

    // Add elements in the correct order
    li.appendChild(completeCheck);
    li.appendChild(taskName);
    li.appendChild(clearBtn);

    return li;
}



function renderTasks() {
    const taskList = document.getElementById("taskList");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = createTaskElement(task, index);
        taskList.appendChild(li);
    });
}

// clear task //



function clearTask(index){

tasks.splice(index,1);

 saveTasks();

renderTasks()

}

//save tasks in localStorage //

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks)) // converts the array in string
};

// load from local storage

export function loadTasks(){
const storedData = localStorage.getItem("tasks"); 
  
if( storedData === null){
    return ;
}

const loadedTasks = JSON.parse(storedData) // turns string back into array

tasks.length = 0;   // Clear existing tasks

loadedTasks.forEach((task) =>{ //loop through each loaded task and add to already existing array
tasks.push(task)
})


};

function completeTask(index){

    tasks[index].completed = true;

    saveTasks(); // after updating always save and render again

    renderTasks();

};

export function getTasks(){
   
return tasks

}