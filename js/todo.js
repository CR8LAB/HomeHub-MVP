

const tasks = [];


//input elements
export function initTodo() {

const taskInput = document.getElementById("taskName");
    const saveBtn = document.getElementById("saveBtn");
    const taskList = document.getElementById("taskList");

loadTasks()

saveBtn.addEventListener("click", () => {

    if (taskInput.value.trim() === "") {
        return;
    }

    addTask(taskInput.value);

   

    taskInput.value = ""; // clear input field

    
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


function createTaskElement(task,index){
 const li = document.createElement("li");
        li.textContent = task.task;

const button = document.createElement("button")
        button.textContent = "clear"  ;

li.appendChild(button)

button.addEventListener("click", () => {

clearTask(index);

})

        return li
}



function renderTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = createTaskElement(task,index);
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

function loadTasks(){
const storedData = localStorage.getItem("tasks"); 
  
if( storedData === null){
    return ;
}

const loadedTasks = JSON.parse(storedData) // turns string back into array



loadedTasks.forEach((task) =>{ //loop through each loaded task and add to already existing array
tasks.push(task)
})

renderTasks()
};