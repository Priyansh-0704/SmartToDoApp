import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { GiWhiteBook } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false); 

    const Logout = () => {
        sessionStorage.removeItem('userId');
        dispatch(authActions.logout());
        navigate("/"); 
        setIsOpen(false); 
    };

    const closeNavbar = () => setIsOpen(false);

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/" onClick={closeNavbar}>
                        <b><GiWhiteBook /> &nbsp; todo</b>
                    </Link>

                    <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link className="nav-link active" to="/" onClick={closeNavbar}>Home</Link>
                            </li>

                            <li className="nav-item mx-2">
                                <Link className="nav-link active" to="/about" onClick={closeNavbar}>About Us</Link>
                            </li>

                            <li className="nav-item mx-2">
                                <Link className="nav-link active" to="/todo" onClick={closeNavbar}>Todo</Link>
                            </li>

                            {!isLoggedIn && <>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link active btn-nav" to="/signup" onClick={closeNavbar}>Sign Up</Link>
                                </li>

                                <li className="nav-item mx-2">
                                    <Link className="nav-link active btn-nav" to="/signin" onClick={closeNavbar}>Sign In</Link>
                                </li>
                            </>}

                            {isLoggedIn && <>
                                <li className="nav-item mx-2">
                                    <button className="nav-link active btn-nav" onClick={Logout}>Log Out</button>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
