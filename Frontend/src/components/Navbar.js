
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const handleLogout = () => {
    localStorage.removeItem("token"); // or "user"
    window.location.href = "/"; // redirect to landing page
};


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">InterviewPrep</div>
            <ul className="nav-links">
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/roadmap">PersonalizedRoadmap</Link></li>
                <li><Link to="/practice">PracticeProblems</Link></li>
                <li><Link to="/progress">ProgressTracking</Link></li>
                <li><Link to="/mock-interviews">MockInterviews</Link></li>
                <li><Link to="/quizzes">Quizzes</Link></li>
                {/* <li><Link to="/login" className="login-btn">Login</Link></li> */}
                <button onClick={handleLogout} className="logout-btn">Logout</button>

            </ul>
        </nav>
    );
};

export default Navbar;
