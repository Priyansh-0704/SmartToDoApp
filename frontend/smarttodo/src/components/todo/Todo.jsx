import React, { useState } from 'react';
import './Todo.css';
import Todocard from './Todocard';

const Todo = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reminderDate: '',
    reminderTime: '',
    priority: ''
  });

  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTodo = () => {
    const { title, description, reminderDate, reminderTime, priority } = formData;

    if (!title || !description || !reminderDate || !reminderTime || !priority) {
      alert('Please fill out all fields!');
      return;
    }

    setTodos((prevTodos) => [...prevTodos, formData]);

    setFormData({
      title: '',
      description: '',
      reminderDate: '',
      reminderTime: '',
      priority: ''
    });
  };

  return (
    <div className='todo d-flex flex-column align-items-center'>
      <div className='todo-main container'>
        <div className='todo-inputs-div mx-auto my-4 p-4 rounded shadow-sm'>
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
              <Todocard todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
