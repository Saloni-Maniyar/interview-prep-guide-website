



import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Interview Prep Guide</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/roadmap">Personalized Roadmap</Link></li>
                <li><Link to="/practice">Practice Problems</Link></li>
                <li><Link to="/progress">Progress Tracking</Link></li>
                <li><Link to="/mock-interviews">Mock Interviews</Link></li>
                <li><Link to="/quizzes">Quizzes</Link></li>
                <li><Link to="/login" className="login-btn">Login</Link></li> {/* Redirect to Login Page */}



            </ul>
        </nav>
    );
};

export default Navbar;
