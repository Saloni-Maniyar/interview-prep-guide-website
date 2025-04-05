const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to the User model
    required: true,
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap', // This refers to the Roadmap model
    required: true,
  },
  completedSteps: [{ type: String }], // We'll store substep text here for simplicity
  quizScores: [
    {
      topic: { type: String },
      score: { type: Number },
      timeTaken: { type: String },
    }
  ],
  interviewResults: [
    {
      round: { type: String },
      performance: { type: String }
    }
  ]
});

module.exports = mongoose.model('Progress', progressSchema);
