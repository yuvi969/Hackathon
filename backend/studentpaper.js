const mongoose = require('mongoose');

const studentPaperSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentName: { type: String, required: true },
  filePath: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudentPaper', studentPaperSchema);
