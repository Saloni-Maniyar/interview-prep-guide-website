

//npm install recharts 
import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/ProgressTracking.css";

const progressData = [
    { topic: "Algorithms", progress: 80 },
    { topic: "Data Structures", progress: 60 },
    { topic: "System Design", progress: 40 },
    { topic: "DBMS", progress: 70 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ProgressTracking = () => {
    const totalProgress = progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length;

    return (
        <div className="progress-container">
            <h1>📊 Progress Tracking</h1>
            <p className="subheading">Keep track of your learning journey and achievements! 🚀</p>

            <div className="progress-charts">
                {/* Pie Chart for Overall Progress */}
                <div className="chart-section">
                    <h3>Overall Progress</h3>
                    <PieChart width={250} height={250}>
                        <Pie data={progressData} dataKey="progress" outerRadius={80} fill="#8884d8">
                            {progressData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <p className="total-progress">📈 Total Progress: {totalProgress.toFixed(2)}%</p>
                </div>

                {/* Bar Chart for Topic-wise Progress */}
                <div className="chart-section">
                    <h3>Topic-wise Progress</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={progressData}>
                            <XAxis dataKey="topic" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="progress" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Achievements & Daily Streak */}
            <div className="achievements">
                <h3>🏆 Achievements</h3>
                <ul>
                    <li>🔥 Daily Streak: 7 Days</li>
                    <li>🏅 Solved 50+ Problems</li>
                    <li>📚 Completed 3 Courses</li>
                    <li>🚀 Ranked in Top 10% of Users</li>
                </ul>
            </div>

            {/* Motivational Message */}
            <div className="motivation">
                <h2>🌟 Keep Going! You're making great progress! 💪</h2>
            </div>
        </div>
    );
};

export default ProgressTracking;
