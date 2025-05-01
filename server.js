// server.js
require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

console.log("CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("REDIRECT_URI:", process.env.REDIRECT_URI);

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const app = express();
app.use(cors());

app.get('/auth/google', async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const result = await gmail.users.messages.list({ userId: 'me', maxResults: 50 });
    const messages = result.data.messages; 

    const detailedMessages = await Promise.all(
      messages.map(async (msg) => {
        const fullMessage = await gmail.users.messages.get({userId: 'me', id: msg.id}); 
        const headers = fullMessage.data.payload.headers; 

        const getHeader = (name) => {
          const header = headers.find((h) => h.name === name); 
          return header ? header.value : ''; 
        }; 

        return {
          id: msg.id, 
          threadId: msg.threadId,
          from: getHeader('From'), 
          to: getHeader('To'),
          subject: getHeader('Subject'), 
          snippet: fullMessage.data.snippet,
          body: extractBody(fullMessage.data.payload),
        };
      })
    );
    
    let cachedMessages = []; 
    cachedMessages = detailedMessages; 

    res.redirect('http://localhost:3000/inbox'); 
  } catch (err) {
    console.error('Token exchange failed:', err);
    res.status(500).send({ error: 'Authentication failed' });
  }
});

function extractBody(payload) {
  if (!payload) return ''; 
  const parts = payload.parts || [payload]; 
  const part = parts.find(p => p.mimeType === 'text/plain'); 
  return Buffer.from(part?.body?.data || '', 'base64').toString('utf8'); 
}

app.get('/inbox', (req, res) => {
  if (!cachedMessages.length) {
    return res.status(404).json({ error: 'No messages cached' });
  }

  res.json({ messages: cachedMessages });
});


app.listen(5000, () => console.log('Server running on http://localhost:5000'));

