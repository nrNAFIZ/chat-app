const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'public/messages.json');

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Initialize messages file if not present
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
}

// Fetch messages
app.get('/api/messages', (req, res) => {
  const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
  res.json(messages);
});

// Save a new message
app.post('/api/messages', (req, res) => {
  const { username, message } = req.body;
  const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
  messages.push({ username, message, timestamp: new Date().toISOString() });
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages));
  res.status(201).json({ success: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
