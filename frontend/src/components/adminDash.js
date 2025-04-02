import { useState } from "react";
import axios from "axios";

export default function FetchUsersAndLogs() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/getAll", {
        auth: {
          username: "trev", // Replace with actual username
          password: "temupp21581959@", // Replace with actual password
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch logs from the admin endpoint
  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/viewLogs", {
        auth: {
          username: "trev", // Replace with actual username
          password: "temupp21581959@", // Replace with actual password
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <div>
      {/* Button to fetch users */}
      <button onClick={fetchUsers}>Fetch Users</button>

      {/* Table to display users */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to fetch logs */}
      <button onClick={fetchLogs} style={{ marginTop: "20px" }}>
        Fetch Logs
      </button>

      {/* Table to display logs */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Email Contents</th>
            <th>Result</th>
            <th>Username</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.email_contents}</td>
              <td>{log.result}</td>
              <td>{log.username}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
