// import React, { useState } from "react";
// import "../styles/MockInterviews.css";

// const MockInterview = () => {
//     const [formData, setFormData] = useState({
//         role: "",
//         aptitudeMarks: "",
//     });

//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         // Aptitude Marks Validation (1 to 200)
//         if (name === "aptitudeMarks") {
//             if (!/^\d{0,3}$/.test(value)) return; // Restrict input to numbers only
//             const marks = Number(value);
//             if (marks > 200) {
//                 setError("Marks must be between 1 and 200.");
//                 return;
//             } else {
//                 setError(""); // Clear error when valid
//             }
//         }

//         setFormData({ ...formData, [name]: value });
//     };

//     const handleStartInterview = () => {
//         if (!formData.role || !formData.aptitudeMarks) {
//             alert("Please select a role and enter aptitude marks.");
//             return;
//         }

//         if (error || formData.aptitudeMarks < 1 || formData.aptitudeMarks > 200) {
//             alert("Marks must be between 1 and 200.");
//             return;
//         }

//         alert(`Starting Mock Interview for ${formData.role}`);
//     };

//     return (
//         <div className="mock-container">
//             <h2>Mock Interviews</h2>

//             <div className="mock-form">
//                 <h3>Select Your Role</h3>
//                 <select name="role" value={formData.role} onChange={handleChange} required>
//                     <option value="">Select Role</option>
//                     <option value="Frontend Developer">Frontend Developer</option>
//                     <option value="Backend Developer">Backend Developer</option>
//                     <option value="Full Stack Developer">Full Stack Developer</option>
//                     <option value="Project Manager">Project Manager</option>
//                 </select>

//                 <h3>Enter Aptitude Marks (1-200)</h3>
//                 <input
//                     type="number"
//                     name="aptitudeMarks"
//                     placeholder="Enter Marks (1-200)"
//                     value={formData.aptitudeMarks}
//                     onChange={handleChange}
//                     required
//                     min="1" max="200"
//                 />
//                 {error && <p className="error-msg">{error}</p>}

//                 <button className="start-btn" onClick={handleStartInterview}>Start Mock Interview</button>
//             </div>
//         </div>
//     );
// };

// export default MockInterview;





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
