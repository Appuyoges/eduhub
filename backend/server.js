const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { cosine } = require("ml-distance").similarity;
const { mean, std } = require("mathjs");
const fs = require("fs");
const csvParser = require("csv-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/student-EduHub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  rollNumber: Number,
  mathScore: Number,
  readingScore: Number,
  writingScore: Number,
  group: Number,
  strength: String,
  weakness: String,
});

const Student = mongoose.model("Student", studentSchema);

// 📌 Load initial student data from CSV
async function loadCSVData() {
  if (await Student.countDocuments() > 0) return; // Avoid reloading if data exists

  const students = [];
  fs.createReadStream("student_groups_updated.csv")
    .pipe(csvParser())
    .on("data", (row) => {
      students.push({
        rollNumber: parseInt(row.RollNumber),
        mathScore: parseInt(row.MathScore),
        readingScore: parseInt(row.ReadingScore),
        writingScore: parseInt(row.WritingScore),
        group: parseInt(row.Group),
        strength: row.Strength,
        weakness: row.Weakness,
      });
    })
    .on("end", async () => {
      await Student.insertMany(students);
      console.log("CSV Data Imported.");
    });
}
loadCSVData();

// 📌 Standardize student scores for cosine similarity
function standardizeData(data) {
  if (data.length === 1) return data; // Avoid division by zero
  const means = mean(data, 0);
  const stdDevs = std(data, 0).map((s) => (s === 0 ? 1 : s));
  return data.map((row) => row.map((val, i) => (val - means[i]) / stdDevs[i]));
}

// 📌 Assign strength & weakness
function determineStrengthWeakness(math, reading, writing) {
  const scores = { Math: math, Reading: reading, Writing: writing };
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return { strength: sortedScores[0][0], weakness: sortedScores[2][0] };
}

// 📌 Assign student to a group
app.post("/assign", async (req, res) => {
  const { rollNumber, mathScore, readingScore, writingScore } = req.body;
  const newStudentScores = [mathScore, readingScore, writingScore];

  const students = await Student.find();
  if (students.length === 0) {
    const { strength, weakness } = determineStrengthWeakness(mathScore, readingScore, writingScore);
    const newStudent = new Student({ rollNumber, mathScore, readingScore, writingScore, group: 1, strength, weakness });
    await newStudent.save();
    return res.json({ group: 1, strength, weakness });
  }

  const scoreArray = students.map((s) => [s.mathScore, s.readingScore, s.writingScore]);
  const standardizedScores = standardizeData([...scoreArray, newStudentScores]);
  const newStudentStandardized = standardizedScores.pop();

  let maxSimilarity = -1;
  let assignedGroup = null;
  const similarityThreshold = 0.7;

  students.forEach((student, index) => {
    const similarity = cosine(newStudentStandardized, standardizedScores[index]);
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      assignedGroup = student.group;
    }
  });

  if (maxSimilarity < similarityThreshold || assignedGroup === null) {
    assignedGroup = Math.max(...students.map((s) => s.group)) + 1;
  }

  const { strength, weakness } = determineStrengthWeakness(mathScore, readingScore, writingScore);
  const newStudent = new Student({ rollNumber, mathScore, readingScore, writingScore, group: assignedGroup, strength, weakness });
  await newStudent.save();

  res.json({ group: assignedGroup, strength, weakness });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
