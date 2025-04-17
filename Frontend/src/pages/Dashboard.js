
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [followedRoadmaps, setFollowedRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowedRoadmaps = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/roadmap/followed', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setFollowedRoadmaps(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching followed roadmaps:', error);
                setLoading(false);
            }
        };

        fetchFollowedRoadmaps();
    }, []);

    const handleStepToggle = async (roadmapId, subStepText, checked) => {
        // ✅ Log values before sending
        console.log("roadmapId:", roadmapId);
        console.log("subStepText:", subStepText);
        console.log("checked:", checked);
        try {
            await axios.patch('http://localhost:5000/api/roadmap/progress/update', {
                roadmapId,
                subStepText,
                checked
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Refresh the roadmap data after updating
            const response = await axios.get('http://localhost:5000/api/roadmap/followed', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setFollowedRoadmaps(response.data);
        } catch (error) {
            console.error('Error updating step status:', error);
        }
    };
    const handleUnfollowRoadmap = async (roadmapId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/roadmap/unfollow/${roadmapId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 200) {
                alert('Roadmap unfollowed successfully');

                setFollowedRoadmaps(followedRoadmaps.filter(roadmap => roadmap._id !== roadmapId));
            }
        } catch (error) {
            console.error('Error unfollowing roadmap:', error);
            alert('Failed to unfollow the roadmap');
        }
    };

    if (loading) {
        return <div>Loading your followed roadmaps...</div>;
    }

    return (
        <div>
            <h2>Your Followed Roadmaps</h2>
            <div className="roadmap-list">
                {followedRoadmaps.map((roadmapData) => (
                    <div key={roadmapData.roadmapId} className="roadmap-card">
                        <h3>{roadmapData.title}</h3>
                        <button onClick={() => handleUnfollowRoadmap(roadmapData.roadmapId)}>Unfollow</button>
                        <div className="roadmap-steps">
                            {roadmapData.steps.map((step, index) => (
                                <div key={index} className="roadmap-step">
                                    <h4>{step.step}</h4>
                                    <div className="substeps">
                                        {step.subSteps.map((subStep, subIndex) => (
                                            <div key={subIndex} className="substep">

                                                <input
                                                    type="checkbox"
                                                    checked={subStep.completed}
                                                    onChange={(e) => handleStepToggle(roadmapData.roadmapId, subStep.text, e.target.checked)}
                                                />
                                                <label>{subStep.text}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
