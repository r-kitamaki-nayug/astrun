const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let users = [
  { id: 1, name: "Player1", score: 1500 },
  { id: 2, name: "Player2", score: 1200 },
  { id: 3, name: "Player3", score: 1000 },
  { id: 4, name: "Player4", score: 800 },
  { id: 5, name: "Player5", score: 600 }
];

let currentUser = { id: 1, name: "Player1", score: 1500 };

app.get('/api/account', (req, res) => {
  res.json({
    success: true,
    data: currentUser
  });
});

app.post('/api/account/signin', (req, res) => {
  res.json({
    success: true,
    data: currentUser
  });
});

app.get('/api/ranking/list', (req, res) => {
  const { category = "total", limit = 10, offset = 0 } = req.query;
  
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const paginatedUsers = sortedUsers.slice(offset, offset + parseInt(limit));
  
  const rankingList = paginatedUsers.map((user, index) => ({
    rank: parseInt(offset) + index + 1,
    userId: user.id,
    userName: user.name,
    score: user.score
  }));
  
  res.json({
    success: true,
    data: rankingList
  });
});

app.get('/api/ranking/my', (req, res) => {
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const myRank = sortedUsers.findIndex(user => user.id === currentUser.id) + 1;
  
  res.json({
    success: true,
    data: {
      rank: myRank,
      userId: currentUser.id,
      userName: currentUser.name,
      score: currentUser.score
    }
  });
});

app.post('/api/ranking/post', (req, res) => {
  const { score } = req.body;
  
  if (score > currentUser.score) {
    currentUser.score = score;
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex].score = score;
    }
  }
  
  res.json({
    success: true,
    data: {
      userId: currentUser.id,
      score: currentUser.score,
      newRecord: score > currentUser.score
    }
  });
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
  console.log(`Game available at http://localhost:${PORT}/index.html`);
});