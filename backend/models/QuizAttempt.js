const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizType: { type: String, enum: ["role", "topic"], required: true },
    selectedOption: { type: String, required: true },
    questions: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedAnswer: String,
        isCorrect: Boolean
    }],
    score: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);
