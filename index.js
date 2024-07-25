const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

var messages = [];

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Fetch messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Save a new message
app.post('/api/messages', (req, res) => {
  const { username, message } = req.body;
  messages.push({ username, message });
  res.status(201).json({ success: true });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/indexfile.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
