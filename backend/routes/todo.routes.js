import express from "express";

import { authenticateToken } from "../middleware/auth.middleware.js";

import {
    getTodos,
    createTodo,
    updateTodo,
    toggleTodoComplete,
    deleteTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getTodos);
router.post("/", authenticateToken, createTodo);
router.put("/:id", authenticateToken, updateTodo);
router.patch("/:id/complete", authenticateToken, toggleTodoComplete);
router.delete("/:id", authenticateToken, deleteTodo);

export default router;