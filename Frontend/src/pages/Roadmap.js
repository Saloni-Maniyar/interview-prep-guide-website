
import React, { useEffect, useState } from "react";
import "../styles/Roadmap.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Roadmap = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState("");
    const [currentRoadmap, setCurrentRoadmap] = useState(null);
    const [completedSteps, setCompletedSteps] = useState({});

    // Fetch all roadmaps
    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/user/roadmap");
                console.log("Fetched Roadmaps:", res.data);
                setRoadmaps(res.data);

                // Set default roadmap
                if (res.data.length > 0) {
                    setSelectedRoadmapId(res.data[0]._id);
                }
            } catch (error) {
                console.error("Error fetching roadmaps", error);
            }
        };

        fetchRoadmaps();
    }, []);

    // Fetch selected roadmap details
    useEffect(() => {
        const fetchSingleRoadmap = async () => {
            if (!selectedRoadmapId) return;
            try {
                const res = await axios.get(`http://localhost:5000/api/user/roadmap/${selectedRoadmapId}`);
                setCurrentRoadmap(res.data);
            } catch (error) {
                console.error("Error fetching single roadmap", error);
            }
        };

        fetchSingleRoadmap();
    }, [selectedRoadmapId]);

    // Fetch completed steps of user
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/user/roadmap/progress", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const steps = {};
                res.data.forEach(item => {
                    item.completedSteps.forEach(step => {
                        steps[step] = true;
                    });
                });

                setCompletedSteps(steps);

            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.warn("User has not followed any roadmap yet.");
                } else {
                    console.error("Error fetching progress", error);
                }
            }

        };

        fetchProgress();
    }, []);


    const followRoadmap = async (roadmapId) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/user/roadmap/follow/${roadmapId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("Roadmap followed:", res.data);
        } catch (error) {
            console.error("Error following roadmap", error);
        }
    };


    // Checkbox change
    const handleCheckboxChange = async (roadmapId, subStepText, checked) => {
        try {
            setCompletedSteps(prev => ({
                ...prev,
                [subStepText]: checked,
            }));

            await axios.patch("http://localhost:5000/api/user/roadmap/progress/update", {
                roadmapId,
                subStepText,
                checked,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        } catch (error) {
            console.error("Failed to update progress:", error);
        }
    };

    return (
        <div className="roadmap-container">
            <h1>Personalized Roadmap</h1>

            <div className="dropdown-section">
                <label htmlFor="role-select">Select Your Role:</label>
                <select
                    id="role-select"
                    value={selectedRoadmapId}
                    onChange={(e) => setSelectedRoadmapId(e.target.value)}
                >
                    <option value="" disabled>Select a Role</option>
                    {roadmaps.map((rm) => (
                        <option key={rm._id} value={rm._id}>
                            {rm.role}
                        </option>
                    ))}
                </select>
            </div>

            {currentRoadmap && (
                <div className="roadmap">
                    <h2>{currentRoadmap.title}</h2>
                    <p>{currentRoadmap.description}</p>

                    {currentRoadmap.steps.map((step, index) => (
                        <div key={index} className="roadmap-step">
                            <strong>{step.title}</strong>
                            <ul>
                                {step.subSteps.map((sub, subIndex) => (
                                    <li key={subIndex}>
                                        <input
                                            type="checkbox"
                                            checked={!!completedSteps[sub.text]}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    currentRoadmap._id,
                                                    sub.text,
                                                    !completedSteps[sub.text]
                                                )
                                            }
                                        />
                                        <span className={completedSteps[sub.text] ? "completed" : ""}>
                                            {sub.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={() => followRoadmap(selectedRoadmapId)}>Follow this Roadmap</button>


            <Link to="/Home" className="btn">Back to Home</Link>
        </div>
    );
};

export default Roadmap;

