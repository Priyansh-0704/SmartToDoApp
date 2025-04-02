import express from 'express';
import { createTodo, getTask, updateTodo, deleteTodo } from '../controllers/todo.controller.js';

const router = express.Router();
router.post('/create', createTodo);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);
router.get('/getTask/:id', getTask);

export default router;