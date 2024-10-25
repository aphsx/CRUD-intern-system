// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // สำหรับเชื่อมต่อกับ frontend

const app = express();
const port = 8001;

app.use(bodyParser.json());
app.use(cors()); // ใช้ cors เพื่อให้ frontend และ backend สามารถเชื่อมต่อกันได้

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_system'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// API: ดึงข้อมูลผู้ใช้ตาม ID
app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM students WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// API: อัปเดตข้อมูลผู้ใช้
app.put('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const { status } = req.body;
  const sql = 'UPDATE students SET status = ? WHERE id = ?';
  db.query(sql, [status, userId], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Profile updated successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});