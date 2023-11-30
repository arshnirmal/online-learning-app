// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Registration from "./Registration";
import "./App.css";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch all courses
    axios
      .get("https://turquoise-jay-tutu.cyclic.app/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error.message);
      });

    // Fetch user profile
    axios
      .get("https://turquoise-jay-tutu.cyclic.app/api/users/profile", {
        headers: {
          Authorization: `Bearer YOUR_JWT_TOKEN`, // Replace with your actual token
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error.message);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="container">
      <div className="header">
        <h1>Online Learning App</h1>
      </div>

      {user ? (
        <div className="user-info">
          <p>Welcome, {user.username}!</p>
        </div>
      ) : (
        <Registration />
      )}

      <h2>Courses</h2>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course._id} className="course-item">
            <strong className="course-title">{course.title}</strong>
            <p className="course-description">{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
