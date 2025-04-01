// Create account page 

import React, { useState } from 'react';
import axios from 'axios';

// User class
const NewUserForm = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER'
  });

  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Reading in text input 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // function called when submit button pressed
  const handleSubmit = (event) => {
    event.preventDefault();

    // Hits java endpoint to add user to database 
    axios
      .post('http://localhost:8080/newUser/create', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // giving confirmation message and storing user data for monitor 
        console.log('User created successfully:', response.data);
        setSuccessMessage('Account created successfully!'); // Set success message
        localStorage.setItem('username', user.username); 
        localStorage.setItem('password', user.password); 
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        setSuccessMessage('Failed to create account. Please try again.'); // Error message
      });
  };

  return (
    // Form for inputting data
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h2>Create a New User</h2>
      <form
        onSubmit={handleSubmit}
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
          name="username"
          placeholder="Enter username"
          value={user.username}
          onChange={handleChange}
          required
          style={{ padding: "8px", marginBottom: "20px" }}
        />
        <label htmlFor="email" style={{ marginBottom: "10px" }}>
          Email:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={handleChange}
          required
          style={{ padding: "8px", marginBottom: "20px" }}
        />
        <label htmlFor="password" style={{ marginBottom: "10px" }}>
          Password:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={handleChange}
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
          Submit
        </button>
      </form>
      {successMessage && (
        <p style={{ marginTop: "20px", color: successMessage.includes('successfully') ? 'green' : 'red' }}>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default NewUserForm;