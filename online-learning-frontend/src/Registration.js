// src/Registration.js
import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
      await axios.post(
        "https://turquoise-jay-tutu.cyclic.app/api/auth/register",
        {
          username,
          password,
        }
      );
      console.log("Registration successful");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default Registration;

//aaaaa