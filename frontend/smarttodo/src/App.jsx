import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Signup from "./components/signup/Signup";
import Signin from "./components/signup/Signin";
import Todo from "./components/todo/Todo";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
