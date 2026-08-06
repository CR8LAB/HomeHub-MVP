import { renderToDo } from "../pages/todoPage.js";

export function renderTodoPreview(todoSummary) {
    const previewContainer =
        document.getElementById("todo-preview");

    if (!previewContainer) {
        return;
    }

    const tasks = todoSummary?.recent ?? [];
    const total = todoSummary?.total ?? 0;
    const completed = todoSummary?.completed ?? 0;
    const remaining = todoSummary?.remaining ?? 0;

    const progress =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    previewContainer.innerHTML = `
        <div class="todo-preview-summary">
            <p>${completed} of ${total} tasks completed</p>

            <div class="todo-progress">
                <div
                    class="todo-progress-fill"
                    style="width: ${progress}%"
                ></div>
            </div>

            <p>${remaining} remaining</p>
        </div>

        <ul class="todo-preview-list">
            ${
                tasks.length === 0
                    ? `<li>No tasks yet.</li>`
                    : tasks.map(task => `
                        <li>
                            <span>
                                ${task.completed ? "✅" : "○"}
                            </span>

                            <span>${task.title}</span>
                        </li>
                    `).join("")
            }
        </ul>

      <button
    id="view-all-todos"
    class="app-card__action"
    type="button"
>
    View All Tasks
</button>
    `;

    const viewAllButton =
        document.getElementById("view-all-todos");

    viewAllButton.addEventListener("click", renderToDo);
}