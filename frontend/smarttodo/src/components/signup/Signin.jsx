import React, { useState } from 'react';
import "./signup.css";
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/signin", inputs);

      if (res.data.status === "success") {
        toast.success(res.data.message);
        setInputs({
          username: "",
          password: ""
        });

        sessionStorage.setItem('userId', res.data.others._id);

        dispatch(authActions.login());

        setTimeout(() => {
          history("/todo");
        }, 4000);
      } else if (res.data.message === "Invalid username or password") {
        toast.error(res.data.message);
      } else if (res.data.message === "Username and password are required") {
        toast.error("All fields are required");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div>
      <div className='signup'>
        <div className="container">
          <div className='row'>
            <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
              <div className='d-flex flex-column w-100 p-5'>
                <input 
                  type="text" 
                  placeholder='Enter your username' 
                  className='p-2 my-3 input-signup' 
                  name='username' 
                  value={inputs.username} 
                  onChange={change} 
                />
                <input 
                  type="password" 
                  placeholder='Enter your password' 
                  className='p-2 my-3 input-signup' 
                  name='password' 
                  value={inputs.password} 
                  onChange={change} 
                />
                <button className='btn-signup btn p-2 my-3' onClick={Submit}>Sign In</button>
              </div>
            </div>
            <div className='column col-left col-lg-4 d-flex justify-content-center align-items-center'>
              <HeadingComp first="Sign" second="In" />
            </div>
          </div>    
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Signin;
