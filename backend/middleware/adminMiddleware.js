const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check role directly from token (No DB call needed)
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Not an Admin' });
        }

        req.adminId = decoded.id; // Store admin ID for further use
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { authenticateAdmin };
