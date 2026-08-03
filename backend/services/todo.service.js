import prisma from "../config/prisma.js";

export async function getTodosService(householdId) {
    const todos = await prisma.todo.findMany({
        where: {
            householdId: Number(householdId)
        },

        orderBy: {
            createdAt: "desc"
        }
    });

    return {
        success: true,
        todos
    };
}

export async function createTodoService(
    householdId,
    todoData
) {
    const { title } = todoData;

    if (!title?.trim()) {
        return {
            success: false,
            message: "Todo title is required."
        };
    }

    const todo = await prisma.todo.create({
        data: {
            householdId: Number(householdId),
            title: title.trim()
        }
    });

    return {
        success: true,
        message: "Todo created successfully.",
        todo
    };
}

export async function updateTodoService(
    householdId,
    todoId,
    todoData
) {
    const id = Number(todoId);

    const existingTodo = await prisma.todo.findFirst({
        where: {
            id,
            householdId: Number(householdId)
        }
    });

    if (!existingTodo) {
        return {
            success: false,
            message: "Todo not found."
        };
    }

    const { title } = todoData;

    if (!title?.trim()) {
        return {
            success: false,
            message: "Todo title is required."
        };
    }

    const todo = await prisma.todo.update({
        where: {
            id
        },

        data: {
            title: title.trim()
        }
    });

    return {
        success: true,
        message: "Todo updated successfully.",
        todo
    };
}

export async function toggleTodoCompleteService(
    householdId,
    todoId
) {
    const id = Number(todoId);

    const existingTodo = await prisma.todo.findFirst({
        where: {
            id,
            householdId: Number(householdId)
        }
    });

    if (!existingTodo) {
        return {
            success: false,
            message: "Todo not found."
        };
    }

    const todo = await prisma.todo.update({
        where: {
            id
        },

        data: {
            completed: !existingTodo.completed
        }
    });

    return {
        success: true,
        message: todo.completed
            ? "Todo marked as completed."
            : "Todo marked as incomplete.",
        todo
    };
}

export async function deleteTodoService(
    householdId,
    todoId
) {
    const id = Number(todoId);

    const existingTodo = await prisma.todo.findFirst({
        where: {
            id,
            householdId: Number(householdId)
        }
    });

    if (!existingTodo) {
        return {
            success: false,
            message: "Todo not found."
        };
    }

    await prisma.todo.delete({
        where: {
            id
        }
    });

    return {
        success: true,
        message: "Todo deleted successfully."
    };
}