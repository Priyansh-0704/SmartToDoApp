import React from 'react';
import './Todo.css';
import {AiFillDelete} from 'react-icons/ai';
import {GrDocumentUpdate} from 'react-icons/gr';

const Todocard = ({ todo }) => {
  const { title, description, reminderDate, reminderTime, priority } = todo;

  return (
    <div className='card shadow-sm h-100 todo-cards'>
      <div className='card-body'>
        <h5 className='card-title fw-bold '>{title}</h5>
        <p className='card-text text-muted mb-2'>{description}</p>
        <p className='card-text mb-1'><strong>Date:</strong> {reminderDate}</p>
        <p className='card-text mb-1'><strong>Time:</strong> {reminderTime}</p>
        <p className='card-text mb-0'>
          <strong>Priority:</strong>{' '}
          <span className={`priority-pill ${priority}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </p>
      </div>
      <div className=' d-flex justify-content-between align-items-center p-2'>
       <div>
        <GrDocumentUpdate className='card-icons-edit'/>
       </div>
      <div>
        <AiFillDelete className='card-icons-del'/>
      </div>
      </div>
    </div>
  );
};

export default Todocard;
