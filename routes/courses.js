const express = require("express");
const Course = require("../models/course");
const User = require("../models/user");
const router = express.Router();

// Create a new course
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const instructor = req.user.userId; // Extracted from the token in middleware
    const course = new Course({ title, description, instructor });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "username");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enroll in a course
router.post("/:courseId/enroll", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user.userId; // Extracted from the token in middleware
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.students.push(studentId);
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
