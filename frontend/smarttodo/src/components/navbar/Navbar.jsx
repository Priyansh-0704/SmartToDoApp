import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { GiWhiteBook } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const Logout = () => {
        sessionStorage.removeItem('userId');
        dispatch(authActions.logout());    
    }
    return (
        <div><nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <b><GiWhiteBook /> &nbsp; todo</b>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>

                        <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
                        </li>

                        <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
                        </li>
                        {!isLoggedIn && <>  <li className="nav-item mx-2">
                            <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Sign Up</Link>
                        </li>

                        <li className="nav-item mx-2">
                            <Link className="nav-link active btn-nav" aria-current="page" to="/signin">Sign In</Link>
                        </li></>}
                        {isLoggedIn && <> <li className="nav-item mx-2" onClick={Logout}>
                            <Link className="nav-link active btn-nav" aria-current="page" to="#">Log Out</Link>
                        </li> </>}
                    </ul>
                </div>
            </div>
 
        </nav>
         
        </div>
    );
};

export default Navbar;