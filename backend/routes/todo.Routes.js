import express from 'express';
import { createTodo, updateTodo } from '../controllers/todo.controller.js';

const router = express.Router();
router.post('/create', createTodo);
router.put('/update/:id', updateTodo);

export default router;