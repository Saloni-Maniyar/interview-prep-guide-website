// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;



import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token"); // ✅ Check if user is logged in

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

