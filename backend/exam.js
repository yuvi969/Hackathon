const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  subject: { type: String, required: true }, 
  date: { type: Date, default: Date.now },

  questions: [
    {
      question: { type: String, required: true },
      keyValues: [
        {
          key: { type: String, required: true },
          value: { type: String, required: true },
          maxMarks: { type: Number, required: true }  
        }
      ]
    }
  ],

  uploadedPapers: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentPaper" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 
});

module.exports = mongoose.model("Exam", ExamSchema);
