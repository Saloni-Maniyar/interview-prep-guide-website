const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv=require('dotenv');
const authRoutes=require('./routes/auth');
// require('dotenv').config();
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
