import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth"; // Ensure '/api/auth' is included
const ADMIN_API_URL="http://localhost:5000/api/admin";// admin url for routes 
// Signup Function
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
};

// Login Function
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
};
