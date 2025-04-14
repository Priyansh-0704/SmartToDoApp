import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Todo.css";

const Update = ({ selectedTodo, updateTodo, closeUpdate }) => {
  const [updatedTodo, setUpdatedTodo] = useState(selectedTodo);

  useEffect(() => {
    setUpdatedTodo(selectedTodo);
  }, [selectedTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (
      !updatedTodo.title ||
      !updatedTodo.description ||
      !updatedTodo.reminderDate ||
      !updatedTodo.reminderTime ||
      !updatedTodo.priority
    ) {
      toast.error("Please fill out all fields!");
      return;
    }
    updateTodo(updatedTodo);
  };

  return (
    <div className="update-overlay">
      <div className="update-box p-4 shadow">
        <h2 className="todo-heading text-center mb-4">
          <span className="icon">🛠</span> Update Your Todo
          <div className="underline"></div>
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
          name="title"
          value={updatedTodo.title}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Description"
          name="description"
          value={updatedTodo.description}
          onChange={handleChange}
        />
        <input
          type="date"
          className="form-control mb-3"
          name="reminderDate"
          value={updatedTodo.reminderDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
        />

        <input
          type="time"
          className="form-control mb-3"
          name="reminderTime"
          value={updatedTodo.reminderTime}
          onChange={handleChange}
          min={new Date().toTimeString().split(" ")[0].substring(0, 5)}
        />

        <select
          className="form-select mb-3"
          name="priority"
          value={updatedTodo.priority}
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={closeUpdate}>
            Cancel
          </button>
          <button
            className="btn btn-warning text-white fw-bold"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update