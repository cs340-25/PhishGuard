// Login form, pretty self explanatory

import React, { useState } from "react";
import axios from "axios";

const LogInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null); // null, "success", "error"

  // hits user/verify/username/password endpoint in java. If it returns true 
  // the user is logged in, otherwise the log in is rejected
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/user/verify/${username}/${password}`
      );

      if (response.data === true) {
        setLoginStatus("success");
        localStorage.setItem('username', username); 
        localStorage.setItem('password', password); 

      } else {
        setLoginStatus("error");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setLoginStatus("error");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <label htmlFor="username" style={{ marginBottom: "10px" }}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: "8px", marginBottom: "20px" }}
        />
        <label htmlFor="password" style={{ marginBottom: "10px" }}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px", marginBottom: "20px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      {loginStatus === "success" && (
        <div style={{ color: "green", marginTop: "20px" }}>
          Login successful! Welcome, {username}.
        </div>
      )}
      {loginStatus === "error" && (
        <div style={{ color: "red", marginTop: "20px" }}>
          Invalid username or password. Please try again.
        </div>
      )}
    </div>
  );
};

export default LogInForm;