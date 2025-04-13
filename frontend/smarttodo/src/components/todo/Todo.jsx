import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import Todocard from './Todocard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import axios from 'axios';

let id = sessionStorage.getItem("userId");

const Todo = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reminderDate: '',
    reminderTime: '',
    priority: '',
    completed: false,
  });

  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTodo = async () => {
    const { title, description, reminderDate, reminderTime, priority } = formData;

    if (!title || !description || !reminderDate || !reminderTime || !priority) {
      toast.error("Please fill out all fields!");
      return;
    }

    const username = sessionStorage.getItem("userId");
    if (!username) {
      toast.error("You are not logged in. Please login first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v2/todo/create", {
        title,
        description,
        completed: false,
        reminderDate,
        reminderTime,
        priority,
        id
      });

      if (response.status === 201) {
        toast.success("Your Task is Added and Email Sent! ✅");

        setTodos((prevTodos) => [...prevTodos, response.data.todo]);

        setFormData({
          title: '',
          description: '',
          reminderDate: '',
          reminderTime: '',
          priority: '',
          completed: false,
        });
      } else {
        toast.error("Failed to add task. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong while saving the task.");
    }
  };

  const del = (id) => {
    setTodos((prevTodos) => prevTodos.filter((_, index) => index !== id));
  };

  const updateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, index) =>
        index === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, index) =>
        index === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <div className='todo d-flex flex-column align-items-center'>
        <ToastContainer />
        <div className='todo-main container'>
        
          <div className='todo-inputs-div mx-auto my-4 p-4 rounded shadow-sm'>
          <h2 className="create-heading">
  📝               Create New Todo
                  </h2>
            <input
              type='text'
              name='title'
              placeholder='Title'
              className='form-control mb-3'
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name='description'
              placeholder='Description'
              className='form-control mb-3 description-textarea'
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <input
              type='date'
              name='reminderDate'
              className='form-control mb-3'
              value={formData.reminderDate}
              onChange={handleChange}
            />

            <input
              type='time'
              name='reminderTime'
              className='form-control mb-3'
              value={formData.reminderTime}
              onChange={handleChange}
            />

            <select
              name='priority'
              className='form-select mb-3'
              value={formData.priority}
              onChange={handleChange}
            >
              <option value=''>Select Priority</option>
              <option value='high'>High</option>
              <option value='medium'>Medium</option>
              <option value='low'>Low</option>
            </select>

            <button className='btn w-100 add-btn' onClick={handleAddTodo}>
              Add Todo
            </button>
          </div>
        </div>

        <div className='todo-body container'>
          <div className='row align-items-start'>
            {todos.map((todo, index) => (
              <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={index}>
             <Todocard
               todo={{ ...todo, id: index }}
                delid={del}
                editTodo={() => setSelectedTodo({ ...todo, id: index })}
                toggleComplete={toggleComplete}
                 />

              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <Update
          selectedTodo={selectedTodo}
          updateTodo={updateTodo}
          closeUpdate={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};

export default Todo;
