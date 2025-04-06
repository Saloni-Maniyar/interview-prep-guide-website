
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/ProgressTracking.css";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const ProgressTracking = () => {
//     const [selectedSection, setSelectedSection] = useState(null);
//     const [quizAttempts, setQuizAttempts] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     // eslint-disable-next-line no-unused-vars
//     const [overallStats, setOverallStats] = useState({
//         Quiz: 0,
//         Aptitude: 0,
//         "Mock Interview": 45,
//         Roadmap: 60
//     });

//     useEffect(() => {
//         document.body.style.overflow = showModal ? "hidden" : "auto";
//     }, [showModal]);


//     const userId = localStorage.getItem("userId");

//     const sectionIcons = {
//         Quiz: "🧠",
//         "Mock Interview": "💬",
//         Aptitude: "📊",
//         Roadmap: "🛣️"
//     };

//     const fetchQuizAttempts = async () => {
//         try {
//             const res = await axios.get(`http://localhost:5000/api/quiz/user-quiz-progress/${userId}`);
//             setQuizAttempts(res.data);
//         } catch (error) {
//             console.error("Error fetching quiz attempts", error);
//         }
//     };

//     const handleSectionClick = (section) => {
//         setSelectedSection(section);
//         setShowModal(true);

//         if (section === "Quiz" || section === "Aptitude") {
//             fetchQuizAttempts(); // Aptitude reuses quiz structure
//         }
//     };

//     return (
//         <div className="progress-container">
//             <h1>📈 My Progress Dashboard</h1>

//             <div className="card-section">
//                 {Object.entries(overallStats).map(([section, percentage]) => (
//                     <div className="progress-card" key={section} onClick={() => handleSectionClick(section)}>
//                         <h3>{sectionIcons[section]} {section}</h3>
//                         <div className="bar">
//                             <div className="fill" style={{ width: `${percentage}%` }}></div>
//                         </div>
//                         <p>{percentage}% Completed</p>
//                     </div>
//                 ))}
//             </div>

//             {/* 🔍 Quiz / Aptitude Modal */}
//             {showModal && (selectedSection === "Quiz" || selectedSection === "Aptitude") && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
//                         <h2>{selectedSection} Attempts</h2>
//                         {quizAttempts.length === 0 ? (
//                             <p>No attempts yet!</p>
//                         ) : (
//                             quizAttempts.map((attempt, index) => (
//                                 <div className="attempt-box" key={index}>
//                                     <p><strong>Topic:</strong> {attempt.selectedOption}</p>
//                                     <p><strong>Date:</strong> {new Date(attempt.createdAt).toLocaleDateString()}</p>
//                                     <div className="bar-container">
//                                         <div className="bar-fill" style={{ width: `${(attempt.score / attempt.questions.length) * 100}%` }}>
//                                             {attempt.score}/{attempt.questions.length}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* ✅ Weekly Summary + Motivation */}
//             <div className="weekly-summary">
//                 <h3>🌟 Weekly Motivation</h3>
//                 <p>“Success is the sum of small efforts, repeated day in and day out.”</p>
//                 <h4>🎯 Achievements:</h4>
//                 <ul>
//                     <li>✅ First Quiz Completed</li>
//                     <li>✅ 50% Roadmap Finished</li>
//                 </ul>
//             </div>

//             {/* 📊 Combined Growth Chart */}
//             <div className="growth-chart">
//                 <h2>📊 Overall Growth</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={Object.entries(overallStats).map(([name, value]) => ({ name, value }))}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#82ca9d" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default ProgressTracking;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/ProgressTracking.css";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const ProgressTracking = () => {
//     const [selectedSection, setSelectedSection] = useState(null);
//     const [quizAttempts, setQuizAttempts] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [overallStats, setOverallStats] = useState({
//         Quiz: 0,
//         Aptitude: 0,
//         "Mock Interview": 45,
//         Roadmap: 60
//     });

//     const userId = localStorage.getItem("userId");

//     const sectionIcons = {
//         Quiz: "🧠",
//         "Mock Interview": "💬",
//         Aptitude: "📊",
//         Roadmap: "🛣️"
//     };

//     useEffect(() => {
//         document.body.style.overflow = showModal ? "hidden" : "auto";
//     }, [showModal]);

//     const fetchQuizAttempts = async () => {
//         try {
//             const res = await axios.get(`http://localhost:5000/api/quiz/user-quiz-progress/${userId}`);
//             const attempts = res.data;
//             setQuizAttempts(attempts);

//             // ✅ Update overallStats dynamically based on quiz performance
//             if (attempts.length > 0) {
//                 const totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
//                 const totalPossible = attempts.reduce((acc, curr) => acc + curr.questions.length, 0);
//                 const quizProgress = Math.round((totalScore / totalPossible) * 100);

//                 setOverallStats(prev => ({
//                     ...prev,
//                     Quiz: quizProgress
//                 }));
//             }
//         } catch (error) {
//             console.error("Error fetching quiz attempts", error);
//         }
//     };

//     const handleSectionClick = (section) => {
//         setSelectedSection(section);
//         setShowModal(true);

//         if (section === "Quiz" || section === "Aptitude") {
//             fetchQuizAttempts(); // Aptitude uses same structure
//         }
//     };

//     return (
//         <div className="progress-container">
//             <h1>📈 My Progress Dashboard</h1>

//             <div className="card-section">
//                 {Object.entries(overallStats).map(([section, percentage]) => (
//                     <div className="progress-card" key={section} onClick={() => handleSectionClick(section)}>
//                         <h3>{sectionIcons[section]} {section}</h3>
//                         <div className="bar">
//                             <div className="fill" style={{ width: `${percentage}%` }}></div>
//                         </div>
//                         <p>{percentage}% Completed</p>
//                     </div>
//                 ))}
//             </div>

//             {/* 🔍 Quiz / Aptitude Modal */}
//             {showModal && (selectedSection === "Quiz" || selectedSection === "Aptitude") && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
//                         <h2>{selectedSection} Attempts</h2>
//                         {quizAttempts.length === 0 ? (
//                             <p>No attempts yet!</p>
//                         ) : (
//                             quizAttempts.map((attempt, index) => (
//                                 <div className="attempt-box" key={index}>
//                                     <p><strong>Topic:</strong> {attempt.selectedOption}</p>
//                                     <p><strong>Date:</strong> {new Date(attempt.createdAt).toLocaleDateString()}</p>
//                                     <div className="bar-container">
//                                         <div className="bar-fill" style={{ width: `${(attempt.score / attempt.questions.length) * 100}%` }}>
//                                             {attempt.score}/{attempt.questions.length}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* ✅ Weekly Summary + Motivation */}
//             <div className="weekly-summary">
//                 <h3>🌟 Weekly Motivation</h3>
//                 <p>“Success is the sum of small efforts, repeated day in and day out.”</p>
//                 <h4>🎯 Achievements:</h4>
//                 <ul>
//                     <li>✅ First Quiz Completed</li>
//                     <li>✅ 50% Roadmap Finished</li>
//                 </ul>
//             </div>

//             {/* 📊 Combined Growth Chart */}
//             <div className="growth-chart">
//                 <h2>📊 Overall Growth</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={Object.entries(overallStats).map(([name, value]) => ({ name, value }))}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="value" fill="#82ca9d" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default ProgressTracking;


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/ProgressTracking.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ProgressTracking = () => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [quizAttempts, setQuizAttempts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [overallStats, setOverallStats] = useState({
        Quiz: 0,
        Aptitude: 0,
        "Mock Interview": 45,
        Roadmap: 60
    });

    const userId = localStorage.getItem("userId");



    useEffect(() => {
        document.body.style.overflow = showModal ? "hidden" : "auto";
    }, [showModal]);

    const sectionIcons = {
        Quiz: "🧠",
        "Mock Interview": "💬",
        Aptitude: "📊",
        Roadmap: "🛣️"
    };

    const fetchQuizAttempts = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/quiz/user-quiz-progress/${userId}`);
            setQuizAttempts(res.data);

            // ✅ Calculate average quiz score percentage
            if (res.data.length > 0) {
                const totalScore = res.data.reduce((acc, curr) => acc + curr.score, 0);
                const totalPossible = res.data.reduce((acc, curr) => acc + curr.questions.length, 0);
                const quizPercentage = Math.round((totalScore / totalPossible) * 100);

                setOverallStats(prev => ({
                    ...prev,
                    Quiz: quizPercentage
                }));
            }
        } catch (error) {
            console.error("Error fetching quiz attempts", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchQuizAttempts();
    }, [fetchQuizAttempts]);



    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setShowModal(true);

        if (section === "Quiz" || section === "Aptitude") {
            fetchQuizAttempts();
        }
    };

    return (
        <div className="progress-container">
            <h1>📈 My Progress Dashboard</h1>

            <div className="card-section">
                {Object.entries(overallStats).map(([section, percentage]) => (
                    <div className="progress-card" key={section} onClick={() => handleSectionClick(section)}>
                        <h3>{sectionIcons[section]} {section}</h3>
                        <div className="bar">
                            <div className="fill" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <p>{percentage}% Completed</p>
                    </div>
                ))}
            </div>

            {/* 🔍 Quiz / Aptitude Modal */}
            {showModal && (selectedSection === "Quiz" || selectedSection === "Aptitude") && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>{selectedSection} Attempts</h2>
                        {quizAttempts.length === 0 ? (
                            <p>No attempts yet!</p>
                        ) : (
                            quizAttempts.map((attempt, index) => (
                                <div className="attempt-box" key={index}>
                                    <p><strong>Topic:</strong> {attempt.selectedOption}</p>
                                    <p><strong>Date:</strong> {new Date(attempt.createdAt).toLocaleDateString()}</p>
                                    <div className="bar-container">
                                        <div
                                            className="bar-fill"
                                            style={{
                                                width: `${(attempt.score / attempt.questions.length) * 100}%`
                                            }}
                                        >
                                            {attempt.score}/{attempt.questions.length}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* ✅ Weekly Summary + Motivation */}
            <div className="weekly-summary">
                <h3>🌟 Weekly Motivation</h3>
                <p>“Success is the sum of small efforts, repeated day in and day out.”</p>
                <h4>🎯 Achievements:</h4>
                <ul>
                    <li>✅ First Quiz Completed</li>
                    <li>✅ 50% Roadmap Finished</li>
                </ul>
            </div>

            {/* 📊 Combined Growth Chart */}
            <div className="growth-chart">
                <h2>📊 Overall Growth</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={Object.entries(overallStats).map(([name, value]) => ({ name, value }))}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProgressTracking;










