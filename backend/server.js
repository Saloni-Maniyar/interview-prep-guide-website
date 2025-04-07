const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const quizRoutes = require("./routes/quiz");

const authRoutes = require('./routes/auth');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();


// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Allow cookies to be sent from the frontend
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); //to parse cookies;

app.use((req, res, next) => {
    console.log("Cookies received:", JSON.stringify(req.cookies, null, 2));
    next();
});


// Connect to database
connectDB();

//use auth  routes of user 
app.use('/api/auth', authRoutes);

//use all other routes of user 
app.use('/api/user', userRoutes);
// Test Route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

const roadmapRoutes = require('./routes/userRoutes');
app.use('/api/userRoutes', roadmapRoutes);


app.use("/api/quiz", quizRoutes);

//use admin routes
app.use('/api/admin', adminRoutes);

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
