// form.js
import React, { useState } from 'react';
import axios from 'axios';

const EmailScanForm = () => {
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    subject: '',
    body: '',
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    try {
      const res = await axios.post('http://localhost:8000/predict', formData);
      setResult(res.data.prediction ? 'Phishing detected!' : 'Looks safe.');
    } catch (err) {
      setError('Failed to scan. Please check input fields or try again.');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Manual Email Scanner</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Sender Email:
          <input type="email" name="sender" value={formData.sender} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Receiver Email:
          <input type="email" name="receiver" value={formData.receiver} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Subject:
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required style={styles.input} />
        </label>
        <label style={styles.label}>
          Email Body:
          <textarea name="body" value={formData.body} onChange={handleChange} required style={styles.textarea} />
        </label>
        <button type="submit" style={styles.button}>Scan Email</button>
      </form>

      {result && <p style={{ color: result.includes('Phishing') ? 'red' : 'green' }}>{result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  textarea: {
    minHeight: '100px',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EmailScanForm;
