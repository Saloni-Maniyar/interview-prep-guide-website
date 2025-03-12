import React, { useState } from "react";
import "../styles/PracticeProblems.css";

const topics = ["Data Structures", "Algorithms", "System Design", "DBMS", "OOPs", "Operating Systems"];

const problems = {
    "Data Structures": [
        { id: 1, title: "Reverse a Linked List", difficulty: "Medium" },
        { id: 2, title: "Find Loop in Linked List", difficulty: "Hard" },
    ],
    "Algorithms": [
        { id: 3, title: "Binary Search", difficulty: "Easy" },
        { id: 4, title: "Dijkstra's Algorithm", difficulty: "Medium" },
    ],
    "System Design": [
        { id: 5, title: "Design a URL Shortener", difficulty: "Hard" },
        { id: 6, title: "Load Balancer Concept", difficulty: "Medium" },
    ],
};

const PracticeProblems = () => {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [filteredProblems, setFilteredProblems] = useState([]);

    const handleTopicChange = (event) => {
        const topic = event.target.value;
        setSelectedTopic(topic);
        setFilteredProblems(problems[topic] || []);
    };

    return (
        <div className="practice-container">
            <h2>Practice Problems</h2>

            <select onChange={handleTopicChange} value={selectedTopic}>
                <option value="">Select a Topic</option>
                {topics.map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                ))}
            </select>

            {filteredProblems.length > 0 && (
                <div className="problems-list">
                    <h3>Problems on {selectedTopic}</h3>
                    {filteredProblems.map((problem) => (
                        <div key={problem.id} className="problem-item">
                            <span>{problem.title}</span>
                            <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                            <button className="solve-btn">Solve</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PracticeProblems;
