

// // // import React, { useState, useEffect } from "react";
// // // import "../styles/MockInterviews.css";

// // // const mockQuestions = [
// // //     { question: "Explain quicksort and its time complexity.", category: "DSA" },
// // //     { question: "What are the four pillars of OOP?", category: "DSA" },
// // //     { question: "Explain REST API and its benefits.", category: "Web Dev" },
// // // ];

// // // const MockInterview = () => {
// // //     const [selectedCategory, setSelectedCategory] = useState("DSA");
// // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // //     const [timeLeft, setTimeLeft] = useState(30);
// // //     const [answer, setAnswer] = useState("");

// // //     useEffect(() => {
// // //         if (timeLeft > 0) {
// // //             const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
// // //             return () => clearTimeout(timer);
// // //         }
// // //     }, [timeLeft]);

// // //     const handleNextQuestion = () => {
// // //         if (currentQuestionIndex < mockQuestions.length - 1) {
// // //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// // //             setTimeLeft(30);
// // //             setAnswer("");
// // //         }
// // //     };

// // //     return (
// // //         <div className="mock-interview-container">
// // //             {/* Left Sidebar - Interview Tips & Progress */}
// // //             <div className="left-sidebar">
// // //                 <h3>🚀 Quick Tips</h3>
// // //                 <ul>
// // //                     <li>Stay confident 💪</li>
// // //                     <li>Structure your answers 🏗️</li>
// // //                     <li>Think aloud 🤔</li>
// // //                     <li>Use examples 📖</li>
// // //                     <li>Manage time efficiently ⏳</li>
// // //                 </ul>
// // //                 <div className="progress">
// // //                     <p>Progress: {currentQuestionIndex + 1} / {mockQuestions.length}</p>
// // //                     <progress value={currentQuestionIndex + 1} max={mockQuestions.length}></progress>
// // //                 </div>
// // //             </div>

// // //             {/* Main Content - Question Box */}
// // //             <div className="interview-box">
// // //                 <h2>Mock Interview</h2>
// // //                 <label>Select Category: </label>
// // //                 <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
// // //                     <option value="DSA">DSA</option>
// // //                     <option value="Web Dev">Web Dev</option>
// // //                 </select>

// // //                 <div className="question-card">
// // //                     <h3>Question {currentQuestionIndex + 1} / {mockQuestions.length}</h3>
// // //                     <p>{mockQuestions[currentQuestionIndex].question}</p>
// // //                     <p className="timer">⏳ Time Left: {timeLeft}s</p>
// // //                     <textarea
// // //                         placeholder="Type your answer here..."
// // //                         value={answer}
// // //                         onChange={(e) => setAnswer(e.target.value)}
// // //                     ></textarea>
// // //                     <button className="next-btn" onClick={handleNextQuestion}>Next Question</button>
// // //                 </div>
// // //             </div>

// // //             {/* Right Sidebar - Timer, Quote & Feedback */}
// // //             <div className="right-sidebar">
// // //                 <h3>⏳ Time Remaining</h3>
// // //                 <div className="timer-box">{timeLeft}s</div>

// // //                 <h3>💡 Inspiration</h3>
// // //                 <blockquote>“The best way to predict the future is to create it.” – Peter Drucker</blockquote>

// // //                 <h3>💬 Feedback</h3>
// // //                 <p>(This section will show AI feedback after the interview!)</p>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default MockInterview;




// // //new code 

// // import React, { useState, useEffect, useCallback } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/MockInterviews.css";

// // const MockInterview = () => {
// //     const [questions, setQuestions] = useState([]);
// //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //     const [answer, setAnswer] = useState("");
// //     const [responses, setResponses] = useState([]);
// //     const [isInterviewStarted, setIsInterviewStarted] = useState(false);
// //     const [isInterviewFinished, setIsInterviewFinished] = useState(false);
// //     const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question
// //     const navigate = useNavigate();

// //     // Fetch 5 Technical + 5 HR questions
// //     useEffect(() => {
// //         const fetchQuestions = async () => {
// //             try {
// //                 const response = await axios.get("http://localhost:5000/api/interview/mock-questions", {
// //                     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //                 });
// //                 setQuestions(response.data.questions);
// //             } catch (error) {
// //                 console.error("Error fetching questions:", error);
// //             }
// //         };

// //         if (isInterviewStarted) fetchQuestions();
// //     }, [isInterviewStarted]);
// //     const submitInterview = (async (finalResponses) => {
// //         try {
// //             const response = await axios.post(
// //                 "http://localhost:5000/api/interview/submit",
// //                 {

// //                     answers: finalResponses,
// //                 },
// //                 {
// //                     headers: {
// //                         Authorization: `Bearer ${localStorage.getItem("token")}`,
// //                     },
// //                 }
// //             );

// //             // const { techScore, hrScore, overallFeedback, detailedFeedback } = response.data;
// //             const detailedFeedback = response.data
// //             console.log("Interview Submitted:", detailedFeedback);

// //             setIsInterviewFinished(true);

// //             // Redirect to progress page after a delay
// //             setTimeout(() => {
// //                 navigate("/Progress");
// //             }, 3000); // Wait 3 seconds before redirecting
// //         } catch (error) {
// //             console.error("Error submitting interview:", error);
// //         }
// //     }, [navigate]);


// //     // Handle answer submission (including auto-submit)
// //     const handleAnswerSubmit = useCallback(async () => {
// //         const currentQuestion = questions[currentQuestionIndex];

// //         const responseObj = {
// //             questionId: currentQuestion._id,
// //             userAnswer: answer.trim(),
// //         };

// //         const updatedResponses = [...responses, responseObj];
// //         setResponses(updatedResponses);
// //         setAnswer(""); // Clear answer field

// //         if (currentQuestionIndex === 9) {
// //             await submitInterview(updatedResponses); // Submit the final responses after 10th question
// //         } else {
// //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// //             setTimeLeft(180); // Reset timer for next question
// //         }
// //     }, [answer, currentQuestionIndex, questions, responses, submitInterview]);


// //     // Cancel interview and reset states
// //     const cancelInterview = () => {
// //         if (
// //             window.confirm(
// //                 "Are you sure you want to cancel this interview? All progress will be lost."
// //             )
// //         ) {
// //             setQuestions([]);
// //             setResponses([]);
// //             setIsInterviewStarted(false);
// //             setIsInterviewFinished(false);
// //             setCurrentQuestionIndex(0);
// //             setAnswer("");
// //             setTimeLeft(180);
// //         }
// //     };


// //     // Countdown timer effect
// //     useEffect(() => {
// //         let timer;
// //         if (isInterviewStarted && !isInterviewFinished && timeLeft > 0) {
// //             timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
// //         }

// //         if (timeLeft === 0 && isInterviewStarted && !isInterviewFinished) {
// //             handleAnswerSubmit(); // Auto-submit when time is up
// //         }

// //         return () => clearTimeout(timer); // Cleanup on component unmount or changes
// //     }, [timeLeft, isInterviewStarted, isInterviewFinished, handleAnswerSubmit]);

// //     // // Handle answer submission (including auto-submit)
// //     // const handleAnswerSubmit = useCallback(async () => {
// //     //     const currentQuestion = questions[currentQuestionIndex];

// //     //     const responseObj = {
// //     //         questionId: currentQuestion._id,
// //     //         userAnswer: answer.trim(),
// //     //     };

// //     //     const updatedResponses = [...responses, responseObj];
// //     //     setResponses(updatedResponses);
// //     //     setAnswer(""); // Clear answer field

// //     //     if (currentQuestionIndex === 9) {
// //     //         await submitInterview(updatedResponses); // Submit the final responses after 10th question
// //     //     } else {
// //     //         setCurrentQuestionIndex(currentQuestionIndex + 1);
// //     //         setTimeLeft(180); // Reset timer for next question
// //     //     }
// //     // }, [answer, currentQuestionIndex, questions, responses, submitInterview]);

// //     // Submit interview and navigate to progress page
// //     // const submitInterview = (async (finalResponses) => {
// //     //     try {
// //     //         const response = await axios.post(
// //     //             "http://localhost:5000/api/interview/submit",
// //     //             {

// //     //                 answers: finalResponses,
// //     //             },
// //     //             {
// //     //                 headers: {
// //     //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
// //     //                 },
// //     //             }
// //     //         );

// //     //         // const { techScore, hrScore, overallFeedback, detailedFeedback } = response.data;
// //     //         const detailedFeedback = response.data
// //     //         console.log("Interview Submitted:", detailedFeedback);

// //     //         setIsInterviewFinished(true);

// //     //         // Redirect to progress page after a delay
// //     //         setTimeout(() => {
// //     //             navigate("/Progress");
// //     //         }, 3000); // Wait 3 seconds before redirecting
// //     //     } catch (error) {
// //     //         console.error("Error submitting interview:", error);
// //     //     }
// //     // }, [navigate]);

// //     // // Cancel interview and reset states
// //     // const cancelInterview = () => {
// //     //     if (
// //     //         window.confirm(
// //     //             "Are you sure you want to cancel this interview? All progress will be lost."
// //     //         )
// //     //     ) {
// //     //         setQuestions([]);
// //     //         setResponses([]);
// //     //         setIsInterviewStarted(false);
// //     //         setIsInterviewFinished(false);
// //     //         setCurrentQuestionIndex(0);
// //     //         setAnswer("");
// //     //         setTimeLeft(180);
// //     //     }
// //     // };

// //     return (
// //         <div className="mock-interview-container">
// //             {!isInterviewStarted ? (
// //                 <div className="text-center">
// //                     <h2>Mock Interview</h2>
// //                     <p>Click below to begin a 10-question mock interview (5 Tech + 5 HR)</p>
// //                     <button onClick={() => setIsInterviewStarted(true)} className="btn start-btn">
// //                         Start Interview
// //                     </button>
// //                 </div>
// //             ) : isInterviewFinished ? (
// //                 <div className="success-message">
// //                     <h2>Interview Submitted!</h2>
// //                     <p>Redirecting to your progress page...</p>
// //                 </div>
// //             ) : (
// //                 <div>
// //                     <div className="timer">
// //                         Question {currentQuestionIndex + 1} of 10 — Time Left: {timeLeft}s
// //                     </div>
// //                     <div className="question-card">
// //                         <p>{questions[currentQuestionIndex]?.questionText}</p>
// //                     </div>
// //                     <textarea
// //                         rows="4"
// //                         placeholder="Type your answer here..."
// //                         value={answer}
// //                         onChange={(e) => setAnswer(e.target.value)}
// //                     />
// //                     <div className="button-group">
// //                         <button onClick={cancelInterview} className="btn cancel-btn">
// //                             Cancel
// //                         </button>
// //                         <button
// //                             onClick={handleAnswerSubmit}
// //                             className="btn next-btn"
// //                         >
// //                             {currentQuestionIndex === 9 ? "Submit" : "Next"}
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default MockInterview;











// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/MockInterviews.css";

// const MockInterview = () => {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answer, setAnswer] = useState("");
//     const [responses, setResponses] = useState([]);
//     const [isInterviewStarted, setIsInterviewStarted] = useState(false);
//     const [isInterviewFinished, setIsInterviewFinished] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(180);
//     const navigate = useNavigate();

//     // Fetch questions
//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/interview/mock-questions", {
//                     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//                 });
//                 setQuestions(response.data.questions);
//             } catch (error) {
//                 console.error("Error fetching questions:", error);
//             }
//         };

//         if (isInterviewStarted) fetchQuestions();
//     }, [isInterviewStarted]);

//     // Submit interview (wrapped in useCallback so it works with dependencies)
//     const submitInterview = useCallback(async (finalResponses) => {
//         try {
//             const response = await axios.post(
//                 "http://localhost:5000/api/interview/submit",
//                 { answers: finalResponses },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );

//             console.log("Interview Submitted:", response.data);
//             setIsInterviewFinished(true);

//             setTimeout(() => {
//                 navigate("/Progress");
//             }, 3000);
//         } catch (error) {
//             console.error("Error submitting interview:", error);
//         }
//     }, [navigate]);

//     // Handle answer submission
//     const handleAnswerSubmit = useCallback(async () => {
//         const currentQuestion = questions[currentQuestionIndex];

//         const responseObj = {
//             questionId: currentQuestion._id,
//             userAnswer: answer.trim(),
//         };

//         const updatedResponses = [...responses, responseObj];
//         setResponses(updatedResponses);
//         setAnswer("");

//         if (currentQuestionIndex === 9) {
//             await submitInterview(updatedResponses);
//         } else {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setTimeLeft(180);
//         }
//     }, [answer, currentQuestionIndex, questions, responses, submitInterview]);

//     // Timer
//     useEffect(() => {
//         let timer;
//         if (isInterviewStarted && !isInterviewFinished && timeLeft > 0) {
//             timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
//         } else if (timeLeft === 0 && isInterviewStarted && !isInterviewFinished) {
//             handleAnswerSubmit();
//         }

//         return () => clearTimeout(timer);
//     }, [timeLeft, isInterviewStarted, isInterviewFinished, handleAnswerSubmit]);

//     // Cancel Interview
//     const cancelInterview = () => {
//         if (window.confirm("Are you sure you want to cancel this interview? All progress will be lost.")) {
//             setQuestions([]);
//             setResponses([]);
//             setIsInterviewStarted(false);
//             setIsInterviewFinished(false);
//             setCurrentQuestionIndex(0);
//             setAnswer("");
//             setTimeLeft(180);
//         }
//     };

//     return (
//         <div className="mock-interview-container">
//             {!isInterviewStarted ? (
//                 <div className="text-center">
//                     <h2>Mock Interview</h2>
//                     <p>Click below to begin a 10-question mock interview (5 Tech + 5 HR)</p>
//                     <button onClick={() => setIsInterviewStarted(true)} className="btn start-btn">
//                         Start Interview
//                     </button>
//                 </div>
//             ) : isInterviewFinished ? (
//                 <div className="success-message">
//                     <h2>Interview Submitted!</h2>
//                     <p>Redirecting to your progress page...</p>
//                 </div>
//             ) : (
//                 <div>
//                     <div className="timer">
//                         Question {currentQuestionIndex + 1} of 10 — Time Left: {timeLeft}s
//                     </div>
//                     <div className="question-card">
//                         <p>{questions[currentQuestionIndex]?.questionText}</p>
//                     </div>
//                     <textarea
//                         rows="4"
//                         placeholder="Type your answer here..."
//                         value={answer}
//                         onChange={(e) => setAnswer(e.target.value)}
//                     />
//                     <div className="button-group">
//                         <button onClick={cancelInterview} className="btn cancel-btn">
//                             Cancel
//                         </button>
//                         <button onClick={handleAnswerSubmit} className="btn next-btn">
//                             {currentQuestionIndex === 9 ? "Submit" : "Next"}
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MockInterview;




import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MockInterviews.css";

const MockInterview = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [responses, setResponses] = useState([]);
    const [isInterviewStarted, setIsInterviewStarted] = useState(false);
    const [isInterviewFinished, setIsInterviewFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [cheatingCount, setCheatingCount] = useState(0);
    const navigate = useNavigate();

    // Fetch questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/interview/mock-questions", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setQuestions(response.data.questions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        if (isInterviewStarted) fetchQuestions();
    }, [isInterviewStarted]);

    // Submit interview
    const submitInterview = useCallback(async (finalResponses) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/interview/submit",
                { answers: finalResponses },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("Interview Submitted:", response.data);
            setIsInterviewFinished(true);
            setIsInterviewStarted(false);

            setTimeout(() => {
                navigate("/Progress");
            }, 3000);
        } catch (error) {
            console.error("Error submitting interview:", error);
        }
    }, [navigate]);

    // Answer submission
    const handleAnswerSubmit = useCallback(async () => {
        const currentQuestion = questions[currentQuestionIndex];
        const responseObj = {
            questionId: currentQuestion._id,
            userAnswer: answer.trim(),
        };

        const updatedResponses = [...responses, responseObj];
        setResponses(updatedResponses);
        setAnswer("");

        if (currentQuestionIndex === 9) {
            await submitInterview(updatedResponses);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(180);
        }
    }, [answer, currentQuestionIndex, questions, responses, submitInterview]);

    // Timer
    useEffect(() => {
        let timer;
        if (isInterviewStarted && !isInterviewFinished && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0 && isInterviewStarted && !isInterviewFinished) {
            handleAnswerSubmit();
        }

        return () => clearTimeout(timer);
    }, [timeLeft, isInterviewStarted, isInterviewFinished, handleAnswerSubmit]);

    // Cancel Interview
    const cancelInterview = () => {
        if (window.confirm("Are you sure you want to cancel this interview? All progress will be lost.")) {
            setQuestions([]);
            setResponses([]);
            setIsInterviewStarted(false);
            setIsInterviewFinished(false);
            setCurrentQuestionIndex(0);
            setAnswer("");
            setTimeLeft(180);
            setCheatingCount(0);
        }
    };


    useEffect(() => {
        const handleBlur = async () => {
            if (isInterviewStarted && !isInterviewFinished) {
                const newCount = cheatingCount + 1;
                setCheatingCount(newCount);

                if (newCount >= 3) {
                    alert("Cheating detected 3 times. Interview will now be submitted.");

                    const currentQuestion = questions[currentQuestionIndex];
                    const responseObj = {
                        questionId: currentQuestion?._id,
                        userAnswer: answer.trim(),
                    };

                    const finalResponses = [...responses];
                    if (currentQuestion) {
                        finalResponses.push(responseObj);
                    }

                    setIsInterviewFinished(true); // 👈 UI immediately reflects end of interview
                    setIsInterviewStarted(false); // 👈 prevent any more interaction

                    await submitInterview(finalResponses); // 👈 formally submit
                } else {
                    alert(`Cheating detected (${newCount}/3)! Do not switch tabs or minimize the window.`);
                }
            }
        };

        window.addEventListener("blur", handleBlur);
        return () => window.removeEventListener("blur", handleBlur);
    }, [isInterviewStarted, isInterviewFinished, cheatingCount, answer, responses, currentQuestionIndex, questions, submitInterview]);


    return (
        <div className="mock-interview-container">
            {!isInterviewStarted ? (
                <div className="text-center">
                    <h2>Mock Interview</h2>
                    <p>Click below to begin a 10-question mock interview (5 Tech + 5 HR)</p>
                    <button onClick={() => setIsInterviewStarted(true)} className="btn start-btn">
                        Start Interview
                    </button>
                </div>
            ) : isInterviewFinished ? (
                <div className="success-message">
                    <h2>Interview Submitted!</h2>
                    <p>Redirecting to your progress page...</p>
                </div>
            ) : (
                <div>
                    <div className="timer">
                        Question {currentQuestionIndex + 1} of 10 — Time Left: {timeLeft}s
                    </div>
                    <div className="question-card">
                        <p>{questions[currentQuestionIndex]?.questionText}</p>
                    </div>
                    <textarea
                        rows="4"
                        placeholder="Type your answer here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <div className="button-group">
                        <button onClick={cancelInterview} className="btn cancel-btn">
                            Cancel
                        </button>
                        <button onClick={handleAnswerSubmit} className="btn next-btn">
                            {currentQuestionIndex === 9 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MockInterview;
