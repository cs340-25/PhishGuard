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
            {/* Add button to send this to your ML model */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
