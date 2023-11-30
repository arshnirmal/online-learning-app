const express = require("express");
const verifyToken = require("./middleware/auth");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/users", require("./routes/users"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/courses", verifyToken, require("./routes/courses")); // Protect courses route
app.use("/api/users", verifyToken, require("./routes/users")); // Protect users route
