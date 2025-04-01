import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/admin/getAllUsers", { withCredentials: true })
      .then((response) => setUsers(response.data))
      .catch(() => setMessage("Failed to fetch users."));
  };

  const fetchLogs = () => {
    axios
      .get("http://localhost:8080/admin/viewLogs", { withCredentials: true })
      .then((response) => setLogs(response.data))
      .catch(() => setMessage("Failed to fetch logs."));
  };

  const searchUser = () => {
    if (!username) return setMessage("Please enter a username.");
    axios
      .get(`http://localhost:8080/admin/getUserByUsername/${username}`, { withCredentials: true })
      .then((response) => {
        setSelectedUser(response.data);
        setMessage("");
      })
      .catch(() => setMessage("User not found."));
  };

  const deleteUser = (username) => {
    axios
      .get(`http://localhost:8080/admin/deleteUserByUsername/${username}`, { withCredentials: true })
      .then((response) => {
        setMessage(response.data);
        fetchUsers(); // Refresh users
      })
      .catch(() => setMessage("Failed to delete user."));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Dashboard</h2>

      {/* Search User */}
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={searchUser} style={{ marginLeft: "10px", padding: "8px" }}>Search</button>

      {/* Selected User */}
      {selectedUser && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h4>User Details</h4>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
        </div>
      )}

      {/* Users Table */}
      <h3>All Users</h3>
      <table border="1" cellPadding="10" style={{ margin: "auto", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user.username)} style={{ background: "red", color: "white" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Logs Table */}
      <h3>User Logs</h3>
      <table border="1" cellPadding="10" style={{ margin: "auto", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.timestamp}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Messages */}
      {message && <p style={{ color: "red", marginTop: "20px" }}>{message}</p>}
    </div>
  );
};

export default AdminDashboard;



