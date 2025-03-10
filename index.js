
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import MockInterviews from "./pages/MockInterviews";
import Quizzes from "./pages/Quizzes";
//import LoginSignup from "./components/LoginSignup"; // Import LoginSignup component

import LoginSignup from "./components/LoginSignup_1";
//import "./styles/LoginSignup.css";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/mock-interviews" element={<MockInterviews />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/login" element={<LoginSignup />} /> {/* Add Login route */}


            </Routes>
        </Router>
    );
}

export default App;
