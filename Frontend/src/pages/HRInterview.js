import React, { useEffect, useState, useRef } from "react";
import "../styles/MockInterviews.css";

const hrQuestions = [
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Describe a challenging situation and how you handled it."
];

const HRInterview = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);

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
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPiece = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscript((prev) => prev + transcriptPiece + " ");
                } else {
                    interimTranscript += transcriptPiece;
                }
            }
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
        };
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

    const handleNextQuestion = () => {
        if (currentQuestionIndex < hrQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTranscript("");
        }
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
                    <p>Progress: {currentQuestionIndex + 1} / {hrQuestions.length}</p>
                    <progress value={currentQuestionIndex + 1} max={hrQuestions.length}></progress>
                </div>
            </div>

            <div className="interview-box">
                <h2>HR Interview</h2>
                <div className="question-card">
                    <h3>Question {currentQuestionIndex + 1}</h3>
                    <p>{hrQuestions[currentQuestionIndex]}</p>

                    <div className="voice-controls">
                        <button onClick={isRecording ? handleStop : handleStart}>
                            {isRecording ? "🛑 Stop" : "🎤 Start Speaking"}
                        </button>
                    </div>

                    <textarea
                        placeholder="Your transcribed answer will appear here..."
                        value={transcript}
                        readOnly
                    ></textarea>

                    <button className="next-btn" onClick={handleNextQuestion}>Next Question</button>
                </div>
            </div>

            <div className="right-sidebar">
                <h3>💡 Tip</h3>
                <blockquote>“Speak clearly, confidently, and from the heart.”</blockquote>

                <h3>💬 Feedback</h3>
                <p>(We’ll show AI feedback and confidence analysis here soon!)</p>
            </div>
        </div>
    );
};

export default HRInterview;
