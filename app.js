const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/learning_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Course = mongoose.model("Course", courseSchema);

app.use(express.json());

app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/courses", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const newCourse = new Course({ title, description });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
