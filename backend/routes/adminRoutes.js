const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../config/nodemailer');

const { authenticateAdmin } = require('../middleware/adminMiddleware');
//Admin login route

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        //checking if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "admin not found" });
        }

        //check password matches if email exists 
        const isPasswordMatches = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatches) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        //const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

        // Send token as HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,  // Set `true` in production (HTTPS)
            sameSite: 'Strict', // Adjust this if needed
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
        });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error });
    };
});


//logout route
router.post('/logout', (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: false });
    return res.json({ success: true, message: "Logged out successfully" });
});


//forgot password route
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    //token generation 
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const tokenExpiry = Date.now() + 15 * 60 * 1000;
    //save token to DB
    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpires = tokenExpiry;
    await admin.save();

    // Reset link email
    const resetURL = `http://localhost:3000/admin/reset-password?token=${resetToken}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: admin.email,
        subject: "Admin Password Reset",
        text: `Click this link to reset your password: ${resetURL}`,

    };
    await transporter.sendMail(mailOptions);

    res.json({ message: "Reset link sent to email!" });
});

//reset password route
router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: "New password is required!" });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const admin = await Admin.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } });
    if (!admin) return res.status(400).json({ message: "Invalid or expired token!" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    console.log("Salt:", salt); // Debugging step
    console.log("New Password:", newPassword); // Debugging step
    // remove token
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    res.json({ message: "Password reset successfully!" });
});

// Protected Route Example
// router.get('/protected-route', authenticate, (req, res) => {
//     res.send('You are authenticated and can access this route!');
// });

// router.get("/dashboard", authenticateAdmin, (req, res) => {
//     res.json({ message: "Welcome Admin!", admin: req.admin });
// });

router.get("/dashboard", authenticateAdmin, (req, res) => {
    console.log("Cookies received in /dashboard:", req.cookies);  // 🛠 Debugging
    if (!req.cookies.token) {
        return res.status(401).json({ message: "Unauthorized: Please login" });
    }
    res.json({ message: "Welcome Admin!", adminId: req.adminId });
});


// router.get("/", (req, res) => {
//     res.send("Admin route is working!");
// });

module.exports = router;
