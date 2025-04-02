

import React from "react";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>LOGO</h2>
                <ul>
                    <li className="active">Dashboard</li>
                    <li>Users</li>
                    <li>Mock Interviews</li>
                    <li>Quizzes</li>
                    <li>Reports</li>
                    <li>Settings</li>
                    <li className="logout">Logout</li>
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
                        <h4>Interviews</h4>
                        <span>Completed 60%</span>
                    </div>
                    <div className="stat-card yellow">
                        <h4>Mock Interviews</h4>
                        <span>Today: 12</span>
                    </div>
                    <div className="stat-card navy">
                        <h4>Pending</h4>
                        <span>Unfinished 23%</span>
                    </div>
                    <div className="stat-card red">
                        <h4>Reports</h4>
                        <span>Today: 2</span>
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
            </main>
        </div>
    );
};

export default AdminDashboard;
