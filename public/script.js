const API_URL = '/api/messages';
let username = '';

// Set username and show message form
function setUsername() {
  username = document.getElementById('username').value;
  if (username.trim() === '') {
    alert('Username cannot be empty');
    return;
  }
  document.getElementById('username-container').style.display = 'none';
  document.getElementById('messages-container').style.display = 'block';
  document.getElementById('message-form').style.display = 'flex';
  loadMessages();
}

document.getElementById('message-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = document.getElementById('message').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, message }),
  });

  document.getElementById('message').value = '';
  loadMessages();
});

async function loadMessages() {
  const response = await fetch(API_URL);
  const messages = await response.json();
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = messages.map(msg => `<div><strong>${msg.username}:</strong> ${msg.message}</div>`).join('');
}

// Initial messages loading and periodic update
setInterval(loadMessages, 3000);
