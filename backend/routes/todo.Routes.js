import express from 'express';
import { createTodo } from '../controllers/todo.controller.js';
import { updateTodo } from '../controllers/todo.controller.js';
import { deleteTodo } from '../controllers/todo.controller.js';
import { getTask } from '../controllers/todo.controller.js';
import {toggleComplete} from '../controllers/todo.controller.js';

const router = express.Router();
router.post('/create', createTodo);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);
router.get('/getTask/:id', getTask);
router.patch('/toggleCompletion/:id', toggleComplete);

export default router;
