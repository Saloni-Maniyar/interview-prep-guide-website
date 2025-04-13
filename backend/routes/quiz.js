// const express = require("express");
// const router = express.Router();
// const Question = require("../models/Questions");
// const QuizAttempt = require("../models/QuizAttempt");

// //const userId = localStorage.getItem("userId");

// // API to get quiz questions
// router.get("/get-quiz", async (req, res) => {
//     try {
//         const { topic, difficulty, limit } = req.query; // Get filters from query params
//         let query = {};

//         if (topic) query.topic = topic; // Filter by topic
//         if (difficulty) query.difficulty = difficulty; // Filter by difficulty

//         // Fetch random questions from MongoDB
//         const questions = await Question.aggregate([
//             { $match: query },
//             { $sample: { size: parseInt(limit) || 5 } } // Default: 5 random questions
//         ]);

//         res.json(questions);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// });


// // Save user quiz attempt
// router.post("/save-quiz", async (req, res) => {
//     try {
//         const { userId, quizType, selectedOption, questions, score } = req.body;
//         console.log("QUIZ SUBMISSION DATA:", req.body);
//         if (!userId) {
//             return res.status(400).json({ message: "User ID missing!" });
//         }
//         const quizAttempt = new QuizAttempt({ userId, quizType, selectedOption, questions, score });
//         await quizAttempt.save();
//         res.status(201).json({ message: "Quiz attempt saved!", quizAttempt });
//     } catch (error) {
//         res.status(500).json({ message: "Error saving quiz", error });
//     }
// });


// //to fetch th past history of attempted quizzes.
// router.get("/user-quiz-progress/:userId", async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const attempts = await QuizAttempt.find({ userId }).sort({ createdAt: -1 });
//         res.json(attempts);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching quiz progress", error });
//     }
// });


// module.exports = router;







const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");
const QuizAttempt = require("../models/QuizAttempt");
const User = require("../models/User"); //  Import User model

// API to get quiz questions
router.get("/get-quiz", async (req, res) => {
    try {
        const { topic, difficulty, limit } = req.query;
        let query = {};

        if (topic) query.topic = topic;
        if (difficulty) query.difficulty = difficulty;

        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: parseInt(limit) || 5 } }
        ]);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});





router.post("/save-quiz", async (req, res) => {
    try {
        const { userId, quizType, selectedOption, questions } = req.body;

        if (!userId) return res.status(400).json({ message: "User ID missing!" });

        let score = 0;

        // ✅ Evaluate questions properly
        const evaluatedQuestions = questions.map((q) => {
            const isCorrect = q.selectedAnswer?.trim().toLowerCase() === q.correctAnswer?.trim().toLowerCase();
            if (isCorrect) score++;
            return {
                questionId: q.questionId,
                selectedAnswer: q.selectedAnswer,
                isCorrect
            };
        });

        const quizAttempt = new QuizAttempt({
            userId,
            quizType,
            selectedOption,
            questions: evaluatedQuestions,
            score
        });

        await quizAttempt.save();

        await User.findByIdAndUpdate(userId, {
            $push: {
                quizProgress: {
                    quizType,
                    selectedOption,
                    score,
                    total: evaluatedQuestions.length,
                    date: new Date()
                }
            }
        });

        res.status(201).json({ message: "Quiz attempt saved!", score, quizAttempt });
    } catch (error) {
        console.log("Error saving quiz:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});



router.post("/save-quiz", async (req, res) => {
    try {
        const { userId, quizType, selectedOption, questions } = req.body;

        if (!userId || !questions) {
            return res.status(400).json({ message: "Missing required data!" });
        }

        let score = 0;
        const formattedQuestions = questions.map(q => {
            const isCorrect = q.selectedAnswer?.trim().toLowerCase() === q.correctAnswer?.trim().toLowerCase();
            if (isCorrect) score++;

            return {
                questionId: q.questionId,
                selectedAnswer: q.selectedAnswer,
                isCorrect
            };
        });

        const quizAttempt = new QuizAttempt({
            userId,
            quizType,
            selectedOption,
            questions: formattedQuestions,
            score
        });

        await quizAttempt.save();

        const total = formattedQuestions.length;

        await User.findByIdAndUpdate(userId, {
            $push: {
                quizProgress: {
                    quizType,
                    selectedOption,
                    score,
                    total,
                    date: new Date()
                }
            }
        });

        res.status(201).json({ message: "Quiz attempt saved & progress updated!", score, quizAttempt });

    } catch (error) {
        console.error("Quiz Save Error:", error);
        res.status(500).json({ message: "Error saving quiz", error });
    }
});



// Fetch quiz progress for a user
router.get("/user-quiz-progress/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const attempts = await QuizAttempt.find({ userId }).sort({ createdAt: -1 });
        res.json(attempts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz progress", error });
    }
});

module.exports = router;
