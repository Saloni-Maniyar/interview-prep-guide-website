




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/AdminUsers.css";

// const AdminUsers = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/api/admin/users", {
//                 withCredentials: true
//             });
//             console.log("Full response:", res);
//             console.log("Users fetched:", res.data);

//             // Log the exact structure
//             console.log("Response Data Length:", res.data.length);
//             console.log("Is users array empty?", res.data.length === 0);

//             // Check if the response data is not empty or invalid
//             if (!res.data || res.data.length === 0) {
//                 console.log("No users found in the response.");
//                 return;
//             }

//             // Directly use res.data as it is the users array, no need for res.data.users
//             setUsers(res.data);

//         } catch (err) {
//             console.error("Error fetching users", err);
//         }
//     };

//     const toggleBlockUser = async (userId, isBlocked) => {
//         try {
//             const res = await axios.patch(`http://localhost:5000/api/admin/user/${userId}/block`, {}, {
//                 withCredentials: true
//             });
//             console.log(res.data.message);

//             // Update the user status locally
//             setUsers(users.map(user =>
//                 user._id === userId ? { ...user, isBlocked: !isBlocked } : user
//             ));
//         } catch (err) {
//             console.error("Error blocking/unblocking user", err);
//         }
//     };

//     const deleteUser = async (userId) => {
//         try {
//             const res = await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
//                 withCredentials: true
//             });
//             console.log(res.data.message);

//             // Remove the deleted user from the state
//             setUsers(users.filter(user => user._id !== userId));
//         } catch (err) {
//             console.error("Error deleting user", err);
//         }
//     };

//     return (
//         <div>
//             <h2>All Registered Users</h2>
//             {users && users.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Blocked?</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user._id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.isBlocked ? "Yes" : "No"}</td>
//                                 <td>
//                                     <button onClick={() => toggleBlockUser(user._id, user.isBlocked)}>
//                                         {user.isBlocked ? "Unblock" : "Block"}
//                                     </button>
//                                     <button onClick={() => deleteUser(user._id)}>
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No users found</p>
//             )}
//         </div>
//     );
// };

// export default AdminUsers;




import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminUsers.css";
import { FaTrash, FaBan, FaCheckCircle } from "react-icons/fa";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/users", {
                withCredentials: true
            });
            if (!res.data || res.data.length === 0) return;
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    const toggleBlockUser = async (userId, isBlocked) => {
        try {
            await axios.patch(`http://localhost:5000/api/admin/user/${userId}/block`, {}, {
                withCredentials: true
            });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, isBlocked: !isBlocked } : user
            ));
        } catch (err) {
            console.error("Error blocking/unblocking user", err);
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
                withCredentials: true
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            console.error("Error deleting user", err);
        }
    };

    return (
        <div className="admin-users-container">
            <h2 className="admin-users-heading">All Registered Users</h2>
            {users.length > 0 ? (
                <table className="admin-users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className={user.isBlocked ? "blocked" : "active"}>
                                    {user.isBlocked ? "Blocked" : "Active"}
                                </td>
                                <td className="actions">
                                    <button
                                        className={user.isBlocked ? "btn unblock" : "btn block"}
                                        onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                                    >
                                        {user.isBlocked ? (
                                            <>
                                                <FaCheckCircle /> Unblock
                                            </>
                                        ) : (
                                            <>
                                                <FaBan /> Block
                                            </>
                                        )}
                                    </button>
                                    <button className="btn delete" onClick={() => deleteUser(user._id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-users-text">No users found</p>
            )}
        </div>
    );
};

export default AdminUsers;
