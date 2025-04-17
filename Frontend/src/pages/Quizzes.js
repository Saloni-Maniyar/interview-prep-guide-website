

// // import React, { useState } from "react";
// // import axios from "axios";
// // import "../styles/Quiz.css"; // Make sure to update this file with modal styles

// // const Quizzes = () => {
// //     const [quizType, setQuizType] = useState("role");
// //     const [selectedOption, setSelectedOption] = useState("");
// //     const [questions, setQuestions] = useState([]);
// //     const [userAnswers, setUserAnswers] = useState({});
// //     const [showModal, setShowModal] = useState(false); // NEW: Modal toggle

// //     const userId = localStorage.getItem("userId");

// //     const fetchQuestions = async () => {
// //         try {
// //             const res = await axios.get(`http://localhost:5000/api/quiz/get-quiz?topic=${selectedOption}&limit=5`);
// //             setQuestions(res.data);
// //             setShowModal(true); // Open modal after fetching questions
// //         } catch (error) {
// //             console.error("Error fetching questions", error);
// //         }
// //     };

// //     const handleQuizStart = () => {
// //         if (!selectedOption) {
// //             alert("Please select an option before starting the quiz.");
// //             return;
// //         }
// //         fetchQuestions();
// //     };

// //     const handleAnswerChange = (questionIndex, selected) => {
// //         setUserAnswers({ ...userAnswers, [questionIndex]: selected });
// //     };

// //     // const handleSubmitQuiz = async () => {
// //     //     let score = 0;
// //     //     questions.forEach((q, index) => {
// //     //         if (userAnswers[index] === q.correctAnswer) {
// //     //             score += 1;
// //     //         }
// //     //     });

// //     //     try {
// //     //         await axios.post("http://localhost:5000/api/quiz/save-quiz", {
// //     //             userId,
// //     //             quizType,
// //     //             selectedOption,
// //     //             questions,
// //     //             score
// //     //         });
// //     //         alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
// //     //         setShowModal(false); // Close modal after submission
// //     //     } catch (error) {
// //     //         console.error("Error saving quiz", error);
// //     //     }
// //     // };

// //     const handleSubmitQuiz = async () => {
// //         let score = 0;

// //         // ✅ Add correctAnswer into questions object and calculate score
// //         const formattedQuestions = questions.map((q, index) => {
// //             const selectedAnswer = userAnswers[index];
// //             const isCorrect = selectedAnswer === q.answer;
// //             if (isCorrect) score += 1;

// //             return {
// //                 questionId: q._id,
// //                 selectedAnswer,
// //                 correctAnswer: q.answer, // ✅ send correctAnswer for backend check
// //             };
// //         });

// //         try {
// //             await axios.post("http://localhost:5000/api/quiz/save-quiz", {
// //                 userId,
// //                 quizType,
// //                 selectedOption,
// //                 questions: formattedQuestions,
// //                 score
// //             });
// //             alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
// //             setShowModal(false);
// //         } catch (error) {
// //             console.error("Error saving quiz", error);
// //         }
// //     };


// //     return (
// //         <div className="quiz-container">
// //             <h2>Choose Your Quiz</h2>

// //             <div className="quiz-selection">
// //                 <label>
// //                     <input type="radio" name="quizType" value="role" checked={quizType === "role"}
// //                         onChange={() => { setQuizType("role"); setSelectedOption(""); }} />
// //                     Role-Based Quiz
// //                 </label>

// //                 <label>
// //                     <input type="radio" name="quizType" value="topic" checked={quizType === "topic"}
// //                         onChange={() => { setQuizType("topic"); setSelectedOption(""); }} />
// //                     Topic-Based Quiz
// //                 </label>
// //             </div>

// //             <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
// //                 <option value="">Select {quizType === "role" ? "Role" : "Topic"}</option>
// //                 {quizType === "role"
// //                     ? ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Project Manager"].map((role) => (
// //                         <option key={role} value={role}>{role}</option>
// //                     ))
// //                     : ["JavaScript", "Python", "React", "Node.js", "Database Management"].map((topic) => (
// //                         <option key={topic} value={topic}>{topic}</option>
// //                     ))}
// //             </select>

// //             <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>

// //             {/* ✅ Modal UI for Quiz */}
// //             {showModal && (
// //                 <div className="quiz-modal-overlay">
// //                     <div className="quiz-modal">
// //                         <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
// //                         <h3>Quiz Questions</h3>
// //                         {questions.map((q, index) => (
// //                             <div key={index} className="question-box">
// //                                 <p><strong>Q{index + 1}:</strong> {q.question}</p>
// //                                 {q.options.map((option, i) => (
// //                                     <label key={i}>
// //                                         <input
// //                                             type="radio"
// //                                             name={`question-${index}`}
// //                                             value={option}
// //                                             onChange={() => handleAnswerChange(index, option)}
// //                                         />
// //                                         {option}
// //                                     </label>
// //                                 ))}
// //                             </div>
// //                         ))}
// //                         <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Quizzes;





// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "../styles/Quiz.css"; // Make sure to update this file with modal styles

// // const Quizzes = () => {
// //     const [selectedTopic, setSelectedTopic] = useState(""); // To store the selected topic
// //     const [topics, setTopics] = useState([]); // To store the topics fetched from the backend
// //     const [questions, setQuestions] = useState([]); // To store quiz questions
// //     const [userAnswers, setUserAnswers] = useState({}); // To store user answers
// //     const [showModal, setShowModal] = useState(false); // Modal toggle state

// //     const userId = localStorage.getItem("userId");

// //     // Fetch distinct topics from the backend
// //     useEffect(() => {
// //         const fetchTopics = async () => {
// //             try {
// //                 const res = await axios.get("http://localhost:5000/api/quiz/distinct-topics");

// //                 setTopics(res.data);
// //             } catch (error) {
// //                 console.error("Error fetching topics", error);
// //             }
// //         };

// //         fetchTopics();
// //     }, []);


// //     const fetchQuestions = async () => {
// //         try {
// //             const token = localStorage.getItem("token");  // Retrieve token from localStorage
// //             if (!token) {
// //                 alert("You need to log in first!");
// //                 return;
// //             }

// //             console.log("Authorization Token:", token); // Log token for debugging

// //             const res = await axios.get(`http://localhost:5000/api/quiz/get-quiz?topic=${selectedTopic}&limit=5`, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,  // Set Authorization header with Bearer token
// //                 },
// //             });

// //             console.log("Fetched questions:", res.data);
// //             setQuestions(res.data);
// //             setShowModal(true);  // Open modal after fetching questions
// //         } catch (error) {
// //             console.error("Error fetching questions", error.response || error);
// //         }
// //     };



// //     const handleQuizStart = () => {
// //         if (!selectedTopic) {
// //             alert("Please select a topic before starting the quiz.");
// //             return;
// //         }
// //         fetchQuestions();
// //     };

// //     const handleAnswerChange = (questionIndex, selected) => {
// //         setUserAnswers({ ...userAnswers, [questionIndex]: selected });
// //     };

// //     const handleSubmitQuiz = async () => {
// //         let score = 0;
// //         const timeTaken = "5m 30s";

// //         // Format questions with selected answers and calculate score
// //         const formattedQuestions = questions.map((q, index) => {
// //             const selectedAnswer = userAnswers[index];
// //             const isCorrect = selectedAnswer === q.correctAnswer;
// //             if (isCorrect) score += 1;

// //             return {
// //                 questionId: q._id,
// //                 selectedAnswer,
// //                 correctAnswer: q.Correctanswer,
// //             };
// //         });

// //         try {
// //             await axios.post("http://localhost:5000/api/quiz/save-quiz", {
// //                 userId,
// //                 quizType: "topic", // Use "topic" as the quiz type
// //                 selectedOption: selectedTopic,
// //                 questions: formattedQuestions,
// //                 score
// //                 timeTaken
// //             });
// //             alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
// //             setShowModal(false); // Close modal after submission
// //         } catch (error) {
// //             console.error("Error saving quiz", error);
// //         }
// //     };

// //     return (
// //         <div className="quiz-container">
// //             <h2>Choose Your Quiz Topic</h2>

// //             {/* Topic Selection Dropdown */}
// //             <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} required>
// //                 <option value="">Select Topic</option>
// //                 {topics.map((topic) => (
// //                     <option key={topic} value={topic}>{topic}</option>
// //                 ))}
// //             </select>

// //             {/* Start Quiz Button */}
// //             <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>

// //             {/* Modal for Quiz Questions */}
// //             {showModal && (
// //                 <div className="quiz-modal-overlay">
// //                     <div className="quiz-modal">
// //                         <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
// //                         <h3>Quiz Questions</h3>
// //                         {questions.map((q, index) => (
// //                             <div key={index} className="question-box">
// //                                 <p><strong>Q{index + 1}:</strong> {q.question}</p>
// //                                 {q.options.map((option, i) => (
// //                                     <label key={i}>
// //                                         <input
// //                                             type="radio"
// //                                             name={`question-${index}`}
// //                                             value={option}
// //                                             onChange={() => handleAnswerChange(index, option)}
// //                                         />
// //                                         {option}
// //                                     </label>
// //                                 ))}
// //                             </div>
// //                         ))}
// //                         <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Quizzes;




// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "../styles/Quiz.css";

// // const Quizzes = () => {
// //     const [selectedTopic, setSelectedTopic] = useState("");
// //     const [topics, setTopics] = useState([]);
// //     const [questions, setQuestions] = useState([]);
// //     const [userAnswers, setUserAnswers] = useState({});
// //     const [showModal, setShowModal] = useState(false);
// //     const [startTime, setStartTime] = useState(null);
// //     const [timeTaken, setTimeTaken] = useState("");
// //     const [violationCount, setViolationCount] = useState(0);

// //     const userId = localStorage.getItem("userId");

// //     useEffect(() => {
// //         const fetchTopics = async () => {
// //             try {
// //                 const res = await axios.get("http://localhost:5000/api/quiz/distinct-topics");
// //                 setTopics(res.data);
// //             } catch (error) {
// //                 console.error("Error fetching topics", error);
// //             }
// //         };
// //         fetchTopics();
// //     }, []);

// //     const fetchQuestions = async () => {
// //         try {
// //             const token = localStorage.getItem("token");
// //             if (!token) {
// //                 alert("You need to log in first!");
// //                 return;
// //             }

// //             const res = await axios.get(`http://localhost:5000/api/quiz/get-quiz?topic=${selectedTopic}`, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });

// //             setQuestions(res.data);
// //             setStartTime(Date.now());
// //             setShowModal(true);
// //             setViolationCount(0);
// //         } catch (error) {
// //             console.error("Error fetching questions", error.response || error);
// //         }
// //     };

// //     const handleQuizStart = () => {
// //         if (!selectedTopic) {
// //             alert("Please select a topic before starting the quiz.");
// //             return;
// //         }
// //         fetchQuestions();
// //     };

// //     const handleAnswerChange = (questionIndex, selected) => {
// //         setUserAnswers({ ...userAnswers, [questionIndex]: selected });
// //     };

// //     const handleSubmitQuiz = async () => {
// //         const endTime = Date.now();
// //         const secondsTaken = Math.floor((endTime - startTime) / 1000);
// //         const mins = Math.floor(secondsTaken / 60);
// //         const secs = secondsTaken % 60;
// //         const timeTakenFormatted = `${mins}m ${secs}s`;
// //         setTimeTaken(timeTakenFormatted);

// //         let score = 0;

// //         const formattedQuestions = questions.map((q, index) => {
// //             const selectedAnswer = userAnswers[index];
// //             const isCorrect = selectedAnswer?.trim().toLowerCase() === q.correctAnswer?.trim().toLowerCase();
// //             if (isCorrect) score++;

// //             return {
// //                 questionId: q._id,
// //                 questionText: q.questionText,
// //                 options: q.options,
// //                 correctAnswer: q.correctAnswer,
// //                 explanation: q.explanation,
// //                 selectedAnswer: q.selectedAnswer,
// //                 isCorrect,
// //             };
// //         });

// //         try {
// //             const token = localStorage.getItem("token");
// //             await axios.post("http://localhost:5000/api/quiz/save-quiz", {
// //                 userId,
// //                 selectedOption: selectedTopic,
// //                 timeTaken: timeTakenFormatted,
// //                 questions: formattedQuestions,
// //             }, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });

// //             alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
// //             setShowModal(false);
// //         } catch (error) {
// //             console.error("Error saving quiz", error);
// //         }
// //     };

// //     // Cheating prevention logic
// //     useEffect(() => {
// //         const handleVisibilityChange = () => {
// //             if (document.hidden) {
// //                 handleViolation();
// //             }
// //         };

// //         const handleBlur = () => {
// //             handleViolation();
// //         };

// //         if (showModal) {
// //             document.addEventListener("visibilitychange", handleVisibilityChange);
// //             window.addEventListener("blur", handleBlur);
// //         }

// //         return () => {
// //             document.removeEventListener("visibilitychange", handleVisibilityChange);
// //             window.removeEventListener("blur", handleBlur);
// //         };
// //     }, [showModal, violationCount]);

// //     const handleViolation = () => {
// //         setViolationCount(prev => {
// //             const updated = prev + 1;
// //             alert(`⚠️ Cheating detected! (${updated} time(s))`);
// //             if (updated >= 3) {
// //                 alert("Quiz auto-submitted due to cheating!");
// //                 handleSubmitQuiz();
// //             }
// //             return updated;
// //         });
// //     };

// //     return (
// //         <div className="quiz-container">
// //             <h2>Choose Your Quiz Topic</h2>
// //             <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} required>
// //                 <option value="">Select Topic</option>
// //                 {topics.map((topic) => (
// //                     <option key={topic} value={topic}>{topic}</option>
// //                 ))}
// //             </select>
// //             <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>

// //             {showModal && (
// //                 <div className="quiz-modal-overlay">
// //                     <div className="quiz-modal">
// //                         <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
// //                         <h3>Quiz Questions</h3>
// //                         {questions.map((q, index) => (
// //                             <div key={index} className="question-box">
// //                                 <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
// //                                 {q.options.map((option, i) => (
// //                                     <label key={i}>
// //                                         <input
// //                                             type="radio"
// //                                             name={`question-${index}`}
// //                                             value={option}
// //                                             onChange={() => handleAnswerChange(index, option)}
// //                                         />
// //                                         {option}
// //                                     </label>
// //                                 ))}
// //                             </div>
// //                         ))}
// //                         <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Quizzes;











// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/Quiz.css";

// const Quizzes = () => {
//     const [selectedTopic, setSelectedTopic] = useState("");
//     const [topics, setTopics] = useState([]);
//     const [questions, setQuestions] = useState([]);
//     const [userAnswers, setUserAnswers] = useState({});
//     const [showModal, setShowModal] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [cheatingCount, setCheatingCount] = useState(0);
//     const [startTime, setStartTime] = useState(null);
//     const [timer, setTimer] = useState(0);
//     const userId = localStorage.getItem("userId");

//     // Fetch topics
//     useEffect(() => {
//         const fetchTopics = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5000/api/quiz/distinct-topics");
//                 console.log("Fetched topics:", res.data);  // <-- check thi
//                 setTopics(res.data);
//             } catch (error) {
//                 console.error("Error fetching topics", error);
//             }
//         };
//         fetchTopics();
//     }, []);

//     // Handle cheating detection (window blur)
//     useEffect(() => {
//         const handleBlur = () => {
//             if (showModal && !isSubmitting) {
//                 const newCount = cheatingCount + 1;
//                 setCheatingCount(newCount);

//                 if (newCount >= 2) {
//                     alert("Cheating detected twice! Quiz has been cancelled.");
//                     setShowModal(false);
//                     setQuestions([]);
//                     setUserAnswers({});
//                     setTimer(0);
//                     setCheatingCount(0);
//                 } else {
//                     alert("Cheating detected! Don't switch tabs or minimize!");
//                 }
//             }
//         }
//         window.addEventListener("blur", handleBlur);
//         return () => window.removeEventListener("blur", handleBlur);
//     }, [showModal]);

//     // Timer logic
//     useEffect(() => {
//         let interval;
//         if (showModal) {
//             setStartTime(Date.now());
//             interval = setInterval(() => {
//                 setTimer(Math.floor((Date.now() - startTime) / 1000));
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [showModal, startTime]);

//     const fetchQuestions = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 alert("You need to log in first!");
//                 return;
//             }

//             const res = await axios.get(`http://localhost:5000/api/quiz/get-quiz?topic=${selectedTopic}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             setQuestions(res.data);
//             setShowModal(true);
//             setUserAnswers({});
//             setTimer(0);
//         } catch (error) {
//             console.error("Error fetching questions", error.response || error);
//         }
//     };

//     const handleQuizStart = () => {
//         console.log("Selected topic: ", selectedTopic);  // <-- add this
//         if (!selectedTopic) {
//             alert("Please select a topic before starting the quiz.");
//             return;
//         }
//         fetchQuestions();
//     };

//     const handleAnswerChange = (questionIndex, selected) => {
//         setUserAnswers({ ...userAnswers, [questionIndex]: selected });
//     };

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins}m ${secs}s`;
//     };

//     const handleSubmitQuiz = async () => {


//         setIsSubmitting(true); // prevent cheating alert on submit
//         let score = 0;

//         // Log the questions to ensure correct structure
//         console.log("Formatted questions:", questions);

//         const formattedQuestions = questions.map((q, index) => {
//             const selectedAnswer = userAnswers[index];
//             const isCorrect = selectedAnswer === q.correctAnswer;
//             if (isCorrect) score++;

//             return {
//                 questionId: q._id,
//                 questionText: q.questionText,
//                 options: q.options,
//                 correctAnswer: q.correctAnswer,
//                 explanation: q.explanation,
//                 selectedAnswer,
//                 isCorrect,
//                 topic: q.topic,
//                 difficulty: q.difficulty
//             };
//         });

//         const timeTaken = formatTime(timer);

//         // Debug: Log the formatted data
//         console.log('Formatted questions:', formattedQuestions);

//         try {

//             const token = localStorage.getItem("token"); // <-- Get the token


//             const response = await axios.post("http://localhost:5000/api/quiz/save-quiz", {
//                 userId,
//                 selectedOption: selectedTopic,
//                 timeTaken,
//                 questions: formattedQuestions,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`  // <-- Add the token here
//                 }
//             });



//             // Debug: Check the response from the backend
//             console.log('Quiz saved response:', response.data);

//             alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
//             setShowModal(false);
//         } catch (error) {
//             console.error("Error saving quiz", error);
//         }
//     };

//     return (
//         <div className="quiz-container">
//             <h2>Choose Your Quiz Topic</h2>

//             <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} required>
//                 <option value="">Select Topic</option>
//                 {topics.map((topic) => (
//                     <option key={topic} value={topic}>{topic}</option>
//                 ))}
//             </select>

//             <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>

//             {showModal && (
//                 <div className="quiz-modal-overlay">
//                     <div className="quiz-modal">
//                         <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
//                         <h3>Quiz Questions</h3>
//                         <p><strong>Timer:</strong> {formatTime(timer)}</p>

//                         {questions.map((q, index) => (
//                             <div key={index} className="question-box">
//                                 <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
//                                 {q.options.map((option, i) => (
//                                     <label key={i}>
//                                         <input
//                                             type="radio"
//                                             name={`question-${index}`}
//                                             value={option}
//                                             onChange={() => handleAnswerChange(index, option)}
//                                         />
//                                         {option}
//                                     </label>
//                                 ))}
//                             </div>
//                         ))}

//                         <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Quizzes;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/Quiz.css";

// const Quizzes = () => {
//     const [selectedTopic, setSelectedTopic] = useState("");
//     const [topics, setTopics] = useState([]);
//     const [questions, setQuestions] = useState([]);
//     const [userAnswers, setUserAnswers] = useState({});
//     const [showModal, setShowModal] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [cheatingCount, setCheatingCount] = useState(0);
//     const [startTime, setStartTime] = useState(null);
//     const [timer, setTimer] = useState(0);
//     const [userQuizProgress, setUserQuizProgress] = useState(null); // State to hold quiz progress
//     const userId = localStorage.getItem("userId");

//     // Fetch quiz progress when component loads
//     useEffect(() => {
//         const fetchQuizAttempts = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/quiz/user-quiz-progress/${userId}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 console.log("Fetched quiz progress:", response.data);
//                 setUserQuizProgress(response.data); // Store quiz progress in state
//             } catch (error) {
//                 console.error("Error fetching quiz progress:", error);
//             }
//         };

//         if (userId) {
//             fetchQuizProgress();
//         }
//     }, [userId]);

//     // Fetch topics
//     useEffect(() => {
//         const fetchTopics = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5000/api/quiz/distinct-topics");
//                 console.log("Fetched topics:", res.data);
//                 setTopics(res.data);
//             } catch (error) {
//                 console.error("Error fetching topics", error);
//             }
//         };
//         fetchTopics();
//     }, []);

//     // Handle cheating detection (window blur)
//     useEffect(() => {
//         const handleBlur = () => {
//             if (showModal && !isSubmitting) {
//                 const newCount = cheatingCount + 1;
//                 setCheatingCount(newCount);

//                 if (newCount >= 2) {
//                     alert("Cheating detected twice! Quiz has been cancelled.");
//                     setShowModal(false);
//                     setQuestions([]);
//                     setUserAnswers({});
//                     setTimer(0);
//                     setCheatingCount(0);
//                 } else {
//                     alert("Cheating detected! Don't switch tabs or minimize!");
//                 }
//             }
//         };
//         window.addEventListener("blur", handleBlur);
//         return () => window.removeEventListener("blur", handleBlur);
//     }, [showModal]);

//     // Timer logic
//     useEffect(() => {
//         let interval;
//         if (showModal) {
//             setStartTime(Date.now());
//             interval = setInterval(() => {
//                 setTimer(Math.floor((Date.now() - startTime) / 1000));
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [showModal, startTime]);

//     const fetchQuestions = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 alert("You need to log in first!");
//                 return;
//             }

//             const res = await axios.get(`http://localhost:5000/api/quiz/get-quiz?topic=${selectedTopic}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             setQuestions(res.data);
//             setShowModal(true);
//             setUserAnswers({});
//             setTimer(0);
//         } catch (error) {
//             console.error("Error fetching questions", error.response || error);
//         }
//     };

//     const handleQuizStart = () => {
//         console.log("Selected topic: ", selectedTopic);
//         if (!selectedTopic) {
//             alert("Please select a topic before starting the quiz.");
//             return;
//         }
//         fetchQuestions();
//     };

//     const handleAnswerChange = (questionIndex, selected) => {
//         setUserAnswers({ ...userAnswers, [questionIndex]: selected });
//     };

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins}m ${secs}s`;
//     };

//     const handleSubmitQuiz = async () => {
//         setIsSubmitting(true);
//         let score = 0;

//         const formattedQuestions = questions.map((q, index) => {
//             const selectedAnswer = userAnswers[index];
//             const isCorrect = selectedAnswer === q.correctAnswer;
//             if (isCorrect) score++;

//             return {
//                 questionId: q._id,
//                 questionText: q.questionText,
//                 options: q.options,
//                 correctAnswer: q.correctAnswer,
//                 explanation: q.explanation,
//                 selectedAnswer,
//                 isCorrect,
//                 topic: q.topic,
//                 difficulty: q.difficulty
//             };
//         });

//         const timeTaken = formatTime(timer);

//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.post("http://localhost:5000/api/quiz/save-quiz", {
//                 userId,
//                 selectedOption: selectedTopic,
//                 timeTaken,
//                 questions: formattedQuestions,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
//             setShowModal(false);
//         } catch (error) {
//             console.error("Error saving quiz", error);
//         }
//     };

//     return (
//         <div className="quiz-container">
//             <h2>Choose Your Quiz Topic</h2>

//             <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} required>
//                 <option value="">Select Topic</option>
//                 {topics.map((topic) => (
//                     <option key={topic} value={topic}>{topic}</option>
//                 ))}
//             </select>

//             <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>

//             {/* Displaying Quiz Progress */}
//             {userQuizProgress && (
//                 <div className="quiz-progress">
//                     <h3>Your Quiz Progress</h3>
//                     <p>{`Completed Quizzes: ${userQuizProgress.completedQuizzes}`}</p>
//                     {/* Add other progress info as needed */}
//                     {/* Example of additional information you might want to display */}
//                     <p>{`Total Questions Attempted: ${userQuizProgress.totalQuestionsAttempted}`}</p>
//                     <p>{`Total Score: ${userQuizProgress.totalScore}`}</p>
//                 </div>
//             )}

//             {showModal && (
//                 <div className="quiz-modal-overlay">
//                     <div className="quiz-modal">
//                         <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
//                         <h3>Quiz Questions</h3>
//                         <p><strong>Timer:</strong> {formatTime(timer)}</p>

//                         {questions.map((q, index) => (
//                             <div key={index} className="question-box">
//                                 <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
//                                 {q.options.map((option, i) => (
//                                     <label key={i}>
//                                         <input
//                                             type="radio"
//                                             name={`question-${index}`}
//                                             value={option}
//                                             onChange={() => handleAnswerChange(index, option)}
//                                         />
//                                         {option}
//                                     </label>
//                                 ))}
//                             </div>
//                         ))}

//                         <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Quizzes;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Quiz.css";

const Quizzes = () => {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [topics, setTopics] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cheatingCount, setCheatingCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [timer, setTimer] = useState(0);
    const [userQuizProgress, setUserQuizProgress] = useState({ completedQuizzes: 0, totalQuestionsAttempted: 0, totalScore: 0 }); // Initialize with default values
    const userId = localStorage.getItem("userId");

    // Fetch quiz progress when component loads
    useEffect(() => {
        const fetchQuizAttempts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quiz/user-quiz-progress/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("Fetched quiz progress:", response.data);
                setUserQuizProgress(response.data || { completedQuizzes: 0, totalQuestionsAttempted: 0, totalScore: 0 }); // Default to empty progress if data is undefined
            } catch (error) {
                console.error("Error fetching quiz progress:", error);
            }
        };

        if (userId) {
            fetchQuizAttempts();
        }
    }, [userId]);

    // Fetch topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/quiz/distinct-topics");
                console.log("Fetched topics:", res.data);
                setTopics(res.data);
            } catch (error) {
                console.error("Error fetching topics", error);
            }
        };
        fetchTopics();
    }, []);

    // Handle cheating detection (window blur)
    useEffect(() => {
        const handleBlur = () => {
            if (showModal && !isSubmitting) {
                const newCount = cheatingCount + 1;
                setCheatingCount(newCount);

                if (newCount >= 2) {
                    alert("Cheating detected twice! Quiz has been cancelled.");
                    setShowModal(false);
                    setQuestions([]);
                    setUserAnswers({});
                    setTimer(0);
                    setCheatingCount(0);
                } else {
                    alert("Cheating detected! Don't switch tabs or minimize!");
                }
            }
        };
        window.addEventListener("blur", handleBlur);
        return () => window.removeEventListener("blur", handleBlur);
    }, [showModal]);

    // Timer logic
    useEffect(() => {
        let interval;
        if (showModal) {
            setStartTime(Date.now());
            interval = setInterval(() => {
                setTimer(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showModal, startTime]);

    const fetchQuestions = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You need to log in first!");
                return;
            }

            const res = await axios.get(`http://localhost:5000/api/quiz/get-quiz?topic=${selectedTopic}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setQuestions(res.data);
            setShowModal(true);
            setUserAnswers({});
            setTimer(0);
        } catch (error) {
            console.error("Error fetching questions", error.response || error);
        }
    };

    const handleQuizStart = () => {
        console.log("Selected topic: ", selectedTopic);
        if (!selectedTopic) {
            alert("Please select a topic before starting the quiz.");
            return;
        }
        fetchQuestions();
    };

    const handleAnswerChange = (questionIndex, selected) => {
        setUserAnswers({ ...userAnswers, [questionIndex]: selected });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const handleSubmitQuiz = async () => {
        setIsSubmitting(true);
        let score = 0;

        const formattedQuestions = questions.map((q, index) => {
            const selectedAnswer = userAnswers[index];
            const isCorrect = selectedAnswer === q.correctAnswer;
            if (isCorrect) score++;

            return {
                questionId: q._id,
                questionText: q.questionText,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                selectedAnswer,
                isCorrect,
                topic: q.topic,
                difficulty: q.difficulty
            };
        });

        const timeTaken = formatTime(timer);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:5000/api/quiz/save-quiz", {
                userId,
                selectedOption: selectedTopic,
                timeTaken,
                questions: formattedQuestions,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(`Quiz submitted! Your score: ${score}/${questions.length}`);
            setShowModal(false);
        } catch (error) {
            console.error("Error saving quiz", error);
        }
    };

    return (
        <div className="quiz-container">
            <h2>Choose Your Quiz Topic</h2>

            <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} required>
                <option value="">Select Topic</option>
                {topics.map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                ))}
            </select>

            <button className="start-quiz-btn" onClick={handleQuizStart}>Start Quiz</button>

            {/* Displaying Quiz Progress */}
            {userQuizProgress && (
                <div className="quiz-progress">
                    <h3>Your Quiz Progress</h3>
                    <p>{`Completed Quizzes: ${userQuizProgress.completedQuizzes}`}</p>
                    {/* Add other progress info as needed */}
                    <p>{`Total Questions Attempted: ${userQuizProgress.totalQuestionsAttempted}`}</p>
                    <p>{`Total Score: ${userQuizProgress.totalScore}`}</p>
                </div>
            )}

            {showModal && (
                <div className="quiz-modal-overlay">
                    <div className="quiz-modal">
                        <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
                        <h3>Quiz Questions</h3>
                        <p><strong>Timer:</strong> {formatTime(timer)}</p>

                        {questions.map((q, index) => (
                            <div key={index} className="question-box">
                                <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
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
