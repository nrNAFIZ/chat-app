const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const LIMIT = 30;
var messages = [];

// Middlewares
app.use(express.json());

// Fetch messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Save a new message
app.post('/api/messages', (req, res) => {
  const { username, message } = req.body;
  messages.push({ username, message });
  if(messages.length > LIMIT) {
    messages.shift();
  }
  res.status(201).json({ success: true });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'indexfile.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
