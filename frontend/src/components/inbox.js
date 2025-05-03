import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/inbox')
      .then(res => setMessages(res.data.messages))
      .catch(err => console.error(err));
  }, []);

  const handleCheckPhishing = async () => {
    try{
      const response = await axios.post('http://localhost:8000/predict', {
        sender: selected.from, 
        receiver: selected.to, 
        subject: selected.subject, 
        body: selected.body
      }); 
      alert(response.data.prediction
        ? 'This email may be a phsishing attempt!'
        : 'This email appears safe.');
    } catch(error) {
      console.error("Error contacting ML model:", error);
      alert('Failed to check email. Try again'); 
    }
  }; 

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Inbox</h2>
      <div style={{ display: 'flex' }}>
        <ul style={{ width: '40%', borderRight: '1px solid gray' }}>
          {messages.map(msg => (
            <li key={msg.id} onClick={() => setSelected(msg)} style={{ cursor: 'pointer', margin: '10px 0' }}>
              <strong>{msg.subject}</strong><br />
              <small>From: {msg.from}</small>
            </li>
          ))}
        </ul>
        {selected && (
          <div style={{ paddingLeft: '2rem' }}>
            <h3>{selected.subject}</h3>
            <p><strong>From:</strong> {selected.from}</p>
            <p><strong>To:</strong> {selected.to}</p>
            <p>{selected.body}</p>
            <button onClick={handleCheckPhishing} style={{marginTop: '1rem'}}>
              Check for Phishing!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
