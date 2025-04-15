import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import Todocard from './Todocard';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

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
  const [localIdCounter, setLocalIdCounter] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v2/todo/getTask/${userId}`);
        setTodos(response.data);
      } catch (error) {
        console.log("Error fetching todos:", error);
        toast.error("Failed to fetch todos.", {
          toastId: 'fetch-todo-error'
        });
      }
    };

    if (userId) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [userId]);

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

    setIsAdding(true);

    const newTodo = {
      title,
      description,
      completed: false,
      reminderDate,
      reminderTime,
      priority,
    };

    if (!userId) {
      const localTodo = { ...newTodo, _id: `local-${localIdCounter}` };
      setLocalIdCounter((prev) => prev + 1);
      setTodos((prev) => [localTodo, ...prev]);
      toast.info("Todo added locally (not saved)");
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/v2/todo/create", {
          ...newTodo,
          id: userId,
        });

        if (response.status === 201) {
          toast.success("Todo saved!");
          setTodos((prev) => [response.data.todo, ...prev]);
        } else {
          toast.error("Failed to save todo.");
        }
      } catch (error) {
        toast.error("Something went wrong.");
      }
    }

    setFormData({
      title: '',
      description: '',
      reminderDate: '',
      reminderTime: '',
      priority: '',
      completed: false,
    });

    setIsAdding(false);
  };

  const del = async (todoId) => {
    if (todoId.startsWith("local-")) {
      toast.warn("You can't delete local todos.");
      return;
    }

    try {
      toast.info("Todo is getting deleted...", {
        autoClose: 2000,
        toastId: `deleting-${todoId}`
      });

      const res = await axios.delete(`http://localhost:5000/api/v2/todo/delete/${todoId}`, {
        data: { id: userId },
      });

      if (res.status === 200) {
        setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
        toast.success("Todo deleted!");
      } else {
        toast.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete todo");
    }
  };

  const updateTodo = async (updatedTodo) => {
    const userId = sessionStorage.getItem("userId");
  
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v2/todo/update/${updatedTodo._id}`,
        {
          ...updatedTodo,
          userId,
        }
      );
  
      if (res.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === updatedTodo._id ? { ...todo, ...updatedTodo } : todo
          )
        );
        toast.success("Todo updated successfully!");
        setSelectedTodo(null); 
      } else {
        toast.error("Failed to update todo.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating the todo.");
    }
  };

  const toggleComplete = async (id) => {
    if (id.startsWith("local-")) {
      toast.error("Please sign in to check ur your todo.", {
        toastId: `toggle-error-${id}`,
      });
      return;
    }
  
    try {
      const response = await axios.patch(`http://localhost:5000/api/v2/todo/toggleCompletion/${id}`);
      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
        toast.success("Todo status updated!");
      } else {
        toast.error("Failed to update Todo status.");
      }
    } catch (error) {
      console.error("Error updating Todo:", error);
      toast.error("An error occurred while updating the Todo.");
    }
  };
  

  const editTodo = (todo) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      toast.error("Please sign in to update your todo.", {
        toastId: 'update-todo-error'
      });
      return;
    }

    setSelectedTodo(todo); 
  };

  return (
    <>
      <div className='todo d-flex flex-column align-items-center'>
        <ToastContainer />
        <div className='todo-main container'>
          <div className='todo-inputs-div mx-auto my-4 p-4 rounded shadow-sm'>
            <h2 className='text-center'>📝 </h2>
            <h2 className="create-heading"> Create New Todo</h2>

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
              min={new Date().toISOString().split('T')[0]}
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

            <button className='btn w-100 add-btn' onClick={handleAddTodo} disabled={isAdding}>
              {isAdding ? <div className="spinner"></div> : "Add Todo"}
            </button>

            {!userId && (
              <div className="text-muted text-center mt-2">
                Not signed in — your todos won't be saved.
              </div>
            )}
          </div>
        </div>

        <div className='todo-body container'>
          <div className='row align-items-start'>
            {todos && Array.isArray(todos) && todos.length > 0 ? (
              todos.map((todo) => (
                todo && todo._id ? (
                  <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={todo._id}>
                    <Todocard
                      todo={{ ...todo, id: todo._id }}
                      delid={del}
                      editTodo={editTodo} // Updated to call editTodo
                      toggleComplete={toggleComplete}
                    />
                  </div>
                ) : null
              ))
            ) : (
              <div>No todos found.</div>
            )}
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
