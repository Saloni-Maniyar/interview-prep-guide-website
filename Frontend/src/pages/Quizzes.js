




// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Quiz.css";


// const Quizzes = () => {
//     const [quizType, setQuizType] = useState("role");
//     const [selectedOption, setSelectedOption] = useState("");
//     const [questions, setQuestions] = useState([]);
//     const [userAnswers, setUserAnswers] = useState({});

//     const userId = localStorage.getItem("userId");

//     // Fetch Quiz Questions
//     const fetchQuestions = async () => {
//         try {
//             const res = await axios.get(`http://localhost:5000/api/quiz/get-quiz?topic=${selectedOption}&limit=5`);
//             setQuestions(res.data);
//         } catch (error) {
//             console.error("Error fetching questions", error);
//         }
//     };

//     // Start Quiz
//     const handleQuizStart = () => {
//         if (!selectedOption) {
//             alert("Please select an option before starting the quiz.");
//             return;
//         }
//         fetchQuestions();
//     };

//     // Handle Answer Selection
//     const handleAnswerChange = (questionIndex, selected) => {
//         setUserAnswers({ ...userAnswers, [questionIndex]: selected });
//     };

//     // Calculate Score & Save Attempt
//     const handleSubmitQuiz = async () => {
//         let score = 0;
//         questions.forEach((q, index) => {
//             if (userAnswers[index] === q.correctAnswer) {
//                 score += 1;
//             }
//         });

//         // Save quiz attempt
//         try {
//             await axios.post("http://localhost:5000/api/quiz/save-quiz", {
//                 userId,
//                 quizType,
//                 selectedOption,
//                 questions,
//                 score
//             });
//             alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
//         } catch (error) {
//             console.error("Error saving quiz", error);
//         }
//     };

//     return (
//         <div className="quiz-container">
//             <h2>Choose Your Quiz</h2>

//             <div className="quiz-selection">
//                 <label>
//                     <input type="radio" name="quizType" value="role" checked={quizType === "role"}
//                         onChange={() => { setQuizType("role"); setSelectedOption(""); }} />
//                     Role-Based Quiz
//                 </label>

//                 <label>
//                     <input type="radio" name="quizType" value="topic" checked={quizType === "topic"}
//                         onChange={() => { setQuizType("topic"); setSelectedOption(""); }} />
//                     Topic-Based Quiz
//                 </label>
//             </div>

//             <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
//                 <option value="">Select {quizType === "role" ? "Role" : "Topic"}</option>
//                 {quizType === "role"
//                     ? ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Project Manager"].map((role) => (
//                         <option key={role} value={role}>{role}</option>
//                     ))
//                     : ["JavaScript", "Python", "React", "Node.js", "Database Management"].map((topic) => (
//                         <option key={topic} value={topic}>{topic}</option>
//                     ))}
//             </select>

//             <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>

//             {/* Questions Display */}
//             {questions.length > 0 && (
//                 <div className="quiz-questions">
//                     <h3>Quiz Questions</h3>
//                     {questions.map((q, index) => (
//                         <div key={index} className="question-box">
//                             <p><strong>Q{index + 1}:</strong> {q.question}</p>
//                             {q.options.map((option, i) => (
//                                 <label key={i}>
//                                     <input
//                                         type="radio"
//                                         name={`question-${index}`}
//                                         value={option}
//                                         onChange={() => handleAnswerChange(index, option)}
//                                     />
//                                     {option}
//                                 </label>
//                             ))}
//                         </div>
//                     ))}
//                     <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Quizzes;


import React, { useState } from "react";
import axios from "axios";
import "../styles/Quiz.css"; // Make sure to update this file with modal styles

const Quizzes = () => {
    const [quizType, setQuizType] = useState("role");
    const [selectedOption, setSelectedOption] = useState("");
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [showModal, setShowModal] = useState(false); // NEW: Modal toggle

    const userId = localStorage.getItem("userId");

    const fetchQuestions = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/quiz/get-quiz?topic=${selectedOption}&limit=5`);
            setQuestions(res.data);
            setShowModal(true); // Open modal after fetching questions
        } catch (error) {
            console.error("Error fetching questions", error);
        }
    };

    const handleQuizStart = () => {
        if (!selectedOption) {
            alert("Please select an option before starting the quiz.");
            return;
        }
        fetchQuestions();
    };

    const handleAnswerChange = (questionIndex, selected) => {
        setUserAnswers({ ...userAnswers, [questionIndex]: selected });
    };

    // const handleSubmitQuiz = async () => {
    //     let score = 0;
    //     questions.forEach((q, index) => {
    //         if (userAnswers[index] === q.correctAnswer) {
    //             score += 1;
    //         }
    //     });

    //     try {
    //         await axios.post("http://localhost:5000/api/quiz/save-quiz", {
    //             userId,
    //             quizType,
    //             selectedOption,
    //             questions,
    //             score
    //         });
    //         alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
    //         setShowModal(false); // Close modal after submission
    //     } catch (error) {
    //         console.error("Error saving quiz", error);
    //     }
    // };

    const handleSubmitQuiz = async () => {
        let score = 0;

        // ✅ Add correctAnswer into questions object and calculate score
        const formattedQuestions = questions.map((q, index) => {
            const selectedAnswer = userAnswers[index];
            const isCorrect = selectedAnswer === q.answer;
            if (isCorrect) score += 1;

            return {
                questionId: q._id,
                selectedAnswer,
                correctAnswer: q.answer, // ✅ send correctAnswer for backend check
            };
        });

        try {
            await axios.post("http://localhost:5000/api/quiz/save-quiz", {
                userId,
                quizType,
                selectedOption,
                questions: formattedQuestions,
                score
            });
            alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
            setShowModal(false);
        } catch (error) {
            console.error("Error saving quiz", error);
        }
    };


    return (
        <div className="quiz-container">
            <h2>Choose Your Quiz</h2>

            <div className="quiz-selection">
                <label>
                    <input type="radio" name="quizType" value="role" checked={quizType === "role"}
                        onChange={() => { setQuizType("role"); setSelectedOption(""); }} />
                    Role-Based Quiz
                </label>

                <label>
                    <input type="radio" name="quizType" value="topic" checked={quizType === "topic"}
                        onChange={() => { setQuizType("topic"); setSelectedOption(""); }} />
                    Topic-Based Quiz
                </label>
            </div>

            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
                <option value="">Select {quizType === "role" ? "Role" : "Topic"}</option>
                {quizType === "role"
                    ? ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Project Manager"].map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))
                    : ["JavaScript", "Python", "React", "Node.js", "Database Management"].map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
            </select>

            <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>

            {/* ✅ Modal UI for Quiz */}
            {showModal && (
                <div className="quiz-modal-overlay">
                    <div className="quiz-modal">
                        <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
                        <h3>Quiz Questions</h3>
                        {questions.map((q, index) => (
                            <div key={index} className="question-box">
                                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                                {q.options.map((option, i) => (
                                    <label key={i}>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            onChange={() => handleAnswerChange(index, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ))}
                        <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quizzes;

