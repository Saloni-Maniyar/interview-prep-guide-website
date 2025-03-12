import React, { useState } from "react";
import "../styles/Roadmap.css"; // Add styles
import { Link } from "react-router-dom";

const Roadmap = () => {
    const [role, setRole] = useState("Frontend Developer");

    const roadmaps = {
        "Frontend Developer": [
            "Learn HTML, CSS, and JavaScript",
            "Master React.js or Angular",
            "Understand State Management (Redux, Context API)",
            "Work with APIs & Authentication",
            "Practice Data Structures & Algorithms",
            "Build Portfolio & Apply for Jobs",
        ],
        "Backend Developer": [
            "Learn Node.js, Express.js, or Django",
            "Understand Databases (SQL & NoSQL)",
            "Master REST APIs & Authentication",
            "Learn Caching, Queues, and Optimization",
            "Practice System Design & DSA",
            "Build Scalable Backend Systems",
        ],
        "Full Stack Developer": [
            "Learn Frontend & Backend Technologies",
            "Master Database Design & APIs",
            "Work on Full-Stack Projects",
            "Learn DevOps & Deployment",
            "Practice Coding & System Design",
            "Build Real-World Applications",
        ],
    };

    return (
        <div className="roadmap-container">
            <h1>Personalized Roadmap</h1>

            <label>Select Your Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
            </select>

            <div className="roadmap">
                {roadmaps[role].map((step, index) => (
                    <div key={index} className="roadmap-step">
                        <span>{index + 1}.</span> {step}
                    </div>
                ))}
            </div>

            <Link to="/Home" className="btn">Back to Home</Link>
        </div>
    );
};

export default Roadmap;
