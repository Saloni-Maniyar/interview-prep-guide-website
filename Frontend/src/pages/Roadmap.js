

// src/pages/Roadmaps.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Roadmaps = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetching all roadmaps from the backend
        const fetchRoadmaps = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/roadmap');
                setRoadmaps(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching roadmaps:', error);
                setLoading(false);
            }
        };

        fetchRoadmaps();
    }, []);

    const handleFollowRoadmap = async (roadmapId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/roadmap/follow/${roadmapId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing JWT in localStorage
                },
            });
            alert(response.data.message);


        } catch (error) {
            console.error('Error following roadmap:', error);
            alert('Failed to follow roadmap');
        }
    };

    if (loading) {
        return <div>Loading roadmaps...</div>;
    }

    return (
        <div>
            <h2>Available Roadmaps</h2>
            <div className="roadmap-list">
                {roadmaps.map((roadmap) => (
                    <div key={roadmap._id} className="roadmap-card">
                        <h3>{roadmap.title}</h3>
                        <p>{roadmap.description}</p>
                        <button onClick={() => handleFollowRoadmap(roadmap._id)}>Follow</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Roadmaps;
