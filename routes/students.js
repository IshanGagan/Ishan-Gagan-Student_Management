const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// 📌 Create a new student
router.post("/", async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const student = new Student({ name, age, email });
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get a single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Update a student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Delete a student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
