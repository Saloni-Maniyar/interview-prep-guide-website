// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import "../styles/MockInterviews.css";

// // // // const hrQuestions = [
// // // //     "Tell me about yourself.",
// // // //     "What are your strengths and weaknesses?",
// // // //     "Where do you see yourself in 5 years?",
// // // //     "Describe a challenging situation and how you handled it."
// // // // ];

// // // // const HRInterview = () => {
// // // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // // //     const [isRecording, setIsRecording] = useState(false);
// // // //     const [transcript, setTranscript] = useState("");
// // // //     const recognitionRef = useRef(null);

// // // //     useEffect(() => {
// // // //         if (!("webkitSpeechRecognition" in window)) {
// // // //             alert("Speech Recognition not supported in this browser");
// // // //             return;
// // // //         }
// // // //         const SpeechRecognition = window.webkitSpeechRecognition;
// // // //         recognitionRef.current = new SpeechRecognition();
// // // //         recognitionRef.current.continuous = false;
// // // //         recognitionRef.current.interimResults = true;
// // // //         recognitionRef.current.lang = "en-US";

// // // //         recognitionRef.current.onresult = (event) => {
// // // //             let interimTranscript = "";
// // // //             for (let i = event.resultIndex; i < event.results.length; i++) {
// // // //                 const transcriptPiece = event.results[i][0].transcript;
// // // //                 if (event.results[i].isFinal) {
// // // //                     setTranscript((prev) => prev + transcriptPiece + " ");
// // // //                 } else {
// // // //                     interimTranscript += transcriptPiece;
// // // //                 }
// // // //             }
// // // //         };

// // // //         recognitionRef.current.onend = () => {
// // // //             setIsRecording(false);
// // // //         };
// // // //     }, []);

// // // //     const handleStart = () => {
// // // //         setTranscript("");
// // // //         setIsRecording(true);
// // // //         recognitionRef.current.start();
// // // //     };

// // // //     const handleStop = () => {
// // // //         recognitionRef.current.stop();
// // // //         setIsRecording(false);
// // // //     };

// // // //     const handleNextQuestion = () => {
// // // //         if (currentQuestionIndex < hrQuestions.length - 1) {
// // // //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// // // //             setTranscript("");
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="mock-interview-container">
// // // //             <div className="left-sidebar">
// // // //                 <h3>🧠 HR Tips</h3>
// // // //                 <ul>
// // // //                     <li>Be honest & confident</li>
// // // //                     <li>Maintain good tone & clarity</li>
// // // //                     <li>Use real-life examples</li>
// // // //                 </ul>
// // // //                 <div className="progress">
// // // //                     <p>Progress: {currentQuestionIndex + 1} / {hrQuestions.length}</p>
// // // //                     <progress value={currentQuestionIndex + 1} max={hrQuestions.length}></progress>
// // // //                 </div>
// // // //             </div>

// // // //             <div className="interview-box">
// // // //                 <h2>HR Interview</h2>
// // // //                 <div className="question-card">
// // // //                     <h3>Question {currentQuestionIndex + 1}</h3>
// // // //                     <p>{hrQuestions[currentQuestionIndex]}</p>

// // // //                     <div className="voice-controls">
// // // //                         <button onClick={isRecording ? handleStop : handleStart}>
// // // //                             {isRecording ? "🛑 Stop" : "🎤 Start Speaking"}
// // // //                         </button>
// // // //                     </div>

// // // //                     <textarea
// // // //                         placeholder="Your transcribed answer will appear here..."
// // // //                         value={transcript}
// // // //                         readOnly
// // // //                     ></textarea>

// // // //                     <button className="next-btn" onClick={handleNextQuestion}>Next Question</button>
// // // //                 </div>
// // // //             </div>

// // // //             <div className="right-sidebar">
// // // //                 <h3>💡 Tip</h3>
// // // //                 <blockquote>“Speak clearly, confidently, and from the heart.”</blockquote>

// // // //                 <h3>💬 Feedback</h3>
// // // //                 <p>(We’ll show AI feedback and confidence analysis here soon!)</p>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default HRInterview;




// // // // import React, { useEffect, useState, useRef } from "react";
// // // // // import "../styles/MockInterviews.css";

// // // // const HRInterview = () => {
// // // //     const [questions, setQuestions] = useState([]);
// // // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // // //     const [isRecording, setIsRecording] = useState(false);
// // // //     const [transcript, setTranscript] = useState("");
// // // //     const recognitionRef = useRef(null);

// // // //     // Fetch HR questions from the backend
// // // //     useEffect(() => {
// // // //         const fetchHRQuestions = async () => {
// // // //             try {
// // // //                 const token = localStorage.getItem("token");

// // // //                 const response = await fetch("http://localhost:5000/api/interview/hr", {
// // // //                     method: "GET",
// // // //                     headers: {
// // // //                         "Content-Type": "application/json",
// // // //                         Authorization: `Bearer ${token}`,
// // // //                     },
// // // //                 });

// // // //                 const data = await response.json();

// // // //                 if (!response.ok) {
// // // //                     throw new Error(data.message || "Failed to fetch HR questions");
// // // //                 }

// // // //                 setQuestions(data.questions); // ✅ This will now work
// // // //             } catch (error) {
// // // //                 console.error("Error fetching HR questions:", error);
// // // //             }
// // // //         };

// // // //         fetchHRQuestions(); // ✅ Call it here!
// // // //     }, []);




// // // //     // Initialize speech recognition
// // // //     useEffect(() => {
// // // //         if (!("webkitSpeechRecognition" in window)) {
// // // //             alert("Speech Recognition not supported in this browser");
// // // //             return;
// // // //         }

// // // //         const SpeechRecognition = window.webkitSpeechRecognition;
// // // //         recognitionRef.current = new SpeechRecognition();
// // // //         recognitionRef.current.continuous = false;
// // // //         recognitionRef.current.interimResults = true;
// // // //         recognitionRef.current.lang = "en-US";

// // // //         recognitionRef.current.onresult = (event) => {
// // // //             let interimTranscript = "";
// // // //             for (let i = event.resultIndex; i < event.results.length; i++) {
// // // //                 const transcriptPiece = event.results[i][0].transcript;
// // // //                 if (event.results[i].isFinal) {
// // // //                     setTranscript((prev) => prev + transcriptPiece + " ");
// // // //                 } else {
// // // //                     interimTranscript += transcriptPiece;
// // // //                 }
// // // //             }
// // // //         };

// // // //         recognitionRef.current.onend = () => {
// // // //             setIsRecording(false);
// // // //         };
// // // //     }, []);

// // // //     const handleStart = () => {
// // // //         setTranscript("");
// // // //         setIsRecording(true);
// // // //         recognitionRef.current.start();
// // // //     };

// // // //     const handleStop = () => {
// // // //         recognitionRef.current.stop();
// // // //         setIsRecording(false);
// // // //     };

// // // //     const handleNextQuestion = () => {
// // // //         if (currentQuestionIndex < questions.length - 1) {
// // // //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// // // //             setTranscript("");
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="mock-interview-container">
// // // //             <div className="left-sidebar">
// // // //                 <h3>🧠 HR Tips</h3>
// // // //                 <ul>
// // // //                     <li>Be honest & confident</li>
// // // //                     <li>Maintain good tone & clarity</li>
// // // //                     <li>Use real-life examples</li>
// // // //                 </ul>
// // // //                 <div className="progress">
// // // //                     <p>Progress: {currentQuestionIndex + 1} / {questions.length}</p>
// // // //                     <progress value={currentQuestionIndex + 1} max={questions.length}></progress>
// // // //                 </div>
// // // //             </div>

// // // //             <div className="interview-box">
// // // //                 <h2>HR Interview</h2>
// // // //                 {questions.length > 0 ? (
// // // //                     <div className="question-card">
// // // //                         <h3>Question {currentQuestionIndex + 1}</h3>
// // // //                         <p>{questions[currentQuestionIndex]?.questionText}</p>

// // // //                         <div className="voice-controls">
// // // //                             <button onClick={isRecording ? handleStop : handleStart}>
// // // //                                 {isRecording ? "🛑 Stop" : "🎤 Start Speaking"}
// // // //                             </button>
// // // //                         </div>

// // // //                         <textarea
// // // //                             placeholder="Your transcribed answer will appear here..."
// // // //                             value={transcript}
// // // //                             readOnly
// // // //                         ></textarea>

// // // //                         <button className="next-btn" onClick={handleNextQuestion}>
// // // //                             Next Question
// // // //                         </button>
// // // //                     </div>
// // // //                 ) : (
// // // //                     <p>Loading HR questions...</p>
// // // //                 )}
// // // //             </div>

// // // //             <div className="right-sidebar">
// // // //                 <h3>💡 Tip</h3>
// // // //                 <blockquote>“Speak clearly, confidently, and from the heart.”</blockquote>

// // // //                 <h3>💬 Feedback</h3>
// // // //                 <p>(We’ll show AI feedback and confidence analysis here soon!)</p>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default HRInterview;




// // // import React, { useEffect, useState, useRef } from "react";
// // // // import "../styles/MockInterviews.css";

// // // const HRInterview = () => {
// // //     const [questions, setQuestions] = useState([]);
// // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // //     const [isRecording, setIsRecording] = useState(false);
// // //     const [transcript, setTranscript] = useState("");
// // //     const [feedback, setFeedback] = useState("");
// // //     const [confidenceScore, setConfidenceScore] = useState(null);
// // //     const recognitionRef = useRef(null);

// // //     // Fetch HR questions from the backend
// // //     useEffect(() => {
// // //         const fetchHRQuestions = async () => {
// // //             try {
// // //                 const token = localStorage.getItem("token");

// // //                 const response = await fetch("http://localhost:5000/api/interview/hr", {
// // //                     method: "GET",
// // //                     headers: {
// // //                         "Content-Type": "application/json",
// // //                         Authorization: `Bearer ${token}`,
// // //                     },
// // //                 });

// // //                 const data = await response.json();

// // //                 if (!response.ok) {
// // //                     throw new Error(data.message || "Failed to fetch HR questions");
// // //                 }

// // //                 setQuestions(data.questions);
// // //             } catch (error) {
// // //                 console.error("Error fetching HR questions:", error);
// // //             }
// // //         };

// // //         fetchHRQuestions();
// // //     }, []);

// // //     // Initialize speech recognition
// // //     useEffect(() => {
// // //         if (!("webkitSpeechRecognition" in window)) {
// // //             alert("Speech Recognition not supported in this browser");
// // //             return;
// // //         }

// // //         const SpeechRecognition = window.webkitSpeechRecognition;
// // //         recognitionRef.current = new SpeechRecognition();
// // //         recognitionRef.current.continuous = false;
// // //         recognitionRef.current.interimResults = true;
// // //         recognitionRef.current.lang = "en-US";

// // //         recognitionRef.current.onresult = (event) => {
// // //             let interimTranscript = "";
// // //             for (let i = event.resultIndex; i < event.results.length; i++) {
// // //                 const transcriptPiece = event.results[i][0].transcript;
// // //                 if (event.results[i].isFinal) {
// // //                     setTranscript((prev) => prev + transcriptPiece + " ");
// // //                 } else {
// // //                     interimTranscript += transcriptPiece;
// // //                 }
// // //             }
// // //         };

// // //         recognitionRef.current.onend = () => {
// // //             setIsRecording(false);
// // //             // Analyze confidence after speaking ends
// // //             const result = calculateConfidence(transcript);
// // //             setFeedback(result.feedback);
// // //             setConfidenceScore(result.confidenceScore);
// // //         };
// // //     }, [transcript]);

// // //     // Confidence analysis logic
// // //     const calculateConfidence = (transcript) => {
// // //         const fillerWords = ["um", "uh", "like", "you know"];
// // //         const words = transcript.trim().split(/\s+/);
// // //         const wordCount = words.length;
// // //         const fillerCount = words.filter((word) => fillerWords.includes(word.toLowerCase())).length;
// // //         const fillerRatio = wordCount > 0 ? fillerCount / wordCount : 0;

// // //         let feedback = "";
// // //         let confidenceScore = 0;

// // //         if (wordCount < 10) {
// // //             feedback = "Your answer was quite short. Try to elaborate more.";
// // //             confidenceScore = 2;
// // //         } else if (fillerRatio > 0.2) {
// // //             feedback = "Avoid using too many fillers like 'um', 'uh'. Practice speaking clearly.";
// // //             confidenceScore = 3;
// // //         } else {
// // //             feedback = "Good clarity and confident tone!";
// // //             confidenceScore = 5;
// // //         }

// // //         return { feedback, confidenceScore };
// // //     };

// // //     const handleStart = () => {
// // //         setTranscript("");
// // //         setFeedback("");
// // //         setConfidenceScore(null);
// // //         setIsRecording(true);
// // //         recognitionRef.current.start();
// // //     };

// // //     const handleStop = () => {
// // //         recognitionRef.current.stop();
// // //         setIsRecording(false);
// // //     };

// // //     const handleNextQuestion = () => {
// // //         if (currentQuestionIndex < questions.length - 1) {
// // //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// // //             setTranscript("");
// // //             setFeedback("");
// // //             setConfidenceScore(null);
// // //         }
// // //     };

// // //     return (
// // //         <div className="mock-interview-container">
// // //             <div className="left-sidebar">
// // //                 <h3>🧠 HR Tips</h3>
// // //                 <ul>
// // //                     <li>Be honest & confident</li>
// // //                     <li>Maintain good tone & clarity</li>
// // //                     <li>Use real-life examples</li>
// // //                 </ul>
// // //                 <div className="progress">
// // //                     <p>Progress: {currentQuestionIndex + 1} / {questions.length}</p>
// // //                     <progress value={currentQuestionIndex + 1} max={questions.length}></progress>
// // //                 </div>
// // //             </div>

// // //             <div className="interview-box">
// // //                 <h2>HR Interview</h2>
// // //                 {questions.length > 0 ? (
// // //                     <div className="question-card">
// // //                         <h3>Question {currentQuestionIndex + 1}</h3>
// // //                         <p>{questions[currentQuestionIndex]?.questionText}</p>

// // //                         <div className="voice-controls">
// // //                             <button onClick={isRecording ? handleStop : handleStart}>
// // //                                 {isRecording ? "🛑 Stop" : "🎤 Start Speaking"}
// // //                             </button>
// // //                         </div>

// // //                         <textarea
// // //                             placeholder="Your transcribed answer will appear here..."
// // //                             value={transcript}
// // //                             readOnly
// // //                         ></textarea>

// // //                         <button className="next-btn" onClick={handleNextQuestion}>
// // //                             Next Question
// // //                         </button>
// // //                     </div>
// // //                 ) : (
// // //                     <p>Loading HR questions...</p>
// // //                 )}
// // //             </div>

// // //             <div className="right-sidebar">
// // //                 <h3>💡 Tip</h3>
// // //                 <blockquote>“Speak clearly, confidently, and from the heart.”</blockquote>

// // //                 <h3>💬 AI Feedback</h3>
// // //                 {feedback ? (
// // //                     <>
// // //                         <p><strong>Confidence Score:</strong> {confidenceScore} / 5</p>
// // //                         <p>{feedback}</p>
// // //                     </>
// // //                 ) : (
// // //                     <p>(Start speaking to receive feedback)</p>
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default HRInterview;



// // import React, { useEffect, useState, useRef } from "react";
// // // import "../styles/MockInterviews.css";

// // const HRInterview = () => {
// //     const [questions, setQuestions] = useState([]);
// //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //     const [isRecording, setIsRecording] = useState(false);
// //     const [transcript, setTranscript] = useState("");
// //     const [feedback, setFeedback] = useState("");
// //     const recognitionRef = useRef(null);

// //     // Fetch HR questions from the backend
// //     useEffect(() => {
// //         const fetchHRQuestions = async () => {
// //             try {
// //                 const token = localStorage.getItem("token");

// //                 const response = await fetch("http://localhost:5000/api/interview/hr", {
// //                     method: "GET",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 });

// //                 const data = await response.json();

// //                 if (!response.ok) {
// //                     throw new Error(data.message || "Failed to fetch HR questions");
// //                 }

// //                 setQuestions(data.questions);
// //             } catch (error) {
// //                 console.error("Error fetching HR questions:", error);
// //             }
// //         };

// //         fetchHRQuestions();
// //     }, []);

// //     // Initialize speech recognition
// //     useEffect(() => {
// //         if (!("webkitSpeechRecognition" in window)) {
// //             alert("Speech Recognition not supported in this browser");
// //             return;
// //         }

// //         const SpeechRecognition = window.webkitSpeechRecognition;
// //         recognitionRef.current = new SpeechRecognition();
// //         recognitionRef.current.continuous = false;
// //         recognitionRef.current.interimResults = true;
// //         recognitionRef.current.lang = "en-US";

// //         recognitionRef.current.onresult = (event) => {
// //             let interimTranscript = "";
// //             for (let i = event.resultIndex; i < event.results.length; i++) {
// //                 const transcriptPiece = event.results[i][0].transcript;
// //                 if (event.results[i].isFinal) {
// //                     setTranscript((prev) => prev + transcriptPiece + " ");
// //                 } else {
// //                     interimTranscript += transcriptPiece;
// //                 }
// //             }
// //         };

// //         recognitionRef.current.onend = () => {
// //             setIsRecording(false);
// //             generateFeedback(transcript);
// //         };
// //     }, [transcript]);

// //     // Generate feedback from transcript
// //     const generateFeedback = (text) => {
// //         const wordCount = text.trim().split(/\s+/).length;
// //         const fillerWords = ["um", "uh", "like", "you know", "so"];
// //         let fillerCount = 0;

// //         fillerWords.forEach((word) => {
// //             const regex = new RegExp(`\\b${word}\\b`, "gi");
// //             const matches = text.match(regex);
// //             if (matches) fillerCount += matches.length;
// //         });

// //         let feedbackText = "";

// //         if (wordCount < 30) {
// //             feedbackText += "Your answer was a bit short. Try to elaborate more. ";
// //         } else if (wordCount < 80) {
// //             feedbackText += "Nice and concise answer. ";
// //         } else {
// //             feedbackText += "Great! You provided a detailed answer. ";
// //         }

// //         if (fillerCount > 3) {
// //             feedbackText += `Try to avoid filler words like "um" and "uh" (${fillerCount} times used). `;
// //         } else {
// //             feedbackText += "Very fluent delivery with minimal filler words. ";
// //         }

// //         setFeedback(feedbackText);
// //     };

// //     const handleStart = () => {
// //         setTranscript("");
// //         setFeedback("");
// //         setIsRecording(true);
// //         recognitionRef.current.start();
// //     };

// //     const handleStop = () => {
// //         recognitionRef.current.stop();
// //         setIsRecording(false);
// //     };

// //     const handleNextQuestion = () => {
// //         if (currentQuestionIndex < questions.length - 1) {
// //             setCurrentQuestionIndex(currentQuestionIndex + 1);
// //             setTranscript("");
// //             setFeedback("");
// //         }
// //     };

// //     return (
// //         <div className="mock-interview-container">
// //             <div className="left-sidebar">
// //                 <h3>🧠 HR Tips</h3>
// //                 <ul>
// //                     <li>Be honest & confident</li>
// //                     <li>Maintain good tone & clarity</li>
// //                     <li>Use real-life examples</li>
// //                 </ul>
// //                 <div className="progress">
// //                     <p>Progress: {currentQuestionIndex + 1} / {questions.length}</p>
// //                     <progress value={currentQuestionIndex + 1} max={questions.length}></progress>
// //                 </div>
// //             </div>

// //             <div className="interview-box">
// //                 <h2>HR Interview</h2>
// //                 {questions.length > 0 ? (
// //                     <div className="question-card">
// //                         <h3>Question {currentQuestionIndex + 1}</h3>
// //                         <p>{questions[currentQuestionIndex]?.questionText}</p>

// //                         <div className="voice-controls">
// //                             <button onClick={isRecording ? handleStop : handleStart}>
// //                                 {isRecording ? "🛑 Stop" : "🎤 Start Speaking"}
// //                             </button>
// //                         </div>

// //                         <textarea
// //                             placeholder="Your transcribed answer will appear here..."
// //                             value={transcript}
// //                             readOnly
// //                         ></textarea>

// //                         <button className="next-btn" onClick={handleNextQuestion}>
// //                             Next Question
// //                         </button>
// //                     </div>
// //                 ) : (
// //                     <p>Loading HR questions...</p>
// //                 )}
// //             </div>

// //             <div className="right-sidebar">
// //                 <h3>💡 Tip</h3>
// //                 <blockquote>“Speak clearly, confidently, and from the heart.”</blockquote>

// //                 <h3>💬 Feedback</h3>
// //                 <p>{feedback ? feedback : "(Feedback will be shown after you stop speaking.)"}</p>
// //             </div>
// //         </div>
// //     );
// // };

// // export default HRInterview;




// import React, { useEffect, useState, useRef } from "react";
// import "../styles/MockInterviews.css"; // Assuming CSS is placed here for visuals

// const fillerWords = ["um", "uh", "like", "you know", "so", "actually"];
// const idealAnswers = {
//     // Map question index to ideal answers
//     0: "I am a dedicated and adaptable individual who thrives in challenging environments.",
//     1: "My strengths include time management, communication, and problem-solving skills.",
//     // Add more as needed...
// };

// const HRInterview = () => {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [isRecording, setIsRecording] = useState(false);
//     const [transcript, setTranscript] = useState("");
//     const [savedAttempts, setSavedAttempts] = useState([]);
//     const [confidenceScore, setConfidenceScore] = useState(null);
//     const [highlightedTranscript, setHighlightedTranscript] = useState("");
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const fetchHRQuestions = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await fetch("http://localhost:5000/api/interview/hr", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
//                 if (!response.ok) throw new Error(data.message || "Failed to fetch HR questions");
//                 setQuestions(data.questions);
//             } catch (error) {
//                 console.error("Error fetching HR questions:", error);
//             }
//         };

//         fetchHRQuestions();
//     }, []);

//     useEffect(() => {
//         if (!("webkitSpeechRecognition" in window)) {
//             alert("Speech Recognition not supported in this browser");
//             return;
//         }

//         const SpeechRecognition = window.webkitSpeechRecognition;
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = false;
//         recognitionRef.current.interimResults = true;
//         recognitionRef.current.lang = "en-US";

//         recognitionRef.current.onresult = (event) => {
//             let finalTranscript = "";
//             for (let i = event.resultIndex; i < event.results.length; i++) {
//                 const transcriptPiece = event.results[i][0].transcript;
//                 if (event.results[i].isFinal) {
//                     finalTranscript += transcriptPiece + " ";
//                 }
//             }
//             setTranscript((prev) => prev + finalTranscript);
//         };

//         recognitionRef.current.onend = () => {
//             setIsRecording(false);
//             analyzeSpeech(transcript);
//         };
//     }, [transcript]);

//     const analyzeSpeech = (text) => {
//         const words = text.split(" ");
//         const fillerCount = words.filter((word) => fillerWords.includes(word.toLowerCase())).length;
//         const totalWords = words.length;
//         const confidence = Math.max(0, 100 - fillerCount * 10); // basic logic
//         setConfidenceScore(confidence);

//         // Highlight filler words
//         const highlighted = words
//             .map((word) =>
//                 fillerWords.includes(word.toLowerCase())
//                     ? `<span class='highlight'>${word}</span>`
//                     : word
//             )
//             .join(" ");
//         setHighlightedTranscript(highlighted);

//         // Save attempt
//         setSavedAttempts((prev) => [
//             ...prev,
//             {
//                 question: questions[currentQuestionIndex]?.questionText,
//                 response: text,
//                 confidence,
//             },
//         ]);
//     };

//     const handleStart = () => {
//         setTranscript("");
//         setHighlightedTranscript("");
//         setConfidenceScore(null);
//         setIsRecording(true);
//         recognitionRef.current.start();
//     };

//     const handleStop = () => {
//         recognitionRef.current.stop();
//         setIsRecording(false);
//     };

//     const handleNextQuestion = () => {
//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setTranscript("");
//             setHighlightedTranscript("");
//             setConfidenceScore(null);
//         }
//     };

//     const getComparison = () => {
//         const ideal = idealAnswers[currentQuestionIndex]?.toLowerCase() || "";
//         const user = transcript.toLowerCase();
//         const similarity = ideal && user
//             ? (user.split(" ").filter((word) => ideal.includes(word)).length / ideal.split(" ").length) * 100
//             : 0;
//         return similarity.toFixed(1);
//     };

//     return (
//         <div className="mock-interview-container">
//             <div className="left-sidebar">
//                 <h3>🧠 HR Tips</h3>
//                 <ul>
//                     <li>Be honest & confident</li>
//                     <li>Maintain good tone & clarity</li>
//                     <li>Use real-life examples</li>
//                 </ul>
//                 <div className="progress">
//                     <p>Progress: {currentQuestionIndex + 1} / {questions.length}</p>
//                     <progress value={currentQuestionIndex + 1} max={questions.length}></progress>
//                 </div>
//             </div>

//             <div className="interview-box">
//                 <h2>HR Interview</h2>
//                 {questions.length > 0 ? (
//                     <div className="question-card">
//                         <h3>Question {currentQuestionIndex + 1}</h3>
//                         <p>{questions[currentQuestionIndex]?.questionText}</p>

//                         <div className="voice-controls">
//                             <button onClick={isRecording ? handleStop : handleStart}>
//                                 {isRecording ? "🛑 Stop" : "🎤 Start Speaking"}
//                             </button>
//                         </div>

//                         <div className="transcript-box">
//                             <h4>Your Answer:</h4>
//                             <p dangerouslySetInnerHTML={{ __html: highlightedTranscript || transcript }}></p>
//                         </div>

//                         {confidenceScore !== null && (
//                             <div className="feedback-section">
//                                 <p>Confidence Score:</p>
//                                 <progress value={confidenceScore} max="100"></progress>
//                                 <p>{confidenceScore}%</p>

//                                 <p>Similarity to Ideal Answer: {getComparison()}%</p>
//                             </div>
//                         )}

//                         <button className="next-btn" onClick={handleNextQuestion}>
//                             Next Question
//                         </button>
//                     </div>
//                 ) : (
//                     <p>Loading HR questions...</p>
//                 )}
//             </div>

//             <div className="right-sidebar">
//                 <h3>💬 Feedback Summary</h3>
//                 <ul>
//                     {savedAttempts.map((attempt, index) => (
//                         <li key={index}>
//                             <strong>Q:</strong> {attempt.question}
//                             <br />
//                             <strong>Confidence:</strong> {attempt.confidence}%
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default HRInterview;



// import React, { useEffect, useState, useRef } from "react";

// const HRInterview = () => {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [isRecording, setIsRecording] = useState(false);
//     const [transcript, setTranscript] = useState("");
//     const [confidenceScore, setConfidenceScore] = useState(0);
//     const [feedbackSummary, setFeedbackSummary] = useState([]);
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const fetchHRQuestions = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await fetch("http://localhost:5000/api/interview/hr", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 const data = await response.json();
//                 if (!response.ok) throw new Error(data.message || "Failed to fetch HR questions");

//                 setQuestions(data.questions);
//             } catch (error) {
//                 console.error("Error fetching HR questions:", error);
//             }
//         };

//         fetchHRQuestions();
//     }, []);

//     useEffect(() => {
//         if (!("webkitSpeechRecognition" in window)) {
//             alert("Speech Recognition not supported in this browser");
//             return;
//         }

//         const SpeechRecognition = window.webkitSpeechRecognition;
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = false;
//         recognitionRef.current.interimResults = true;
//         recognitionRef.current.lang = "en-US";

//         recognitionRef.current.onresult = (event) => {
//             let interimTranscript = "";
//             for (let i = event.resultIndex; i < event.results.length; i++) {
//                 const transcriptPiece = event.results[i][0].transcript;
//                 if (event.results[i].isFinal) {
//                     setTranscript((prev) => {
//                         const full = prev + transcriptPiece + " ";
//                         setConfidenceScore(calculateConfidenceScore(full));
//                         return full;
//                     });
//                 } else {
//                     interimTranscript += transcriptPiece;
//                 }
//             }
//         };

//         recognitionRef.current.onend = () => {
//             setIsRecording(false);
//         };
//     }, []);

//     const handleStart = () => {
//         setTranscript("");
//         setIsRecording(true);
//         recognitionRef.current.start();
//     };

//     const handleStop = () => {
//         recognitionRef.current.stop();
//         setIsRecording(false);
//     };

//     const handleNextQuestion = () => {
//         const currentQ = questions[currentQuestionIndex]?.questionText;
//         const feedback = {
//             question: currentQ,
//             answer: transcript,
//             confidence: confidenceScore,
//         };

//         setFeedbackSummary((prev) => [...prev, feedback]);

//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setTranscript("");
//             setConfidenceScore(0);
//         }
//     };

//     const calculateConfidenceScore = (text) => {
//         const totalWords = text.split(" ").filter(word => word.trim() !== "").length;
//         const fillerWords = ["um", "uh", "like", "you know", "so", "actually", "basically"];
//         let fillerCount = 0;

//         fillerWords.forEach(word => {
//             const regex = new RegExp(`\\b${word}\\b`, "gi");
//             const matches = text.match(regex);
//             if (matches) fillerCount += matches.length;
//         });

//         const fillerPenalty = fillerCount * 3;
//         const shortAnswerPenalty = totalWords < 8 ? 10 : 0;

//         let score = 100 - (fillerPenalty + shortAnswerPenalty);
//         return Math.max(0, Math.min(100, Math.round(score)));
//     };

//     return (
//         <div className="mock-interview-container">
//             <div className="left-sidebar">
//                 <h3>🧠 HR Tips</h3>
//                 <ul>
//                     <li>Be honest & confident</li>
//                     <li>Maintain good tone & clarity</li>
//                     <li>Use real-life examples</li>
//                 </ul>
//                 <div className="progress">
//                     <p>Progress: {currentQuestionIndex + 1} / {questions.length}</p>
//                     <progress value={currentQuestionIndex + 1} max={questions.length}></progress>
//                 </div>
//             </div>

//             <div className="interview-box">
//                 <h2>HR Interview</h2>
//                 {questions.length > 0 ? (
//                     <div className="question-card">
//                         <h3>Question {currentQuestionIndex + 1}</h3>
//                         <p>{questions[currentQuestionIndex]?.questionText}</p>

//                         <div className="voice-controls">
//                             <button onClick={isRecording ? handleStop : handleStart}>
//                                 {isRecording ? "🛑 Stop" : "🎤 Start Speaking"}
//                             </button>
//                         </div>

//                         <p><strong>Your Answer:</strong></p>
//                         <textarea
//                             placeholder="Your transcribed answer will appear here..."
//                             value={transcript}
//                             readOnly
//                         ></textarea>

//                         <div style={{ marginTop: "10px" }}>
//                             <p><strong>Confidence Score:</strong></p>
//                             <progress value={confidenceScore} max="100" style={{ width: "100%" }}></progress>
//                             <p>{confidenceScore}%</p>
//                         </div>

//                         <button className="next-btn" onClick={handleNextQuestion}>
//                             Next Question
//                         </button>
//                     </div>
//                 ) : (
//                     <p>Loading HR questions...</p>
//                 )}

//                 {feedbackSummary.length > 0 && (
//                     <div style={{ marginTop: "40px" }}>
//                         <h3>📝 Feedback Summary</h3>
//                         <ul>
//                             {feedbackSummary.map((item, index) => (
//                                 <li key={index}>
//                                     <p><strong>Q:</strong> {item.question}</p>
//                                     <p><strong>Confidence:</strong> {item.confidence}%</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             <div className="right-sidebar">
//                 <h3>💡 Tip</h3>
//                 <blockquote>“Speak clearly, confidently, and from the heart.”</blockquote>

//                 <h3>💬 Feedback</h3>
//                 <p>Confidence is now dynamically calculated based on your clarity and filler word usage.</p>
//             </div>
//         </div>
//     );
// };

// export default HRInterview;









// ✅ FRONTEND: HRInterview.js (React component)

import React, { useEffect, useState, useRef } from "react";

const fillerWordsList = ["um", "uh", "like", "you know", "so", "actually", "basically"];

const HRInterview = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [confidenceScore, setConfidenceScore] = useState(0);
    const [feedbackSummary, setFeedbackSummary] = useState([]);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const fetchHRQuestions = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/interview/hr", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setQuestions(data.questions);
            } catch (error) {
                console.error("Error fetching HR questions:", error);
            }
        };
        fetchHRQuestions();
    }, []);

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        const SpeechRecognition = window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event) => {
            let interim = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const part = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscript((prev) => {
                        const full = prev + part + " ";
                        setConfidenceScore(calculateConfidenceScore(full));
                        return full;
                    });
                } else {
                    interim += part;
                }
            }
        };

        recognitionRef.current.onend = () => setIsRecording(false);
    }, []);

    const handleStart = () => {
        setTranscript("");
        setIsRecording(true);
        recognitionRef.current.start();
    };

    const handleStop = () => {
        recognitionRef.current.stop();
        setIsRecording(false);
    };

    const handleNextQuestion = async () => {
        const currentQ = questions[currentQuestionIndex];
        const feedback = {
            question: currentQ.questionText,
            answer: transcript,
            confidence: confidenceScore,
            idealAnswer: currentQ.idealAnswer,
        };
        setFeedbackSummary((prev) => [...prev, feedback]);

        const token = localStorage.getItem("token");
        await fetch("http://localhost:5000/api/interview/saveAttempt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(feedback),
        });

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTranscript("");
            setConfidenceScore(0);
        }
    };

    const calculateConfidenceScore = (text) => {
        const words = text.trim().split(/\s+/);
        const total = words.length;
        let fillerCount = 0;

        fillerWordsList.forEach((filler) => {
            const regex = new RegExp(`\\b${filler}\\b`, "gi");
            const matches = text.match(regex);
            if (matches) fillerCount += matches.length;
        });

        const penalty = fillerCount * 3 + (total < 8 ? 10 : 0);
        return Math.max(0, 100 - penalty);
    };

    const highlightFillerWords = (text) => {
        const words = text.split(" ");
        return words.map((word, idx) => {
            const clean = word.toLowerCase().replace(/[^a-zA-Z]/g, "");
            if (fillerWordsList.includes(clean)) {
                return <span key={idx} style={{ color: "red" }}>{word} </span>;
            }
            return <span key={idx}>{word} </span>;
        });
    };

    return (
        <div className="mock-interview-container">
            <div className="left-sidebar">
                <h3>🧠 HR Tips</h3>
                <ul>
                    <li>Be honest & confident</li>
                    <li>Maintain good tone & clarity</li>
                    <li>Use real-life examples</li>
                </ul>
                <div className="progress">
                    <p>Progress: {currentQuestionIndex + 1} / {questions.length}</p>
                    <progress value={currentQuestionIndex + 1} max={questions.length}></progress>
                </div>
            </div>

            <div className="interview-box">
                <h2>HR Interview</h2>
                {questions.length > 0 ? (
                    <div className="question-card">
                        <h3>Question {currentQuestionIndex + 1}</h3>
                        <p>{questions[currentQuestionIndex]?.questionText}</p>
                        <button onClick={isRecording ? handleStop : handleStart}>
                            {isRecording ? "🛑 Stop" : "🎤 Start Speaking"}
                        </button>
                        <div className="transcript-box">
                            <p><strong>Your Answer:</strong></p>
                            <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "80px" }}>
                                {highlightFillerWords(transcript)}
                            </div>
                        </div>
                        <p>Confidence Score:</p>
                        <progress value={confidenceScore} max="100" style={{ width: "100%" }}></progress>
                        <p>{confidenceScore}%</p>
                        <button onClick={handleNextQuestion}>Next</button>
                    </div>
                ) : <p>Loading HR questions...</p>}

                {feedbackSummary.length > 0 && (
                    <div style={{ marginTop: 30 }}>
                        <h3>📝 Feedback Summary</h3>
                        {feedbackSummary.map((f, i) => (
                            <div key={i} style={{ marginBottom: 15 }}>
                                <p><strong>Q:</strong> {f.question}</p>
                                <p><strong>Your Answer:</strong> {f.answer}</p>
                                <p><strong>Confidence:</strong> {f.confidence}%</p>
                                <p><strong>Ideal Answer:</strong> {f.idealAnswer}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HRInterview;

