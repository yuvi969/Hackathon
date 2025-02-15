const mongoose = require('mongoose');

const EvaluationResultSchema = new mongoose.Schema({
  studentPaper: { type: mongoose.Schema.Types.ObjectId, ref: "StudentPaper", required: true }, 
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true }, 
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  aiScores: { type: Map, of: Number, required: true }, 
  totalScore: { type: Number, required: true }, 
  feedback: { type: String } 
});

module.exports = mongoose.model("EvaluationResult", EvaluationResultSchema);
