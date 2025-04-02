import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login API logic here
        console.log("Admin Login Attempt:", { email, password });
        navigate("/admin/dashboard");
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                {/* Left Side - Image */}
                <div className="admin-login-image">
                    <img src="/images/admin_login_1.png" alt="Admin Login" />

                </div>

                {/* Right Side - Login Form */}
                <div className="admin-login-form">
                    <h2>Login as an Admin</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                placeholder="Enter email "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="admin-login-btn">Login</button>
                    </form>

                    <p className="forgot-password">
                        <a href="#">Forgot your password?</a>
                    </p>
                    <p className="help-link">
                        Get help <a href="#">Signed in</a>.
                    </p>

                    <p className="terms">
                        <a href="#">Terms of use</a> • <a href="#">Privacy policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
