const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const dotenv=require('dotenv');
const authRoutes=require('./routes/auth');
// require('dotenv').config();
dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend URL
    credentials: true  // Allow cookies to be sent from the frontend
}));
app.use(express.json());
app.use(cookieParser()); //to parse cookies;
// Connect to database
connectDB();

//use auth route 
app.use('/api/auth',authRoutes);
// Test Route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});



// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
