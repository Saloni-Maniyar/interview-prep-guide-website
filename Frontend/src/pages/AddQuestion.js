import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [explanation, setExplanation] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newQuestion = {
                questionText,
                options,
                correctAnswer,
                topic,
                difficulty,
                explanation,
            };

            await axios.post("http://localhost:5000/api/admin/questions", newQuestion, {
                withCredentials: true
            });

            alert("Question added successfully!");
            navigate("/admin/questions");
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Failed to add question!");
        }
    };

    const handleOptionChange = (value, index) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <div>
            <h2>Add New Question</h2>
            <form onSubmit={handleSubmit}>
                <label>Question Text:</label>
                <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />

                <label>Options:</label>
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(e.target.value, index)}
                        required
                    />
                ))}

                <label>Correct Answer:</label>
                <input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required />

                <label>Topic:</label>
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />

                <label>Difficulty:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label>Explanation:</label>
                <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} />

                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default AddQuestion;
