

import "../styles/LoginSignup.css";


import React, { useState } from 'react';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        experience: '',
        role: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log("Login with:", formData);
        } else {
            console.log("Signup with:", formData);
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <div className='form-toggle'>
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
                        Login
                    </button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
                        Sign Up
                    </button>
                </div>

                <form className='form' onSubmit={handleSubmit}>
                    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

                    {!isLogin && (
                        <>
                            <input
                                type='text'
                                name='name'
                                placeholder='Full Name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <select name='experience' value={formData.experience} onChange={handleChange} required>
                                <option value="">Select Experience</option>
                                <option value="Fresher">Fresher</option>
                                <option value="1-3 years">1-3 years</option>
                                <option value="3-5 years">3-5 years</option>
                                <option value="5+ years">5+ years</option>
                            </select>

                            <select name='role' value={formData.role} onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="Project Manager">Project Manager</option>
                            </select>
                        </>
                    )}

                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type='submit'>{isLogin ? 'Login' : 'Sign Up'}</button>

                    {isLogin ? (
                        <p>
                            Don't have an account?
                            <button type="button" onClick={() => setIsLogin(false)}>Sign Up</button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?
                            <button type="button" onClick={() => setIsLogin(true)}>Login</button>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
