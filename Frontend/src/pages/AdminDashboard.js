


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//     const [activeTab, setActiveTab] = useState("users"); // Set default tab to 'users'
//     const [showQuestionAction, setShowQuestionAction] = useState(false); // For displaying the question actions
//     const [stats, setStats] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/admin/dashboard", { withCredentials: true })
//             .then(res => {
//                 console.log(res.data.message);  // ✅ "Welcome Admin!"
//             })
//             .catch(err => {
//                 console.log(err.response.data.message);
//                 if (err.response.status === 401) {
//                     navigate("/admin/login");
//                 }
//             });
//     }, [navigate]);

//     // Handle the action click for questions
//     const handleQuestionAction = (action) => {
//         if (action === "add") {
//             navigate("/admin/questions/add");
//         } else if (action === "edit") {
//             navigate("/admin/questions");
//         } else if (action === "delete") {
//             navigate("/admin/questions");
//         }
//         setShowQuestionAction(false); // Hide action prompt after selection
//     };

//     return (
//         <div className="dashboard-container">
//             {/* Sidebar */}
//             <aside className="sidebar">
//                 <h2>LOGO</h2>
//                 <ul>
//                     <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>

//                     <li onClick={() => navigate("/admin/users")}>Users</li>
//                     <li onClick={() => setActiveTab('mock-interviews')}>Mock Interviews</li>
//                     <li onClick={() => {
//                         setShowQuestionAction(true); // Show the action prompt when admin clicks on Questions
//                     }}>Quizzes</li>
//                     <li onClick={() => navigate('/admin/roadmaps')}>Roadmaps</li>
//                     <li onClick={() => setActiveTab('settings')}>Settings</li>
//                     <li className="logout">Logout</li>
//                 </ul>
//             </aside>

//             {/* Main Dashboard */}
//             <main className="main-content">
//                 {activeTab === 'dashboard' && <AdminDashboard />} {/* Add the actual component */}

//                 <header className="dashboard-header">
//                     <input type="text" placeholder="Search by Name/Designation" />
//                     <span>Hello, Admin</span>
//                 </header>

//                 {/* Stats Cards */}
//                 <section className="stats-container">
//                     <div className="stat-card blue">
//                         <h4>Interviews</h4>
//                         <span>Completed 60%</span>
//                     </div>
//                     <div className="stat-card yellow">
//                         <h4>Mock Interviews</h4>
//                         <span>Today: 12</span>
//                     </div>
//                     <div className="stat-card navy">
//                         <h4>Pending</h4>
//                         <span>Unfinished 23%</span>
//                     </div>
//                     <div className="stat-card red">
//                         <h4>Reports</h4>
//                         <span>Today: 2</span>
//                     </div>
//                 </section>

//                 {/* Today's Activity */}
//                 <section className="activity-section">
//                     <h3>Today's Activity</h3>
//                     <table className="activity-table">
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Designation</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>John Doe</td>
//                                 <td>Frontend Developer</td>
//                                 <td className="completed">Completed</td>
//                             </tr>
//                             <tr>
//                                 <td>Jane Smith</td>
//                                 <td>Backend Developer</td>
//                                 <td className="scheduled">Scheduled</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </section>

//                 {/* Action Prompt for Questions */}
//                 {showQuestionAction && (
//                     <div className="question-action-prompt">
//                         <h4>What do you want to do with Questions?</h4>
//                         <button onClick={() => handleQuestionAction("add")}>Add Question</button>
//                         <button onClick={() => handleQuestionAction("edit")}>Edit Question</button>
//                         <button onClick={() => handleQuestionAction("delete")}>Delete Question</button>
//                         <button onClick={() => setShowQuestionAction(false)}>Cancel</button>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [showQuestionAction, setShowQuestionAction] = useState(false);
    const [stats, setStats] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/dashboard", { withCredentials: true })
            .then(res => {
                console.log(res.data.message);
            })
            .catch(err => {
                console.log(err.response.data.message);
                if (err.response.status === 401) {
                    navigate("/admin/login");
                }
            });

        // Fetch real stats here
        //     axios.get("http://localhost:5000/api/admin/stats", { withCredentials: true })
        //         .then(response => {
        //             setStats(response.data);
        //         })
        //         .catch(error => {
        //             console.error('Error fetching admin stats:', error.message, error.stack);
        //             alert("Failed to fetch admin stats.");


        //             // response.status(500).json({ message: "Failed to fetch stats", error: error.message });
        //         });
    }, [navigate]);

    const handleQuestionAction = (action) => {
        if (action === "add") {
            navigate("/admin/questions/add");
        } else if (action === "edit" || action === "delete") {
            navigate("/admin/questions");
        }
        setShowQuestionAction(false);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>LOGO</h2>
                <ul>
                    <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
                    <li onClick={() => navigate("/admin/users")}>Users</li>
                    <li onClick={() => setActiveTab('mock-interviews')}>Mock Interviews</li>
                    <li onClick={() => setShowQuestionAction(true)}>Questions</li>
                    <li onClick={() => navigate('/admin/roadmaps')}>Roadmaps</li>

                    {/* <li className="logout"onClick={()=>{}}>Logout</li> */}
                    <li className="logout" onClick={() => {
                        axios.post("http://localhost:5000/api/admin/logout", {}, { withCredentials: true })
                            .then(() => {
                                navigate("/admin/login");
                            })
                            .catch(err => {
                                console.error("Logout failed", err);
                            });
                    }}>Logout</li>
                </ul>
            </aside>

            {/* Main Dashboard */}
            <main className="main-content">
                <header className="dashboard-header">
                    <input type="text" placeholder="Search by Name/Designation" />
                    <span>Hello, Admin</span>
                </header>

                {/* Stats Cards */}
                <section className="stats-container">
                    <div className="stat-card blue">
                        <h4>Total Users</h4>
                        <span>{stats.totalUsers ?? '--'}</span>
                    </div>
                    <div className="stat-card yellow">
                        <h4>Quizzes Attempted</h4>
                        <span>{stats.totalQuizzes ?? '--'}</span>
                    </div>
                    <div className="stat-card navy">
                        <h4>Roadmaps Created</h4>
                        <span>{stats.totalRoadmaps ?? '--'}</span>
                    </div>
                    <div className="stat-card red">
                        <h4>Mock Interviews</h4>
                        <span>{stats.totalMockInterviews ?? '--'}</span>
                    </div>
                </section>

                {/* Today's Activity */}
                <section className="activity-section">
                    <h3>Today's Activity</h3>
                    <table className="activity-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>Frontend Developer</td>
                                <td className="completed">Completed</td>
                            </tr>
                            <tr>
                                <td>Jane Smith</td>
                                <td>Backend Developer</td>
                                <td className="scheduled">Scheduled</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Question Action Prompt */}
                {showQuestionAction && (
                    <div className="question-action-prompt">
                        <h4>What do you want to do with Questions?</h4>
                        <button onClick={() => handleQuestionAction("add")}>Add Question</button>
                        <button onClick={() => handleQuestionAction("edit")}>Edit Question</button>
                        <button onClick={() => handleQuestionAction("delete")}>Delete Question</button>
                        <button onClick={() => setShowQuestionAction(false)}>Cancel</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;






