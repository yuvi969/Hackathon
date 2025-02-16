const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./usermongoscheme')
const Exam = require('./exam.js')
const StudentPaper = require('./studentpaper.js') 
const EvaluationResult = require('./evaluation.js')
const router = express.Router()
const multer = require("multer");
const mongoose = require("mongoose");

require('dotenv').config()


const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access Denied" });

  const token = authHeader.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};


router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    user = new User({ name, email, password: hashedPassword, role })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Generated Token:", token);  

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
});


router.get('/getexam', async (req, res) => {
  try {
    const exams = await Exam.find()
    res.status(200).json({ success: true, exams })
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" })
  }
})


router.post('/add-exam', auth, async (req, res) => {
  try {
      console.log("Received Exam Data:", req.body);  

      const { subject, questions } = req.body;

      if (!subject || !questions || questions.length === 0) {
          return res.status(400).json({ msg: "Please provide subject and questions" });
      }

      const newExam = new Exam({
          name: subject + " Exam",
          subject,
          questions,
          createdBy: req.user.id,
      });

      await newExam.save();
      res.status(200).json({ msg: "Exam created successfully", newExam});
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Failed to create exam", error });
  }
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


router.post("/uploadstudentanswersheet", upload.single("answerSheet"), async (req, res) => {
  try {
    const { examId, studentName, studentEmail } = req.body; 

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const student = await User.findOne({ email: studentEmail });

    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }

    const studentId = student._id; 

    const newPaper = new StudentPaper({
      examId, 
      studentId, 
      studentName,
      filePath: req.file.path,
    });

    await newPaper.save();

    res.json({ message: "File uploaded and saved successfully!", newPaper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed!" });
  }
});



const { ObjectId } = require('mongoose').Types;

router.get("/getstudentpaper/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const papers = await StudentPaper.find({ studentId: new ObjectId(studentId) });

    if (!papers.length) {
      return res.status(404).json({ message: "No checked papers found" });
    }

    res.json({ success: true, papers });
  } catch (error) {
    console.error("Error fetching student papers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});







router.delete('/deleteexam/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Exam.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    res.json({ success: true, message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/getexam/:id', async (req, res) => {
  try {
    const examId = req.params.id;
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    res.status(200).json({ success: true, exam });
  } catch (error) {
    console.error('Error fetching exam:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.patch('/editexam/:id',async(req,res)=>{
  try {
    const id = req.params.id
    const editexam = await Exam.findByIdAndUpdate(id,{$set:req.body},{new:true})
    if(!id){
      res.status(404).json({msg:"Exam not found"})
    }
    res.status(200).json({msg:"Edited successfully"})
  } catch (error) {
    res.status(500).json({msg:"Server error"})
  }
})




module.exports = router
