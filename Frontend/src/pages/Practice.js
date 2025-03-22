// import React, { useState } from "react";
// import "../styles/PracticeProblems.css";

// const topics = ["Data Structures", "Algorithms", "System Design", "DBMS", "OOPs", "Operating Systems"];

// const problems = {
//     "Data Structures": [
//         { id: 1, title: "Reverse a Linked List", difficulty: "Medium" },
//         { id: 2, title: "Find Loop in Linked List", difficulty: "Hard" },
//     ],
//     "Algorithms": [
//         { id: 3, title: "Binary Search", difficulty: "Easy" },
//         { id: 4, title: "Dijkstra's Algorithm", difficulty: "Medium" },
//     ],
//     "System Design": [
//         { id: 5, title: "Design a URL Shortener", difficulty: "Hard" },
//         { id: 6, title: "Load Balancer Concept", difficulty: "Medium" },
//     ],
// };

// const PracticeProblems = () => {
//     const [selectedTopic, setSelectedTopic] = useState("");
//     const [filteredProblems, setFilteredProblems] = useState([]);

//     const handleTopicChange = (event) => {
//         const topic = event.target.value;
//         setSelectedTopic(topic);
//         setFilteredProblems(problems[topic] || []);
//     };

//     return (
//         <div className="practice-container">
//             <h2>Practice Problems</h2>

//             <select onChange={handleTopicChange} value={selectedTopic}>
//                 <option value="">Select a Topic</option>
//                 {topics.map((topic, index) => (
//                     <option key={index} value={topic}>{topic}</option>
//                 ))}
//             </select>

//             {filteredProblems.length > 0 && (
//                 <div className="problems-list">
//                     <h3>Problems on {selectedTopic}</h3>
//                     {filteredProblems.map((problem) => (
//                         <div key={problem.id} className="problem-item">
//                             <span>{problem.title}</span>
//                             <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
//                             <button className="solve-btn">Solve</button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PracticeProblems;



import React, { useState } from "react";
import "../styles/PracticeProblems.css"; // Import your CSS file

const problemsData = {
    Algorithms: [
        { name: "Binary Search", difficulty: "Easy", time: "15 min" },
        { name: "Dijkstra's Algorithm", difficulty: "Medium", time: "30 min" },
    ],
    DataStructures: [
        { name: "Stack Implementation", difficulty: "Easy", time: "20 min" },
        { name: "Binary Tree Traversal", difficulty: "Medium", time: "40 min" },
    ],
};

const PracticeProblems = () => {
    const [selectedTopic, setSelectedTopic] = useState("Algorithms");
    const [dailyChallenge] = useState("Binary Search");

    return (
        <div className="practice-container">
            <h1>Practice Problems</h1>
            <p className="subheading">Sharpen your coding skills with real-world problems! 🚀</p>

            <div className="top-section">
                <select onChange={(e) => setSelectedTopic(e.target.value)} value={selectedTopic}>
                    {Object.keys(problemsData).map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>

                <div className="daily-challenge">
                    <strong>🔥 Daily Challenge: </strong> {dailyChallenge}
                </div>
            </div>

            <div className="problems-list">
                {problemsData[selectedTopic].map((problem, index) => (
                    <div className="problem-card" key={index}>
                        <h3>{problem.name}</h3>
                        <p className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</p>
                        <p className="time">⏳ {problem.time}</p>
                        <button className="solve-btn">Solve</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PracticeProblems;




