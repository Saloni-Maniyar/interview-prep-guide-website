import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../styles/PracticeProblems.css";

const AptitudeQuiz = () => {
    const { difficulty } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);  // To track if answer has already been submitted

    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`/api/aptitude/questions/${difficulty}`);
                setQuestions(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [difficulty]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedOption) {
            alert('Please select an option!');
            return;
        }

        if (isSubmitted) return;  // Prevent submitting multiple times

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        // Update counts
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
        } else {
            setIncorrectCount(prev => prev + 1);
        }

        // Give feedback
        setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect! Correct answer: ${currentQuestion.correctAnswer}`);
        setShowExplanation(true);

        setIsSubmitted(true);  // Mark question as submitted

        // Update progress
        try {
            await axios.patch(
                'http://localhost:5000/api/aptitude/attempt',
                { difficulty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption('');
            setFeedback('');
            setShowExplanation(false);
            setIsSubmitted(false);  // Allow submission for the next question
        } else {
            alert(`Aptitude quiz completed! ✅\nCorrect: ${correctCount} | Incorrect: ${incorrectCount}`);
            navigate('/aptitude/start');
        }
    };

    if (loading) {
        return <div className="text-center mt-10 text-xl font-semibold">Loading Questions...</div>;
    }

    if (questions.length === 0) {
        return <div className="text-center mt-10 text-xl font-semibold">No questions found.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz
                </h2>
                <h3 className="text-lg font-medium mb-6 text-gray-700">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </h3>

                <p className="text-gray-800 mb-4 font-semibold">{currentQuestion.questionText}</p>

                <div className="flex flex-col gap-3 mb-4">
                    {currentQuestion.options.map((option, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>

                {feedback && <div className="mb-4 text-lg font-semibold">{feedback}</div>}

                {showExplanation && (
                    <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                        <h4 className="font-semibold text-gray-700 mb-2">Explanation:</h4>
                        <p className="text-gray-600">
                            {currentQuestion.explanation ? currentQuestion.explanation : 'No explanation provided.'}
                        </p>
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
                        disabled={isSubmitted}  // Disable button after submission
                    >
                        Submit
                    </button>

                    <button
                        onClick={handleNext}
                        className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                    >
                        Next
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-6 text-gray-700">
                    ✅ Correct: <span className="font-semibold">{correctCount}</span> | ❌ Incorrect: <span className="font-semibold">{incorrectCount}</span>
                </div>
            </div>
        </div>
    );
};

export default AptitudeQuiz;
