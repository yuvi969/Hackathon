const mongoose = require('mongoose');

const StudentPaperSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true }, 
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  pdfUrl: { type: String, required: true }, 
  status: { type: String, enum: ["Pending", "Reviewed"], default: "Pending" }, 
  evaluatedScore: { type: mongoose.Schema.Types.ObjectId, ref: "EvaluationResult" } 
});

module.exports = mongoose.model("StudentPaper", StudentPaperSchema);
