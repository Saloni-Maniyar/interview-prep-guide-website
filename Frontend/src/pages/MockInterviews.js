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
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question
  const navigate = useNavigate();
  const userId = "67fb46cc7edb9281abb907e3"; // You should get this userId dynamically from the logged-in user

  // Fetch 5 Technical + 5 HR questions
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

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (isInterviewStarted && !isInterviewFinished && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    }

    if (timeLeft === 0 && isInterviewStarted && !isInterviewFinished) {
      handleAnswerSubmit(); // Auto-submit when time is up
    }

    return () => clearTimeout(timer); // Cleanup on component unmount or changes
  }, [timeLeft, isInterviewStarted, isInterviewFinished]);

  // Handle answer submission (including auto-submit)
  const handleAnswerSubmit = useCallback(async () => {
    const currentQuestion = questions[currentQuestionIndex];

    const responseObj = {
      questionId: currentQuestion._id,
      userAnswer: answer.trim(),
    };

    const updatedResponses = [...responses, responseObj];
    setResponses(updatedResponses);
    setAnswer(""); // Clear answer field

    if (currentQuestionIndex === 9) {
      await submitInterview(updatedResponses); // Submit the final responses after 10th question
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(180); // Reset timer for next question
    }
  }, [answer, currentQuestionIndex, questions, responses]);

  // Submit interview and navigate to progress page
  const submitInterview = async (finalResponses) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/interview/submit",
        {
          userId: userId,  // Send the userId with the submission
          answers: finalResponses,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { techScore, hrScore, overallFeedback, detailedFeedback } = response.data;
      console.log("Interview Submitted:", detailedFeedback);

      setIsInterviewFinished(true);

      // Redirect to progress page after a delay
      setTimeout(() => {
        navigate("/Progress");
      }, 3000); // Wait 3 seconds before redirecting
    } catch (error) {
      console.error("Error submitting interview:", error);
    }
  };

  // Cancel interview and reset states
  const cancelInterview = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this interview? All progress will be lost."
      )
    ) {
      setQuestions([]);
      setResponses([]);
      setIsInterviewStarted(false);
      setIsInterviewFinished(false);
      setCurrentQuestionIndex(0);
      setAnswer("");
      setTimeLeft(180);
    }
  };

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
            <button
              onClick={handleAnswerSubmit}
              className="btn next-btn"
            >
              {currentQuestionIndex === 9 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
