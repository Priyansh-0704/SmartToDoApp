import React, { useState } from 'react';
import "./signup.css";
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate(); // useNavigate hook from react-router-dom for navigation
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    name: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://smarttodoapp-9b06.onrender.com//api/v1/auth/signup", inputs);
      if (res.data.status === "success") {
        toast.success(res.data.message);
        setInputs({
          email: "",
          username: "",
          name: "",
          password: ""
        });
        setTimeout(() => {
          history("/signin"); // Redirect to login page after successful signup
        }, 4000); // Redirect after 4 seconds
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className='signup'>
      <div className="container">
        <div className='row'>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column w-100 p-5'>
              <input
                type="email"
                placeholder='Enter your email'
                className='p-2 my-3 input-signup'
                name='email'
                onChange={change}
                value={inputs.email}
              />
              <input
                type="text"
                placeholder='Enter your username'
                className='p-2 my-3 input-signup'
                name='username'
                onChange={change}
                value={inputs.username}
              />
              <input
                type="text"
                placeholder='Enter your name'
                className='p-2 my-3 input-signup'
                name='name'
                onChange={change}
                value={inputs.name}
              />
              <input
                type="password"
                placeholder='Enter your password'
                className='p-2 my-3 input-signup'
                name='password'
                onChange={change}
                value={inputs.password}
              />
              <button className='btn-signup btn p-2 my-3' onClick={Submit}>
                Sign Up
              </button>
            </div>
          </div>
          <div className='column col-left col-lg-4 d-flex justify-content-center align-items-center'>
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
