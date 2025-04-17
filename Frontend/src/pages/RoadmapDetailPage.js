import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RoadmapDetailPage = () => {
    const { roadmapid } = useParams();
    const [roadmap, setRoadmap] = useState(null);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/roadmap/${roadmapid}`);
                setRoadmap(res.data);
            } catch (error) {
                console.error("Error fetching roadmap details:", error);
            }
        };

        fetchRoadmap();
    }, [roadmapid]);

    if (!roadmap) return <p>Loading roadmap details...</p>;

    return (
        <div className="roadmap-detail">
            <h2>{roadmap.title}</h2>
            <p>{roadmap.description}</p>

            {roadmap.steps?.length > 0 && (
                <ul>
                    {roadmap.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoadmapDetailPage;
