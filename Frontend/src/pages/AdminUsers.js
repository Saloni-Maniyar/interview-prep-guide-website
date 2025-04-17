// import React, { useEffect, useState } from "react";
// import axios from "axios";

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
//             console.log("Users fetched:", res.data.users);
//             setUsers(res.data.users);
//         } catch (err) {
//             console.error("Error fetching users", err);
//         }
//     };

//     return (
//         <div>
//             <h2>All Registered Users</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Blocked?</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user._id}>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.isBlocked ? "Yes" : "No"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminUsers;









// import React, { useEffect, useState } from "react";
// import axios from "axios";

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

//             // if (res.data && Array.isArray(res.data.users)) {
//             if (!res.data || res.data.length === 0) {
//                 console.log("No users found in the response.");
//                 return;
//             }
//             setUsers(res.data.users);

//         } catch (err) {
//             console.error("Error fetching users", err);
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
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user._id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.isBlocked ? "Yes" : "No"}</td>
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



//Proper code to show users

// import React, { useEffect, useState } from "react";
// import axios from "axios";

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
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user._id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.isBlocked ? "Yes" : "No"}</td>
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
// import "../styles/AdminUsers.css";

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
            console.log("Full response:", res);
            console.log("Users fetched:", res.data);

            // Log the exact structure
            console.log("Response Data Length:", res.data.length);
            console.log("Is users array empty?", res.data.length === 0);

            // Check if the response data is not empty or invalid
            if (!res.data || res.data.length === 0) {
                console.log("No users found in the response.");
                return;
            }

            // Directly use res.data as it is the users array, no need for res.data.users
            setUsers(res.data);

        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    const toggleBlockUser = async (userId, isBlocked) => {
        try {
            const res = await axios.patch(`http://localhost:5000/api/admin/user/${userId}/block`, {}, {
                withCredentials: true
            });
            console.log(res.data.message);

            // Update the user status locally
            setUsers(users.map(user =>
                user._id === userId ? { ...user, isBlocked: !isBlocked } : user
            ));
        } catch (err) {
            console.error("Error blocking/unblocking user", err);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
                withCredentials: true
            });
            console.log(res.data.message);

            // Remove the deleted user from the state
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            console.error("Error deleting user", err);
        }
    };

    return (
        <div>
            <h2>All Registered Users</h2>
            {users && users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Blocked?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isBlocked ? "Yes" : "No"}</td>
                                <td>
                                    <button onClick={() => toggleBlockUser(user._id, user.isBlocked)}>
                                        {user.isBlocked ? "Unblock" : "Block"}
                                    </button>
                                    <button onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default AdminUsers;
