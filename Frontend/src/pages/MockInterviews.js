

import React, { useState, useEffect } from "react";
import "../styles/MockInterviews.css";

const mockQuestions = [
    { question: "Explain quicksort and its time complexity.", category: "DSA" },
    { question: "What are the four pillars of OOP?", category: "DSA" },
    { question: "Explain REST API and its benefits.", category: "Web Dev" },
];

const MockInterview = () => {
    const [selectedCategory, setSelectedCategory] = useState("DSA");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < mockQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(30);
            setAnswer("");
        }
    };

    return (
        <div className="mock-interview-container">
            {/* Left Sidebar - Interview Tips & Progress */}
            <div className="left-sidebar">
                <h3>🚀 Quick Tips</h3>
                <ul>
                    <li>Stay confident 💪</li>
                    <li>Structure your answers 🏗️</li>
                    <li>Think aloud 🤔</li>
                    <li>Use examples 📖</li>
                    <li>Manage time efficiently ⏳</li>
                </ul>
                <div className="progress">
                    <p>Progress: {currentQuestionIndex + 1} / {mockQuestions.length}</p>
                    <progress value={currentQuestionIndex + 1} max={mockQuestions.length}></progress>
                </div>
            </div>

            {/* Main Content - Question Box */}
            <div className="interview-box">
                <h2>Mock Interview</h2>
                <label>Select Category: </label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="DSA">DSA</option>
                    <option value="Web Dev">Web Dev</option>
                </select>

                <div className="question-card">
                    <h3>Question {currentQuestionIndex + 1} / {mockQuestions.length}</h3>
                    <p>{mockQuestions[currentQuestionIndex].question}</p>
                    <p className="timer">⏳ Time Left: {timeLeft}s</p>
                    <textarea
                        placeholder="Type your answer here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <button className="next-btn" onClick={handleNextQuestion}>Next Question</button>
                </div>
            </div>

            {/* Right Sidebar - Timer, Quote & Feedback */}
            <div className="right-sidebar">
                <h3>⏳ Time Remaining</h3>
                <div className="timer-box">{timeLeft}s</div>

                <h3>💡 Inspiration</h3>
                <blockquote>“The best way to predict the future is to create it.” – Peter Drucker</blockquote>

                <h3>💬 Feedback</h3>
                <p>(This section will show AI feedback after the interview!)</p>
            </div>
        </div>
    );
};

export default MockInterview;
