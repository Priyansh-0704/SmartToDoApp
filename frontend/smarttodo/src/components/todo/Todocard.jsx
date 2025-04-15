import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GrDocumentUpdate } from 'react-icons/gr';

const Todocard = ({ todo, delid, editTodo, toggleComplete }) => {
  const { title, description, reminderDate, reminderTime, priority, completed, _id } = todo;

  return (
    <div className={`card shadow-sm h-100 todo-cards ${completed ? 'completed' : ''}`}>
      <div className='card-body'>
        <h5 className='card-title fw-bold'>
          {title} {completed && <span className='badge bg-success ms-2'>Completed</span>}
        </h5>
        <p className='card-text text-muted mb-2'>{description}</p>
        <p className='card-text mb-1'><strong>Date:</strong> {reminderDate}</p>
        <p className='card-text mb-1'><strong>Time:</strong> {reminderTime}</p>
        <p className='card-text mb-2'>
          <strong>Priority:</strong>{' '}
          <span className={`priority-pill ${priority}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={completed}
            onChange={() => toggleComplete(_id)}  
            id={`check${_id}`}
          />
          <label className="form-check-label" htmlFor={`check${_id}`}>
            {completed ? "Completed" : "Mark as Completed"}
          </label>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center p-2'>
        <GrDocumentUpdate
          className='card-icons-edit'
          onClick={() => editTodo(todo)}
        />
        <AiFillDelete className='card-icons-del' onClick={() => delid(_id)} />
      </div>
    </div>
  );
};

export default Todocard;
