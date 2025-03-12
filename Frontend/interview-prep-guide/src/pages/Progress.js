import React, { useState } from "react";
import "../styles/ProgressTracking.css";

const ProgressTracking = () => {
    const [progress, setProgress] = useState([
        { id: 1, topic: "Data Structures", completed: 40 },
        { id: 2, topic: "Algorithms", completed: 60 },
        { id: 3, topic: "System Design", completed: 20 },
        { id: 4, topic: "Behavioral Interviews", completed: 70 },
    ]);

    return (
        <div className="progress-container">
            <h2>Progress Tracking</h2>
            <div className="progress-list">
                {progress.map((item) => (
                    <div key={item.id} className="progress-item">
                        <span className="topic">{item.topic}</span>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${item.completed}%` }}
                            ></div>
                        </div>
                        <span className="percentage">{item.completed}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressTracking;
