import React, { useState } from "react";
import "../styles/MockInterviews.css";

const MockInterview = () => {
    const [formData, setFormData] = useState({
        role: "",
        aptitudeMarks: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Aptitude Marks Validation (1 to 200)
        if (name === "aptitudeMarks") {
            if (!/^\d{0,3}$/.test(value)) return; // Restrict input to numbers only
            const marks = Number(value);
            if (marks > 200) {
                setError("Marks must be between 1 and 200.");
                return;
            } else {
                setError(""); // Clear error when valid
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleStartInterview = () => {
        if (!formData.role || !formData.aptitudeMarks) {
            alert("Please select a role and enter aptitude marks.");
            return;
        }

        if (error || formData.aptitudeMarks < 1 || formData.aptitudeMarks > 200) {
            alert("Marks must be between 1 and 200.");
            return;
        }

        alert(`Starting Mock Interview for ${formData.role}`);
    };

    return (
        <div className="mock-container">
            <h2>Mock Interviews</h2>

            <div className="mock-form">
                <h3>Select Your Role</h3>
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Project Manager">Project Manager</option>
                </select>

                <h3>Enter Aptitude Marks (1-200)</h3>
                <input
                    type="number"
                    name="aptitudeMarks"
                    placeholder="Enter Marks (1-200)"
                    value={formData.aptitudeMarks}
                    onChange={handleChange}
                    required
                    min="1" max="200"
                />
                {error && <p className="error-msg">{error}</p>}

                <button className="start-btn" onClick={handleStartInterview}>Start Mock Interview</button>
            </div>
        </div>
    );
};

export default MockInterview;
