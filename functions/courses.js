const mongoose = require("mongoose");

exports.handler = async (event, context) => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
  });

  const Course = mongoose.model("Course", courseSchema);

  try {
    const courses = await Course.find();
    return {
      statusCode: 200,
      body: JSON.stringify({ courses }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
