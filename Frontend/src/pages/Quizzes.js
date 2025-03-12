import React, { useState } from "react";
import "../styles//Quiz.css";

const Quizzes = () => {
    const [quizType, setQuizType] = useState("role"); // Default selection is Role-Based
    const [selectedOption, setSelectedOption] = useState("");

    const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Project Manager"];
    const topics = ["JavaScript", "Python", "React", "Node.js", "Database Management"];

    const handleQuizStart = () => {
        if (!selectedOption) {
            alert("Please select an option before starting the quiz.");
            return;
        }
        alert(`Starting ${quizType === "role" ? "Role-Based" : "Topic-Based"} Quiz on: ${selectedOption}`);
    };

    return (
        <div className="quiz-container">
            <h2>Choose Your Quiz</h2>

            <div className="quiz-selection">
                <label>
                    <input
                        type="radio"
                        name="quizType"
                        value="role"
                        checked={quizType === "role"}
                        onChange={() => { setQuizType("role"); setSelectedOption(""); }}
                    />
                    Role-Based Quiz
                </label>

                <label>
                    <input
                        type="radio"
                        name="quizType"
                        value="topic"
                        checked={quizType === "topic"}
                        onChange={() => { setQuizType("topic"); setSelectedOption(""); }}
                    />
                    Topic-Based Quiz
                </label>
            </div>

            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
                <option value="">Select {quizType === "role" ? "Role" : "Topic"}</option>
                {(quizType === "role" ? roles : topics).map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>

            <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>
        </div>
    );
};

export default Quizzes;
