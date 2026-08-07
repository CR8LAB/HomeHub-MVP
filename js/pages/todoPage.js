import { apiRequest } from "../services/api.js";
import { setActiveNav } from "../components/navigation.js";
import { showToast } from "../components/toast.js";

const tasks = [];

const appContent =
    document.getElementById("app-content");

/* ==========================================
   INIT TODO PAGE
========================================== */

export async function initTodo() {
    const taskInput =
        document.getElementById("taskName");

    const saveBtn =
        document.getElementById("saveBtn");

    await fetchTodos();

    saveBtn.addEventListener(
        "click",
        async () => {
            const title =
                taskInput.value.trim();

            if (!title) {
                showToast(
                    "Please enter a task.",
                    "warning"
                );

                return;
            }

            try {
                await apiRequest(
                    "/todos",
                    {
                        method: "POST",

                        body: JSON.stringify({
                            title
                        })
                    }
                );

                taskInput.value = "";

                showToast(
                    "Task added.",
                    "success"
                );

                await fetchTodos();

            } catch (error) {
                console.error(
                    "Create todo failed:",
                    error.message
                );

                showToast(
                    error.message ||
                    "Unable to add task.",
                    "error"
                );
            }
        }
    );
}

/* ==========================================
   LOAD TODOS
========================================== */

async function fetchTodos() {
    try {
        const result =
            await apiRequest("/todos");

        tasks.length = 0;

        result.todos.forEach((todo) => {
            tasks.push(todo);
        });

        renderTasks();

    } catch (error) {
        console.error(
            "Load todos failed:",
            error.message
        );

        showToast(
            error.message ||
            "Unable to load tasks.",
            "error"
        );
    }
}

/* ==========================================
   CREATE TODO ELEMENT
========================================== */

function createTaskElement(task) {
    const li =
        document.createElement("li");

    /* Checkbox */

    const completeCheck =
        document.createElement("input");

    completeCheck.type = "checkbox";

    completeCheck.checked =
        task.completed;

    completeCheck.classList.add(
        "completeCheck"
    );

    completeCheck.addEventListener(
        "change",
        async () => {
            try {
                await apiRequest(
                    `/todos/${task.id}/complete`,
                    {
                        method: "PATCH"
                    }
                );

                showToast(
                    "Task updated.",
                    "success"
                );

                await fetchTodos();

            } catch (error) {
                console.error(
                    "Complete todo failed:",
                    error.message
                );

                /*
                 Put checkbox back to its
                 previous state if request fails.
                */

                completeCheck.checked =
                    task.completed;

                showToast(
                    error.message ||
                    "Unable to update task.",
                    "error"
                );
            }
        }
    );

    /* Task name */

    const taskName =
        document.createElement("span");

    taskName.textContent =
        task.title;

    taskName.classList.add(
        "task-name"
    );

    if (task.completed) {
        taskName.classList.add(
            "completed"
        );
    }

    /* Clear button */

    const clearBtn =
        document.createElement("button");

    clearBtn.textContent = "Clear";

    clearBtn.classList.add(
        "clear-btn"
    );

    clearBtn.addEventListener(
        "click",
        async () => {
            try {
                await apiRequest(
                    `/todos/${task.id}`,
                    {
                        method: "DELETE"
                    }
                );

                showToast(
                    "Task removed.",
                    "info"
                );

                await fetchTodos();

            } catch (error) {
                console.error(
                    "Delete todo failed:",
                    error.message
                );

                showToast(
                    error.message ||
                    "Unable to remove task.",
                    "error"
                );
            }
        }
    );

    li.appendChild(
        completeCheck
    );

    li.appendChild(
        taskName
    );

    li.appendChild(
        clearBtn
    );

    return li;
}

/* ==========================================
   RENDER TODOS
========================================== */

function renderTasks() {
    const taskList =
        document.getElementById("taskList");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <li class="empty-todo-message">
                No tasks yet.
            </li>
        `;

        return;
    }

    tasks.forEach((task) => {
        const li =
            createTaskElement(task);

        taskList.appendChild(li);
    });
}

/* ==========================================
   GET TASKS
========================================== */

export function getTasks() {
    return tasks;
}

/* ==========================================
   RENDER TODO PAGE
========================================== */

export async function renderToDo() {
    appContent.innerHTML = `
        <section class="todo-page">

            <div class="app-card">

                <h2>
                    To Do List
                </h2>

                <input
                    id="taskName"
                    placeholder="Enter a task"
                >

                <button
                    id="saveBtn"
                    type="button"
                >
                    Add Task
                </button>

                <ul id="taskList"></ul>

            </div>

        </section>
    `;

    setActiveNav("todo-btn");

    await initTodo();
}