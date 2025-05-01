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
    const result = await gmail.users.messages.list({ userId: 'me', maxResults: 5 });

    res.send({
      message: 'Fetched Gmail messages!',
      messages: result.data.messages,
    });
  } catch (err) {
    console.error('Token exchange failed:', err);
    res.status(500).send({ error: 'Authentication failed' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

