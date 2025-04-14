import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

            const handleSubmit = () => {
               navigate("/todo");
  };
    return <div className="home d-flex justify-content-center align-items-center"><div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
            Organize your <br /> work and life, finally.
        </h1>
        <br />
        <p>
            Become focused, organized, and calm with <br />
            todo app. The World's #1 task manager app.
        </p>

        <button className = "home-btn p-2" onClick={handleSubmit}>Make Todo List</button>

    </div>
    </div>;
};

export default Home;
