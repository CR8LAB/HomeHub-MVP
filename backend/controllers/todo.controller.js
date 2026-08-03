import {
    getTodosService,
    createTodoService,
    updateTodoService,
    toggleTodoCompleteService,
    deleteTodoService
} from "../services/todo.service.js";

export async function getTodos(req, res) {
    try {
        const result = await getTodosService(
            req.user.householdId
        );

        return res.status(200).json(result);

    } catch (error) {
        console.error("Get todos error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function createTodo(req, res) {
    try {
        const result = await createTodoService(
            req.user.householdId,
            req.body
        );

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (error) {
        console.error("Create todo error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function updateTodo(req, res) {
    try {
        const result = await updateTodoService(
            req.user.householdId,
            req.params.id,
            req.body
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Update todo error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function toggleTodoComplete(req, res) {
    try {
        const result = await toggleTodoCompleteService(
            req.user.householdId,
            req.params.id
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Toggle todo error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function deleteTodo(req, res) {
    try {
        const result = await deleteTodoService(
            req.user.householdId,
            req.params.id
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Delete todo error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}