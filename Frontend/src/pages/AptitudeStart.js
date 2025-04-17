

// import React, { useState } from "react";
// import "../styles/PracticeProblems.css"; // Import your CSS file

// const problemsData = {
//     Algorithms: [
//         { name: "Binary Search", difficulty: "Easy", time: "15 min" },
//         { name: "Dijkstra's Algorithm", difficulty: "Medium", time: "30 min" },
//     ],
//     DataStructures: [
//         { name: "Stack Implementation", difficulty: "Easy", time: "20 min" },
//         { name: "Binary Tree Traversal", difficulty: "Medium", time: "40 min" },
//     ],
// };

// const PracticeProblems = () => {
//     const [selectedTopic, setSelectedTopic] = useState("Algorithms");
//     const [dailyChallenge] = useState("Binary Search");

//     return (
//         <div className="practice-container">
//             <h1>Practice Problems</h1>
//             <p className="subheading">Sharpen your coding skills with real-world problems! 🚀</p>

//             <div className="top-section">
//                 <select onChange={(e) => setSelectedTopic(e.target.value)} value={selectedTopic}>
//                     {Object.keys(problemsData).map((topic) => (
//                         <option key={topic} value={topic}>{topic}</option>
//                     ))}
//                 </select>

//                 <div className="daily-challenge">
//                     <strong>🔥 Daily Challenge: </strong> {dailyChallenge}
//                 </div>
//             </div>

//             <div className="problems-list">
//                 {problemsData[selectedTopic].map((problem, index) => (
//                     <div className="problem-card" key={index}>
//                         <h3>{problem.name}</h3>
//                         <p className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</p>
//                         <p className="time">⏳ {problem.time}</p>
//                         <button className="solve-btn">Solve</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PracticeProblems;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/PracticeProblems.css";

const AptitudeStart = () => {
    const navigate = useNavigate();

    // Handle starting quiz for a selected difficulty
    const handleStart = (difficulty) => {
        navigate(`/aptitude/quiz/${difficulty}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Practice Aptitude Questions</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {/* Easy */}
                <div className="bg-green-100 p-6 rounded-2xl shadow-lg text-center">
                    <h2 className="text-2xl font-semibold text-green-800 mb-4">Easy</h2>
                    <p className="text-gray-600 mb-6">Basic level aptitude questions to get started.</p>
                    <button
                        onClick={() => handleStart('easy')}
                        className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition"
                    >
                        Start Easy
                    </button>
                </div>

                {/* Medium */}
                <div className="bg-yellow-100 p-6 rounded-2xl shadow-lg text-center">
                    <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Medium</h2>
                    <p className="text-gray-600 mb-6">Challenge yourself with medium difficulty questions.</p>
                    <button
                        onClick={() => handleStart('medium')}
                        className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition"
                    >
                        Start Medium
                    </button>
                </div>

                {/* Hard */}
                <div className="bg-red-100 p-6 rounded-2xl shadow-lg text-center">
                    <h2 className="text-2xl font-semibold text-red-800 mb-4">Hard</h2>
                    <p className="text-gray-600 mb-6">Test your skills with hard aptitude questions.</p>
                    <button
                        onClick={() => handleStart('hard')}
                        className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
                    >
                        Start Hard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AptitudeStart;
