

// // src/pages/Roadmaps.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Roadmaps = () => {
//     const [roadmaps, setRoadmaps] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetching all roadmaps from the backend
//         const fetchRoadmaps = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/roadmap');
//                 setRoadmaps(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching roadmaps:', error);
//                 setLoading(false);
//             }
//         };

//         fetchRoadmaps();
//     }, []);

//     const handleFollowRoadmap = async (roadmapId) => {
//         try {
//             const response = await axios.post(`http://localhost:5000/api/roadmap/follow/${roadmapId}`, {}, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing JWT in localStorage
//                 },
//             });
//             alert(response.data.message);


//         } catch (error) {
//             console.error('Error following roadmap:', error);
//             alert('Failed to follow roadmap');
//         }
//     };

//     if (loading) {
//         return <div>Loading roadmaps...</div>;
//     }

//     return (
//         <div>
//             <h2>Available Roadmaps</h2>
//             <div className="roadmap-list">
//                 {roadmaps.map((roadmap) => (
//                     <div key={roadmap._id} className="roadmap-card">
//                         <h3>{roadmap.title}</h3>
//                         <p>{roadmap.description}</p>
//                         <button onClick={() => handleFollowRoadmap(roadmap._id)}>Follow</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Roadmaps;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import RoadmapModal from '../components/RoadmapModal';


// const Roadmaps = () => {
//     const [roadmaps, setRoadmaps] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedRoadmap, setSelectedRoadmap] = useState(null);

//     useEffect(() => {
//         const fetchRoadmaps = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/roadmap');
//                 setRoadmaps(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching roadmaps:', error);
//                 setLoading(false);
//             }
//         };

//         fetchRoadmaps();
//     }, []);

//     const handleFollowRoadmap = async (roadmapId) => {
//         try {
//             const response = await axios.post(
//                 `http://localhost:5000/api/roadmap/follow/${roadmapId}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );
//             alert(response.data.message);
//         } catch (error) {
//             console.error('Error following roadmap:', error);
//             alert('Failed to follow roadmap');
//         }
//     };

//     const handleShowDetails = async (id) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/roadmap/${id}`);
//             setSelectedRoadmap(response.data);
//         } catch (error) {
//             console.error('Error fetching roadmap details:', error);
//         }
//     };

//     if (loading) return <div>Loading roadmaps...</div>;

//     return (
//         <div>
//             <h2>Available Roadmaps</h2>
//             <div className="roadmap-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//                 {roadmaps.map((roadmap) => (
//                     <div key={roadmap._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '300px' }}>
//                         <h3>{roadmap.title}</h3>
//                         <p>{roadmap.description}</p>
//                         <button onClick={() => handleFollowRoadmap(roadmap._id)}>Follow</button>
//                         <button onClick={() => handleShowDetails(roadmap._id)} style={{ marginLeft: '10px' }}>Details</button>
//                     </div>
//                 ))}
//             </div>

//             {selectedRoadmap && (
//                 <RoadmapModal roadmap={selectedRoadmap} onClose={() => setSelectedRoadmap(null)} />
//             )}
//         </div>
//     );
// };

// export default Roadmaps;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoadmapModal from '../components/RoadmapModal';

const Roadmaps = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoadmap, setSelectedRoadmap] = useState(null);
    const [followedIds, setFollowedIds] = useState([]);

    const token = localStorage.getItem('token');

    const fetchRoadmaps = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roadmap');
            setRoadmaps(response.data);
        } catch (error) {
            console.error('Error fetching roadmaps:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFollowed = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roadmap/followed', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const ids = response.data.map(r => r.roadmapId);
            setFollowedIds(ids);
        } catch (error) {
            console.error("Error fetching followed roadmaps", error);
        }
    };

    useEffect(() => {
        fetchRoadmaps();
        if (token) {
            fetchFollowed();
        }
    }, [token]);

    const handleFollowRoadmap = async (roadmapId) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/roadmap/follow/${roadmapId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(response.data.message);
            fetchFollowed();
        } catch (error) {
            console.error('Error following roadmap:', error);
            alert('Failed to follow roadmap');
        }
    };

    const handleUnfollowRoadmap = async (roadmapId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/roadmap/unfollow/${roadmapId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                alert('Unfollowed roadmap successfully');
                fetchFollowed(); // refresh followed list
            }
        } catch (error) {
            console.error('Error unfollowing roadmap:', error);
            alert('Failed to unfollow roadmap');
        }
    };

    const handleShowDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/roadmap/${id}`);
            setSelectedRoadmap(response.data);
        } catch (error) {
            console.error('Error fetching roadmap details:', error);
        }
    };

    if (loading) return <div>Loading roadmaps...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Available Roadmaps</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {roadmaps.map((roadmap) => {
                    const isFollowed = followedIds.includes(roadmap._id);

                    return (
                        <div key={roadmap._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '300px' }}>
                            <h3>{roadmap.title}</h3>
                            <p>{roadmap.description}</p>

                            {!token ? (
                                <p><i>Login to follow this roadmap</i></p>
                            ) : (
                                <>
                                    {isFollowed ? (
                                        <button onClick={() => handleUnfollowRoadmap(roadmap._id)} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px' }}>
                                            Unfollow
                                        </button>
                                    ) : (
                                        <button onClick={() => handleFollowRoadmap(roadmap._id)} style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px' }}>
                                            Follow
                                        </button>
                                    )}
                                </>
                            )}

                            <button onClick={() => handleShowDetails(roadmap._id)} style={{ marginLeft: '10px', backgroundColor: '#007bff', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px' }}>
                                Details
                            </button>
                        </div>
                    );
                })}
            </div>

            {selectedRoadmap && (
                <RoadmapModal roadmap={selectedRoadmap} onClose={() => setSelectedRoadmap(null)} />
            )}
        </div>
    );
};

export default Roadmaps;
