import React, { useState } from 'react';
import axios from 'axios';

const NewUserForm = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER' // Default role
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8080/newUser/create', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('User created successfully:', response.data);
        setSuccessMessage('Account created successfully!');
        localStorage.setItem('username', user.username); 
        localStorage.setItem('password', user.password); 
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        setSuccessMessage('Failed to create account. Please try again.');
      });
  };

  return (
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

        {/* Role Dropdown */}
        <label htmlFor="role" style={{ marginBottom: "10px" }}>
          Role:
        </label>
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          required
          style={{ padding: "8px", marginBottom: "20px" }}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

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
