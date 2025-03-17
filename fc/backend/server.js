const express = require('express');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());
const router = jsonServer.router('db.json');
const SECRET_KEY = 'your-secret-key';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = JSON.parse(fs.readFileSync('./db.json'));
  const user = db.users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// CRUD APIs with authentication
app.get('/api/students', authenticateToken, (req, res) => {
  res.json(router.db.get('students').value());
});

app.post('/api/students', authenticateToken, (req, res) => {
  const db = router.db.getState();
  const newStudent = { id: Date.now(), ...req.body };
  db.students.push(newStudent);
  router.db.setState(db);
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', authenticateToken, (req, res) => {
  const db = router.db.getState();
  const index = db.students.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    db.students[index] = { ...db.students[index], ...req.body };
    router.db.setState(db);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.json(db.students[index]);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.delete('/api/students/:id', authenticateToken, (req, res) => {
  const db = router.db.getState();
  db.students = db.students.filter(s => s.id !== parseInt(req.params.id));
  router.db.setState(db);
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
  res.status(204).send();
});

app.use('/api', router);
app.listen(3000, () => console.log('Server running on http://localhost:3000'));