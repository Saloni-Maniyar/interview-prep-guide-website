

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    quizProgress: [
        {
            quizType: { type: String },
            selectedOption: { type: String },
            score: { type: Number },
            total: { type: Number },
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
