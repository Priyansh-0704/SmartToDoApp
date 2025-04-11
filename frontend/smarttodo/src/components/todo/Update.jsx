import React from "react";

const Update = () => {
  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <input type="text" className="todo-inputs my-4 w-100 p-3" />
      <textarea className="todo-inputs w-100 p-3" />
      <button className="btn btn-dark my-4">UPDATE</button>
    </div>
  );
};

export default Update;